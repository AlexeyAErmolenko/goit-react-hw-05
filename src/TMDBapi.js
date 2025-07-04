import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzBiNTczYzdkNjY4ODBmMWYxYWRjZTZlOTgxMjdlZSIsIm5iZiI6MTc1MTE4OTI5Mi4xMDIwMDAyLCJzdWIiOiI2ODYxMDcyYzZlYjE1ZDZhYzE5MTVhMWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Pf2HfIhGNMlgCFqEVIg9QYrYnTcVUj_m9wN-xrmpx-Q";
axios.defaults.headers.common["Content-Type"] = "application/json";

export const fetchSearch = async (movieId, query, details) => {
  let urlPlus = "trending/movie/day";

  if (query) {
    urlPlus = `search/movie?query='${query}'`;
  }

  if (movieId && !details) {
    urlPlus = `/movie/${movieId}`;
    return await axios.get(`${urlPlus}`);
  }
  if (movieId && details) {
    urlPlus = `/movie/${movieId}/${details}`;
    if (details === "credits") {
      return await axios.get(`${urlPlus}`);
    }
  }

  const response = await axios.get(`${urlPlus}`);
  return response.data.total_results ? response.data.results : null;
};
