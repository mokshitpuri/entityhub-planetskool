import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ 
  filters = {},
  onFiltersChange = () => {},
  onClearFilters = () => {},
  isVisible = true,
  className = ''
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'education', label: 'Education' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'nonprofit', label: 'Non-Profit' },
    { value: 'government', label: 'Government' },
    { value: 'sports', label: 'Sports & Recreation' },
    { value: 'arts', label: 'Arts & Culture' },
    { value: 'business', label: 'Business' },
    { value: 'community', label: 'Community' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'geographical', label: 'Geographical' },
    { value: 'political', label: 'Political' },
    { value: 'custom', label: 'Custom' }
  ];

  const activityOptions = [
    { value: '', label: 'All Activity Levels' },
    { value: 'high', label: 'High Activity' },
    { value: 'medium', label: 'Medium Activity' },
    { value: 'low', label: 'Low Activity' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'alphabetical', label: 'A to Z' },
    { value: 'members', label: 'Most Members' },
    { value: 'activity', label: 'Most Active' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      category: '',
      type: '',
      activity: '',
      sort: 'relevance'
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    return Object.entries(localFilters)?.filter(([key, value]) => 
      value && value !== '' && key !== 'sort'
    )?.length;
  };

  const activeFilterCount = getActiveFilterCount();

  if (!isVisible) return null;

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 space-y-4 ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-foreground" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            iconSize={14}
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Search Filter */}
      <div>
        <Input
          type="search"
          placeholder="Search entities..."
          value={localFilters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Category Filter */}
      <div>
        <Select
          label="Category"
          options={categoryOptions}
          value={localFilters?.category || ''}
          onChange={(value) => handleFilterChange('category', value)}
          placeholder="Select category"
        />
      </div>
      {/* Type Filter */}
      <div>
        <Select
          label="Entity Type"
          options={typeOptions}
          value={localFilters?.type || ''}
          onChange={(value) => handleFilterChange('type', value)}
          placeholder="Select type"
        />
      </div>
      {/* Activity Level Filter */}
      <div>
        <Select
          label="Activity Level"
          options={activityOptions}
          value={localFilters?.activity || ''}
          onChange={(value) => handleFilterChange('activity', value)}
          placeholder="Select activity level"
        />
      </div>
      {/* Sort Options */}
      <div>
        <Select
          label="Sort By"
          options={sortOptions}
          value={localFilters?.sort || 'relevance'}
          onChange={(value) => handleFilterChange('sort', value)}
        />
      </div>
      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(localFilters)?.map(([key, value]) => {
              if (!value || value === '' || key === 'sort') return null;
              
              const getFilterLabel = (key, value) => {
                switch (key) {
                  case 'search':
                    return `Search: "${value}"`;
                  case 'category':
                    return categoryOptions?.find(opt => opt?.value === value)?.label || value;
                  case 'type':
                    return typeOptions?.find(opt => opt?.value === value)?.label || value;
                  case 'activity':
                    return activityOptions?.find(opt => opt?.value === value)?.label || value;
                  default:
                    return value;
                }
              };

              return (
                <div
                  key={key}
                  className="flex items-center space-x-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                >
                  <span>{getFilterLabel(key, value)}</span>
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={10} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;