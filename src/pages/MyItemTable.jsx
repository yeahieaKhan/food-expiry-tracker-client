import React from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router";

const MyItemTable = ({ item, index, handleDelete }) => {
  console.log(item);
  const { _id, category, description, quantity, expiryDate, foodtitle } = item;
  return (
    <>
      <tr
        className={`${
          index % 2 === 0 ? "bg-gray-500  text-white" : "bg-white"
        } hover:bg-[#fb5200]`}
      >
        <th>{index + 1}</th>
        <td>{category}</td>
        <td>{foodtitle}</td>
        <td>{description}</td>
        <td>{quantity}</td>
        <td>{expiryDate}</td>
        <th className="flex gap-2 justify-center items-center">
          <button
            onClick={() => handleDelete(`${item._id}`)}
            className="btn btn-warning"
          >
            <MdDelete />
          </button>
          <Link to={`/updated-item/${_id}`}>
            {" "}
            <button className="btn btn-secondary">
              <MdModeEdit />
            </button>
          </Link>
        </th>
      </tr>
    </>
  );
};

export default MyItemTable;
