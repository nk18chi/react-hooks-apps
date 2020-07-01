import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("renders", () => {
  test("renders title", () => {
    const { getByText } = render(<App />);
    expect(getByText("World Clock App")).toBeInTheDocument();
  });
});
