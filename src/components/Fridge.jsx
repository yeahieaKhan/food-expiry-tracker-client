import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import AllFoodPage from "../pages/AllFoodPage";
import axios from "axios";

const Fridge = () => {
  const data = useLoaderData();

  const [searchData, setSearchData] = useState(data);

  useEffect(() => {
    axios
      .get("https://fire-expiry.vercel.app/expire-food")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(searchData);
  console.log(data);

  const filterOptions = [...new Set(data.map((value) => value.category))];

  const filterCategory = (cat) => {
    if (cat == "All") {
      setSearchData(data);
    } else {
      const result = data.filter((value) => value.category === cat);
      setSearchData(result);
    }
  };

  // search

  const handleSearch = (e) => {
    e.preventDefault();
    const seach = e.target.search.value;
    axios
      .get(`https://fire-expiry.vercel.app/search-stored-food?key=${seach}`)
      .then((res) => {
        // console.log(res.data);
        setSearchData(res.data);
      })
      .catch((error) => {
        console.log("internal server error");
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold pt-20 text-center">All Food Items</h2>
      <div className="md:flex items-center justify-around">
        <div>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <form onSubmit={handleSearch}>
              <input
                className="border-none  mx-auto w-full outline-none focus:outline-none "
                type="search"
                name="search"
                required
                placeholder="Search"
              />
              <button className="btn btn-secondary ml-2">Search</button>
            </form>
          </label>
        </div>
        <div>
          <fieldset className="fieldset  p-4">
            <label className="label font-bold">Food Category</label>
            <select
              name="category"
              className="select w-full"
              required
              onChange={(e) => filterCategory(e.target.value)}
            >
              <option disabled selected value="">
                Select a category
              </option>
              <option>All</option>
              {filterOptions.map((options) => (
                <option>{options}</option>
              ))}
            </select>
          </fieldset>
        </div>
      </div>

      <div className="grid lg:w-7xl py-20 mx-auto md:grid-cols-2  lg:grid-cols-3">
        {searchData.map((food) => (
          <AllFoodPage key={food._id} food={food}></AllFoodPage>
        ))}
      </div>
    </div>
  );
};

export default Fridge;
