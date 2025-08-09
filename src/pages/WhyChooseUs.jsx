import React, { useEffect, useState } from "react";

const WhyChooseUs = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    fetch("choose.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div className="py-20">
      <div className="text-center">
        <p className="font-bold capitalize">Features</p>
        <h2 className="font-black text-5xl">Why people choose us?</h2>
        <p className="mt-6 mb-20">
          Porro eveniet, autem ipsam vitae consequatur!
        </p>
      </div>

      <div className="grid md:grid-cols-3  md:max-w-7xl gap-4 px-5 mx-auto">
        {data.map((choose, index) => (
          <div className="md:max-w-96 mx-auto">
            <div>
              <img src={choose.imageUrl} alt="" />
            </div>
            <div className="text-center">
              <h2 className="font-bold text-2xl py-4">{choose.title}</h2>
              <h2>{choose.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
