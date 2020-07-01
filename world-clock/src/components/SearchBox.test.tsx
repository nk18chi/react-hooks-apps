import React from "react";
import { render } from "@testing-library/react";
import SearchBox from "./SearchBox";

describe("renders", () => {
  test("renders search box", () => {
    const { getByRole } = render(<SearchBox />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });
  test("renders place holder on the search box", () => {
    const { getByPlaceholderText } = render(<SearchBox />);
    expect(getByPlaceholderText("type country or city name"));
  });
  test("renders auto complete lists", () => {
    const { getByTestId } = render(<SearchBox />);
    expect(getByTestId("auto-complete")).toBeInTheDocument();
  });
  test("renders not found auto complete", () => {
    const { getByText } = render(<SearchBox />);
    expect(getByText("Not found...")).toBeInTheDocument();
  });
});

describe("functions", () => {
  test.todo("type search words in the search box");
  test.todo("change search words");
  test.todo("show auto completes");
  test.todo("show a not-found message if the word is not matching anything");
  test.todo("able to click an auto complete");
  test.todo("not able to click an not-found message");
});
