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
import ShoppingBag from "./features/orderedProducts/Cart/ShoppingBag";
import Completion from "./features/orders/Checkout/Completion";

const ProductList = lazy(() => import("./features/products/ProductList"));
const SingleProduct = lazy(() => import("./features/products/SingleProduct"));
const Register = lazy(() => import("./features/users/Register"));
const Login = lazy(() => import("./features/login/Login"));
const Cart = lazy(() => import("./features/orderedProducts/Cart"));
const Checkout = lazy(() => import("./features/orders/Checkout"));
const UsersOrders = lazy(() => import("./features/orders/UsersOrders"));
const UserSettings = lazy(() => import("./features/users/UserSettings"));
const Wishlist = lazy(() => import("./features/orderedProducts/Cart/Wishlist"));
const CategoryProducts = lazy(() =>
  import("./features/categories/CategoryProducts")
);
const SearchedProducts = lazy(() =>
  import("./features/products/SearchedProducts")
);
const Terms = lazy(() => import("./components/Terms"));

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
          children: [
            {
              index: true,
              element: <ShoppingBag />,
            },
            {
              path: "wishlist",
              element: (
                <Suspense fallback={<Spinner />}>
                  <Wishlist />
                </Suspense>
              ),
            },
          ],
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
        {
          path: "orders/:id",
          element: (
            <Suspense fallback={<Spinner />}>
              <Checkout />
            </Suspense>
          ),
        },
        {
          path: "completion",
          element: <Completion />,
        },
        {
          path: "users-orders",
          element: (
            <Suspense fallback={<Spinner />}>
              <UsersOrders />
            </Suspense>
          ),
        },
        {
          path: "user-settings",
          element: (
            <Suspense fallback={<Spinner />}>
              <UserSettings />
            </Suspense>
          ),
        },
        {
          path: "category-products/:category",
          element: (
            <Suspense fallback={<Spinner />}>
              <CategoryProducts />
            </Suspense>
          ),
        },
        {
          path: "searched-products/:title",
          element: (
            <Suspense fallback={<Spinner />}>
              <SearchedProducts />
            </Suspense>
          ),
        },
        {
          path: "terms",
          element: (
            <Suspense fallback={<Spinner />}>
              <Terms />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedECommerceAppUser");
    if (loggedUser) {
      dispatch(alreadyLogged(JSON.parse(loggedUser)));
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
