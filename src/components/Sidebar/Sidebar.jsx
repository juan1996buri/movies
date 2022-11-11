import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import genreIcons from "../../assets/genres";
import { useGetGenresQuery } from "../../services/TMDB";
import { selectCategory } from "../../features/categorySlice";
import { Close } from "@mui/icons-material";
import { activeMenu } from "../../features/menuSlice";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading } = useGetGenresQuery();
  const isActiveMenu = useSelector((state) => state.currentMenu.active);
  const widthMenu = useSelector((state) => state.currentMenu.width);

  if (isLoading) {
    return <h1 className="h-screen">cargando...</h1>;
  }
  const handleLink = (value) => {
    if (widthMenu <= 900) {
      dispatch(activeMenu(false));
    }
    dispatch(selectCategory(value));
  };
  const handleMenu = () => {
    dispatch(activeMenu(!isActiveMenu));
  };
  if (isSuccess) {
    return (
      <div className="overflow-auto h-screen  ">
        <div className="relative pt-2 flex justify-center  ">
          <NavLink to={"/"}>
            <img
              src="https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png"
              alt=""
              className="w-56"
            />
          </NavLink>
          <button
            className="bg-slate-500 w-min rounded-full text-white absolute top-0 right-0 mt-1 md:hidden "
            onClick={handleMenu}>
            <Close />
          </button>
        </div>

        <div className="px-5">
          <h1 className="py-3 text-slate-400 font-semibold text-2xl">
            Categories
          </h1>
          <div className="flex flex-col gap-2">
            {categories.map((categorie) => (
              <NavLink
                to={`/categories/${categorie.label}`}
                onClick={() => handleLink(categorie.value)}
                key={categorie.label}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-500 p-2 flex gap-2 py-1 items-center rounded-lg text-white "
                    : "p-2 flex gap-2 py-1  items-center hover:bg-blue-600 rounded-lg text-slate-400 hover:text-white"
                }>
                <img
                  className="w-10 invert opacity-70"
                  src={genreIcons[categorie.label.toLowerCase()]}
                  alt=""
                />
                <h1>{categorie.label}</h1>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="px-5">
          <h1 className="py-3  text-slate-400 font-semibold text-2xl">
            Genres
          </h1>
          <div className="flex flex-col gap-2">
            {data.genres.map((genre) => (
              <NavLink
                onClick={() => handleLink(genre.id)}
                to={`/genre/${genre.name}`}
                key={genre.id}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-500 p-2 flex gap-2 py-1 items-center rounded-lg text-white "
                    : "p-2 flex gap-2 py-1  items-center hover:bg-blue-600 rounded-lg text-slate-400 hover:text-white"
                }>
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  alt=""
                  className="w-10 invert opacity-70"
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
