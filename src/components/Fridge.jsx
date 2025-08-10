import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import AllFoodPage from "../pages/AllFoodPage";
import axios from "axios";

const Fridge = () => {
  const data = useLoaderData();
  const [searchData, setSearchData] = useState(data);

  useEffect(() => {
    axios
      .get("http://localhost:3000/expire-food")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  const filterOptions = [...new Set(data.map((value) => value.category))];

  const filterCategory = (cat) => {
    if (cat === "All") {
      setSearchData(data);
    } else {
      const result = data.filter((value) => value.category === cat);
      setSearchData(result);
    }
  };

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

  // inside your Fridge component

  const handleSort = (e) => {
    const sortQuantity = e.target.value;
    let sortedData = [...data];
    if (sortQuantity === "lowToHigh") {
      sortedData.sort((a, b) => a.quantity - b.quantity);
    } else {
      sortedData.sort((a, b) => b.quantity - a.quantity);
    }
    setSearchData(sortedData);
  };

  return (
    <div className="px-4 md:px-6 lg:px-12">
      <h2 className="text-3xl font-bold pt-20 text-center mb-8">
        All Food Items
      </h2>

      <div className="md:flex md:space-x-8">
        {/* Sidebar Filters */}
        <aside
          className="w-full md:w-64 bg-gray-50 rounded-lg p-6 mb-8 md:mb-0 shadow-md"
          aria-label="Filters"
        >
          {/* Search input */}
          <div className="mb-6">
            <label className="block relative">
              <input
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
                onChange={handleSearchChange}
                aria-label="Search food items"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </label>
          </div>

          {/* Category filters */}
          <div className="mb-6">
            <p className="font-semibold mb-3">Food Category</p>
            <div className="flex flex-col space-y-2 max-h-48 overflow-auto">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="All"
                  onChange={(e) => filterCategory(e.target.value)}
                  className="cursor-pointer"
                />
                <span>All</span>
              </label>
              {filterOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={option}
                    onChange={(e) => filterCategory(e.target.value)}
                    className="cursor-pointer"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort by quantity */}
          <div className="mb-6 px-2 ">
            <label
              htmlFor="sortQuantity"
              className="font-semibold mb-2 block text-gray-700"
            >
              Sort By Quantity
            </label>
            <select
              id="sortQuantity"
              className="w-full h-12 px-4 py-2 rounded-md border bg-amber-200 shadow-sm
               text-base sm:text-lg
               focus:ring-2 focus:ring-blue-500 focus:outline-none
               hover:border-blue-400 transition duration-200"
              defaultValue=""
              onChange={handleSort}
            >
              <option className="w-full overflow-hidden" value="" disabled>
                Sort by
              </option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
        </aside>

        {/* Food list */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchData.map((food) => (
              <AllFoodPage key={food._id} food={food} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Fridge;
