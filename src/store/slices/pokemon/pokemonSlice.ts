import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Anime } from "../../../interfaces";

interface PokemonState {
  pokemonList: Anime[];
}

const initialState: PokemonState = {
  pokemonList: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonList: (state, action: PayloadAction<Anime>) => {
      state.pokemonList = [...state.pokemonList, action.payload];
    },
  },
});

export const { setPokemonList } = pokemonSlice.actions;

export default pokemonSlice.reducer;
