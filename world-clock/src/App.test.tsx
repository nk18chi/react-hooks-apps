import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import App from "./App";

describe("renders", () => {
  test("renders title", () => {
    const { getByText } = render(<App />);
    expect(getByText("World Clock App")).toBeInTheDocument();
  });
});

describe("functions", () => {
  test("able to add a time list", () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<App />);
    const input = getByPlaceholderText("type country or city name");
    fireEvent.change(input, { target: { value: "canada" } });
    fireEvent.click(getByText("Vancouver, Canada"));
    getByRole("cell", { name: "Vancouver, Canada" });
  });
  test("able to remove a time list", () => {
    const { getByPlaceholderText, getByText, queryByRole } = render(<App />);
    const input = getByPlaceholderText("type country or city name");
    fireEvent.change(input, { target: { value: "canada" } });
    fireEvent.click(getByText("Vancouver, Canada"));
    fireEvent.click(getByText("remove"));
    expect(queryByRole("cell", { name: "Vancouver, Canada" })).toBeNull();
  });
  test("update the local time by each seconds", async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<App />);
    const input = getByPlaceholderText("type country or city name");
    fireEvent.change(input, { target: { value: "canada" } });
    fireEvent.click(getByText("Vancouver, Canada"));
    getByRole("cell", { name: "7/1/2020, 4:50:19 PM" });
    await act(() => new Promise((r) => setTimeout(r, 3000)));
    getByRole("cell", { name: "7/1/2020, 4:50:22 PM" });
  });
});
