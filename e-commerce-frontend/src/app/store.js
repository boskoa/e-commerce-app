import { configureStore } from "@reduxjs/toolkit";
import users from "../features/users/usersSlice";
import login from "../features/login/loginSlice";
import announcements from "../features/announcements/announcementsSlice";
import categories from "../features/categories/categoriesSlice";
import popular from "../features/popular/popularSlice";
import products from "../features/products/productsSlice";

const store = configureStore({
  reducer: {
    users,
    login,
    announcements,
    categories,
    popular,
    products,
  },
});

export default store;
