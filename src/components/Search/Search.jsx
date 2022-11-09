import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { searchMovie } from "../../features/categorySlice";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };
  return (
    <div className="bg-white px-1">
      <SearchIcon />
      <input
        placeholder="search... "
        className="p-2"
        onKeyPress={handleKeyPress}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
