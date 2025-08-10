import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeatureItems = () => {
  const slides = [
    {
      src: "https://i.ibb.co.com/pjjxqSGT/h2-product-1-1.png",
      title: "Pasta with Mixed Prawns",
    },
    {
      src: "https://i.ibb.co.com/whMWfLJZ/h2-product-2.png",
      title: "Grilled Chicken with Vegetables",
    },
    {
      src: "https://i.ibb.co.com/ccsrNxtm/h2-product-3-1.png",
      title: "Fresh Garden Salad",
    },
    {
      src: "https://i.ibb.co.com/39XvJs6g/h2-product-4-1.png",
      title: "Cheesy Garlic Bread",
    },
    // duplicates
    {
      src: "https://i.ibb.co.com/pjjxqSGT/h2-product-1-1.png",
      title: "Pasta with Mixed Prawns",
    },
    {
      src: "https://i.ibb.co.com/whMWfLJZ/h2-product-2.png",
      title: "Grilled Chicken with Vegetables",
    },
    {
      src: "https://i.ibb.co.com/ccsrNxtm/h2-product-3-1.png",
      title: "Fresh Garden Salad",
    },
    {
      src: "https://i.ibb.co.com/39XvJs6g/h2-product-4-1.png",
      title: "Cheesy Garlic Bread",
    },
  ];

  // Duplicate slides array to have total 8 slides
  const allSlides = [...slides, ...slides];

  return (
    <div className="max-w-7xl py-20 mx-auto">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        npm
        install
        aos
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper"
      >
        {allSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex items-center w-[300px] bg-white shadow-md rounded-lg p-4 space-x-4"
              data-aos="fade-down"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-24 h-24 object-contain rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{slide.title}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureItems;
