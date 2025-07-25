import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({ page, totalPages, handlePage }) => {
  const maxVisiblePages = 5;
  
  // Calculate the range of pages to show
  const getPageRange = () => {
    if (totalPages <= maxVisiblePages) {
      // If total pages is less than or equal to max visible, show all
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, page - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  
  const pageRange = getPageRange();
  const showFirstPage = pageRange[0] > 1;
  const showLastPage = pageRange[pageRange.length - 1] < totalPages;
  const showFirstEllipsis = pageRange[0] > 2;
  const showLastEllipsis = pageRange[pageRange.length - 1] < totalPages - 1;
  
  return (
    <div className="flex justify-end mt-4 items-center animate-fadein gap-2">
      {/* Previous button */}
      <button
        onClick={() => handlePage(page - 1)}
        disabled={page === 1}
        className="rounded-full text-black/50 disabled:opacity-30"
      >
        <IoIosArrowBack />
      </button>
      
      {/* First page */}
      {showFirstPage && (
        <>
          <button
            className={`py-1 px-3 rounded-full ${
              page === 1 ? "bg-black/90 text-white" : "text-black/90"
            }`}
            onClick={() => handlePage(1)}
          >
            1
          </button>
          {showFirstEllipsis && (
            <span className="px-2 text-black/50">...</span>
          )}
        </>
      )}
      
      {/* Page range */}
      {pageRange.map((pageNum) => (
        <button
          key={pageNum}
          className={`py-1 px-3 rounded-full ${
            page === pageNum ? "bg-black/90 text-white" : "text-black/90"
          }`}
          onClick={() => handlePage(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      
      {/* Last page */}
      {showLastPage && (
        <>
          {showLastEllipsis && (
            <span className="px-2 text-black/50">...</span>
          )}
          <button
            className={`py-1 px-3 rounded-full ${
              page === totalPages ? "bg-black/90 text-white" : "text-black/90"
            }`}
            onClick={() => handlePage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      
      {/* Next button */}
      <button
        onClick={() => handlePage(page + 1)}
        disabled={page === totalPages}
        className="rounded-full text-black/50 disabled:opacity-30"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
