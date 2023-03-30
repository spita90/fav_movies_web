import { createSlice } from "@reduxjs/toolkit";
import { store } from "./store";

export interface Language {
  code: string;
}

const languageState: Language = {
  code: localStorage.getItem("locale") ?? navigator.language,
};

const languageSlice = createSlice({
  name: "language",
  initialState: languageState,
  reducers: {
    _setLanguage(state, action: { payload: string }) {
      state.code = action.payload;
    },
  },
});

const { _setLanguage } = languageSlice.actions;

/**
 * EXPORTED FUNCTIONS
 */

export const setLanguage = (language: string) =>
  store.dispatch(_setLanguage(language));

export const languageReducer = languageSlice.reducer;
