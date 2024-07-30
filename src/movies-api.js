import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const keyAuthorization =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODgxZDhmZWE2MzEzN2M5ZjY1YzZkYTczYzlhZjE3OSIsIm5iZiI6MTcyMTkwNjA2My42NDc5NDcsInN1YiI6IjY2YTBjNjU1YTlmOGZhNTkzZjUyOWNhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-ZHB8ejXpXQ2vmwrFd60ePTwFvAUIvgutx9Zj7UfHYM";

axios.defaults.headers.common["Authorization"] = `Bearer ${keyAuthorization}`;

export const getTrendingMovies = async () => {
  const response = await axios("/trending/movie/day");
  return response.data.results;
};

export const getFilmByQuery = async (query) => {
  const film = await axios(`/search/movie`, {
    params: {
      query,
    },
  });
  console.log(film.data.results);
  console.log(query);
  return film.data.results;
};

export const getFilmAllInfo = async (id) => {
  const film = await axios(`/movie/${id}`);
  return film.data;
};

export const getFilmByCredits = async (id) => {
  const film = await axios(`/movie/${id}/credits`);
  return film.data.cast;
};

export const getFilmByReviews = async (id) => {
  const film = await axios(`/movie/${id}/reviews`);
  return film.data.results;
};
