import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../services/TMDB";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  Favorite,
  ArrowBack,
} from "@mui/icons-material";
import genreIcons from "../../assets/genres/index";
import { Button, ButtonGroup, Modal, Rating } from "@mui/material";
import MovieList from "../MovieList/MovieList";
import { useState } from "react";

const MovieInfo = () => {
  const id = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  const { data, isLoading, isSuccess, isError } = useGetMovieQuery(id);
  const { data: recommendations } = useGetRecommendationsQuery({
    id,
    list: "/recommendations",
  });
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <h1 className="h-screen flex justify-center">loading...</h1>;
  }

  if (isError) {
    return <h1 className="h-screen flex justify-center">it is error...</h1>;
  }

  if (isSuccess) {
    return (
      <div className="">
        <div className="flex flex-col md:flex-row px-2 text-white opacity-75">
          <div className="flex justify-center md:pl-2 ">
            <img
              src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
              alt=""
              className={
                data.poster_path
                  ? "w-[30rem] shadow-2xl hover:scale-105 transition-all"
                  : "w-[20rem] shadow-2xl"
              }
            />
          </div>
          <div className="flex flex-col justify-center md:pl-10 w-full ">
            <h3 className="font-bold text-3xl text-center">
              {data.title} {data.release_date.split("-")[0]}
            </h3>
            <h3 className="pt-2">{data.tagline}</h3>
            <div className="flex  justify-between px-20 pt-2 ">
              <div className="flex gap-2">
                <Rating readOnly value={data.vote_average / 2} />
                <h3>{data.vote_average}/10</h3>
              </div>
              <div className="gap-2">
                <h3>
                  {data.runtime} min | Lenguage
                  {data.spoken_languages[0].english_name}
                </h3>
              </div>
            </div>
            <div className="flex justify-between  pt-5 px-10 ">
              {data.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="flex items-center gap-2 flex-wrap  ">
                  <img
                    src={genreIcons[genre.name.toLowerCase()]}
                    alt=""
                    className="w-8 invert"
                  />
                  <h3>{genre.name}</h3>
                </div>
              ))}
            </div>
            <div className="text-start flex flex-col gap-2">
              <h2 className="font-bold text-2xl">Overview</h2>
              <p>{data.overview}</p>
              <h2 className="font-bold text-2xl">Top Cast</h2>
              <div className=" min-w-min flex gap-2 flex-wrap">
                {data.credits.cast
                  .map(
                    (character, i) =>
                      character.profile_path && (
                        <Link key={i} to={`/actors/${character.id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                            alt=""
                            className="w-24 h-32 rounded-md object-fill hover:scale-y-105 transition-all"
                          />
                          <h2 className="w-min">{character.name}</h2>
                        </Link>
                      )
                  )
                  .slice(0, 6)}
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <ButtonGroup size="small" variant="outlined">
                  <Button>
                    WENSITE <Language />
                  </Button>
                  <Button>
                    IMDB <MovieIcon />
                  </Button>

                  {data.videos.results[0] && (
                    <Button onClick={() => setOpen(true)} href="#">
                      TRAILER <Theaters />
                    </Button>
                  )}
                </ButtonGroup>
                <ButtonGroup size="small" variant="outlined">
                  <Button>
                    FAVORITE <Favorite />
                  </Button>
                  <Button>WATCHLIST +1</Button>
                  <Button onClick={() => navigate(-1)}>
                    BACK <ArrowBack />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center py-4 text-white opacity-70">
          You might also like
        </h1>

        {recommendations ? (
          <div className="pt-20">
            <MovieList movies={recommendations} />
          </div>
        ) : (
          <h2>Sorry, nothing was found</h2>
        )}

        {open && (
          <Modal
            closeAfterTransition
            open={open}
            onClose={() => setOpen(false)}
            className={"flex items-center justify-center "}>
            {data?.videos?.results?.length > 0 && (
              <iframe
                autoPlay
                frameBorder="0"
                title="Trailer"
                src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                allow="autoplay"
                className="lg:w-[50%] lg:h-[50%] md:w-[70%] md:h-[50%] sm:w-[80%] sm:h-[50%] w-[90%] h-[40%]"
              />
            )}
          </Modal>
        )}
      </div>
    );
  }
};

export default MovieInfo;
