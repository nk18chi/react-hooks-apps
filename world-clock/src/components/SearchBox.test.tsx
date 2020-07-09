import React, { useReducer } from "react";
import { render, fireEvent, wait, waitForElementToBeRemoved } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import SearchBox from "./SearchBox";
import { TSeachBox } from "../model/timeList.model";
import { timeListReducer } from "../reducers";
import TestRenderer from "react-test-renderer";
import { successData, errorData } from "../test/timezonedbTestData";
import mockAxios from "../__mocks__/axios";
import { getList } from "../api/timezonedb";

jest.mock("axios");

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
    mockAxios.get.mockResolvedValue(successData);
  });

  test("renders search box", async () => {
    const { getByRole } = render(<SearchBox {...props} />);
    await wait(() => expect(getByRole("textbox")).toBeInTheDocument()).catch((e) => console.log(e));
  });
  test("renders place holder on the search box", async () => {
    const { getByPlaceholderText } = render(<SearchBox {...props} />);
    await wait(() => expect(getByPlaceholderText("type country or city name")));
  });
  test("renders no auto complete lists", async () => {
    const { queryByTestId } = render(<SearchBox {...props} />);
    await wait(() => expect(queryByTestId("auto-complete")).toBeNull());
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
    mockAxios.get.mockResolvedValue(successData);
  });
  test("type search words in the search box", async () => {
    const { getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    expect(input.value).toBe("");
    await wait(() => fireEvent.change(input, { target: { value: "canada" } }));
    expect(input.value).toBe("canada");
  });
  test("change search word", async () => {
    const { getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    await wait(() => fireEvent.change(input, { target: { value: "canada" } }));
    expect(input.value).toBe("canada");
    await wait(() => fireEvent.change(input, { target: { value: "japan" } }));
    expect(input.value).toBe("japan");
  });
  test("show auto completes", async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    await wait(() => fireEvent.change(input, { target: { value: "a" } }));
    expect(getByTestId("auto-complete")).toBeInTheDocument();
    expect(getByText("Vancouver, Canada")).toBeInTheDocument();
  });
  test("show a not-found message if the word is not matching anything", async () => {
    const { getByText, getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    await wait(() => fireEvent.change(input, { target: { value: "vafovbaefnap" } }));
    expect(getByText("Not found...")).toBeInTheDocument();
  });
  test("undisplay auto-complete after clicking", async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    await wait(() => fireEvent.change(input, { target: { value: "a" } }));
    expect(getByTestId("auto-complete")).toHaveStyle(`display: block`);
    const { act } = TestRenderer;
    await act(async () => {
      fireEvent.click(getByText("Vancouver, Canada"));
    });
    expect(getByTestId("auto-complete")).toHaveStyle(`display: none`);
  });
  test("remove loading message after fetching data", async () => {
    const { getByText, getByPlaceholderText } = render(<SearchBox {...props} />);
    const input = getByPlaceholderText("type country or city name");
    fireEvent.change(input, { target: { value: "a" } });
    await waitForElementToBeRemoved(() => expect(getByText("Loading...")));
  });
});
