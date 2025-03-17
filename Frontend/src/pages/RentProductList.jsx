import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RentProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    city: ""
  });

  const [loading, setLoading] = useState(false);

  // 🔥 Fetch Rent Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:8000/api/farmer/searchEqp?${query}`);

      if (res.status === 200) {
        setProducts(res.data.products);
        toast.success("Products fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "No products found");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();  // Fetch all products on initial render
  }, []);

  // 🔥 Handle Filter Changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Rent Products</h2>

        {/* 🔥 Filter Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
              placeholder="Enter state"
            />
          </div>

          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
              placeholder="Enter city"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            >
              Search
            </button>
          </div>
        </form>

        {/* 🔥 Loading Indicator */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {/* 🔥 Product Cards */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">{product.equipment_name}</h3>
                    <p className="text-gray-600">{product.description}</p>
                    
                    <div className="mt-4">
                      <p className="text-green-600 font-bold">
                        ₹{product.rent_price_per_day} / day
                      </p>
                      <p>📍 {product.city}, {product.state}</p>
                      <p>🗓️ {new Date(product.start_date).toLocaleDateString()} - {new Date(product.end_date).toLocaleDateString()}</p>
                    </div>

                    {/* Image Display */}
                    {product.images?.length > 0 && (
                      <div className="mt-4">
                        <img
                          src={product.images[0]}  
                          alt={product.equipment_name}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No products found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RentProductList;
