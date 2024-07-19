import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddForm, Anime, ISelectedAnime } from "../../../interfaces";
import { FieldErrors } from "react-hook-form";

export interface AnimeState {
  // animeList: Anime[];
  animeList: ISelectedAnime[];
  configuration: Configuration;
  show: boolean;
  errorMessage: FieldErrors<AddForm>;
  isConfettiActive: boolean;
}

export interface Configuration {
  name: string;
  description: string;
  image: string;
  cantidad: number;
  color: string;
  autor: string;
  expiration: string;
}

const initialState: AnimeState = {
  animeList: [],
  configuration: {
    name: "",
    description: "",
    image: "",
    cantidad: 0,
    color: "",
    autor: "",
    expiration: "",
  },
  show: false,
  errorMessage: {},
  isConfettiActive: false,
};

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setAnimeList: (state, action: PayloadAction<ISelectedAnime>) => {
      state.animeList = [...state.animeList, action.payload];
    },
    setAnimeListCollection: (
      state,
      action: PayloadAction<ISelectedAnime[]>
    ) => {
      state.animeList = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<FieldErrors>) => {
      state.errorMessage = action.payload;
    },
    setConfiguration: (state, action: PayloadAction<Configuration>) => {
      state.configuration = action.payload;
    },
    deleteAnime: (state, action: PayloadAction<number>) => {
      state.animeList = state.animeList.filter(
        (anime) => anime.mal_id !== action.payload
      );
    },
    clearAnimeList: (state) => {
      state.animeList = [];
    },
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    setConfettiActive: (state, action: PayloadAction<boolean>) => {
      state.isConfettiActive = action.payload;
    },
  },
});

export const {
  setAnimeList,
  setErrorMessage,
  setAnimeListCollection,
  setConfiguration,
  deleteAnime,
  clearAnimeList,
  setShow,
  setConfettiActive,
} = animeSlice.actions;

export default animeSlice.reducer;
