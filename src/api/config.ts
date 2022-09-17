import axios from "axios";
const api_url = import.meta.env.VITE_BASE_URL;
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
  baseURL: `${api_url}/api/votation`,
});
