import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // Store images and previews
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [previews, setPreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [pcategory, setPcategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Daily");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Handle image file and preview
  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [key]: file }));
      setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    }
  };

  // Toggle size selection
  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Validate form fields
  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Please enter product name");
      return false;
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return false;
    }

    if (!Object.values(images).some((img) => img)) {
      toast.error("Please upload at least one image");
      return false;
    }

    if (!sizes.length) {
      toast.error("Please select at least one size");
      return false;
    }

    if (!pcategory) {
      toast.error("Please select a category");
      return false;
    }

    if (!subcategory) {
      toast.error("Please select a subcategory");
      return false;
    }

    return true; // all validations passed
  };

  // Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", pcategory);
      formData.append("subcategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      Object.keys(images).forEach((key) => {
        if (images[key]) formData.append(key, images[key]);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // reset form
        setName("");
        setDescription("");
        setPrice("");
        setPcategory("Men");
        setSubcategory("Daily");
        setBestseller(false);
        setSizes([]);
        setImages({ image1: null, image2: null, image3: null, image4: null });
        setPreviews({ image1: null, image2: null, image3: null, image4: null });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong while adding product"
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 py-3 px-[max(4vw,20px)]">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
          Add New Product
        </h2>

        {/* Image Upload */}
        <div>
          <p className="font-semibold mb-3 text-gray-800">Upload Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["image1", "image2", "image3", "image4"].map((key, idx) => (
              <label
                key={key}
                htmlFor={key}
                className={`relative border-2 border-dashed rounded-lg overflow-hidden h-28 flex items-center justify-center cursor-pointer transition-all bg-gray-50 hover:bg-gray-100 ${
                  !Object.values(images).some((img) => img) &&
                  idx === 0
                    ? "border-red-500"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
              >
                <img
                  src={previews[key] || assets.upload_area}
                  alt={`Upload ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
                <input
                  type="file"
                  id={key}
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, key)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                !name.trim()
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                !price
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none resize-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              value={pcategory}
              onChange={(e) => setPcategory(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                !pcategory
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
            >
         
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Subcategory</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                !subcategory
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
            >
              <option value="Daily">Daily</option>
              <option value="Occasional">Occasional</option>
              <option value="Wedding">Wedding</option>
            </select>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-semibold mb-2">Available Sizes</label>
          <div
            className={`flex flex-wrap gap-3 ${
              !sizes.length ? "border border-red-500 p-2 rounded" : ""
            }`}
          >
            {["S", "M", "L", "XL", "XXL", "Sari"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 rounded-md font-medium border transition-all ${
                  sizes.includes(size)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
            className="w-5 h-5 accent-indigo-600"
          />
          <label htmlFor="bestseller" className="font-medium text-gray-800">
            Add to Bestseller
          </label>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t flex justify-center sm:justify-start">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all w-full sm:w-auto"
          >
            + Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
