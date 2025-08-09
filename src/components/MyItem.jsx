import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contextApi/AuthContext";
import MyItemTable from "../pages/MyItemTable";
import axios from "axios";
import Swal from "sweetalert2";

const MyItem = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  console.log(user.accessToken);

  useEffect(() => {
    fetch(`http://localhost:3000/my-item?email=${user.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data || []);
      })
      .catch((err) => {
        console.error("Error fetching my items:", err);
      });
  }, [user?.email]);

  // delete item

  const handleDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/item-delete/${id}`)
          .then((res) => {
            console.log("deleted data", res.data);

            if (res.data.deletedCount) {
              const remainingItems = items.filter((item) => item._id !== id);
              setItems(remainingItems);
            }
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log("Delete Failed", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center">My Added Item</h2>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Category</th>
                <th>Food Title</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <MyItemTable
                  key={item._id}
                  item={item}
                  index={index}
                  handleDelete={handleDelete}
                ></MyItemTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyItem;
