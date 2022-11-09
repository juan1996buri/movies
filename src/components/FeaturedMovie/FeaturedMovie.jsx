import React from "react";
import { NavLink } from "react-router-dom";
import cinema from "../../assets/images/cinema.png";

const FeaturedMovie = ({ movie }) => {
  return (
    <NavLink to={`/movie/${movie.id}`} className="relative   ">
      <img
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
            : cinema
        }
        alt=""
        className="relative overflow-hidden h-screen  pb-24 w-full px-2   hover:scale-105 transition-all rounded-lg "
      />
      <div className="w-96 absolute top-60 pl-7 text-white">
        <h1>{movie.title}</h1>
        <p>{movie.overview.slice(0, 400)}...</p>
      </div>
    </NavLink>
  );
};

export default FeaturedMovie;
