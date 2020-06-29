import { useState, useEffect, useReducer } from "react";
import { TState } from "../model/counter.model";
import { countReducer } from "../reducers";
import { TUseCounterFunc } from "../model/counter.model";

const initialState: TState = {
  counters: [0, 0, 0, 0, 0],
  message: "",
};

export const useCounter: TUseCounterFunc = () => {
  const [sum, setSum] = useState<number>(0);
  const [{ counters, message }, dispatch] = useReducer(countReducer, initialState);

  useEffect(() => {
    setSum(counters.reduce((a: number, b: number) => a + b, 0));
  }, [counters]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch({ type: "ERASE_MESSAGE" });
    }, 3000);
    return () => clearTimeout(timerId);
  }, [message]);

  return { sum, counters, message, dispatch };
};
