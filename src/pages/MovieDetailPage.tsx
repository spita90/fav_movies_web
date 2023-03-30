import { useEffect, useState } from "react";
import { Spinner } from "react-activity";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import { TMDB_IMAGES_BASE_URL, __DEV__ } from "../App";
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
      if (__DEV__) console.log(`Fetching movie details for id ${movieId}`);
      const details = await getMovieDetails(langCode, Number(movieId));
      setMovieDetail(details);
    } catch (e) {
      errorHandler(e);
    } finally {
      setLoading(false);
    }
  };

  const descriptionAvailable = !!movieDetail && !!movieDetail.overview;

  const BackgroundImage = () => {
    if (!movieDetail) return null;
    return (
      <img
        className="absolute w-full opacity-10 -z-10"
        src={`${TMDB_IMAGES_BASE_URL}${movieDetail.backdrop_path}`}
        alt={movieDetail.original_title}
      />
    );
  };
  const MovieImage = () => {
    if (!movieDetail) return null;
    return (
      <img
        className="w-[350px] rounded-xl"
        src={`${TMDB_IMAGES_BASE_URL}${movieDetail.poster_path}`}
        alt={movieDetail.original_title}
      />
    );
  };

  const Heading = () => {
    if (!movieDetail) return null;
    return (
      <div>
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
      </div>
    );
  };

  const Description = () => {
    if (!movieDetail) return null;
    return (
      <p className="mt-[20px] text-black/60">
        {descriptionAvailable
          ? movieDetail.overview.replaceAll(".", ".\n")
          : i18n.t("l.descriptionNotAvailable")}
      </p>
    );
  };

  const FavouritesButtons = () => {
    if (!movieDetail) return null;
    return (
      <div className="mt-[20px]">
        {!favMovies.map((movie) => movie.id).includes(Number(movieId)) ? (
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
    );
  };

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      return showToast(i18n.t("errors.cannotGetMovieDetails"));
    }
    fetchMovieDetail();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      {!loading ? (
        <>
          {movieDetail && (
            <div className="flex flex-row">
              <BackgroundImage />
              <div className="flex w-full mx-[50px] mt-[30px] justify-center">
                <MovieImage />
                <div className="ml-[50px] pt-[16px]">
                  <Heading />
                  <Description />
                  <FavouritesButtons />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex mt-[80px] justify-center">
          <Spinner size={30} />
        </div>
      )}
    </div>
  );
}
