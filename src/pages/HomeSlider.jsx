import React from "react";

const HomeSlider = () => {
  return (
    <div>
      <div className="carousel w-full relative">
        <div id="item1" className="carousel-item w-full ">
          <img
            src="https://i.ibb.co/gM1H6qCQ/eaters-collective-dd-ZYOt-ZUn-Bk-unsplash-1.jpg"
            className="w-full"
          />
        </div>
        <div id="item2" className="carousel-item w-full relative">
          <img
            src="https://i.ibb.co/SDB9ygCY/amadeus-moga-H5-Z8wov-S9ic-unsplash-1.jpg"
            className="w-full"
          />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            src="https://i.ibb.co/672Sghwq/haseeb-jamil-J9l-D6-FS6-cs-unsplash-1.jpg"
            className="w-full"
          />
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
