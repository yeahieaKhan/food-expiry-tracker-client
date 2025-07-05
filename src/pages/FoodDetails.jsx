import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

const FoodDetails = () => {
  const data = useLoaderData();
  const [comments, setComments] = useState([]);
  const {
    _id,
    category,
    foodtitle,
    imageURL,
    quantity,
    description,
    expiryDate,
  } = data;

  console.log(data);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/foodDetails/${_id}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Error fetching comments", err));
  }, [_id]);

  const HandleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comments.value;
    axios
      .post(`http://localhost:8080/foodDetails/${_id}/comment`, {
        comment,
      })
      .then((res) => {
        console.log(res.data);
      });
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
            name="comment"
          ></textarea>
          <input className="btn btn-secondary" type="submit" />
        </form>
      </div>
      <div className="border-t-amber-300 mt-20 mr-2">
        <h2>Comments:</h2>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
