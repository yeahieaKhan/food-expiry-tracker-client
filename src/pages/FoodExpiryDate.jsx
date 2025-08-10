import React from "react";
import { Link } from "react-router";

const FoodExpiryDate = ({ food }) => {
  const {
    foodtitle,
    imageURL,
    category,
    quantity,
    expiryDate,
    description,
    _id,
  } = food;

  return (
    <div className="max-w-sm w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <figure className="w-full h-48 overflow-hidden">
        <img
          src={imageURL}
          alt={foodtitle}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </figure>

      <div className="p-5 flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <h2
            className="text-xl font-semibold text-gray-900 truncate"
            title={foodtitle}
          >
            {foodtitle}
          </h2>
          <span className="text-sm font-medium text-indigo-600 px-2 py-1 border border-indigo-600 rounded-md whitespace-nowrap">
            {category}
          </span>
        </div>

        <p className="text-sm text-gray-600 font-medium">
          Quantity: <span className="font-semibold">{quantity}</span>
        </p>

        <p className="text-sm text-red-500 font-semibold">
          Expiry Date:{" "}
          <span className="font-normal text-gray-700">{expiryDate}</span>
        </p>

        <p className="text-gray-700 text-sm line-clamp-3">{description}</p>

        <Link
          to={`/foodDetails/${_id}`}
          className="mt-4 inline-block bg-indigo-600 text-white text-center font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FoodExpiryDate;
