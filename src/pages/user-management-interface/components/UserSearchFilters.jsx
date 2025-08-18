import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const UserSearchFilters = ({ 
  onSearch = () => {},
  onFilter = () => {},
  onClearFilters = () => {},
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    joinDateRange: '',
    entityAffiliation: '',
    activityLevel: ''
  });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'banned', label: 'Banned' }
  ];

  const joinDateOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const entityOptions = [
    { value: '', label: 'All Entities' },
    { value: 'tech-innovators', label: 'Tech Innovators Hub' },
    { value: 'creative-minds', label: 'Creative Minds Collective' },
    { value: 'business-leaders', label: 'Business Leaders Network' },
    { value: 'education-first', label: 'Education First Academy' },
    { value: 'health-wellness', label: 'Health & Wellness Community' }
  ];

  const activityOptions = [
    { value: '', label: 'All Activity Levels' },
    { value: 'high', label: 'High Activity' },
    { value: 'medium', label: 'Medium Activity' },
    { value: 'low', label: 'Low Activity' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setFilters({
      status: '',
      joinDateRange: '',
      entityAffiliation: '',
      activityLevel: ''
    });
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '') || searchQuery !== '';

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 mb-6 ${className}`}>
      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search users by name, email, or ID..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4"
            />
          </div>
        </div>
        
        <Button
          variant="outline"
          iconName={isAdvancedOpen ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        >
          Advanced Filters
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            iconName="X"
            iconPosition="left"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Filter by status"
            />

            <Select
              label="Join Date"
              options={joinDateOptions}
              value={filters?.joinDateRange}
              onChange={(value) => handleFilterChange('joinDateRange', value)}
              placeholder="Filter by join date"
            />

            <Select
              label="Entity Affiliation"
              options={entityOptions}
              value={filters?.entityAffiliation}
              onChange={(value) => handleFilterChange('entityAffiliation', value)}
              placeholder="Filter by entity"
              searchable
            />

            <Select
              label="Activity Level"
              options={activityOptions}
              value={filters?.activityLevel}
              onChange={(value) => handleFilterChange('activityLevel', value)}
              placeholder="Filter by activity"
            />
          </div>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Filter" size={16} />
                <span>Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      Search: "{searchQuery}"
                    </span>
                  )}
                  {Object.entries(filters)?.map(([key, value]) => {
                    if (!value) return null;
                    const label = key?.replace(/([A-Z])/g, ' $1')?.replace(/^./, str => str?.toUpperCase());
                    return (
                      <span key={key} className="px-2 py-1 bg-accent/10 text-accent-foreground rounded-full text-xs">
                        {label}: {value}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearchFilters;