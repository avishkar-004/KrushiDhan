import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const server = "http://localhost:5000" // Server URL for API requests

const RentProductForm = () => {
  const [formData, setFormData] = useState({
    farmer_id: "67dec5a9fd7684f7912d4718",  // Hardcoded farmer ID
    equipment_name: "",
    description: "",
    rent_price_per_day: "",
    start_date: "",
    end_date: "",
    street: "",
    city: "",
    state: "",
    images: []
  });

  const [imagePreview, setImagePreview] = useState([]);

  // 🔥 Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔥 Handle Image Upload (Convert to Base64)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    // Convert images to Base64 and update the form state
    Promise.all(files.map((file) => convertToBase64(file)))
      .then((base64Images) => {
        setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...base64Images],
        }));

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreview((prev) => [...prev, ...previews]);
      })
      .catch((error) => console.error("Image conversion error:", error));
  };

  // 🔥 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${server}/api/rentproducts/add`, formData, {
        headers: { "Content-Type": "application/json" }
      });

      if (res.status === 201) {
        toast.success("Rent product added successfully!");

        // Reset form after successful submission
        setFormData({
          farmer_id: "67dec5a9fd7684f7912d4718",
          equipment_name: "",
          description: "",
          rent_price_per_day: "",
          start_date: "",
          end_date: "",
          street: "",
          city: "",
          state: "",
          images: []
        });

        setImagePreview([]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add Rent Product
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Equipment Name */}
            <div>
              <label className="block text-gray-700">Equipment Name</label>
              <input
                type="text"
                name="equipment_name"
                value={formData.equipment_name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter equipment name"
              />
            </div>

            {/* Rent Price */}
            <div>
              <label className="block text-gray-700">Rent Price (₹/day)</label>
              <input
                type="number"
                name="rent_price_per_day"
                value={formData.rent_price_per_day}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter price per day"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                className="w-full p-2 border rounded"
                placeholder="Enter description"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Street */}
            <div>
              <label className="block text-gray-700">Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter street"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter city"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter state"
              />
            </div>

            {/* Image Upload */}
            <div className="col-span-2">
              <label className="block text-gray-700">Upload Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
              <div className="mt-4 flex gap-4">
                {imagePreview.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            </div>

          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentProductForm;
