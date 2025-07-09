import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contextApi/AuthContext";

const FoodDetails = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);

  const {
    _id,
    category,
    foodtitle,
    imageURL,
    quantity,
    description,
    expiryDate,
    userEmail,
  } = data;

  return (
    <div className="w-8/12 mx-auto grid grid-cols-2 py-20 gap-10">
      {/* Food Details */}
      <div>
        <img src={imageURL} alt={foodtitle} className="rounded shadow-lg" />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Category: {category}</h2>
        <h2 className="text-lg">Food Title: {foodtitle}</h2>
        <h2>Quantity: {quantity}</h2>
        <h2>Expiry Date: {expiryDate}</h2>
        <h2>Description: {description}</h2>
        <h2 className="text-sm text-gray-500">Added By: {userEmail}</h2>
      </div>

      {/* Comment Box (only for owner) */}
      <div className="mt-20 col-span-2 w-full">
        <form className="fieldset">
          <legend className="fieldset-legend">What's on your mind?</legend>
          <textarea
            className="textarea h-24 w-full border rounded p-2"
            placeholder="Input message"
            name="comment"
            required
          ></textarea>

          {user?.email === userEmail ? (
            <button
              className="btn btn-secondary border-amber-400 text-black disabled:opacity-50"
              type="submit"
            >
              Submit
            </button>
          ) : (
            <button
              className="btn btn-secondary border-amber-400 text-black disabled:opacity-50"
              type="submit"
              disabled
            >
              Submit
            </button>
          )}
        </form>
      </div>

      <div className="border-t-amber-300 col-span-2 mt-10 mr-2">
        <h2 className="text-xl font-semibold mb-3">Comments:</h2>
        <div className="comments-list space-y-2"></div>
      </div>
    </div>
  );
};

export default FoodDetails;
