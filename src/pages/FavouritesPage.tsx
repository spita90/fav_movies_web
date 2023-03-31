import { useCallback } from "react";
import "react-activity/dist/library.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import { i18n } from "../components/core/LanguageLoader";
import { MovieItem } from "../components/MovieItem";
import { userState } from "../reducers/store";

export function FavouritesPage() {
  const navigate = useNavigate();
  const { favMovies } = useSelector(userState);

  const MovieList = useCallback(() => {
    if (favMovies.length === 0) return null;

    return (
      <div className="mt-[20px]">
        <p
          className={` mb-[20px] text-3xl text-darkBlue text-center font-bold`}
        >
          {`${i18n.t("l.yourFavourites")}`}
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
    // eslint-disable-next-line
  }, [favMovies]);

  return (
    <div className="flex flex-col items-center mx-[50px] mb-[50px]">
      <Header />
      <div className="flex flex-col items-center">
        {favMovies.length > 0 ? (
          <MovieList />
        ) : (
          <p className="mt-[40px] font-bold">
            {i18n.t("l.emptyFavouritesCaption")}
          </p>
        )}
      </div>
    </div>
  );
}
