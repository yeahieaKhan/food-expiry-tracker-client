import React from "react";
import { useLoaderData } from "react-router";
import FoodExpiryDate from "../pages/FoodExpiryDate";
import HomeSlider from "../pages/HomeSlider";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <HomeSlider></HomeSlider>
      <div>
        <h2 className="text-3xl font-bold pt-20 text-center">
          Upcoming Expiriy date
        </h2>
        <div className="grid md:w-7xl py-20 mx-auto md:grid-cols-3">
          {data?.map((food) => (
            <FoodExpiryDate key={food._id} food={food}></FoodExpiryDate>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
