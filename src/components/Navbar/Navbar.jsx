import React from "react";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { activeMenu, addWidth } from "../../features/menuSlice";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const widthMenu = useSelector((state) => state.currentMenu.width);
  const isActiveMenu = useSelector((state) => state.currentMenu.active);

  const handleMenu = () => {
    dispatch(activeMenu(!isActiveMenu));
  };
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      dispatch(addWidth(window.innerWidth));
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    resizeListener();
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => dispatch(addWidth(window.innerWidth));
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize());
  }, [dispatch]);
  useEffect(() => {
    if (widthMenu <= 900) {
      dispatch(activeMenu(false));
    } else {
      dispatch(activeMenu(true));
    }
  }, [widthMenu, dispatch]);

  return (
    <div className="flex justify-between px-2  h-16 items-center">
      <button
        onClick={handleMenu}
        className={" hover:bg-slate-500 rounded-full h-8 w-8 transition-all "}>
        <MenuIcon className="text-white" />
      </button>
      <div>
        <Search />
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
