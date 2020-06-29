import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import Counter from "./Counter";
import { useCounter } from "../hooks/useCounter";
import { TCounter } from "../model/counter.model";
import App from "../App";

afterEach(cleanup);

describe("renders", () => {
  let props: TCounter;
  beforeAll(() => {
    const { result } = renderHook(() => useCounter());
    props = {
      index: 0,
      value: result.current.counters[0],
      dispatch: result.current.dispatch,
    };
  });

  it("render count value and initial value is zero.", () => {
    const { getByText } = render(<Counter {...props} />);
    getByText("0");
  });

  it("render plus button", () => {
    const { getByText } = render(<Counter {...props} />);
    getByText("+");
  });

  it("render minus button", () => {
    const { getByText } = render(<Counter {...props} />);
    getByText("-");
  });

  it("render remove button", () => {
    const { getByText } = render(<Counter {...props} />);
    getByText("remove");
  });

  it("render reset button", () => {
    const { getByText } = render(<Counter {...props} />);
    getByText("reset");
  });
});

describe("functions", () => {
  it("count up value", () => {
    const { getByText, queryAllByText, getAllByText } = render(<App />);
    const array = queryAllByText("+");
    fireEvent.click(array[0]);
    fireEvent.click(array[2]);
    expect(getAllByText("1")).toHaveLength(2);
    expect(getByText("sum: 2"));
  });

  it("count down value", () => {
    const { getByText, queryAllByText, getAllByText } = render(<App />);
    const array = queryAllByText("-");
    fireEvent.click(array[0]);
    fireEvent.click(array[2]);
    expect(getAllByText("-1")).toHaveLength(2);
    expect(getByText("sum: -2"));
  });

  it("remove counter", () => {
    const { getByText, getAllByTestId, queryAllByText } = render(<App />);
    expect(getAllByTestId("counter")).toHaveLength(5);
    const array = queryAllByText("remove");
    fireEvent.click(array[0]);
    fireEvent.click(array[2]);
    expect(getAllByTestId("counter")).toHaveLength(3);
    expect(getByText("sum: 0"));
  });

  it("reset counter", () => {
    const { getByText, queryAllByText } = render(<App />);
    const plusArray = queryAllByText("+");
    const minusArray = queryAllByText("-");
    const resetArray = queryAllByText("reset");
    fireEvent.click(plusArray[0]);
    fireEvent.click(plusArray[1]);
    fireEvent.click(plusArray[1]);
    fireEvent.click(minusArray[2]);
    fireEvent.click(minusArray[2]);
    fireEvent.click(plusArray[2]); //  [1, 2, -1, 0, 0]
    expect(getByText("sum: 2"));
    fireEvent.click(resetArray[2]); // [1, 2, 0, 0, 0]
    expect(getByText("sum: 3"));
  });
});
