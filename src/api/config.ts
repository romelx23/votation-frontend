import axios from "axios";
// const url = 'https://api.jikan.moe/v4/anime?q=' + query.value;
export const animeApi = axios.create({
  baseURL: "https://api.jikan.moe/v4/anime",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const votationApi = axios.create({
  baseURL: "http://localhost:8080/api/votation",
});
