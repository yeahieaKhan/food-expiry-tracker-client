import React from "react";
import slider from "../assets/slide-1.jpg";
import slider1 from "../assets/slide-2.jpg";
import slider2 from "../assets/slide-3.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeSlider = () => {
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
      >
        {/* Slide 1 */}
        <div className="relative h-[90vh]">
          <img
            className="h-full w-full object-cover"
            src={slider}
            alt="Slide 1"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30 p-4">
            <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">
              Find Your Best Healthy &amp; Tasty Food.
            </h2>
            <p className="max-w-xl mb-6" data-aos="fade-down">
              It is a long established fact that a reader will be distracted by
              the readable content of a page.
            </p>
            <button className="btn btn-secondary">Discover More</button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[90vh]">
          <img
            className="h-full w-full object-cover"
            src={slider1}
            alt="Slide 2"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30 p-4">
            <h2 className="text-3xl font-bold mb-4">
              Delicious Meals for Every Occasion
            </h2>
            <p className="max-w-xl mb-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page.
            </p>
            <button className="btn btn-secondary">Discover More</button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[90vh]">
          <img
            className="h-full w-full object-cover"
            src={slider2}
            alt="Slide 3"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30 p-4">
            <h2 className="text-3xl font-bold mb-4">
              Fresh Ingredients, Great Taste
            </h2>
            <p className="max-w-xl mb-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page.
            </p>
            <button className="btn btn-secondary" data-aos="fade-down">
              Discover More
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HomeSlider;
