import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PokemonDetail.module.scss";
import { RootState } from "../../store/Store";
import squarew from "../../assets/png/squareW.png";
import points from "../../assets/png/points.png";
import pokeball from "../../assets/png/pokeballbg.png";
import { TypeColor } from "../../utils/typesColors";
import { FaArrowLeftLong, FaRegHeart, FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { resetCurrentPokemon } from "../../store/pokemonSlice";
import { addToPokeTeam, removeFromPokeTeam } from "../../store/pokeTeamSlice";

const PokemonDetail = () => {
  const { pokemon, team } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showError, setShowError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [InTeam, setInTeam] = useState(false);

  const pokemonType = pokemon.data?.types[0].type
    .name as keyof typeof TypeColor;

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleBackButton = () => {
    dispatch(resetCurrentPokemon());
    navigate("/");
  };
  const handleAddTeam = () => {
    if (team.data.length === 6) {
      setShowError(true);
      let time = setTimeout(() => {
        setShowError(false);
        clearInterval(time);
      }, 4000);

      let time2 = setTimeout(() => {
        setFadeOut(true);
        clearInterval(time2);
      }, 2000);
    } else {
      if (InTeam) {
        pokemon.data && dispatch(removeFromPokeTeam(pokemon.data));
      } else {
        pokemon.data && dispatch(addToPokeTeam(pokemon.data));
      }
    }
  };

  const searchInTeam = () => {
    let exist = team.data.find((pokemonInTeam) => {
      return pokemon.data?.name === pokemonInTeam.name;
    });
    if (exist) {
      setInTeam(true);
    } else {
      setInTeam(false);
    }
  };

  const parseDecimeters = (value: number) => {
    // Divide la cantidad de decímetros por 10 para obtener metros
    const metros = value / 10;
    // Redondea el resultado a la cantidad de decimales deseada
    return metros.toFixed(2);
  };

  useEffect(() => {
    searchInTeam();
  }, [team.data]);

  return (
    <div
      className={styles.pokemonDetailWrapper}
      style={{ backgroundColor: TypeColor[pokemonType] }}
    >
      {showError && (
        <div className={styles.errorAlert}>
          <div
            className={`${styles.errorAlertContainer} ${
              !fadeOut ? styles.in : styles.out
            }`}
          >
            <p>Team is already full (max. 6)</p>
          </div>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <div className={styles.backButton} onClick={handleBackButton}>
          <FaArrowLeftLong />
        </div>
        <div className={styles.heartButton} onClick={handleAddTeam}>
          {!InTeam ? <FaRegHeart /> : <FaHeart className={styles.hearFull} />}
        </div>
      </div>
      <div className={styles.bgElements}>
        <img src={squarew} className={styles.square} />
        <img src={points} className={styles.points} />
        <img src={pokeball} className={styles.pokeball} />
      </div>
      <div className={styles.header}>
        <p className={styles.name}>
          {pokemon.data && capitalizeFirstLetter(pokemon.data.name)}
        </p>
        <div className={styles.types}>
          {pokemon.data &&
            pokemon.data.types.map((type) => {
              return (
                <p className={styles.type}>
                  {capitalizeFirstLetter(type.type.name)}
                </p>
              );
            })}
        </div>
      </div>
      <div className={styles.pokemonImg}>
        <img
          src={pokemon.data?.sprites.other["official-artwork"].front_default}
        />
      </div>
      <div className={styles.infoElements}>
        {pokemon.data && (
          <div className={styles.scrollWrapper}>
            <div className={styles.infoContainer}>
              <div className={styles.infoRow}>
                <div className={styles.title}>
                  <p>Species</p>
                </div>
                <div className={styles.value}>
                  <p>
                    {capitalizeFirstLetter(String(pokemon.data.species.name))}
                  </p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.title}>
                  <p>Height</p>
                </div>
                <div className={styles.value}>
                  <p>{parseDecimeters(pokemon.data.height)}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.title}>
                  <p>Weight</p>
                </div>
                <div className={styles.value}>
                  <p>{parseDecimeters(pokemon.data.weight)}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.title}>
                  <p>Abilities</p>
                </div>
                <div className={styles.value}>
                  {pokemon.data.abilities.map((ability) => {
                    return <p>{ability.ability.name}</p>;
                  })}
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.title}>
                  <p>Base experience</p>
                </div>
                <div className={styles.value}>
                  <p>{pokemon.data.base_experience}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.title}>
                  <p>First three movements </p>
                </div>
                <div className={styles.value}>
                  <p>{pokemon.data.moves[0].move.name}</p>
                  <p>{pokemon.data.moves[1].move.name}</p>
                  <p>{pokemon.data.moves[2].move.name}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.title}>
                  <p>Types</p>
                </div>
                <div className={styles.value}>
                  {pokemon.data.types.map((type) => {
                    return <p>{type.type.name}</p>;
                  })}
                </div>
              </div>
            </div>
            <div className={styles.statsTitle}>Stats</div>
            <div className={styles.infoContainer}>
              {pokemon.data.stats.map((stat) => {
                return (
                  <div className={styles.infoRow}>
                    <div className={styles.title}>
                      <p>{capitalizeFirstLetter(stat.stat.name)}</p>
                    </div>
                    <div className={styles.value}>
                      <p>{stat.base_stat}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
