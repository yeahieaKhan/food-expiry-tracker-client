import { createBrowserRouter } from "react-router";
import Root from "../RootLayOut/Root";
import Home from "../components/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AddFood from "../components/AddFood";
import FoodDetails from "../pages/FoodDetails";
import Fridge from "../components/Fridge";
import MyItem from "../components/MyItem";
import UpdatedItems from "../pages/UpdatedItems";
import PrivateRouter from "./PrivateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,

        Component: Home,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/fridge",
        loader: () => fetch("http://localhost:8080/all-food"),
        Component: Fridge,
      },
      {
        path: "/add-food",
        element: (
          <PrivateRouter>
            <AddFood></AddFood>
          </PrivateRouter>
        ),
      },
      {
        path: "foodDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:8080/foodDetails/${params.id}`),
        element: (
          <PrivateRouter>
            <FoodDetails></FoodDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "/my-item",
        loader: () => fetch("http://localhost:8080/my-item"),
        Component: MyItem,
      },
      {
        path: "/updated-item/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:8080/foodDetails/${params.id}`),
        Component: UpdatedItems,
      },
    ],
  },
]);
