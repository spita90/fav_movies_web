import { useParams } from "react-router-dom";

export function MovieDetailPage() {
  const { id: movieId } = useParams();

  return <p>{movieId}</p>;
}
