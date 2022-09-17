import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Anime } from "../../../interfaces";

export interface AnimeState {
  animeList: Anime[];
  configuration: Configuration;
  show: boolean;
}

export interface Configuration {
  name: string;
  description: string;
  image: string;
  cantidad: number;
  color: string;
  autor: string;
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
  },
  show: false,
};

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setAnimeList: (state, action: PayloadAction<Anime>) => {
      state.animeList = [...state.animeList, action.payload];
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
  },
});

export const {
  setAnimeList,
  setConfiguration,
  deleteAnime,
  clearAnimeList,
  setShow,
} = animeSlice.actions;

export default animeSlice.reducer;
