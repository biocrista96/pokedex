import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Pokemon } from "../utils/types";

interface initialStateType {
  loading: boolean;
  data: Pokemon[];
  error?: AxiosError | null;
  next: string | null;
}
const initialState: initialStateType = {
  loading: false,
  data: [],
  error: null,
  next: null,
};

const pokeListSlice = createSlice({
  name: "pokeList",
  initialState,
  reducers: {
    pokemonListLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setPokemonListSuccess: (state, action: PayloadAction<Pokemon[]>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    pokemonListFailed: (state, action: PayloadAction<AxiosError>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePokemonListSuccess: (state, action: PayloadAction<Pokemon[]>) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload];
      state.error = null;
    },
    filterListSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },

    cleanPokeList: (state) => {
      state.loading = false;
      state.data = [];
    },
    cleanMessages: (state) => {
      state.loading = false;
      state.error = null;
    },
    setNext: (state, action: PayloadAction<string>) => {
      state.next = action.payload;
    },
  },
});

export const {
  pokemonListLoading,
  setPokemonListSuccess,
  pokemonListFailed,
  updatePokemonListSuccess,
  cleanPokeList,
  cleanMessages,
  setNext,
} = pokeListSlice.actions;

export default pokeListSlice.reducer;
