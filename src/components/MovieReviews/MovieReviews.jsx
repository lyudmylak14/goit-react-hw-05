import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmByReviews } from "../../movies-api";
import css from "./MovieReviews.module.css"

export default function MovieReviews() {
  const { moviesId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getFilmByReviews(moviesId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReviews();
  }, [moviesId]);

  return (
    <>
      {isLoading && <b className={css.loading}>Is loading reviews...</b>}
      {error ? (
        <b className={css.error}>Error fetching film reviews</b>
      ) : (
        <ul>
          {reviews.map(({ author, content, id }) => (
            <li key={id}>
              <p>Author : {author}</p>
              <p>Content: {content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
