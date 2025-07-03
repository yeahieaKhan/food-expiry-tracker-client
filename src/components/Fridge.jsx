import React from "react";
import { useLoaderData } from "react-router";
import AllFoodPage from "../pages/AllFoodPage";

const Fridge = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <h2 className="text-3xl font-bold pt-20 text-center">All Food Items</h2>
      <div className="grid md:w-7xl py-20 mx-auto md:grid-cols-3">
        {data.map((food) => (
          <AllFoodPage key={food._id} food={food}></AllFoodPage>
        ))}
      </div>
    </div>
  );
};

export default Fridge;
