import axios from "axios";
// const url = 'https://api.jikan.moe/v4/anime?q=' + query.value;
export const animeApi = axios.create({
  baseURL: "https://api.jikan.moe/v4/anime",
});
