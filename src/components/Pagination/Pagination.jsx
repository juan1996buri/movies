import React from "react";

const Pagination = ({ page, setPage, totalPage }) => {
  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex gap-4 justify-center pb-10 pt-8">
      <button
        onClick={handlePrev}
        className={
          "bg-blue-500 rounded-full  w-8 h-8  text-white flex justify-center items-center"
        }>
        <h3 className="text-3xl pb-1">-</h3>
      </button>
      <h1 className={"p-2 w-8 h-8 flex items-center justify-center  text-2xl"}>
        {page}
      </h1>
      <button
        onClick={handleNext}
        className={
          "bg-blue-500 rounded-full  w-8 h-8  text-white flex justify-center items-center"
        }>
        <h3 className="text-2xl pb-1">+</h3>
      </button>
    </div>
  );
};

export default Pagination;
