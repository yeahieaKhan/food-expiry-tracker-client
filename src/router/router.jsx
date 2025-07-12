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
import Loading from "../pages/Loading";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        loader: () =>
          fetch("https://fire-expiry.vercel.app/upcoming-expiry-foods"),
        Component: Home,
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/auth/login",
        Component: Login,
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/auth/register",
        Component: Register,
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/fridge",
        loader: () => fetch("https://fire-expiry.vercel.app/all-food"),
        Component: Fridge,
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/add-food",
        hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRouter>
            <AddFood></AddFood>
          </PrivateRouter>
        ),
      },
      {
        path: "foodDetails/:id",
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({ params }) =>
          fetch(`https://fire-expiry.vercel.app/foodDetails/${params.id}`),

        element: (
          <PrivateRouter>
            <FoodDetails></FoodDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "/my-item",
        hydrateFallbackElement: <Loading></Loading>,
        loader: () => fetch("https://fire-expiry.vercel.app/my-item"),
        Component: MyItem,
      },
      {
        path: "/updated-item/:id",

        loader: ({ params }) =>
          fetch(`https://fire-expiry.vercel.app/foodDetails/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
        Component: UpdatedItems,
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);
