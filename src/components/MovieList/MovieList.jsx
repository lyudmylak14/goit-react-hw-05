import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css"

export default function MovieList({ movies }) {
  const location = useLocation();
  console.log("movielist", location);
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
