import { useCallback } from "react";
import "react-activity/dist/library.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import { i18n } from "../components/core/LanguageLoader";
import { MovieItem } from "../components/MovieItem";
import { languageState, userState } from "../reducers/store";

export function FavouritesPage() {
  const navigate = useNavigate();
  const { code: langCode } = useSelector(languageState);
  const { favMovies } = useSelector(userState);

  const MovieList = useCallback(() => {
    if (favMovies.length === 0) return null;

    return (
      <div className="mt-[20px]">
        <p
          className={` mb-[20px] text-3xl text-darkBlue text-center font-bold`}
        >
          {`${i18n.t("l.topTMDBMovies")}`}
        </p>
        <div className="flex flex-wrap justify-center">
          {favMovies.map((movie, index) => (
            <div key={index} className="m-[14px]">
              <MovieItem
                movie={movie}
                onPress={() => navigate(`/movie/${movie.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }, [favMovies]);

  return (
    <div className="flex flex-col items-center mx-[50px] mb-[50px]">
      <Header />
      <div className="flex flex-col items-center">
        <MovieList />
      </div>
    </div>
  );
}
