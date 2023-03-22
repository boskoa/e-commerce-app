import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import { dark, light } from "./themes";
import { alreadyLogged } from "./features/login/loginSlice";
import { getAllAnnouncements } from "./features/announcements/announcementsSlice";
import { getAllCategories } from "./features/categories/categoriesSlice";
import { getAllPopular } from "./features/popular/popularSlice";
import { getLatestProducts } from "./features/products/productsSlice";
import Spinner from "./components/Spinner";

const ProductList = lazy(() => import("./features/products/ProductList"));
const SingleProduct = lazy(() => import("./features/products/SingleProduct"));
const Register = lazy(() => import("./features/users/Register"));
const Login = lazy(() => import("./features/login/Login"));
const Cart = lazy(() => import("./components/Cart"));

function App() {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/register",
      element: (
        <Suspense fallback={<Spinner />}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Spinner />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: <Layout handleTheme={handleTheme} />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "cart/:id",
          element: (
            <Suspense fallback={<Spinner />}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "products/:id",
          element: (
            <Suspense fallback={<Spinner />}>
              <SingleProduct />
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<Spinner />}>
              <ProductList />
            </Suspense>
          ),
          children: [],
        },
      ],
    },
  ]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedECommerceAppUser");
    if (loggedUser) {
      dispatch(alreadyLogged(loggedUser));
    }
  }, [dispatch]);

  useEffect(() => {
    const prevTheme = window.localStorage.getItem("eCommerceTheme");
    setTheme(prevTheme);
  }, []);

  useEffect(() => {
    dispatch(getAllAnnouncements());
    dispatch(getAllCategories());
    dispatch(getAllPopular());
    dispatch(getLatestProducts());
  }, [dispatch]);

  function handleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    window.localStorage.setItem(
      "eCommerceTheme",
      theme === "light" ? "dark" : "light"
    );
  }

  return (
    <div>
      <ThemeProvider theme={theme === "light" ? light : dark}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
