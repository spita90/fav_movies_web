import { useEffect, useState } from "react";
import { Spinner } from "react-activity";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import { TMDB_IMAGES_BASE_URL } from "../App";
import { FaCalendar, FaStar } from "react-icons/fa";
import { Button, Header } from "../components";
import { i18n } from "../components/core/LanguageLoader";
import { languageState, userState } from "../reducers/store";
import { MovieDetail } from "../types";
import { errorHandler, showToast } from "../utils";
import { addFavMovie, removeFavMovie } from "../reducers/userReducer";

export function MovieDetailPage() {
  const { id: movieId } = useParams();
  const { code: langCode } = useSelector(languageState);
  const { favMovies } = useSelector(userState);
  const [loading, setLoading] = useState<boolean>(true);
  const [movieDetail, setMovieDetail] = useState<MovieDetail>();

  const fetchMovieDetail = async () => {
    try {
      const details = await getMovieDetails(langCode, Number(movieId));
      setMovieDetail(details);
    } catch (e) {
      errorHandler(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      return showToast(i18n.t("errors.cannotGetMovieDetails"));
    }
    fetchMovieDetail();
  }, []);

  const descriptionAvailable = !!movieDetail && !!movieDetail.overview;

  return (
    <div className="flex flex-col">
      <Header />
      {!loading ? (
        <>
          {movieDetail && (
            <div className="flex flex-row">
              <img
                className="absolute w-full opacity-10 -z-10"
                src={`${TMDB_IMAGES_BASE_URL}${movieDetail.backdrop_path}`}
                alt={movieDetail.original_title}
              />
              <div className="flex w-full mx-[50px] mt-[30px] justify-center">
                <img
                  className="w-[350px] rounded-xl"
                  src={`${TMDB_IMAGES_BASE_URL}${movieDetail.poster_path}`}
                  alt={movieDetail.original_title}
                />
                <div className="ml-[50px] pt-[16px]">
                  <p className="text-4xl font-bold">{movieDetail.title}</p>
                  <div className="flex flex-row mt-[20px] items-center">
                    <FaStar color="orange" />
                    <p className="ml-[6px] text-grey font-bold">
                      {movieDetail.vote_average}
                    </p>
                    <FaCalendar className="ml-[20px]" color="orange" />
                    <p className="ml-[6px] text-grey font-bold">
                      {new Date(movieDetail.release_date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="mt-[20px] text-black/60">
                    {descriptionAvailable
                      ? movieDetail.overview.replaceAll(".", ".\n")
                      : i18n.t("l.descriptionNotAvailable")}
                  </p>
                  <div className="mt-[20px]">
                    {!favMovies
                      .map((movie) => movie.id)
                      .includes(Number(movieId)) ? (
                      <Button
                        style={`bg-orange rounded-full px-[30px] py-[12px]`}
                        onPress={() => addFavMovie(movieDetail)}
                      >
                        <p className="text-white font-bold">
                          {i18n.t("l.addToFavourites")}
                        </p>
                      </Button>
                    ) : (
                      <Button
                        style={`bg-red rounded-full px-[30px] py-[12px]`}
                        onPress={() => removeFavMovie(Number(movieId))}
                      >
                        <p className="text-white font-bold">
                          {i18n.t("l.removeFromFavourites")}
                        </p>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Spinner size={30} />
      )}
    </div>
  );
}
