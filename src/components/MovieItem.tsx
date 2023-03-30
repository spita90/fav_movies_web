import { TMDB_IMAGES_BASE_URL } from "../App";
import { Movie } from "../types";
import { FaStar } from "react-icons/fa";

export interface MovieItemProps {
  movie: Movie;
  onPress?: () => void;
}

export function MovieItem({ movie, onPress }: MovieItemProps) {
  return (
    <button
      className="flex flex-col w-[180px]"
      onClick={() => {
        onPress && onPress();
      }}
    >
      <div className="relative">
        <div className="absolute flex flex-row justify-between p-[10px] w-full h-full rounded-xl bg-black items-end opacity-0 hover:opacity-70">
          <div className="flex flex-row items-center">
            <FaStar color="orange" />
            <p className="ml-[6px] text-white font-bold">
              {movie.vote_average.toString()}
            </p>
          </div>
          <div className="flex">
            <p className="text-white font-bold">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </div>
        </div>
        <img
          className={`rounded-xl object-contain`}
          src={`${TMDB_IMAGES_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <p className="text-center">{movie.title}</p>
    </button>
  );
}
