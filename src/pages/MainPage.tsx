import { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTopRatedMovies } from "../api/tmdb";
import { __DEV__ } from "../App";
import { Button, Header } from "../components";
import { i18n } from "../components/core/LanguageLoader";
import { MovieItem } from "../components/MovieItem";
import { languageState } from "../reducers/store";
import { DomainError, Movie } from "../types";
import { errorHandler } from "../utils";

export function MainPage() {
  const navigate = useNavigate();
  const { code: langCode } = useSelector(languageState);
  const [topRatedMovies, setTopRatedMovies] = useState<{
    [page: number]: Movie[];
  }>({});
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(true);

  /**
   * Fetches top rated movies
   */
  const fetchTopRatedMovies = async () => {
    if (!!topRatedMovies[page]) return;
    try {
      if (__DEV__) console.log(`Fetching top rated movies page ${page}`);
      const movies = await getTopRatedMovies(langCode, page);
      if (!movies.results || movies.results.length === 0)
        throw new DomainError("errors.cannotGetTopRatedMovies");
      setTopRatedMovies((trmovies) => ({
        ...trmovies,
        [page]: movies.results,
      }));
    } catch (e) {
      errorHandler(e);
    } finally {
      setRefreshing(false);
    }
  };

  const MovieList = useCallback(() => {
    if (Object.keys(topRatedMovies).length === 0 || !topRatedMovies[page])
      return null;

    return (
      <div className="mt-[20px]">
        <p
          className={` mb-[20px] text-3xl text-darkBlue text-center font-bold`}
        >
          {`${i18n.t("l.topTMDBMovies")}`}
        </p>
        <div className="flex flex-wrap justify-center">
          {topRatedMovies[page].map((movie, index) => (
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
  }, [topRatedMovies, page]);

  const Navigation = useCallback(
    () => (
      <div>
        {page > 1 && (
          <Button
            style={`mt-[50px] mr-[30px] border-[2px] border-grey/50 bg-grey/10 rounded-full`}
            onPress={() => setPage((page) => page - 1)}
          >
            <p className="font-bold text-xl my-[10px] mx-[30px]">
              {i18n.t("l.prev")}
            </p>
          </Button>
        )}
        <Button
          style={`mt-[50px] border-[2px] border-grey/50 bg-grey/10 rounded-full`}
          onPress={() => setPage((page) => page + 1)}
        >
          <p className="font-bold text-xl my-[10px] mx-[30px]">
            {i18n.t("l.next")}
          </p>
        </Button>
      </div>
    ),
    [page]
  );

  /**
   * Fetch top rated movies on page change
   */
  useEffect(() => {
    if (page === 1) return;
    fetchTopRatedMovies();
  }, [page]);

  /**
   * Fetches again top rated movies after pull-to-refresh gesture
   */
  useEffect(() => {
    if (!refreshing) return;
    fetchTopRatedMovies();
  }, [refreshing]);

  return (
    <div className="flex flex-col items-center mx-[50px] mb-[50px]">
      <Header />
      {!refreshing ? (
        <div className="flex flex-col items-center">
          <MovieList />
          <Navigation />
        </div>
      ) : (
        <div className="mt-[30px]">
          <Spinner size={30} />
        </div>
      )}
    </div>
  );
}
