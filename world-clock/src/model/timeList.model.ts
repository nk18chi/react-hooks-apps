import { Dispatch } from "react";

export type TState = {
  timelist: TArea[];
};

export type TAction =
  | {
      type: "ADD";
      newTime: TArea;
    }
  | {
      type: "UPDATE";
      newTimes: TArea[];
    }
  | {
      type: "DELETE";
      index: number;
    };

export type TTimeList = {
  timelist: TArea[];
  dispatch: Dispatch<TAction>;
};

export type TTime = {
  index: number;
  name: string;
  timestamp: number;
  dispatch: Dispatch<TAction>;
};

export type TArea = {
  name: string;
  timestamp: number;
};

export type TSeachBox = {
  diff: number;
  dispatch: Dispatch<TAction>;
};
