import React from "react";
import { useLoaderData } from "react-router";

const FoodDetails = () => {
  const data = useLoaderData();
  console.log(data);
  const { category, foodtitle, imageURL, quantity, description, expiryDate } =
    data;
  return (
    <div className="w-8/12 mx-auto grid grid-cols-2">
      <div>
        <img src={imageURL} alt="" />
      </div>
      <div>
        <div>
          <h2>Category : {category}</h2>
          <h2> Food Title: {foodtitle}</h2>
          <h2>Quantity : {quantity}</h2>
          <h2>Expiry Date : {expiryDate}</h2>
          <h2>Description : {description}</h2>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
