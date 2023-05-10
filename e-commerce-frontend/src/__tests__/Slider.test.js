import { render, screen } from "@testing-library/react";
import Slider from "../features/products/Slider";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { light } from "../themes";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const mockStore = configureStore([]);

describe("Testing Slider component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      products: {
        latest: [
          {
            id: 16,
            title: "Skirt",
            description: "Plain, long skirt.",
            sizes: ["S", "M", "L"],
            colors: ["beige", "red", "blue"],
            price: "36.00",
            inStock: true,
            createdAt: "2023-05-06T15:03:20.000Z",
            updatedAt: "2023-05-06T15:03:20.000Z",
          },
          {
            id: 15,
            title: "Sombrero",
            description: "For real men.",
            sizes: ["M", "L", "XL"],
            colors: ["yellow", "black"],
            price: "25.00",
            inStock: true,
            createdAt: "2023-05-06T15:02:20.602Z",
            updatedAt: "2023-05-06T15:02:20.602Z",
          },
          {
            id: 14,
            title: "Fancy shirt with a bow tie",
            description:
              "Same as plain shirt, but more expensive. Wrap yourself like a gift.",
            sizes: ["S", "M", "L", "XL"],
            colors: ["blue", "red", "green"],
            price: "62.25",
            inStock: true,
            createdAt: "2023-05-06T15:01:04.967Z",
            updatedAt: "2023-05-06T15:01:04.967Z",
          },
          {
            id: 13,
            title: "Cap",
            description: "Good for wooden pole's hydro-isolation.",
            sizes: ["M", "L"],
            colors: ["grey", "blue", "red"],
            price: "15.00",
            inStock: true,
            createdAt: "2023-05-06T14:59:37.649Z",
            updatedAt: "2023-05-06T14:59:37.649Z",
          },
          {
            id: 12,
            title: "Straw hat",
            description: "Ćila-protecting.",
            sizes: ["S", "M", "L"],
            colors: ["yellow"],
            price: "20.00",
            inStock: true,
            createdAt: "2023-05-06T14:57:29.147Z",
            updatedAt: "2023-05-06T14:57:29.147Z",
          },
          {
            id: 11,
            title: "Shirt with a tie",
            description: "Elegant shirt with a matching tie.",
            sizes: ["S", "M", "L"],
            colors: ["purple", "blue"],
            price: "55.99",
            inStock: true,
            createdAt: "2023-05-06T14:50:50.158Z",
            updatedAt: "2023-05-06T14:50:50.158Z",
          },
        ],
      },
      loading: false,
    });
  });

  test("renders All products button", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={light}>
            <Slider />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
    const allProductsButton = screen.getByRole("button", {
      name: "All products",
    });
    expect(allProductsButton).toBeInTheDocument();
  });

  test("renders first product", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={light}>
            <Slider />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const title = screen.getByRole("heading", { name: "Skirt" });
    expect(title).toBeInTheDocument();
  });

  test("can click on next button", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={light}>
            <Slider />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const next = screen.getByTestId("ArrowRightOutlinedIcon");
    expect(next).toBeInTheDocument();
    await act(() => user.click(next));
    const title = screen.getByRole("heading", { name: "Sombrero" });
    expect(title).toBeInTheDocument();
  });

  test("can click on previous button", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={light}>
            <Slider />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const prev = screen.getByTestId("ArrowLeftOutlinedIcon");
    expect(prev).toBeInTheDocument();
    await act(() => user.click(prev));
    const title = screen.getByRole("heading", { name: "Shirt with a tie" });
    expect(title).toBeInTheDocument();
  });

  test("loads products", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={light}>
            <Slider />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    const spinner = screen.queryByTestId("spinner");
    expect(spinner).toBe(null);
  });
});
