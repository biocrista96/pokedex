import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../utils/types";
import { AxiosError } from "axios";

interface initialStateType {
  loading: boolean;
  data?: Pokemon | null;
  error?: AxiosError | null;
}
const initialState: initialStateType = {
  loading: false,
  data: null,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setCurrentPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.data = action.payload;
    },
    resetCurrentPokemon: (state) => {
      state.data = null;
    },
  },
});

export const { setCurrentPokemon, resetCurrentPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
