import React, { FC, useState, useEffect } from "react";
import "./SearchBox.css";
import { TArea, TSeachBox } from "../model/timeList.model";

const initialMap: { [key: string]: TArea[] } = {
  vancouver: [{ name: "Vancouver, Canada", timestamp: 1593622219 }],
  toronto: [{ name: "Toronto, Canada", timestamp: 1593633019 }],
  canada: [
    { name: "Vancouver, Canada", timestamp: 1593622219 },
    { name: "Toronto, Canada", timestamp: 1593633019 },
  ],
  tokyo: [{ name: "Tokyo, Japan", timestamp: 1593679819 }],
  japan: [{ name: "Tokyo, Japan", timestamp: 1593679819 }],
};

const areaList: string[] = Object.keys(initialMap);

const SearchBox: FC<TSeachBox> = ({ diff, dispatch }) => {
  const [searchWord, setSearchWord] = useState("");
  const [autocompleteList, setAutocompleteList] = useState<TArea[]>([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);

  useEffect(() => {
    setShowAutoComplete(true);
    const matches: string[] = areaList.filter((area) => area.includes(searchWord));
    let seen: Set<string> = new Set();
    const newList: TArea[] = [];
    for (const match of matches) {
      for (const { name, timestamp } of initialMap[match]) {
        if (seen.has(name)) {
          continue;
        }
        newList.push({ name, timestamp });
        seen.add(name);
      }
    }
    setAutocompleteList(newList);
  }, [searchWord]);

  return (
    <>
      <div className='searchBox'>
        <input
          id='search'
          type='text'
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder='type country or city name'
          autoComplete='off'
        />
      </div>
      {searchWord.length > 0 && (
        <ul className='auto-complete' data-testid='auto-complete' style={{ display: showAutoComplete ? "block" : "none" }}>
          {autocompleteList.length ? (
            <>
              {autocompleteList.map(({ name, timestamp }, index: number) => (
                <li
                  key={index}
                  className='link'
                  onClick={() => {
                    dispatch({ type: "ADD", newTime: { name, timestamp: timestamp + diff } });
                    setShowAutoComplete(false);
                  }}
                >
                  {name}
                </li>
              ))}
            </>
          ) : (
            <li className='not-found'>Not found...</li>
          )}
        </ul>
      )}
    </>
  );
};

export default SearchBox;
