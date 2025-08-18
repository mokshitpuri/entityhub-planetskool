import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ 
  searchQuery = '',
  onSearchChange = () => {},
  onToggleFilters = () => {},
  showFilters = false,
  resultCount = 0,
  activeTab = 'explore',
  className = ''
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock search suggestions
  const mockSuggestions = [
    "Harvard University",
    "Google Inc",
    "Red Cross",
    "Local Community Center",
    "Tech Startup Hub",
    "Healthcare Alliance",
    "Environmental Group",
    "Sports Club",
    "Art Society",
    "Business Network"
  ];

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setLocalSearch(value);
    
    // Generate suggestions
    if (value?.length > 0) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(value?.toLowerCase())
      )?.slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    
    // Debounced search
    const timeoutId = setTimeout(() => {
      onSearchChange(value);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalSearch(suggestion);
    onSearchChange(suggestion);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearchChange(localSearch);
    setShowSuggestions(false);
  };

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'explore':
        return 'Discover Entities';
      case 'admin':
        return 'Your Admin Entities';
      case 'memberships':
        return 'Your Memberships';
      default:
        return 'Entity Hub';
    }
  };

  return (
    <div className={`bg-surface border-b border-border ${className}`}>
      <div className="px-4 lg:px-6 py-4">
        {/* Header Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {getTabTitle(activeTab)}
          </h1>
          <p className="text-muted-foreground">
            {activeTab === 'explore' && "Find and join organizations, communities, and groups"}
            {activeTab === 'admin' && "Manage the entities you administer"}
            {activeTab === 'memberships' && "Access your joined entities and communities"}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  type="search"
                  placeholder={`Search ${activeTab === 'explore' ? 'entities' : activeTab === 'admin' ? 'your entities' : 'memberships'}...`}
                  value={localSearch}
                  onChange={handleSearchChange}
                  onFocus={() => localSearch?.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10 pr-4"
                />
              </div>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && suggestions?.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg elevation-2 py-2 z-50">
                {suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-micro flex items-center space-x-2"
                  >
                    <Icon name="Search" size={14} className="text-muted-foreground" />
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Toggle */}
          <Button
            variant={showFilters ? "default" : "outline"}
            iconName="Filter"
            iconPosition="left"
            iconSize={18}
            onClick={onToggleFilters}
            className="flex-shrink-0"
          >
            <span className="hidden sm:inline">Filters</span>
          </Button>

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            iconName="SlidersHorizontal"
            iconSize={18}
            onClick={onToggleFilters}
            className="sm:hidden flex-shrink-0"
          />
        </div>

        {/* Results Count */}
        {resultCount > 0 && (
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {resultCount?.toLocaleString()} {resultCount === 1 ? 'entity' : 'entities'} found
              {localSearch && ` for "${localSearch}"`}
            </p>
            
            {localSearch && (
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconPosition="left"
                iconSize={14}
                onClick={() => {
                  setLocalSearch('');
                  onSearchChange('');
                }}
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;