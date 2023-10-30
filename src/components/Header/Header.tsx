import { FaList } from "react-icons/fa";
import styles from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { updateSidebar } from "../../store/pokeTeamSlice";

const Header = () => {
  const dispatch = useDispatch();
  const handlebutton = () => {
    dispatch(updateSidebar());
  };

  return (
    <div className={styles.HeaderWrapper}>
      <h1>Pokedex</h1>
      <div className={styles.teamButtonContainer} onClick={handlebutton}>
        <FaList className={styles.TeamButton} />
      </div>
    </div>
  );
};

export default Header;
