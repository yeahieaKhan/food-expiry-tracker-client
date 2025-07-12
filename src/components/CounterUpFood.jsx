import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const CounterUpFood = ({ data }) => {
  const [dateExpire, setDateExpire] = useState("");
  //   console.log(data.length);
  const neirlyExpire = data.length;
  console.log(neirlyExpire);
  // const [couterUpFood, setCounterFood] = useState(0);
  // const { expiryDate } = food;

  // const expireFood = new Date(expiryDate) < new Date();
  // console.log(expireFood);

  // useEffect(() => {
  //   const expiredFoods = data.filter(
  //     (count) => new Date(count.expireFood) < new Date()
  //   );
  //   setCounterFood(expiredFoods);
  //   console.log(expiredFoods);
  // }, [data]);

  // console.log(couterUpFood);

  useEffect(() => {
    axios
      .get("https://fire-expiry.vercel.app/expire-food")
      .then((res) => {
        console.log(res.data);
        setDateExpire(res.data);
      })
      .catch((error) => {
        console.log("somethig weng rong");
      });
  }, []);

  return (
    <>
      <h2 className="text-center font-bold text-3xl">Feature Sections</h2>
      <div className="flex items-center gap-5 justify-center">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
          <div className="text-indigo-600 text-4xl mb-3"></div>
          <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">
            <CountUp end={neirlyExpire} duration={5.5} />
          </div>
          <p className="text-gray-600 text-base sm:text-lg">Nearly Expiry</p>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
          <div className="text-indigo-600 text-4xl mb-3"></div>
          <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">
            <CountUp end={dateExpire.length} duration={5.5} />
          </div>
          <p className="text-gray-600 text-base sm:text-lg">Date Expire</p>
        </div>
      </div>
    </>
  );
};

export default CounterUpFood;
