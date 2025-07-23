import React from 'react';

const DataTable = ({ columns, data }) => {
  
    if (!columns || !data) {
        return <p className="p-4 text-center text-gray-500">No data or column configuration provided.</p>;
    }

  return (
    <div className="mt-4 rounded-xl overflow-x-auto border border-gray-100">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-black/90 text-white">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`font-normal text-sm text-nowrap px-3 py-5 md:py-4 w-fit ${col.headerClassName || 'text-left'}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-gray-100 text-sm ${
                rowIndex % 2 !== 0 ? "bg-gray-100 md:bg-transparent" : ""
              } px-5 py-3 text-nowrap rounded-xl hover:bg-gray-50`}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`px-3 py-4 ${col.cellClassName || ''}`}>
                  {col.cell(item, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;