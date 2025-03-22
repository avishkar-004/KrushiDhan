import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const server = "http://localhost:5000"

const YieldSellForm = () => {
  const [formData, setFormData] = useState({
    farmer_id: "67dec5a9fd7684f7912d4718",  // Replace with dynamic farmer ID
    crop_name: "",
    description: "",
    price_per_kg: "",
    quantity: "",
    location: {
      street: "",
      city: "",
      state: "",
    },
    images: [],
  });

  const [imagePreview, setImagePreview] = useState([]);

  // 🔥 Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("location")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // 🔥 Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...previews]);
  };

  // 🔥 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("farmer_id", formData.farmer_id);
    data.append("crop_name", formData.crop_name);
    data.append("description", formData.description);
    data.append("price_per_kg", formData.price_per_kg);
    data.append("quantity", formData.quantity);
    data.append("location[street]", formData.location.street);
    data.append("location[city]", formData.location.city);
    data.append("location[state]", formData.location.state);

    formData.images.forEach((file) => {
      data.append("images", file);
    });

    try {
      const res = await axios.post(`${server}/api/yieldsell/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        toast.success("Yield added successfully!");
        setFormData({
          farmer_id: "67dec5a9fd7684f7912d4718",
          crop_name: "",
          description: "",
          price_per_kg: "",
          quantity: "",
          location: { street: "", city: "", state: "" },
          images: [],
        });
        setImagePreview([]);
      }
    } catch (error) {
      console.error("Error adding yield:", error);
      toast.error(error.response?.data?.message || "Error adding yield");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add Yield for Sale
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Crop Name */}
            <div>
              <label className="block text-gray-700">Crop Name</label>
              <input
                type="text"
                name="crop_name"
                value={formData.crop_name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter crop name"
              />
            </div>

            {/* Price per KG */}
            <div>
              <label className="block text-gray-700">Price (₹/kg)</label>
              <input
                type="number"
                name="price_per_kg"
                value={formData.price_per_kg}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter price per kg"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-700">Quantity (kg)</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter quantity"
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

            {/* Location - Street */}
            <div>
              <label className="block text-gray-700">Street</label>
              <input
                type="text"
                name="location.street"
                value={formData.location.street}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter street"
              />
            </div>

            {/* Location - City */}
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter city"
              />
            </div>

            {/* Location - State */}
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
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
              Add Yield
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YieldSellForm;
