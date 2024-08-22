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
  baseURL: `${api_url}/api`,
});

votationApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("x-token"); // Get token from local storage
    console.log(token);
    // Check if token exists
    if (token) {
      config.headers?.["x-token"] && (config.headers["x-token"] = token); // Add token to headers
    }
    return config;
  },
  (error) => {
    // Handle request errors if needed
    return Promise.reject(error);
  }
);
