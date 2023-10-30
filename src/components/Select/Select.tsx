import { FaChevronDown } from "react-icons/fa";
import styles from "./Select.module.scss";
import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

export interface SelectListType {
  name: string;
  value: string;
}

interface SelectProps {
  width?: string;
  selected?: SelectListType | null;
  list: SelectListType[];
  handleSelect(selected: SelectListType): void;
}

const Select: React.FC<SelectProps> = ({
  width ,
  selected,
  list,
  handleSelect,
}) => {
  const [showList, setShowList] = useState(false);
  const selectRef = useRef(null);

  const hideList = () => {
    setShowList(!showList);
  };

  useClickOutside(selectRef, () => setShowList(false));

  const handleSelection = (value: SelectListType) => {
    hideList();
    handleSelect(value);
  };

  return (
    <div className={styles.selectWrapper} style={{ width }} ref={selectRef}>
      <div className={styles.header} onClick={hideList}>
        <p>{selected?.name ? selected?.name : "select option..."}</p>
        <FaChevronDown />
      </div>
      {showList && (
        <div className={styles.list}>
          {list.map((item, index) => {
            return (
              item.name !== selected?.name && (
                <div
                  key={item.name + index}
                  className={styles.item}
                  onClick={() => handleSelection(item)}
                >
                  {item.name}
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
