import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EntityFilters = ({ onFiltersChange = () => {}, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: activeFilters?.search || '',
    category: activeFilters?.category || '',
    status: activeFilters?.status || '',
    activityLevel: activeFilters?.activityLevel || '',
    dateRange: activeFilters?.dateRange || ''
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'education', label: 'Education' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'nonprofit', label: 'Non-Profit' },
    { value: 'government', label: 'Government' },
    { value: 'community', label: 'Community' }
  ];

  const statuses = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'archived', label: 'Archived' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const activityLevels = [
    { value: '', label: 'All Activity Levels' },
    { value: 'high', label: 'High Activity' },
    { value: 'medium', label: 'Medium Activity' },
    { value: 'low', label: 'Low Activity' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const dateRanges = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      status: '',
      activityLevel: '',
      dateRange: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value !== '')?.length;
  };

  const getFilterChips = () => {
    const chips = [];
    if (filters?.category) {
      const category = categories?.find(c => c?.value === filters?.category);
      chips?.push({ key: 'category', label: category?.label || filters?.category });
    }
    if (filters?.status) {
      const status = statuses?.find(s => s?.value === filters?.status);
      chips?.push({ key: 'status', label: status?.label || filters?.status });
    }
    if (filters?.activityLevel) {
      const activity = activityLevels?.find(a => a?.value === filters?.activityLevel);
      chips?.push({ key: 'activityLevel', label: activity?.label || filters?.activityLevel });
    }
    if (filters?.dateRange) {
      const dateRange = dateRanges?.find(d => d?.value === filters?.dateRange);
      chips?.push({ key: 'dateRange', label: dateRange?.label || filters?.dateRange });
    }
    return chips;
  };

  const removeFilterChip = (key) => {
    handleFilterChange(key, '');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      {/* Search and Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <Input
              type="search"
              placeholder="Search entities by name, description, or admin..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Advanced Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          </Button>

          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              iconName="X"
              iconPosition="left"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters?.category}
              onChange={(e) => handleFilterChange('category', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories?.map(category => (
                <option key={category?.value} value={category?.value}>
                  {category?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters?.status}
              onChange={(e) => handleFilterChange('status', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses?.map(status => (
                <option key={status?.value} value={status?.value}>
                  {status?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
            <select
              value={filters?.activityLevel}
              onChange={(e) => handleFilterChange('activityLevel', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {activityLevels?.map(level => (
                <option key={level?.value} value={level?.value}>
                  {level?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={filters?.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {dateRanges?.map(range => (
                <option key={range?.value} value={range?.value}>
                  {range?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {/* Active Filter Chips */}
      {getFilterChips()?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-600">Active Filters:</span>
          {getFilterChips()?.map((chip) => (
            <span
              key={chip?.key}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {chip?.label}
              <button
                onClick={() => removeFilterChip(chip?.key)}
                className="ml-2 hover:text-blue-600"
              >
                <Icon name="X" size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntityFilters;