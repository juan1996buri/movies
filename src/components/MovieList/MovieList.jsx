import React from "react";
import Movie from "../Movie/Movie";

const MovieList = ({ movies, first, limit }) => {
  const start = first ? 1 : 0;
  return (
    <div className="grid grid-cols-1 gap-3 -mt-20 px-2  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {movies.results
        .map((movie) => <Movie key={movie.id} movie={movie} />)
        .slice(start, limit)}
    </div>
  );
};

export default MovieList;
