import React from "react";
import {
  AppBar,
  IconButton,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import Search from "../Search/Search";

const Navbar = () => {
  return (
    <div className="flex justify-between px-2 bg-blue-400 h-16 items-center">
      <div>x</div>
      <div>
        <Search />
      </div>
      <div className="flex gap-2 items-center">
        <h2>Login</h2>
        <Avatar />
      </div>
    </div>
  );
};

export default Navbar;
