import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, User } from "../types";
import { store } from "./store";

const initialUserState: User = {
  favMovies: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    _addFavMovie(state, action: PayloadAction<Movie>) {
      state.favMovies = [action.payload, ...state.favMovies];
    },
    _removeFavMovie(state, action: PayloadAction<number>) {
      state.favMovies = state.favMovies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    _wipe() {
      return initialUserState;
    },
  },
});

const { _addFavMovie, _removeFavMovie, _wipe } = userSlice.actions;

/**
 * EXPORTED FUNCTIONS
 */

export const addFavMovie = async (movie: Movie) =>
  store.dispatch(_addFavMovie(movie));

export const removeFavMovie = async (movieId: number) =>
  store.dispatch(_removeFavMovie(movieId));

export const wipeUser = () => store.dispatch(_wipe());

export const userReducer = userSlice.reducer;
