import { Search, Filter, Download } from 'lucide-react';
import Button from '../UI/Button';
import Input from '../UI/Input';

export default function KitchensFilters({ 
  filterStatus, 
  setFilterStatus, 
  searchTerm, 
  setSearchTerm,
  onExport 
}) {
  const statusOptions = [
    { value: 'all', label: 'All Kitchens' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-5 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Filter className="w-5 h-5" />
            <span className="font-semibold text-sm">Filter:</span>
          </div>
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => setFilterStatus(option.value)}
              variant={filterStatus === option.value ? 'primary' : 'ghost'}
              size="sm"
              className={filterStatus !== option.value ? 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600' : ''}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Search and Export */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            icon={Search}
            type="text"
            placeholder="Search kitchens or society..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 lg:w-72"
          />
          <Button 
            variant="secondary" 
            icon={Download}
            onClick={onExport}
            className="whitespace-nowrap"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}