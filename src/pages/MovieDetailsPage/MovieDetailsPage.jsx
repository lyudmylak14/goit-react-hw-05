import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmAllInfo } from "../../movies-api";

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
      <h1>{movie.title}</h1>
      {movie.poster_path && (
        <img
          src={`${baseImageUrl}${movie.poster_path}`}
          alt={movie.title}
          width="200"
        />
      )}
      <p>{movie.overview}</p>
    </div>
  );
}
