import React, { useCallback, useContext, useState } from 'react';
import styles from './Seach.module.scss';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

const Search = () => {
  const [value, setValue] = useState('');
  const { searchName, setSearchName } = useContext(SearchContext);

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchName(str);
    }, 250),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <input
      value={value}
      onChange={(e) => onChangeInput(e)}
      className={styles.root}
      placeholder="Поиск пиццы..."
    />
  );
};

export default Search;
