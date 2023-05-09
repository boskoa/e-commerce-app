import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Categories from "../features/categories/Categories";
import { Provider } from "react-redux";

const mockStore = configureStore([]);

describe("Testing Categories component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      categories: {
        ids: [6, 19, 4, 17, 2, 9, 3, 8, 7, 13, 5],
        entities: {
          2: {
            id: 2,
            name: "shirts",
            created_at: "2023-05-04T22:28:00.070Z",
            updated_at: "2023-05-06T14:21:49.584Z",
            products_count: "8",
          },
          3: {
            id: 3,
            name: "socks",
            created_at: "2023-05-04T23:28:23.113Z",
            updated_at: "2023-05-04T23:28:23.113Z",
            products_count: "3",
          },
          4: {
            id: 4,
            name: "hats",
            created_at: "2023-05-04T23:28:31.139Z",
            updated_at: "2023-05-04T23:28:31.139Z",
            products_count: "3",
          },
          5: {
            id: 5,
            name: "wool",
            created_at: "2023-05-04T23:28:39.414Z",
            updated_at: "2023-05-04T23:28:39.414Z",
            products_count: "2",
          },
          6: {
            id: 6,
            name: "gifts",
            created_at: "2023-05-04T23:28:50.170Z",
            updated_at: "2023-05-04T23:28:50.170Z",
            products_count: "7",
          },
          7: {
            id: 7,
            name: "underwear",
            created_at: "2023-05-04T23:29:01.052Z",
            updated_at: "2023-05-04T23:29:01.052Z",
            products_count: "1",
          },
          8: {
            id: 8,
            name: "sports",
            created_at: "2023-05-04T23:29:10.961Z",
            updated_at: "2023-05-04T23:29:10.961Z",
            products_count: "1",
          },
          9: {
            id: 9,
            name: "skirts",
            created_at: "2023-05-04T23:29:41.749Z",
            updated_at: "2023-05-04T23:29:41.749Z",
            products_count: "1",
          },
          13: {
            id: 13,
            name: "women",
            created_at: "2023-05-04T23:37:36.310Z",
            updated_at: "2023-05-04T23:37:36.310Z",
            products_count: "6",
          },
          17: {
            id: 17,
            name: "men",
            created_at: "2023-05-06T14:29:15.823Z",
            updated_at: "2023-05-06T14:29:15.823Z",
            products_count: "10",
          },
          19: {
            id: 19,
            name: "gloves",
            created_at: "2023-05-06T15:17:39.160Z",
            updated_at: "2023-05-06T15:17:39.160Z",
            products_count: "0",
          },
        },
        loading: false,
        error: null,
      },
    });
  });

  test("renders component", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Categories />
        </BrowserRouter>
      </Provider>
    );
    const title = await screen.findByRole("heading", { name: "shirts" });
    expect(title).toBeInTheDocument();
  });

  test("renders expand icon", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Categories />
        </BrowserRouter>
      </Provider>
    );
    const icon = screen.getByTestId("KeyboardArrowDownIcon");
    expect(icon).toBeInTheDocument();
  });

  test("renders contract icon", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Categories />
        </BrowserRouter>
      </Provider>
    );

    const beforeIcon = screen.getByTestId("KeyboardArrowDownIcon");
    await act(async () => await user.click(beforeIcon));
    const afterIcon = screen.getByTestId("KeyboardArrowUpIcon");
    expect(afterIcon).toBeInTheDocument();
  });
});
