import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import { dark, light } from "./themes";

const ProductList = lazy(() => import("./components/ProductList"));
const SingleProduct = lazy(() => import("./components/SingleProduct"));
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const Cart = lazy(() => import("./components/Cart"));

const router = createBrowserRouter([
  {
    path: "/register",
    element: (
      <Suspense fallback="Loading...">
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback="Loading...">
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cart/:id",
        element: (
          <Suspense fallback="Loading">
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "products/:id",
        element: (
          <Suspense fallback="Loading">
            <SingleProduct />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback="Loading">
            <ProductList />
          </Suspense>
        ),
        children: [],
      },
    ],
  },
]);

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const prevTheme = window.localStorage.getItem("eCommerceTheme");
    setTheme(prevTheme);
  }, []);

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
