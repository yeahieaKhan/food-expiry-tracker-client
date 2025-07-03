import React, { use } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const UpdatedItems = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const {
    _id,
    category,
    foodtitle,
    imageURL,
    quantity,
    description,
    expiryDate,
  } = useLoaderData();

  const updateHanle = (e) => {
    e.preventDefault();
    console.log("handle update");
    const form = e.target;
    const formData = new FormData(form);
    const updatedFood = Object.fromEntries(formData.entries());
    console.log(updatedFood);

    axios
      .put(`http://localhost:8080/updated-item/${_id}`, updatedFood)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Item updated successfully!",
            icon: "success",
            draggable: true,
          });
        }
      })

      .catch((err) => {
        console.error("Failed to update data:", err);
      });
    navigate("/my-item");
  };
  return (
    <div>
      <h2>This is add foof</h2>
      <div>
        <form className="space-y-6" onSubmit={updateHanle}>
          <div className="grid gap-6 mt-10 grid-cols-1 md:grid-cols-2">
            {/* Group Name */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Food Title</label>
              <input
                type="text"
                className="input w-full"
                name="foodtitle"
                placeholder="Enter Food Title"
                required
                defaultValue={foodtitle}
              />
            </fieldset>

            {/* Hobby Category */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Food Category</label>
              <select
                name="category"
                defaultValue={category}
                className="select w-full"
                required
              >
                <option disabled selected value="">
                  Select a category
                </option>
                <option>Dairy</option>
                <option>Meat</option>
                <option>Vegetables</option>
                <option>Snacks</option>
              </select>
            </fieldset>

            {/* Meeting Location */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Quantity</label>
              <input
                type="number"
                className="input w-full"
                name="quantity"
                placeholder="Meeting Location"
                required
                defaultValue={quantity}
              />
            </fieldset>

            {/* Start Date */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Expiry Date</label>
              <input
                type="date"
                className="input w-full"
                name="expiryDate"
                required
                defaultValue={expiryDate}
              />
            </fieldset>

            {/* Image URL */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Image URL</label>
              <input
                type="text"
                className="input w-full"
                name="imageURL"
                placeholder="Enter Image URL"
                required
                defaultValue={imageURL}
              />
            </fieldset>

            {/* User Email (readonly) */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">User Email</label>
              <input
                type="email"
                className="input w-full"
                name="userEmail"
                value={user?.email || ""}
                readOnly
              />
            </fieldset>
          </div>
          {/* Description */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <label className="label">Description</label>
            <textarea
              className="textarea w-full"
              name="description"
              placeholder="Enter Description"
              rows="4"
              required
              defaultValue={description}
            ></textarea>
          </fieldset>

          {/* Create Button */}
          <button type="submit" className="btn my-10 btn-secondary w-full">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatedItems;
