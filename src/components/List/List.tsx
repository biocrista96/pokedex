import { useDispatch } from "react-redux";
import { Pokemon } from "../../utils/types";
import { TypeColor } from "../../utils/typesColors";
import Card from "../Card/Card";
import styles from "./List.module.scss";
import { useRef } from "react";
import { setCurrentPokemon } from "../../store/pokemonSlice";

interface ListProps {
  listInfo: Pokemon[];
  paginate(): void;
  isLoading: boolean;
  isLoadPag?: boolean;
  loadPaginate: boolean;
}

const List: React.FC<ListProps> = ({
  listInfo,
  paginate,
  isLoading = false,
  isLoadPag = false,
  loadPaginate = false,
}) => {
  const dispatch = useDispatch();
  const listRef = useRef<HTMLDivElement | null>(null);
  const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
    if (listRef.current) {
      const { clientHeight } = listRef.current;
      const { scrollTop, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // Has llegado al final de la lista, carga más contenido
        console.log(loadPaginate);
        loadPaginate && paginate();
      }
    }
  };

  const handleCardClick = (pokemon: Pokemon) => {
    dispatch(setCurrentPokemon(pokemon));
  };
  return (
    <div className={styles.listWrapper} ref={listRef}>
      {listInfo.length !== 0 && (!isLoading || isLoadPag) ? (
        <>
          <div
            className={styles.listContainer}
            onScroll={(e) => scrollHandler(e)}
          >
            {listInfo.map((pokemon, index) => {
              const firstType = pokemon.types[0].type
                .name as keyof typeof TypeColor;
              return (
                <Card
                  key={index}
                  info={pokemon}
                  typeColor={TypeColor[firstType]}
                  clickHandler={handleCardClick}
                />
              );
            })}
          </div>
          {isLoadPag && (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          )}
        </>
      ) : !isLoadPag ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.pokemon}></div>
    </div>
  );
};

export default List;
