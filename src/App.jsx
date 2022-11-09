import React from "react";
import { Route, Routes } from "react-router-dom";
import Actors from "./components/Actors/Actors";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import Movies from "./components/Movies/Movies";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div className="flex">
      <div className="w-72 fixed bg-slate-50" style={{ zIndex: "100" }}>
        <Sidebar />
      </div>
      <div className="pl-72 w-full">
        <div className="fixed h-16 w-full pr-72 " style={{ zIndex: "100" }}>
          <Navbar />
        </div>
        <div className="pt-20">
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
