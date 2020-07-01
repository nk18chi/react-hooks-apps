import React, { FC, useState } from "react";
import "./SearchBox.css";

const SearchBox: FC = () => {
  const [searchWord, setSearchWord] = useState("");

  return (
    <>
      <div className='searchBox'>
        <input id='search' type='text' value={searchWord} onChange={(e) => setSearchWord(e.target.value)} placeholder='type country or city name' />
      </div>
      <ul className='auto-complete' data-testid='auto-complete'>
        <li className='link'>Vancouver, Canada</li>
        <li className='link'>Tokyo, Japan</li>
        <li className='not-found'>Not found...</li>
      </ul>
    </>
  );
};

export default SearchBox;
