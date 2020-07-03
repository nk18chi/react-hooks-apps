import { TState, TAction } from "../model/timeList.model";

export const timeListReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "ADD":
      return { ...state, timelist: [...state.timelist, action.newTime] };
    case "UPDATE":
      return { ...state, timelist: action.newTimes };
    case "DELETE":
      return { ...state, timelist: state.timelist.filter((_, i: number) => i !== action.index) };
    default:
      return state;
  }
};
