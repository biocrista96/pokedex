import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import pokeListReducer from "./pokeListSlice";
import pokeTeamReducer from "./pokeTeamSlice";
import pokemonReducer from "./pokemonSlice";

const rootReducer = combineReducers({
  list: pokeListReducer,
  team: pokeTeamReducer,
  pokemon: pokemonReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
