import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaCalendarTimes,
  FaTrophy,
  FaRegSmileBeam,
  FaBell,
} from "react-icons/fa";

const CounterUpFood = ({ data }) => {
  const [dateExpire, setDateExpire] = useState([]);

  // Count of nearly expired items
  const neirlyExpire = data.length;

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true, // animation only once on scroll
      mirror: false,
    });

    // Fetch expired items count
    axios
      .get("http://localhost:3000/expire-food")
      .then((res) => {
        setDateExpire(res.data);
      })
      .catch((error) => {
        console.log("Something went wrong:", error);
      });
  }, []);

  // Animation types for each card (can be customized)
  const animationTypes = ["fade-up", "fade-down", "fade-left", "fade-right"];

  const counterData = [
    {
      icon: <FaBell className="text-4xl text-indigo-500" />,
      end: neirlyExpire,
      label: "Nearly Expired",
    },
    {
      icon: <FaCalendarTimes className="text-4xl text-indigo-500" />,
      end: dateExpire.length,
      label: "Expired Items",
    },
    {
      icon: <FaRegSmileBeam className="text-4xl text-green-500" />,
      end: 100,
      label: "Positive Feedback",
      suffix: "%",
    },
    {
      icon: <FaTrophy className="text-4xl text-yellow-500" />,
      end: 40,
      label: "Awards and Honors",
      suffix: "+",
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <h2 className="text-center font-extrabold text-4xl text-gray-800 mb-10">
        Our Achievements
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {counterData.map((item, index) => (
            <div
              key={index}
              data-aos={animationTypes[index % animationTypes.length]} // rotate animations
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center transform hover:scale-105"
            >
              <div className="mb-4">{item.icon}</div>
              <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-1">
                <CountUp end={item.end} duration={4} enableScrollSpy />
                {item.suffix}
              </div>
              <p className="text-gray-500 text-lg sm:text-xl font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterUpFood;
