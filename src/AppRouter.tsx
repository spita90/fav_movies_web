import path from "path";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  FavouritesPage,
  MainPage,
  MovieDetailPage,
  SettingsPage,
} from "./pages";

export const PAGES: { path: string; element: JSX.Element }[] = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetailPage />,
  },
  { path: "/favourites", element: <FavouritesPage /> },
  { path: "/settings", element: <SettingsPage /> },
];

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {PAGES.map((page, index) => (
          <Route key={index} path={page.path} element={page.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
