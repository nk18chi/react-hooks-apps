import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

describe("renders", () => {
  test("render app component", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("app-component"));
  });

  it("render total number", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("total-number")).toHaveTextContent("0");
  });

  it("render add counter button", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("add-counter-button")).toHaveTextContent("add");
  });

  it("render all reset counter button", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("all-reset-button")).toHaveTextContent("all reset");
  });

  it("render all delete counter button", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("all-delete-button")).toHaveTextContent("all delete");
  });
});

describe("functions", () => {
  it("initial total number is 0", () => {
    const { getByText } = render(<App />);
    getByText("sum: 0");
  });

  it("clicking add button, appear a new counter", () => {
    const { getAllByTestId, getByText, getAllByText } = render(<App />);
    expect(getAllByTestId("counter")).toHaveLength(5);
    fireEvent.click(getByText("add"));
    expect(getAllByTestId("counter")).toHaveLength(6);
    expect(getAllByText("0")).toHaveLength(6);
  });

  it("cannot add counter if there are 10 counters", async () => {
    const { getAllByTestId, getByText, queryByText } = render(<App />);
    fireEvent.click(getByText("add"));
    fireEvent.click(getByText("add"));
    fireEvent.click(getByText("add"));
    fireEvent.click(getByText("add"));
    fireEvent.click(getByText("add"));
    expect(getAllByTestId("counter")).toHaveLength(10);
    fireEvent.click(getByText("add"));
    getByText("Cannot add over 10 counters.");
    expect(getAllByTestId("counter")).toHaveLength(10);
    await act(() => new Promise((r) => setTimeout(r, 3000)));
    expect(queryByText("Cannot add over 10 counters.")).toBeNull();
  });

  it("clicking all reset button, all counters disappear", () => {
    const { getByText, queryAllByText } = render(<App />);
    const plusArray = queryAllByText("+");
    const minusArray = queryAllByText("-");
    fireEvent.click(plusArray[0]);
    fireEvent.click(plusArray[1]);
    fireEvent.click(plusArray[1]);
    fireEvent.click(minusArray[2]);
    fireEvent.click(minusArray[2]);
    fireEvent.click(plusArray[2]); //  [1, 2, -1, 0, 0]
    expect(getByText("sum: 2"));
    fireEvent.click(getByText("all reset")); // [0, 0, 0, 0, 0]
    expect(getByText("sum: 0"));
  });

  it("clicking all delete button, all counters disappear", () => {
    const { queryByTestId, getByText, queryAllByText } = render(<App />);
    const plusArray = queryAllByText("+");
    const minusArray = queryAllByText("-");
    fireEvent.click(plusArray[0]);
    fireEvent.click(plusArray[1]);
    fireEvent.click(plusArray[1]);
    fireEvent.click(minusArray[2]);
    fireEvent.click(minusArray[2]);
    fireEvent.click(plusArray[2]); //  [1, 2, -1, 0, 0]
    expect(getByText("sum: 2"));
    fireEvent.click(getByText("all delete"));
    expect(getByText("sum: 0"));
    expect(queryByTestId("counter")).toBeNull();
  });
});
