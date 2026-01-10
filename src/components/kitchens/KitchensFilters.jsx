import { Download } from 'lucide-react';
import Button from '../UI/Button';
import CommonFilters from '../UI/CommonFilters';

export default function KitchensFilters({ 
  filterStatus, 
  setFilterStatus, 
  searchTerm, 
  setSearchTerm,
  onExport,
  viewMode,
  setViewMode,
  onClearFilters
}) {
  const statusOptions = [
    { value: 'all', label: 'All Kitchens' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <CommonFilters
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      filterStatus={filterStatus}
      onFilterChange={(e) => setFilterStatus(e.target.value)}
      onClearFilters={onClearFilters}
      viewMode={viewMode}
      onViewChange={setViewMode}
      placeholder="Search kitchens or society..."
      statusOptions={statusOptions}
      actionButton={
        <Button 
          variant="secondary" 
          icon={Download}
          onClick={onExport}
          className="whitespace-nowrap"
        >
          Export
        </Button>
      }
    />
  );
}