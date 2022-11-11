import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Actors from "./components/Actors/Actors";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import Movies from "./components/Movies/Movies";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const isActiveMenu = useSelector((state) => state.currentMenu.active);
  return (
    <div className="flex bg-slate-900">
      {isActiveMenu && (
        <div className="w-72 fixed bg-slate-800 " style={{ zIndex: "1000" }}>
          <Sidebar />
        </div>
      )}

      <div className={`w-full  ${isActiveMenu && "md:pl-72"}`}>
        <div
          className={` fixed h-16 w-full bg-slate-700 ${
            isActiveMenu && "md:pr-72"
          }`}
          style={{ zIndex: "100" }}>
          <Navbar />
        </div>
        <div className="pt-20  ">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieInfo />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/categories/:id" element={<Movies />} />
            <Route path="/genre/:id" element={<Movies />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
