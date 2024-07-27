import { useEffect, useState } from "react";
import { getFilmByQuery } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [params, setParams] = useSearchParams();

  const changeSearchFilter = (e) => {
    setSearchTerm(e.target.value.toLowerCase().trim());
  };

  const handleSearch = () => {
    if (!searchTerm) return;
    params.set("query", searchTerm);
    setParams(params);
    setSearchTerm("");
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getFilmByQuery(params.get("query"));
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [params]);
  console.log(movies);
  return (
    <div>
      <input type="text" value={searchTerm} onChange={changeSearchFilter} />
      <button onClick={handleSearch}>Search</button>
      {isLoading && <b>Is loading movies...</b>}
      {error ? <b>HTTP error</b> : <MovieList movies={movies} />}
    </div>
  );
}
