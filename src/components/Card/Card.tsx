import styles from "./Card.module.scss";
import pokeballbg from "../../assets/png/pokeballbg.png";
import { Pokemon } from "../../utils/types";
import { FaGripVertical } from "react-icons/fa6";

interface CardProps {
  info: Pokemon;
  typeColor?: string;
  clickHandler(pokemon: Pokemon): void;
  width?: string;
  height?: string;
  isDraggable?: boolean;
}

const Card: React.FC<CardProps> = ({
  info,
  typeColor,
  clickHandler,
  width,
  height,
  isDraggable,
}) => {
  return (
    <div
      className={styles.cardWrapper}
      style={{ backgroundColor: typeColor, width, height }}
      onClick={() => clickHandler(info)}
    >
      {isDraggable && (
        <div className={styles.draggable}>
          <div className={styles.dragIcon}>
            <FaGripVertical />
          </div>
        </div>
      )}
      <img
        className={styles.pokeImg}
        src={info.sprites.other["official-artwork"].front_default}
        alt={info.name}
      />
      <img className={styles.pokeBg} src={pokeballbg} alt="pokeball" />
      <div className={styles.pokeInfo}>
        <p className={styles.title}>{info.name}</p>
        <div className={styles.types}>
          {info.types.length !== 0 &&
            info.types.map((type, index) => {
              return (
                <p key={index} className={styles.type}>
                  {type.type.name}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Card;
