import axios from "axios";

const api = axios.create({
  baseURL: `https://pokeapi.co/api/v2/`,
});

export const getPokemonList = async (pagination?: string) => {
  try {
    const response = await api.get("pokemon" + (pagination ? pagination : ""));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonListBy = async (searchValue: string) => {
  try {
    const response = await api.get(searchValue);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonDetail = async (name: string) => {
  try {
    const response = await api.get("pokemon/" + name);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSelectList = async (name: string) => {
  try {
    const response = await api.get(name);
    return response.data;
  } catch (error) {
    throw error;
  }
};
