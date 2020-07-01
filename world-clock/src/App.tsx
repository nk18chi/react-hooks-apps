import React, { FC } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import TimeList from "./components/TimeList";

const App: FC = () => {
  return (
    <div className='App'>
      <h1>World Clock App</h1>
      <SearchBox />
      <TimeList />
    </div>
  );
};

export default App;
