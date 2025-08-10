import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contextApi/AuthContext";
import Countdown from "react-countdown";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  console.log(comments);

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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/foodDetails/${_id}/comments`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((error) => {
        console.log("something went rong");
      });
  }, [_id]);

  // handle commemts
  const handleCoomments = (e) => {
    e.preventDefault();
    const commetsBox = e.target.comment.value;
    console.log(commetsBox);
    console.log(_id);

    fetch(`http://localhost:3000/foodDetails/${_id}/comment`, {
      method: "POST",
      headers: {
        "context-type": "application/json",
      },
      body: JSON.stringify(commetsBox),
    });

    axios
      .post(`http://localhost:3000/foodDetails/${_id}/comment`, {
        comment: commetsBox,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.modifiedCount) {
          const modifiedComments = res.data.modifiedCount;
          console.log(modifiedComments);

          setComments([
            ...comments,
            { text: commetsBox, commentedAt: new Date().toISOString() },
          ]);

          Swal.fire({
            title: "Comment successfully",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  // /foodDetails/:id/comment
  const dateExpire = new Date(expiryDate);
  dateExpire.setDate(dateExpire.getDate() + 1);
  const Completionist = () => (
    <span className="text-red-500 font-bold">
      {" "}
      This food is already Date expire
    </span>
  );

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      return (
        <>
          <div className="flex gap-4 text-center rounded p-2">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{days}</span>
              <span className="text-sm">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{hours}</span>
              <span className="text-sm ">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold ">{minutes}</span>
              <span className="text-sm">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold ">{seconds}</span>
              <span className="text-sm  ">Seconds</span>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="md:w-7xl mx-auto grid px-5 md:px-0 py-20 md:grid-cols-2">
        {/* Food Details */}
        <div>
          <img src={imageURL} className="rounded shadow-lg" />
        </div>

        <div className="mt-10 md:ml-20">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-2">Category: {category}</h2>
          </div>
          <h2 className="text-lg">Food Title: {foodtitle}</h2>
          <h2>Quantity: {quantity}</h2>

          <h2>Expiry Date: {expiryDate}</h2>

          <h2>Description: {description}</h2>
          <span>
            {" "}
            <Countdown date={dateExpire} renderer={renderer} />
          </span>
        </div>
      </div>
      {/* Comment Box (only for owner) */}
      <div className="mt-20 px-4 md:px-30 col-span-2 md:w-1/2">
        <form className="fieldset" onSubmit={handleCoomments}>
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
              className="btn btn-secondary  border-amber-400 text-black disabled:opacity-50"
              type="submit"
              disabled
            >
              Submit
            </button>
          )}
        </form>
      </div>

      <div className="p-4 rounded md:px-30 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-gray-600">No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-300 py-2">
              <p className="text-gray-800">{comment.text}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.commentedAt).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FoodDetails;
