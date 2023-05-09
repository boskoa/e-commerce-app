import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../utils/test-utils";
import PopularProducts from "../features/popular/PopularProducts";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Testing PopularProducts component", () => {
  test("renders title", () => {
    renderWithProviders(
      <BrowserRouter>
        <PopularProducts />
      </BrowserRouter>
    );
    const title = screen.getByRole("heading", { name: "Popular products" });
    expect(title).toBeInTheDocument();
  });

  test("renders expand icon", () => {
    renderWithProviders(
      <BrowserRouter>
        <PopularProducts />
      </BrowserRouter>
    );
    const icon = screen.getByTestId("KeyboardArrowDownIcon");
    expect(icon).toBeInTheDocument();
  });

  test("renders contract icon", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <BrowserRouter>
        <PopularProducts />
      </BrowserRouter>
    );

    const beforeIcon = screen.getByTestId("KeyboardArrowDownIcon");
    await act(async () => await user.click(beforeIcon));
    const afterIcon = screen.getByTestId("KeyboardArrowUpIcon");
    expect(afterIcon).toBeInTheDocument();
  });
});
