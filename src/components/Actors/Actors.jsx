import { ArrowBack } from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetActorQuery,
  useGetMoviesByActorQuery,
} from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";

const Actors = () => {
  const id = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetActorQuery(id);
  const [page, setPage] = useState(1);
  const { data: movies } = useGetMoviesByActorQuery({ id, page });
  if (isLoading) {
    return <h1 className="h-screen">Loading...</h1>;
  }
  if (isSuccess) {
    return (
      <div>
        <div className="flex text-white">
          <div className="p-10">
            <img
              src={`https://image.tmdb.org/t/p/w780/${data.profile_path}`}
              alt=""
              className="w-[30rem]"
            />
          </div>
          <div className="w-full opacity-75">
            <h1 className="text-3xl py-2">{data.name}</h1>
            <h3 className="text-2xl py-1">
              Born: {new Date(data.birthday).toDateString()}{" "}
            </h3>
            <p>{data.biography}</p>
            <div className="flex justify-between px-32 pt-10">
              <button className="bg-blue-400 p-2 rounded-md shadow-2xl">
                IMDB
              </button>
              <button
                onClick={() => navigate(-1)}
                className="text-blue-400 font-bold">
                <ArrowBack />
                BACK
              </button>
            </div>
          </div>
        </div>
        <h1 className="pb-28">Movies</h1>
        {movies && <MovieList movies={movies} />}
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </div>
    );
  }
};

export default Actors;
