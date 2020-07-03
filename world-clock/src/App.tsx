import React, { FC, useReducer, useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import TimeList from "./components/TimeList";
import { timeListReducer } from "./reducers";
import { TState, TArea } from "./model/timeList.model";

const initialState: TState = {
  timelist: [],
};

const App: FC = () => {
  const [{ timelist }, dispatch] = useReducer(timeListReducer, initialState);
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const newTimes: TArea[] = timelist.map(({ name, timestamp }) => ({ name, timestamp: timestamp + 1 }));
      if (newTimes.length > 0) dispatch({ type: "UPDATE", newTimes });
      setDiff((prev) => prev + 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timelist]);

  return (
    <div className='App'>
      <h1>World Clock App</h1>
      <SearchBox diff={diff} dispatch={dispatch} />
      <TimeList timelist={timelist} dispatch={dispatch} />
    </div>
  );
};

export default App;
