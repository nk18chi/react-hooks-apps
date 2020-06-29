import React, { FC, memo } from "react";
import "./Counter.css";
import { TCounter } from "../model/counter.model";

const Counter: FC<TCounter> = memo(({ index, value, dispatch }) => {
  return (
    <div className='counter' data-testid='counter'>
      <button onClick={() => dispatch({ type: "DECREMENT", index })} className='button red' data-testid='decrement-button'>
        -
      </button>
      <div className='number'>{value}</div>
      <button onClick={() => dispatch({ type: "INCREMENT", index })} className='button green' data-testid='increment-button'>
        +
      </button>
      <div onClick={() => dispatch({ type: "DELETE", index })} className='link' data-testid='delete-button'>
        remove
      </div>
      <div onClick={() => dispatch({ type: "RESET", index })} className='link' data-testid='reset-button'>
        reset
      </div>
    </div>
  );
});

export default Counter;
