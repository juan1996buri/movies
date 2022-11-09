import React from "react";
import { CircularProgress } from "@mui/material";
import FeaturedMovie from "../FeaturedMovie/FeaturedMovie";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import { useGetMoviesQuery } from "../../services/TMDB";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
const Movies = () => {
  const [page, setPage] = useState(1);

  const categorieName = useSelector(
    (state) => state.currentCategory.categoryName
  );
  const searchQuery = useSelector((state) => state.currentCategory.searchQuery);

  console.log("golla");
  useEffect(() => {
    setPage(1);
  }, []);
  const { data, isSuccess, isLoading, error } = useGetMoviesQuery({
    page,
    searchQuery,
    categorieName,
  });

  if (data && !data.results.length) {
    return (
      <h1 className="font-bold">
        No Movies that match that name.
        <br />
        Please search for something else
      </h1>
    );
  }
  if (error) return "An error has occured.";

  const numberOfMovies = 19;
  if (isLoading) {
    return (
      <h1>
        <CircularProgress />
      </h1>
    );
  }

  if (isSuccess) {
    return (
      <div>
        <FeaturedMovie movie={data.results[0]} />
        <MovieList movies={data} first limit={numberOfMovies} />
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={data.total_pages}
        />
      </div>
    );
  }
};

export default Movies;
