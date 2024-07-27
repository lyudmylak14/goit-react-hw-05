import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { getFilmAllInfo } from "../../movies-api";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css"

const linkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
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
    <div>
      <Link to="/movies">Go back</Link>
      {movie.poster_path && (
        <img
          src={`${baseImageUrl}${movie.poster_path}`}
          alt={movie.title}
          width="200"
        />
      )}
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
      <b>Additional information</b>
      <ul className={css.nav}>
        <li>
          <NavLink to="cast" className={linkClass}> Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={linkClass}> Reviews</NavLink>
        </li>
      </ul>
      
      <Outlet/>
    </div>
  );
}
