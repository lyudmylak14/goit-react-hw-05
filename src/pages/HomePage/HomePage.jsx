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
    <div>
      <h1 className={css.title}>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
