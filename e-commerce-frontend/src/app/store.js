import { configureStore } from "@reduxjs/toolkit";
import users from "../features/users/usersSlice";
import login from "../features/login/loginSlice";

const store = configureStore({
  reducer: {
    users,
    login,
  },
});

export default store;
