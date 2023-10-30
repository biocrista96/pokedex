import { useEffect, useState } from "react";
import {
  Pokemon,
  pokeResponseType,
  pokelistResponseType,
  responseByType,
} from "../../utils/types";
import {
  getPokemonList,
  getPokemonDetail,
  getPokemonListBy,
} from "../../services/api";
import List from "../../components/List/List";
import { SelectListType } from "../../components/Select/Select";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import {
  cleanMessages,
  cleanPokeList,
  pokemonListFailed,
  pokemonListLoading,
  setNext,
  setPokemonListSuccess,
  updatePokemonListSuccess,
} from "../../store/pokeListSlice";
import { AxiosError } from "axios";
import styles from "./PokemonList.module.scss";
import notFoundImg from "../../assets/png/pokemon404.png";
import Header from "../../components/Header/Header";
import pokeballbg from "../../assets/png/pk-bg-gray.png";

const PokemonList = () => {
  const { list } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [pokelist, setPokeList] = useState<Pokemon[]>([]);

  const [loadingPaginate, setloadingPaginate] = useState(false);

  //get all pokemons (pagination)
  const getPokemons = async (next?: string) => {
    if (!next) {
      dispatch(pokemonListLoading());
    }
    try {
      const response = (await getPokemonList(next)) as pokelistResponseType;

      let nextSplice = response.next.split("/pokemon");
      console.log(nextSplice);
      dispatch(setNext(nextSplice[1]));

      const promises = response.results.map(async (pokemon) => {
        try {
          return (await getPokemonDetail(pokemon.name)) as Pokemon;
        } catch (error) {
          console.error(error);
        }
      });
      const newList = (await Promise.all(promises)) as Pokemon[];

      dispatch(updatePokemonListSuccess(newList));
      setloadingPaginate(false);
      console.log(newList);
    } catch (error) {
      dispatch(pokemonListFailed(error as AxiosError));
    }
  };

  //get pokemons by (select filters)
  const getPokemonsBy = async (value: string) => {
    try {
      setPokeList([]);
      dispatch(pokemonListLoading());
      const response = await getPokemonListBy(value);

      let responseList = (response.pokemon
        ? parseGetByReponse(response.pokemon)
        : response.pokemon_species) as pokeResponseType[];
      console.log(responseList, response.pokemon_species, response.pokemon);

      const promises = responseList.map(async (pokemon) => {
        try {
          const response = (await getPokemonDetail(pokemon.name)) as Pokemon;
          if (response) {
            return response;
          }
        } catch (error) {
          console.error(error);
        }
      });
      const newList = (await Promise.all(promises)) as Pokemon[];
      dispatch(setPokemonListSuccess(newList));
      console.log(newList);
    } catch (error) {
      dispatch(pokemonListFailed(error as AxiosError));
    }
  };

  //update paginated list on scroll end
  const updateList = () => {
    list.next?.length !== 0 && setloadingPaginate(true);
    list.next && getPokemons(list.next);
  };

  //parse response from get pokemons by select filter
  const parseGetByReponse = (listValue: responseByType[]) => {
    let newList: pokeResponseType[] = [];
    listValue.map((value) => {
      let newValue = {
        name: value.pokemon.name,
        url: value.pokemon.url,
      };
      newList.push(newValue);
      return;
    });
    return newList;
  };

  //handle first select
  const handleSelect = (selectedValue: SelectListType) => {
    if (selectedValue.value === "pokemon") {
      dispatch(cleanPokeList());
      getPokemons();
    }
    dispatch(setNext(""));
  };

  //handle second select
  const handleSecondSelect = (selectedValue: SelectListType) => {
    dispatch(cleanPokeList());
    getPokemonsBy(selectedValue.value);
  };

  //handle search by (all pokemons)
  const handleSearchByName = async (name: string) => {
    try {
      dispatch(pokemonListLoading());
      let response = (await getPokemonDetail(name)) as Pokemon;
      response && setPokeList([response]);
      dispatch(cleanMessages());
    } catch (error) {
      dispatch(pokemonListFailed(error as AxiosError));
    }
  };

  //handle Search by (select filter)
  const hanldeSearchByFilter = (name: string) => {
    const filteredList = list.data.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(name.toLowerCase());
    });
    setPokeList(filteredList);
  };

  //handle cleanSearch
  const cleanSearchHande = () => {
    dispatch(cleanMessages());
    setPokeList(list.data);
  };

  useEffect(() => {
    if (list.data) {
      setPokeList(list.data);
    }
  }, [list.data]);

  useEffect(() => {
    if (pokelist.length === 0) {
      dispatch(cleanPokeList());
      getPokemons();
    }
  }, []);

  useEffect(() => {
    if (list.error) {
      if (list.error.response?.data === "Not Found") {
      }
      console.log();
    }
  }, [list.error]);

  return (
    <div className={styles.PokemonListWrapper}>
      <div className={styles.backgroud}>
        <img src={pokeballbg} />
      </div>
      <div className={styles.pokemonListContainer}>
        <Header />
        <SearchBar
          onSelect={handleSelect}
          onSecondSelect={handleSecondSelect}
          onSearchAllHandle={handleSearchByName}
          onSearchByHandle={hanldeSearchByFilter}
          onCleanSearchHandle={cleanSearchHande}
        />
        {!list.error ? (
          <List
            listInfo={pokelist}
            paginate={updateList}
            isLoading={list.loading}
            isLoadPag={loadingPaginate}
            loadPaginate={list.next?.length !== 0}
          />
        ) : (
          <div className={styles.errorMessageWrapper}>
            <div className={styles.errorMessageContainer}>
              <img src={notFoundImg} />
              <p className={styles.errorMessage}>
                {String(list.error.response?.data)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
