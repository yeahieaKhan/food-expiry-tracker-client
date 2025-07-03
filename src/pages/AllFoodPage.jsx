import React from "react";
import { Link } from "react-router";

const AllFoodPage = ({ food }) => {
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
    <div>
      <div className="card  bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={imageURL} alt="Shoes" />
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">{foodtitle}</h2>
            <h2 className="card-title">{category}</h2>
          </div>
          <h2>Expiry Date : {expiryDate}</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-secondary">
              <Link to={`/foodDetails/${_id}`}>View Details</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFoodPage;
