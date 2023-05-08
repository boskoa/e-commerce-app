import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import LeftSection from "../components/Layout/NavBar/LeftSection";
import { BrowserRouter } from "react-router-dom";

describe("Testing navbar's LeftSection", () => {
  test("renders search input", async () => {
    renderWithProviders(
      <BrowserRouter>
        <LeftSection />
      </BrowserRouter>
    );
    const search = await screen.findByRole("textbox");
    expect(search).toBeInTheDocument();
  });
});
