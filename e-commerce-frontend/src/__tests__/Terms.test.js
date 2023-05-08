import { render, screen } from "@testing-library/react";
import Terms from "../components/Terms";

describe("Testing Terms component", () => {
  test("renders terms of service", () => {
    render(<Terms />);
    const element1 = screen.getByText(/terms of service/i);
    const element2 = screen.getByText(/responsible/i);
    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
  });

  test("have correct styling", () => {});
});
