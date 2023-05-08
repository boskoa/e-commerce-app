import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";

test("renders learn react link", async () => {
  renderWithProviders(<App />);
  const ragsElements = await screen.findAllByText(/rags/i);
  expect(ragsElements.length).not.toBe(0);
});
