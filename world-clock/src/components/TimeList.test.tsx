import React, { useReducer } from "react";
import { render } from "@testing-library/react";
import TimeList from "./TimeList";
import { renderHook } from "@testing-library/react-hooks";
import { TTimeList } from "../model/timeList.model";
import { timeListReducer } from "../reducers";

describe("renders", () => {
  let noProps: TTimeList;
  let setProps: TTimeList;
  beforeAll(() => {
    const { result } = renderHook(() =>
      useReducer(timeListReducer, {
        timelist: [],
      })
    );
    noProps = {
      timelist: [],
      dispatch: result.current[1],
    };
    setProps = {
      timelist: [{ name: "Vancouver, Canada", timestamp: 1593622219 }],
      dispatch: result.current[1],
    };
  });
  test("renders no time list", () => {
    const { queryByTestId, queryByText } = render(<TimeList {...noProps} />);
    expect(queryByTestId("time-list")).toBeNull();
    expect(queryByText("City, Country")).toBeNull();
    expect(queryByText("Time")).toBeNull();
    expect(queryByText("Action")).toBeNull();
  });

  test("renders time list", () => {
    const { getByTestId } = render(<TimeList {...setProps} />);
    expect(getByTestId("time-list"));
  });

  test("renders area name", () => {
    const { getByText } = render(<TimeList {...setProps} />);
    expect(getByText("Vancouver, Canada"));
  });

  test("renders current time", () => {
    const { getByText } = render(<TimeList {...setProps} />);
    expect(getByText("7/1/2020, 4:50:19 PM"));
  });

  test("renders a remove link", () => {
    const { getByText } = render(<TimeList {...setProps} />);
    expect(getByText("remove"));
  });

  test("display time info and header.", () => {
    const { getByText } = render(<TimeList {...setProps} />);
    expect(getByText("City, Country"));
    expect(getByText("Time"));
    expect(getByText("Action"));
  });
});
