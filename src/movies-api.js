import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const keyAuthorization =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODgxZDhmZWE2MzEzN2M5ZjY1YzZkYTczYzlhZjE3OSIsIm5iZiI6MTcyMTkwNjA2My42NDc5NDcsInN1YiI6IjY2YTBjNjU1YTlmOGZhNTkzZjUyOWNhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-ZHB8ejXpXQ2vmwrFd60ePTwFvAUIvgutx9Zj7UfHYM";

// export const getMovies = async () => {
//   const response = await axios.get("/movies");
//   return response.data;
// };

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get("/trending/movie/day", {
      headers: {
        Authorization: `Bearer ${keyAuthorization}`,
      },
      params: {
        language: "en-US",
      },
    });
    return response.data.results;
  } catch (e) {
    console.error("Error fetching trending movies:", e);
    throw e;
  }
};

export const getFilmByQuery = async (query) => {
  try {
    const film = await axios(`/search/movie`, {
      headers: {
        Authorization: `Bearer ${keyAuthorization}`,
      },
      params: {
        query,
      },
    });
    return film.data.results;
  } catch (e) {
    console.error("Error fetching films by query:", e);
    throw e;
  }
};

export const getFilmAllInfo = async (id) => {
  try {
    const film = await axios(`/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${keyAuthorization}`,
      },
    });
    return film.data;
  } catch (e) {
    console.error("Error fetching film all info:", e);
    throw e;
  }
};

export const getFilmByCredits = async (id) => {
  try {
    const film = await axios(`/movie/${id}/credits`, {
      headers: {
        Authorization: `Bearer ${keyAuthorization}`,
      },
    });
    return film.data;
  } catch (e) {
    console.error("Error fetching film credits:", e);
    throw e;
  }
};

export const getFilmByReviews = async (id) => {
  try {
    const film = await axios(`/movie/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${keyAuthorization}`,
      },
    });
    return film.data;
  } catch (e) {
    console.error("Error fetching film reviews:", e);
    throw e;
  }
};

// export const getFullImageUrl = (path) => {
//   return `https://image.tmdb.org/t/p/w500${path}`;
// };
