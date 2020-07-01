import React, { FC } from "react";
import "./TimeList.css";

const TimeList: FC = () => {
  return (
    <table className='time-list'>
      <thead>
        <tr>
          <th>City, Country</th>
          <th>Date</th>
          <th>Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Vancouver, Canada</td>
          <td>2020/03/20</td>
          <td>10:00:00</td>
          <td>
            <p className='link'>remove</p>
          </td>
        </tr>
        <tr>
          <td>Vancouver, Canada</td>
          <td>2020/03/20</td>
          <td>10:00:00</td>
          <td>
            <p className='link'>remove</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TimeList;
