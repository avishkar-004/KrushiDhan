import React, { useState, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Required for accessibility

const CropDiseaseDetect = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [diseaseData, setDiseaseData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const API_URL = "YOUR_BACKEND_API_URL"; // Replace with your API URL

  // Start camera
  const startCamera = async () => {
    setIsCameraOpen(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  };

  // Capture image from camera
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });
      setImage(file);
      setPreview(URL.createObjectURL(file));
      stopCamera();
    }, "image/jpeg");
  };

  // Stop camera
  const stopCamera = () => {
    setIsCameraOpen(false);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Send image to backend for disease detection
  const handleDetectDisease = async () => {
    if (!image) {
      alert("Please select or capture an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setDiseaseData(response.data); // Backend response (contains disease name & description)
    } catch (error) {
      console.error("Error detecting disease:", error);
      alert("Failed to detect disease. Please try again!");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Crop Disease Detection</h1>

      {/* Image Selection & Capture Section */}
      <div style={styles.uploadContainer}>
        <button onClick={startCamera} style={styles.uploadButton}>
          📷 Open Camera
        </button>

        <label style={styles.uploadButton}>
          📂 Select File
          <input type="file" accept="image/*" onChange={handleFileChange} style={styles.hiddenInput} />
        </label>
      </div>

      {/* Camera Preview */}
      {isCameraOpen && (
        <div style={styles.cameraContainer}>
          <video ref={videoRef} autoPlay playsInline style={styles.video}></video>
          <button onClick={captureImage} style={styles.captureButton}>
            📸 Capture
          </button>
          <button onClick={stopCamera} style={styles.closeButton}>❌ Close Camera</button>
        </div>
      )}

      {/* Image Preview */}
      {preview && (
        <div>
          <h3>Selected Image:</h3>
          <img src={preview} alt="Selected" style={styles.imagePreview} />
        </div>
      )}

      {/* Detect Disease Button */}
      <button onClick={handleDetectDisease} style={styles.detectButton}>
        🔍 Detect Disease
      </button>

      {/* Show Disease Name & Diagnosis Button */}
      {diseaseData && (
        <div style={styles.resultContainer}>
          <h2>Disease: {diseaseData.name}</h2>
          <button onClick={() => setIsModalOpen(true)} style={styles.diagnosisButton}>
            🏥 Disease Diagnosis
          </button>
        </div>
      )}

      {/* Popup Modal for Disease Diagnosis */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={styles.modal}>
        <button onClick={() => setIsModalOpen(false)} style={styles.closeButton}>❌</button>
        <h2>Disease Diagnosis</h2>
        <p>{diseaseData?.description}</p>
      </Modal>

      {/* Canvas for Capturing Camera Image (Hidden) */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  uploadContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  uploadButton: {
    background: "#28a745",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "inline-block",
  },
  hiddenInput: {
    display: "none",
  },
  cameraContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  video: {
    width: "300px",
    borderRadius: "10px",
  },
  captureButton: {
    background: "#007bff",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
    cursor: "pointer",
  },
  closeButton: {
    background: "red",
    color: "#fff",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  imagePreview: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginTop: "10px",
  },
  detectButton: {
    background: "#007bff",
    color: "#fff",
    padding: "12px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
  },
  diagnosisButton: {
    background: "#ff9800",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
};

export default CropDiseaseDetect;
