import React from "react";
import Pagination from "./Pagination";

const DataTable = ({ columns, data, page, totalPages, handlePage}) => {
  if (!columns?.length || !data?.length) {
  return (
    <p className="text-gray-500 h-[70vh] flex items-center justify-center">
      No data
    </p>
  );
}

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-0 border border-black/5 rounded-xl min-w-full">
          <thead className="bg-black/90 text-white">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`font-normal text-sm text-nowrap px-3 py-5 md:py-4 w-fit 
                    ${col.headerClassName || "text-left"} 
                    // Apply top-left and top-right radius to the header cells.
                    ${index === 0 ? "rounded-tl-xl" : ""}
                    ${index === columns.length - 1 ? "rounded-tr-xl" : ""}
                  `}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {data?.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`text-sm text-nowrap hover:bg-black/5 ${
                  rowIndex % 2 !== 0 ? "bg-black/5 md:bg-mainBg" : ""
                }`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-3 py-4 border-t border-black/3 ${
                      col.cellClassName || ""
                    }
                    // Apply bottom-left and bottom-right radius to the cells of the very last row.
                    ${
                      rowIndex === data.length - 1 && colIndex === 0
                        ? "rounded-bl-xl"
                        : ""
                    }
                    ${
                      rowIndex === data.length - 1 &&
                      colIndex === columns.length - 1
                        ? "rounded-br-xl"
                        : ""
                    }
                  `}
                  >
                    {col.cell(item, rowIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination
          page={page}
          totalPages={totalPages}
          handlePage={handlePage}
        />
    </>
  );
};

export default DataTable;
