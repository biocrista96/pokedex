import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../utils/types";
import { AxiosError } from "axios";

interface initialStateType {
  loading: boolean;
  data: Pokemon[];
  error?: AxiosError | null;
  sidebar: boolean;
}
const initialState: initialStateType = {
  loading: false,
  data: [],
  error: null,
  sidebar: false,
};

const pokeTeamSlice = createSlice({
  name: "pokeTeam",
  initialState,
  reducers: {
    addToPokeTeam: (state, action: PayloadAction<Pokemon>) => {
      state.data = [...state.data, action.payload];
    },
    removeFromPokeTeam: (state, action: PayloadAction<Pokemon>) => {
      state.data = state.data.filter(
        (pokemon) => pokemon.name !== action.payload.name
      );
    },
    updatePokeTeam: (state, action: PayloadAction<Pokemon[]>) => {
      state.data = action.payload;
    },
    clearPokeTeam: (state) => {
      state.data = [];
    },
    updateSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    setPokeTeam: (state, action: PayloadAction<Pokemon[]>) => {
      state.data = action.payload;
    },
  },
});

export const {
  addToPokeTeam,
  removeFromPokeTeam,
  clearPokeTeam,
  updateSidebar,
  updatePokeTeam,
  setPokeTeam
} = pokeTeamSlice.actions;
export default pokeTeamSlice.reducer;
