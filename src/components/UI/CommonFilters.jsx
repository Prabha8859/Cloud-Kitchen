import React from 'react';
import { Search, Filter, LayoutGrid, List, X } from 'lucide-react';
import Input from './Input';

export default function CommonFilters({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onClearFilters,
  viewMode,
  onViewChange,
  placeholder = "Search...",
  showStatusFilter = true,
  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Blocked', label: 'Blocked' }
  ]
}) {
  const hasActiveFilters = searchTerm || (filterStatus && filterStatus !== 'all');

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      {/* Search Section */}
      <div className="w-full sm:max-w-md relative">
        <Input
          icon={Search}
          placeholder={placeholder}
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full"
        />
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Clear Filters Button */}
        {hasActiveFilters && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors whitespace-nowrap"
          >
            <X size={16} />
            Clear
          </button>
        )}

        {/* Filter Dropdown */}
        {showStatusFilter && (
          <div className="relative min-w-[150px] flex-1 sm:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-slate-400" />
            </div>
            <select
              value={filterStatus}
              onChange={onFilterChange}
              className="pl-10 pr-8 py-2.5 w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none cursor-pointer text-slate-600 dark:text-slate-200"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* View Toggle */}
        {onViewChange && (
          <div className="flex items-center bg-slate-100 dark:bg-slate-700/50 rounded-lg p-1 border border-slate-200 dark:border-slate-600 shrink-0">
            <button
              onClick={() => onViewChange('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-600 text-orange-500 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title="List View"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => onViewChange('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-600 text-orange-500 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}