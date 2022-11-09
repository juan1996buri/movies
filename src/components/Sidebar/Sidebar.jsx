import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import genreIcons from "../../assets/genres";

import {
  Divider,
  List,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  useTheme,
  ListItemButton,
} from "@mui/material";
import { useGetGenresQuery } from "../../services/TMDB";
import { selectCategory } from "../../features/categorySlice";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading } = useGetGenresQuery();
  if (isLoading) {
    return <h1>cargando...</h1>;
  }
  const handleLink = (value) => {
    dispatch(selectCategory(value));
  };
  if (isSuccess) {
    return (
      <div className="overflow-auto h-screen">
        <NavLink to={"/"}>
          <img
            src="https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png"
            alt=""
          />
        </NavLink>
        <div className="px-5">
          <h1 className="py-3">categories</h1>
          <div className="flex flex-col gap-2">
            {categories.map((categorie) => (
              <NavLink
                to={`/categories/${categorie.label}`}
                key={categorie.label}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-400 p-2 flex gap-2 py-1 items-center rounded-lg"
                    : "p-2 flex gap-2 py-1 bg-slate-100 items-center hover:bg-yellow-300 rounded-lg"
                }>
                <img
                  className="w-10"
                  src={genreIcons[categorie.label.toLowerCase()]}
                  alt=""
                />
                <h1>{categorie.label}</h1>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="px-5">
          <h1 className="py-3">Genres</h1>
          <div className="flex flex-col gap-2">
            {data.genres.map((genre) => (
              <NavLink
                onClick={() => handleLink(genre.id)}
                to={`/genre/${genre.name}`}
                key={genre.id}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-400 p-2 flex gap-2 py-1 items-center rounded-lg"
                    : "p-2 flex gap-2 py-1 bg-slate-100 items-center hover:bg-yellow-300 rounded-lg"
                }>
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  alt=""
                  className="w-10"
                />
                <h2>{genre.name}</h2>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Sidebar;
