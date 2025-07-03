import React from "react";
import { useLoaderData } from "react-router";
import AllFoodPage from "../pages/AllFoodPage";

const Fridge = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-3">
        {data.map((food) => (
          <AllFoodPage key={food._id} food={food}></AllFoodPage>
        ))}
      </div>
    </div>
  );
};

export default Fridge;
