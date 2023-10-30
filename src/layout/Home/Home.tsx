import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import styles from "./Home.module.scss";
import Team from "../../views/Team/Team";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setPokemonListSuccess } from "../../store/pokeListSlice";
import { Pokemon } from "../../utils/types";
import { setPokeTeam } from "../../store/pokeTeamSlice";

const Home = () => {
  const { team, pokemon } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (team.data.length === 0) {
      const teamJSON = localStorage.getItem("pokemonTeam");
      console.log(teamJSON);
      teamJSON && dispatch(setPokeTeam(JSON.parse(teamJSON) as Pokemon[]));
    }
  }, []);
  useEffect(() => {
    if (pokemon.data) {
      navigate("pokemon/" + pokemon.data.name);
    }
  }, [pokemon.data]);

  useEffect(() => {
    if (team.data.length !== 0) {
      const newTeamJSON = JSON.stringify(team.data);
      localStorage.setItem("pokemonTeam", newTeamJSON);
    }
  }, [team.data]);
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeContainer}>
        <Outlet />
      </div>

      {team.sidebar && (
        <div className={styles.sideBarContainer}>
          <Team />
        </div>
      )}
    </div>
  );
};

export default Home;
