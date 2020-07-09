import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import App from "./App";
import { successData } from "./test/timezonedbTestData";
import mockAxios from "./__mocks__/axios";

jest.mock("axios");

describe("renders", () => {
  test("renders title", async () => {
    mockAxios.get.mockResolvedValue(successData);
    const { getByText } = render(<App />);
    await wait(() => expect(getByText("World Clock App")).toBeInTheDocument());
  });
});

describe("functions", () => {
  beforeAll(() => {
    mockAxios.get.mockResolvedValue(successData);
  });
  test("able to add a time list", async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<App />);
    const input = getByPlaceholderText("type country or city name");
    await wait(() => fireEvent.change(input, { target: { value: "canada" } }));
    fireEvent.click(getByText("Vancouver, Canada"));
    getByRole("cell", { name: "Vancouver, Canada" });
  });
  test("able to remove a time list", async () => {
    const { getByPlaceholderText, getByText, queryByRole } = render(<App />);
    const input = getByPlaceholderText("type country or city name");
    await wait(() => fireEvent.change(input, { target: { value: "canada" } }));
    fireEvent.click(getByText("Vancouver, Canada"));
    fireEvent.click(getByText("remove"));
    expect(queryByRole("cell", { name: "Vancouver, Canada" })).toBeNull();
  });
  test("update the local time by each seconds", async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<App />);
    const input = getByPlaceholderText("type country or city name");
    await wait(() => fireEvent.change(input, { target: { value: "canada" } }));
    fireEvent.click(getByText("Vancouver, Canada"));
    getByRole("cell", { name: "7/3/2020, 3:29:19 PM" });
    await wait(() => new Promise((r) => setTimeout(r, 3000)));
    getByRole("cell", { name: "7/3/2020, 3:29:22 PM" });
  });
});
