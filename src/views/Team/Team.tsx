import styles from "./Teams.module.scss";
import pokeballblack from "../../assets/png/pokeballblack.png";
import {
  FaX,
  FaHeart,
  FaHeartCrack,
  FaPenToSquare,
  FaListUl,
} from "react-icons/fa6";
import {
  clearPokeTeam,
  removeFromPokeTeam,
  updatePokeTeam,
  updateSidebar,
} from "../../store/pokeTeamSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Card from "../../components/Card/Card";
import { TypeColor } from "../../utils/typesColors";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Pokemon } from "../../utils/types";
import { setCurrentPokemon } from "../../store/pokemonSlice";

const Team = () => {
  const { team } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [items, setItems] = useState(team.data);
  const [isDragDisabled, setIsDragDisabled] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [deleteActive, setDeleteActive] = useState(false);
  const [showDeleteAll, setShowDeteleAll] = useState(false);

  const handleClosebutton = () => {
    dispatch(updateSidebar());
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return; // No se ha soltado en una ubicación válida
    }

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);
    setItems(reorderedItems);
  };

  useEffect(() => {
    dispatch(updatePokeTeam(items));
  }, [items]);

  const handleCardClick = (pokemon: Pokemon) => {
    if (isDragDisabled) {
      dispatch(updateSidebar());
      dispatch(setCurrentPokemon(pokemon));
    }
  };

  const handleDeleteAll = () => {
    setShowDeteleAll(false);
    dispatch(clearPokeTeam());
    localStorage.removeItem("pokemonTeam");
  };

  useEffect(() => {
    if (isDragDisabled) {
      setItems(team.data);
    }
  }, [team.data]);

  const handleDelete = (pokemon: Pokemon) => {
    dispatch(removeFromPokeTeam(pokemon));
  };

  return (
    <div className={styles.TeamWrapper}>
      {showDeleteAll && (
        <ConfirmWindow
          handleClose={() => setShowDeteleAll(false)}
          handleDelete={handleDeleteAll}
        />
      )}
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <img src={pokeballblack} className={styles.image} />
          <p className={styles.title}>Pokemon Team</p>
        </div>
        <div className={styles.backButton} onClick={handleClosebutton}>
          <FaX />
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => setDeleteActive(!deleteActive)}
          className={styles.button}
          disabled={!isDragDisabled}
        >
          <div className={styles.icon}>
            <FaPenToSquare />
          </div>
          <p>Edit team</p>
        </button>
        <button
          onClick={() => setIsDragDisabled(!isDragDisabled)}
          className={styles.button}
          disabled={deleteActive}
        >
          <div>
            <FaListUl />
          </div>
          <p>Reorder team</p>
        </button>
        <button
          className={styles.button}
          disabled={!isDragDisabled || deleteActive}
          onClick={() => setShowDeteleAll(true)}
        >
          <div>
            <FaHeartCrack />
          </div>
          <p>Delete Team</p>
        </button>
      </div>

      {/* <div className={styles.listContainer}> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.listContainer}
            >
              {items.map((pokemon, index) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                  isDragDisabled={isDragDisabled}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                      className={styles.cardContainer}
                    >
                      <Card
                        info={pokemon}
                        typeColor={
                          TypeColor[
                            pokemon.types[0].type.name as keyof typeof TypeColor
                          ]
                        }
                        clickHandler={() => handleCardClick(pokemon)}
                        width="100%"
                        height="130px"
                        isDraggable={!isDragDisabled}
                      />
                      {deleteActive && (
                        <div
                          className={styles.editItem}
                          onMouseOver={() => {
                            setDeleteId(pokemon.name);
                          }}
                          onMouseLeave={() => {
                            setDeleteId("");
                          }}
                          onClick={() => handleDelete(pokemon)}
                        >
                          {deleteId !== pokemon.name ? (
                            <FaHeart className={styles.heartIcon} />
                          ) : (
                            <FaHeartCrack className={styles.brokenIcon} />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
    // </div>
  );
};

interface ConfirmWindowProps {
  handleClose(): void;
  handleDelete(): void;
}
const ConfirmWindow: React.FC<ConfirmWindowProps> = ({
  handleClose,
  handleDelete,
}) => {
  return (
    <div className={styles.confirmWindowWrapper}>
      <div className={styles.confirmWindowContainer}>
        <p>Are you sure you want to eliminate all your team?</p>
        <div className={styles.buttonGroup}>
          <button
            className={styles.option}
            style={{ backgroundColor: "#ff5151", color: "white" }}
            onClick={handleDelete}
          >
            Yes
          </button>
          <button className={styles.option} onClick={handleClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Team;
