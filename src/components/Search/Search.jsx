import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { searchMovie } from "../../features/categorySlice";
import { useLocation } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };

  if (location.pathname !== "/") {
    return null;
  }
  return (
    <div className="bg-slate-300 px-1 rounded-md">
      <SearchIcon />
      <input
        placeholder="search... "
        className="p-2 bg-slate-300 opacity-75"
        onKeyPress={handleKeyPress}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
