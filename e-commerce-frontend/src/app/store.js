import { configureStore } from "@reduxjs/toolkit";
import users from "../features/users/usersSlice";
import login from "../features/login/loginSlice";
import announcements from "../features/announcements/announcementsSlice";

const store = configureStore({
  reducer: {
    users,
    login,
    announcements,
  },
});

export default store;
