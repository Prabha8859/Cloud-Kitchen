import React from 'react';
import PropTypes from 'prop-types';
import { Inbox } from 'lucide-react';

export default function Table({ 
  columns, 
  data, 
  onRowClick, 
  isLoading = false,
  emptyMessage = "No data available" 
}) {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-700/30 border-b border-slate-200 dark:border-slate-700">
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className={`px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {isLoading ? (
              // Loading Skeleton
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                    <Inbox className="w-12 h-12 mb-3 opacity-50" strokeWidth={1.5} />
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              // Data Rows
              data.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex} 
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`
                    group transition-colors duration-200
                    ${onRowClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30' : ''}
                  `}
                >
                  {columns.map((col, colIndex) => (
                    <td 
                      key={`${rowIndex}-${colIndex}`} 
                      className={`px-6 py-4 text-sm text-slate-600 dark:text-slate-300 ${col.className || ''}`}
                    >
                      {col.render ? col.render(row) : (
                        <span className="truncate block max-w-xs">
                          {row[col.accessor]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string.isRequired,
    accessor: PropTypes.string,
    render: PropTypes.func,
    className: PropTypes.string,
  })).isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  isLoading: PropTypes.bool,
  emptyMessage: PropTypes.string,
};