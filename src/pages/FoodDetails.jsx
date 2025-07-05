import React from "react";
import { useLoaderData } from "react-router";

const FoodDetails = () => {
  const data = useLoaderData();
  console.log(data);
  const { category, foodtitle, imageURL, quantity, description, expiryDate } =
    data;

  const HandleComment = (e) => {
    e.preventDefault();
  };
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
      <div className="mt-20 w-full">
        <form className="fieldset" onSubmit={HandleComment}>
          <legend className="fieldset-legend">What is your mind?</legend>
          <textarea
            className="textarea h-24 w-full"
            placeholder="Input message"
          ></textarea>
          <input className="btn btn-secondary" type="submit" />
        </form>
      </div>
      <div className="border-t-amber-300 mt-20 mr-2">
        <h2>hello bangladesh</h2>
      </div>
    </div>
  );
};

export default FoodDetails;
