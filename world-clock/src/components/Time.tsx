import React, { FC, memo } from "react";
import { TTime } from "../model/timeList.model";

const Time: FC<TTime> = memo(({ index, name, timestamp, dispatch }) => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const ts = new Date(timestamp * 1000 + offset);
  var formatted = ts.toLocaleString();

  return (
    <tr>
      <td>{name}</td>
      <td>{formatted}</td>
      <td>
        <p className='link' onClick={() => dispatch({ type: "DELETE", index: index })}>
          remove
        </p>
      </td>
    </tr>
  );
});

export default Time;
