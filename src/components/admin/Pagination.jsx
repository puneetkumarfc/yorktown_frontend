import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({ page, totalPages, handlePage }) => {
  return (
    <div className="flex justify-end mt-4 items-center animate-fadein gap-2">
      <button
        onClick={() => handlePage(page - 1)}
        disabled={page === 1}
        className="rounded-full text-black/50"
      >
        <IoIosArrowBack />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`py-1 px-3 rounded-full ${
            page === i + 1 ? "bg-black/90 text-white" : "text-black/90"
          }`}
          onClick={() => handlePage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => handlePage(page + 1)}
        disabled={page === totalPages}
        className="rounded-full text-black/50"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
