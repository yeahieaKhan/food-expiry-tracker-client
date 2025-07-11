import React from "react";
import slider from "../assets/slide-1.jpg";
import slider1 from "../assets/slide-2.jpg";
import slider2 from "../assets/slide-3.jpg";

const HomeSlider = () => {
  return (
    <div>
      <div className="carousel w-full ">
        <div id="item1" className="carousel-item  w-full">
          <img src={slider} className="w-full h-4/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-white text-4xl font-bold">Hello Bangladesh</h2>
          </div>
        </div>
        <div id="item2" className="carousel-item w-full ">
          <img src={slider1} className="w-full h-4/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-white text-4xl font-bold">Hello Bangladesh</h2>
          </div>
        </div>
        <div id="item3" className="carousel-item w-full relative">
          <img src={slider2} className="w-full h-4/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-white text-4xl font-bold">Hello Bangladesh</h2>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
      </div>
    </div>
  );
};

export default HomeSlider;
