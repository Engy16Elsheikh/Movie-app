 // tmdb.js
const apiKey = '5c49d5b8c4f927977ee242b71121cb0b';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const getPopularMovies = async (language) => {
  const url = `${apiBaseUrl}/movie/popular?api_key=${apiKey}&language=${language}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  const url = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};


