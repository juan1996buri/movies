import { Rating } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const Movie = ({ movie }) => {
  return (
    <NavLink to={`/movie/${movie.id}`}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "https://fillmurray.com/200/300"
        }
        alt=""
        className="h-80 object-cover hover:scale-105 transition-all rounded-lg  "
      />
      <h1>{movie.title}</h1>
      <Rating readOnly value={movie.vote_average / 2} />
    </NavLink>
  );
};

export default Movie;
