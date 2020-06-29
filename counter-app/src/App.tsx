import React, { FC } from "react";
import "./App.css";
import Counter from "./components/Counter";
import { useCounter } from "./hooks/useCounter";

const App: FC = () => {
  const { sum, counters, message, dispatch } = useCounter();

  return (
    <div className='app' data-testid='app-component'>
      <p data-testid='total-number'>sum: {sum}</p>
      <button onClick={() => dispatch({ type: "ADD" })} className='main-button' data-testid='add-counter-button'>
        add
      </button>
      <button onClick={() => dispatch({ type: "ALL_RESET" })} className='main-button' data-testid='all-reset-button'>
        all reset
      </button>
      <button onClick={() => dispatch({ type: "ALL_DELETE" })} className='main-button' data-testid='all-delete-button'>
        all delete
      </button>
      <div className='counters'>
        {counters.map((val: number, index: number) => (
          <Counter key={index} index={index} value={val} dispatch={dispatch} data-testid='counter' />
        ))}
      </div>
      <p className='text-red'>{message}</p>
    </div>
  );
};

export default App;
