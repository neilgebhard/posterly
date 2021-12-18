import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn reddit link", () => {
  render(<App />);
  const linkElement = screen.getByText(/reddit/i);
  expect(linkElement).toBeInTheDocument();
});
