import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import AllFoodPage from "../pages/AllFoodPage";
import axios from "axios";

const Fridge = () => {
  const data = useLoaderData();
  const [searchData, setSearchData] = useState(data);

  // fetch expire food (you can use it if needed)
  useEffect(() => {
    axios
      .get("http://localhost:3000/expire-food")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  const filterOptions = [...new Set(data.map((value) => value.category))];

  // filter by category
  const filterCategory = (cat) => {
    if (cat === "All") {
      setSearchData(data);
    } else {
      const result = data.filter((value) => value.category === cat);
      setSearchData(result);
    }
  };

  // search on input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.trim();
    if (!searchValue) {
      setSearchData(data);
      return;
    }

    axios
      .get(`http://localhost:3000/search-stored-food?key=${searchValue}`)
      .then((res) => {
        setSearchData(res.data);
      })
      .catch(() => {
        console.log("internal server error");
      });
  };

  return (
    <div className="px-6">
      <h2 className="text-3xl font-bold pt-20 text-center">All Food Items</h2>

      <div className="grid grid-cols-12 gap-28">
        {/* Sidebar Filters */}
        <div className="col-span-2 space-y-6 p-4">
          {/* Search input */}
          <div>
            <label className="input flex items-center gap-2">
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
              <input
                className="border-none w-full outline-none focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
                onChange={handleSearchChange}
              />
            </label>
          </div>

          {/* Radio buttons for category */}
          <div>
            <label className="label font-bold">Food Category</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value="All"
                  onChange={(e) => filterCategory(e.target.value)}
                />
                All
              </label>
              {filterOptions.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    value={option}
                    onChange={(e) => filterCategory(e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Food list */}
        <div className="col-span-10">
          <div className="grid lg:max-w-7xl py-20 mx-auto md:grid-cols-4 gap-2 lg:grid-cols-4">
            {searchData.map((food) => (
              <AllFoodPage key={food._id} food={food}></AllFoodPage>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fridge;
