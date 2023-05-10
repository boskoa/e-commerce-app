import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { light } from "../themes";
import AdminPanel from "../components/AdminPanel";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Testing AdminPanel", () => {
  test("doesn't render if user is not admin", () => {
    const store = mockStore({
      login: {
        user: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJvYmxvIiwiaWF0IjoxNjgzNzQ5ODgxfQ.K2KKq6m7rGTcpj7fzTniYJlXW0nyp83TOu9kCMWkOhI",
          id: 2,
          name: "Oblo",
          username: "oblo",
          email: "oblo@example.com",
          address: "Zan 12, 21098 Zi, Bar",
          admin: false,
        },
        loading: false,
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={light}>
            <AdminPanel />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const message = screen.getByText("You are not authorized");
    expect(message).toBeInTheDocument();
  });

  test("renders if user is admin", () => {
    const store = mockStore({
      login: {
        user: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJrb2NrbyIsImlhdCI6MTY4MzQwMTczMX0.S0plDStDe5C-LcWx1l5i8302VzEoFS3GJDAZFCf1GxM",
          id: 1,
          name: "Kocko",
          username: "kocko",
          email: "kocko@example.com",
          address: "Street 23, 23123 City, Country",
          admin: true,
        },
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={light}>
            <AdminPanel />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const message = screen.getByText("products");
    expect(message).toBeInTheDocument();
  });
});
