import { configureStore } from "@reduxjs/toolkit";
import users from "../features/users/usersSlice";
import login from "../features/login/loginSlice";
import announcements from "../features/announcements/announcementsSlice";
import categories from "../features/categories/categoriesSlice";
import popular from "../features/popular/popularSlice";
import products from "../features/products/productsSlice";
import orderedProducts from "../features/orderedProducts/orderedProductsSlice";
import orders from "../features/orders/ordersSlice";

const store = configureStore({
  reducer: {
    users,
    login,
    announcements,
    categories,
    popular,
    products,
    orderedProducts,
    orders,
  },
});

export default store;
