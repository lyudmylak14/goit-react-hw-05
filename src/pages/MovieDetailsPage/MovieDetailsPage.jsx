import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getFilmAllInfo } from "../../movies-api";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

const linkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBack = useRef(location?.state ?? "/movies");

  console.log(location, "moviedails");
  console.log("ref", goBack);
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getFilmAllInfo(moviesId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [moviesId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.page}>
      <Link to={goBack.current}>Go back</Link>
      <div className={css.movieDetails}>
        <div className={css.posterContainer}>
          {movie.poster_path && (
            <img
              src={`${baseImageUrl}${movie.poster_path}`}
              alt={movie.title}
              className={css.poster}
            />
          )}
        </div>
        <div className={css.details}>
          <h1>{movie.original_title}</h1>
          <p>Release date: {movie.release_date} </p>
          <p>Votes: {movie.vote_count}</p>
          <p>Overview: {movie.overview}</p>
          <p>
            {" "}
            Genres:{" "}
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name} </span>
            ))}
          </p>
          <div className={css.additionalInfo}>
            <b>Additional information</b>
            <ul className={css.nav}>
              <li>
                <NavLink to="cast" className={linkClass}>
                  {" "}
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={linkClass}>
                  {" "}
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>LOADING...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
