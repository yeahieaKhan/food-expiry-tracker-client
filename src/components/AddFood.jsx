import React, { useContext } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  // const navigate = useNavigate();
  const handleCreate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Get all entries as an object
    const addFoodData = Object.fromEntries(formData.entries());
    console.log({ addFoodData });

    axios
      .post("http://localhost:8080/add-food", addFoodData)
      .then((res) => {
        console.log("server response data", res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Add Food successfully",
            icon: "success",
            draggable: true,
          });

          // navigate("/");
        }
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };
  return (
    <div>
      <h2>This is add foof</h2>
      <div>
        <form className="space-y-6" onSubmit={handleCreate}>
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
              />
            </fieldset>

            {/* Hobby Category */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Food Category</label>
              <select name="category" className="select w-full" required>
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

export default AddFood;
