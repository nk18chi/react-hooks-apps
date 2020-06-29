import { TState, TAction } from "../model/counter.model";

export const countReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "INCREMENT": {
      const newCounters = [...state.counters];
      newCounters[action.index]++;
      return {
        ...state,
        counters: newCounters,
      };
    }
    case "DECREMENT": {
      const newCounters = [...state.counters];
      newCounters[action.index]--;
      return {
        ...state,
        counters: newCounters,
      };
    }
    case "ADD": {
      if (state.counters.length >= 10) {
        return {
          ...state,
          message: "Cannot add over 10 counters.",
        };
      }
      return {
        ...state,
        counters: [...state.counters, 0],
      };
    }
    case "DELETE": {
      return {
        ...state,
        counters: state.counters.filter((_: number, i: number) => i !== action.index),
      };
    }
    case "RESET": {
      const newCounters = [...state.counters];
      newCounters[action.index] = 0;
      return {
        ...state,
        counters: newCounters,
      };
    }
    case "ALL_RESET": {
      const newCounters = state.counters.map(() => 0);
      return {
        ...state,
        counters: newCounters,
      };
    }
    case "ALL_DELETE": {
      return {
        ...state,
        counters: [],
      };
    }
    case "ERASE_MESSAGE": {
      return {
        ...state,
        message: "",
      };
    }
  }
};
