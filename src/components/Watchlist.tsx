import { Container } from "react-bootstrap";
import MovieCard from "./MovieCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function Watchlist() {
  
  const movies = useAppSelector((state) => state.movies);
  const {movie, movieList, status, error, toggleBtn} = movies;

  const list = movieList.map((item) => {
    return <MovieCard movie={item} />
  });

  return (
    <Container className="px-5">
      <h4 className="text-primary py-4">My watchlist</h4>
      <div className="d-grid gap-3">
        {list}
      </div>
    </Container>
  )
}