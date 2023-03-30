import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  FavouritesPage,
  MainPage,
  MovieDetailPage,
  SettingsPage,
} from "./pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
