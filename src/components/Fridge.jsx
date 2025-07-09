import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AllFoodPage from "../pages/AllFoodPage";
import axios from "axios";

const Fridge = () => {
  const data = useLoaderData();
  const [filteredData, setFilteredData] = useState(data);
  const [searchData, setSearchData] = useState([]);

  console.log(filteredData);
  console.log(data);

  const filterOptions = [...new Set(data.map((value) => value.category))];
  // const filterOptions = data.map((value) => value.category);

  const filterCategory = (cat) => {
    if (cat == "All") {
      setFilteredData(data);
    } else {
      const result = data.filter((value) => value.category === cat);
      setFilteredData(result);
    }
  };

  // search

  const handleSearch = (e) => {
    e.preventDefault();
    const seach = e.target.search.value;
    axios
      .get(`http://localhost:8080/search-stored-food?key=${seach}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("internal server error");
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold pt-20 text-center">All Food Items</h2>
      <div className="flex items-center justify-around">
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
                type="search"
                name="search"
                required
                placeholder="Search"
              />
              <button className="btn btn-secondary">search</button>
            </form>
          </label>
        </div>
        <div>
          <fieldset className="fieldset  p-4">
            <label className="label">Food Category</label>
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

      <div className="grid md:w-7xl py-20 mx-auto md:grid-cols-3">
        {filteredData.map((food) => (
          <AllFoodPage key={food._id} food={food}></AllFoodPage>
        ))}
      </div>
    </div>
  );
};

export default Fridge;
