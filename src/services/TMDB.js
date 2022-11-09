import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = "09c3bdab6727d32cfc72a1bfb4e45313";

export const tmdApi = createApi({
  reducerPath: "tmdApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${API}&language=en-US`,
    }),
    getMovies: builder.query({
      query: ({ page, searchQuery, categorieName }) => {
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${API}`;
        }

        if (categorieName && typeof categorieName === "string") {
          return `movie/${categorieName}/?page=${page}&api_key=${API}`;
        }
        // ! get Movies by Id
        if (categorieName && typeof categorieName === "number") {
          return `discover/movie?with_genres=${categorieName}&page=${page}&api_key=${API}`;
        }
        return `/movie/popular?page=${page}&api_key=${API}`;
      },
    }),
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${API}`,
    }),
    getRecommendations: builder.query({
      query: ({ id, list }) => `/movie/${id}/${list}?api_key=${API}`,
    }),
    getActor: builder.query({
      query: (id) => `/person/${id}?api_key=${API}`,
    }),
    getMoviesByActor: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${API}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorQuery,
} = tmdApi;
