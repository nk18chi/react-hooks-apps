import { Dispatch } from "react";

export type TState = {
  counters: number[];
  message: String;
};

export type TAction =
  | {
      type: "INCREMENT" | "DECREMENT" | "DELETE" | "RESET";
      index: number;
    }
  | {
      type: "ADD" | "ALL_RESET" | "ALL_DELETE" | "ERASE_MESSAGE";
    };

export type TCounter = {
  index: number;
  value: number;
  dispatch: Dispatch<TAction>;
};

export type TUseCounter = {
  sum: number;
  counters: number[];
  message: String;
  dispatch: Dispatch<TAction>;
};

export type TUseCounterFunc = {
  (): TUseCounter;
};
