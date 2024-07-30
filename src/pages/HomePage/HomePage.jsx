import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const trendingMovies = async () => {
      try {
        const getFromAPI = await getTrendingMovies();
        setMovies(getFromAPI);
      } catch (error) {
        console.log(error);
      }
    };

    trendingMovies();
  }, []);

  return (
    <div className={css.page}>
      <h1 className={css.pageTitle}>Trending Today</h1>
      <div className={css.movieListContainer}></div>
      <MovieList movies={movies} />
    </div>
  );
}
