import React, { useReducer } from "react";
import { render, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import SearchBox from "./SearchBox";
import { TSeachBox } from "../model/timeList.model";
import { timeListReducer } from "../reducers";
import TestRenderer from "react-test-renderer";

describe("renders", () => {
  let props: TSeachBox;
  beforeAll(() => {
    const { result } = renderHook(() =>
      useReducer(timeListReducer, {
        timelist: [],
      })
    );
    props = {
      diff: 0,
      dispatch: result.current[1],
    };
  });

  test("renders search box", () => {
    const { getByRole } = render(<SearchBox {...props} />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });
  test("renders place holder on the search box", () => {
    const { getByPlaceholderText } = render(<SearchBox {...props} />);
    expect(getByPlaceholderText("type country or city name"));
  });
  test("renders no auto complete lists", () => {
    const { queryByTestId } = render(<SearchBox {...props} />);
    expect(queryByTestId("auto-complete")).toBeNull();
  });
});

describe("functions", () => {
  let props: TSeachBox;
  beforeEach(() => {
    const { result } = renderHook(() =>
      useReducer(timeListReducer, {
        timelist: [],
      })
    );
    props = {
      diff: 0,
      dispatch: result.current[1],
    };
  });

  test("type search words in the search box", () => {
    const { getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "canada" } });
    expect(input.value).toBe("canada");
  });
  test("change search word", () => {
    const { getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    fireEvent.change(input, { target: { value: "canada" } });
    expect(input.value).toBe("canada");
    fireEvent.change(input, { target: { value: "japan" } });
    expect(input.value).toBe("japan");
  });
  test("show auto completes", () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    fireEvent.change(input, { target: { value: "a" } });
    expect(getByTestId("auto-complete")).toBeInTheDocument();
    expect(getByText("Vancouver, Canada")).toBeInTheDocument();
  });
  test("show a not-found message if the word is not matching anything", () => {
    const { getByText, getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    fireEvent.change(input, { target: { value: "vafovbaefnap" } });
    expect(getByText("Not found...")).toBeInTheDocument();
  });
  test("undisplay auto-complete after clicking", async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    fireEvent.change(input, { target: { value: "a" } });
    expect(getByTestId("auto-complete")).toHaveStyle(`display: block`);
    const { act } = TestRenderer;
    await act(async () => {
      fireEvent.click(getByText("Vancouver, Canada"));
    });
    expect(getByTestId("auto-complete")).toHaveStyle(`display: none`);
  });
});
