import React, { FC } from "react";
import "./TimeList.css";
import { TTimeList } from "../model/timeList.model";
import Time from "./Time";

const TimeList: FC<TTimeList> = ({ timelist, dispatch }) => {
  return (
    <>
      {timelist.length > 0 && (
        <table className='time-list' data-testid="time-list">
          <thead>
            <tr>
              <th>City, Country</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {timelist.map(({ name, timestamp }, index) => (
              <Time key={index} index={index} name={name} timestamp={timestamp} dispatch={dispatch} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TimeList;
