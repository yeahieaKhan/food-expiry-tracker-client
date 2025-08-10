import React from "react";
import { useLoaderData } from "react-router";
import FoodExpiryDate from "../pages/FoodExpiryDate";
import HomeSlider from "../pages/HomeSlider";
import CounterUpFood from "./CounterUpFood";
import WhyChooseUs from "../pages/WhyChooseUs";
import FeatureItems from "../pages/FeatureItems";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <HomeSlider></HomeSlider>
      <FeatureItems></FeatureItems>
      <div>
        <h2 className="text-3xl font-bold pt-20 text-center">
          Upcoming Expiriy date
        </h2>
        <div className="grid md:w-7xl  mx-auto  py-20 md:grid-cols-3">
          {data?.map((food) => (
            <FoodExpiryDate key={food._id} food={food}></FoodExpiryDate>
          ))}
        </div>
      </div>

      <div>
        <CounterUpFood data={data}></CounterUpFood>
      </div>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
