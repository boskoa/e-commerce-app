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
const AdminPanel = lazy(() => import("./components/AdminPanel"));
const AdminProducts = lazy(() =>
  import("./components/AdminPanel/AdminProducts")
);
const SingleProductAdmin = lazy(() =>
  import("./components/AdminPanel/AdminProducts/SingleProductAdmin")
);
const ProductData = lazy(() =>
  import("./components/AdminPanel/AdminProducts/SingleProductAdmin/ProductData")
);
const ProductsAdmin = lazy(() =>
  import("./components/AdminPanel/AdminProducts/ProductsAdmin")
);
const ProductsStatistics = lazy(() =>
  import("./components/AdminPanel/AdminProducts/ProductsStatistics")
);
const SingleProductStats = lazy(() =>
  import("./components/AdminPanel/AdminProducts/SingleProductStats")
);
const ProductStatsData = lazy(() =>
  import("./components/AdminPanel/AdminProducts/SingleProductStats/ProductData")
);
const AdminUsers = lazy(() => import("./components/AdminPanel/AdminUsers"));
const UsersAdmin = lazy(() =>
  import("./components/AdminPanel/AdminUsers/UsersAdmin")
);
const SingleUserAdmin = lazy(() =>
  import("./components/AdminPanel/AdminUsers/SingleUserAdmin")
);
const UserData = lazy(() =>
  import("./components/AdminPanel/AdminUsers/SingleUserAdmin/UserData")
);
const UsersStatistics = lazy(() =>
  import("./components/AdminPanel/AdminUsers/UsersStatistics")
);
const SingleUserStats = lazy(() =>
  import("./components/AdminPanel/AdminUsers/SingleUserStats")
);
const UserStatsData = lazy(() =>
  import("./components/AdminPanel/AdminUsers/SingleUserStats/UserData")
);
const AdminAnnouncements = lazy(() =>
  import("./components/AdminPanel/AdminAnnouncements")
);
const AdminCategories = lazy(() =>
  import("./components/AdminPanel/AdminCategories")
);
const NewProduct = lazy(() =>
  import("./components/AdminPanel/AdminProducts/NewProduct")
);

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
        {
          path: ":userId/admin-panel",
          element: (
            <Suspense fallback={<Spinner />}>
              <AdminPanel />
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: (
                <h4 style={{ margin: 10, textAlign: "center", width: "100%" }}>
                  Welcome to Admin page
                </h4>
              ),
            },
            {
              path: "products",
              element: (
                <Suspense>
                  <AdminProducts />
                </Suspense>
              ),
              children: [
                {
                  path: "single",
                  element: (
                    <Suspense>
                      <SingleProductAdmin />
                    </Suspense>
                  ),
                  children: [
                    {
                      path: ":id",
                      element: (
                        <Suspense>
                          <ProductData />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: "all",
                  element: (
                    <Suspense>
                      <ProductsAdmin />
                    </Suspense>
                  ),
                },
                {
                  path: "create",
                  element: (
                    <Suspense>
                      <NewProduct />
                    </Suspense>
                  ),
                },
                {
                  path: "single-stats",
                  element: (
                    <Suspense>
                      <SingleProductStats />
                    </Suspense>
                  ),
                  children: [
                    {
                      path: ":id",
                      element: (
                        <Suspense>
                          <ProductStatsData />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: "statistics",
                  element: (
                    <Suspense>
                      <ProductsStatistics />
                    </Suspense>
                  ),
                },
              ],
            },
            {
              path: "users",
              element: <AdminUsers />,
              children: [
                {
                  path: "single",
                  element: (
                    <Suspense>
                      <SingleUserAdmin />
                    </Suspense>
                  ),
                  children: [
                    {
                      path: ":id",
                      element: (
                        <Suspense>
                          <UserData />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: "all",
                  element: (
                    <Suspense>
                      <UsersAdmin />
                    </Suspense>
                  ),
                },
                {
                  path: "single-stats",
                  element: (
                    <Suspense>
                      <SingleUserStats />
                    </Suspense>
                  ),
                  children: [
                    {
                      path: ":id",
                      element: (
                        <Suspense>
                          <UserStatsData />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: "statistics",
                  element: (
                    <Suspense>
                      <UsersStatistics />
                    </Suspense>
                  ),
                },
              ],
            },
            {
              path: "announcements",
              element: <AdminAnnouncements />,
            },
            {
              path: "categories",
              element: <AdminCategories />,
            },
          ],
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
