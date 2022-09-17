import { configureStore } from "@reduxjs/toolkit";
import { animeSlice, pokemonSlice, votationSlice } from "./slices";

export const store = configureStore({
  reducer: {
    anime: animeSlice.reducer,
    votation: votationSlice.reducer,
    // pokemon: pokemonSlice.reducer,
    // counter: counterSlice.reducer,
    // pokemon: pokemonSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
