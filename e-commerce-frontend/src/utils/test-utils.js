import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import users from "../features/users/usersSlice";
import login from "../features/login/loginSlice";
import announcements from "../features/announcements/announcementsSlice";
import categories from "../features/categories/categoriesSlice";
import popular from "../features/popular/popularSlice";
import products from "../features/products/productsSlice";
import orderedProducts from "../features/orderedProducts/orderedProductsSlice";
import orders from "../features/orders/ordersSlice";
import likedProducts from "../features/likedProducts/likedProductsSlice";
import { ThemeProvider } from "styled-components";
import { light } from "../themes";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        users,
        login,
        announcements,
        categories,
        popular,
        products,
        orderedProducts,
        orders,
        likedProducts,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <ThemeProvider theme={light}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
