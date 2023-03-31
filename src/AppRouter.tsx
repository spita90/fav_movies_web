import { useCallback } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  FavouritesPage,
  MainPage,
  MovieDetailPage,
  SettingsPage,
} from "./pages";
import { languageState } from "./reducers/store";

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
  const { code: langCode } = useSelector(languageState);

  const AppRoutes = useCallback(
    () => (
      <Routes>
        {PAGES.map((page, index) => (
          <Route key={index} path={page.path} element={page.element} />
        ))}
      </Routes>
    ),
    // eslint-disable-next-line
    [langCode]
  );

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
