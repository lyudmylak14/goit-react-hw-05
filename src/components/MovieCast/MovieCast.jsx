import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmByCredits } from "../../movies-api";

export default function MovieCast() {
  const { moviesId } = useParams();
  console.log(moviesId);

  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const getMovieCredits = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getFilmByCredits(moviesId);
        setCasts(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCredits();
  }, [moviesId]);
  console.log(casts);
  return (
    <>
      {isLoading && <b>Is loading casts...</b>}
      {error ? (
        <b>HTTP error</b>
      ) : (
        <ul>
          {casts.map(({ character, original_name, profile_path, id }) => (
            <li key={id}>
              <img
                src={`${baseImageUrl}${profile_path}`}
                alt={original_name}
                width="100"
              />
              <p>{original_name}</p>
              <p>{character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
