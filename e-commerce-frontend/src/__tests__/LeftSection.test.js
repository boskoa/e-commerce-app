import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import LeftSection from "../components/Layout/NavBar/LeftSection";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Testing navbar's LeftSection", () => {
  test("renders search input", () => {
    renderWithProviders(
      <BrowserRouter>
        <LeftSection />
      </BrowserRouter>
    );
    const search = screen.getByRole("textbox");
    expect(search).toBeInTheDocument();
  });

  test("can enter search term", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <LeftSection />
      </BrowserRouter>
    );
    const search = screen.getByRole("textbox");
    await user.click(search);
    expect(search).toHaveFocus();
  });
});
