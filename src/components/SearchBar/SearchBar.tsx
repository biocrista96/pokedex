import React, { useEffect, useState } from "react";
import Select, { SelectListType } from "../Select/Select";
import { getSelectList } from "../../services/api";
import { pokeResponseType, pokelistResponseType } from "../../utils/types";
import styles from "./SearchBar.module.scss";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../../hooks/useDebounce";

interface SearchBarProps {
  onSelect: (selectedValue: SelectListType) => void;
  onSecondSelect: (selectedValue: SelectListType) => void;
  onSearchAllHandle: (name: string) => void;
  onSearchByHandle: (name: string) => void;
  onCleanSearchHandle: () => void;
}

const selectFilter = [
  {
    name: "All pokemon's",
    value: "pokemon",
  },
  {
    name: "Ability",
    value: "ability",
  },
  {
    name: "Type",
    value: "type",
  },
  {
    name: "Habitat",
    value: "pokemon-habitat",
  },
  {
    name: "Generation",
    value: "generation",
  },
];

const SearchBar: React.FC<SearchBarProps> = ({
  onSelect,
  onSecondSelect,
  onSearchAllHandle,
  onSearchByHandle,
  onCleanSearchHandle,
}) => {
  const [selected, setSelected] = useState<SelectListType>(selectFilter[0]);
  const [secondSelect, setSecondSelect] = useState<SelectListType[]>([]);
  const [secondSelected, setSecondSelected] = useState<SelectListType | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");

  const delay = 800;

  const debouncedInputValue = useDebounce(inputValue, delay);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleGetSelectList = async () => {
    try {
      const response = (await getSelectList(
        selected.value
      )) as pokelistResponseType;
      let newList: SelectListType[] = [];
      response.results.map((result) => {
        newList.push(parseSelectList(result));
      });
      setSecondSelect(newList);
    } catch {}
  };

  const handleSelect = (selectedValue: SelectListType) => {
    if (selectedValue.value === "pokemon") {
      onSelect(selectedValue);
      setSecondSelect([]);
    } else {
      onSelect(selectedValue);
    }
    setSelected(selectedValue);
  };

  const handleSecondSelect = (selectedValue: SelectListType) => {
    onSecondSelect(selectedValue);
    setSecondSelected(selectedValue);
  };

  const parseSelectList = (value: pokeResponseType) => {
    let spliceValue = value.url.split("v2/");
    let newValue = {
      name: capitalizeFirstLetter(value.name),
      value: spliceValue[1],
    };

    return newValue;
  };

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    if (selected.value !== "pokemon") {
      handleGetSelectList();
    }
  }, [selected]);

  useEffect(() => {
    if (inputValue.length !== 0) {
      if (secondSelect.length === 0) {
        onSearchAllHandle(inputValue);
      } else {
        onSearchByHandle(inputValue);
      }
    } else {
      onCleanSearchHandle();
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    setSecondSelected(null);
  }, [selected]);

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.selectGroup}>
        <Select
          list={selectFilter}
          selected={selected}
          handleSelect={handleSelect}
          width="65%"
        />
        {secondSelect.length !== 0 && (
          <Select
            list={secondSelect}
            selected={secondSelected}
            handleSelect={handleSecondSelect}
            width="65%"
          />
        )}
      </div>
      <div className={styles.inputGroup}>
        <FaSearch className={styles.icon} />
        <input
          className={styles.searchInput}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Pokemon Name..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
