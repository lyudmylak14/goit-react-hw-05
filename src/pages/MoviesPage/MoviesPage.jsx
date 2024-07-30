import { useCallback, useEffect, useMemo, useState } from "react";
import { getFilmByQuery } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import css from "./MoviesPage.module.css"

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();


  const handleSearch = useCallback(
    (searchTerm) => {
      params.set("query", searchTerm);
      setParams(params);
    },
    [params, setParams]
  );

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

  const searchBarMemo = useMemo(
    () => <SearchBar onSearch={handleSearch} />,
    [handleSearch]
  );

  return (
    <div className={css.page}>
      {searchBarMemo}
      {isLoading && <b className={css.loading}>Is loading movies...</b>}
      {error ? <b className={css.error}>HTTP error</b> : <MovieList movies={movies} />}
    </div>
  );
}
