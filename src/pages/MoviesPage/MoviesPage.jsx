import { useEffect, useState } from "react";
import { getFilmByQuery } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getFilmByQuery();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div>
      {isLoding && <b>Is loading movies...</b>}
      {error && <b>HTTP error</b>}
      <MovieList movies={movies} />
    </div>
  );
}
