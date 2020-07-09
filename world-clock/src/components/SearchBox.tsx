import React, { FC, useState, useEffect } from "react";
import "./SearchBox.css";
import { TArea, TSeachBox } from "../model/timeList.model";
import { getList } from "../api/timezonedb";
import { formatAreaData } from "../utils/formatAreaData";
import { getMatchWords } from "../utils/getMatchWords";

const SearchBox: FC<TSeachBox> = ({ diff, dispatch }) => {
  const [searchWord, setSearchWord] = useState("");
  const [autocompleteList, setAutocompleteList] = useState<TArea[]>([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zonesMap, setZonesMap] = useState<Map<string, TArea[]>>();

  // fetch data from api only once time
  useEffect(() => {
    getList().then((res) => {
      setZonesMap(formatAreaData(res));
    });
  }, []);

  // change autocomplete list by keyword
  useEffect(() => {
    if (!zonesMap) {
      return;
    }
    setLoading(false);
    setShowAutoComplete(true);
    setAutocompleteList(getMatchWords(zonesMap, searchWord));
  }, [searchWord, zonesMap]);

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
        <ul className='auto-complete' data-testid='auto-complete' style={{ display: showAutoComplete || loading ? "block" : "none" }}>
          {loading ? (
            <li className='not-found'>Loading...</li>
          ) : autocompleteList.length ? (
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
