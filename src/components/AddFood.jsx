import React, { useContext } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const addFoodData = Object.fromEntries(formData.entries());

    axios
      .post("http://localhost:3000/add-food", addFoodData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Food added successfully!",
            icon: "success",
            confirmButtonColor: "#22c55e",
          });
          navigate("/my-item");
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-center font-bold text-4xl text-green-700 mb-10">
          Add New Food Item
        </h2>

        <form className="space-y-8" onSubmit={handleCreate}>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {/* Food Title */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Food Title
              </label>
              <input
                type="text"
                name="foodtitle"
                placeholder="Enter Food Title"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Food Category */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Food Category
              </label>
              <select
                name="category"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option disabled value="">
                  Select a category
                </option>
                <option>Dairy</option>
                <option>Meat</option>
                <option>Vegetables</option>
                <option>Snacks</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Prices
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter Prices"
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 
               shadow-sm transition-all duration-200 ease-in-out
               hover:border-blue-400 hover:shadow-md
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none 
               sm:text-base text-sm"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="imageURL"
                placeholder="Enter Image URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* User Email */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                User Email
              </label>
              <input
                type="email"
                name="userEmail"
                value={user?.email || ""}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter Description"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
