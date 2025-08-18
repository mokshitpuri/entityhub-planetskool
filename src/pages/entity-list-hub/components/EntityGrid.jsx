import React from 'react';
import EntityCard from './EntityCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EntityGrid = ({ 
  entities = [],
  loading = false,
  hasMore = false,
  onLoadMore = () => {},
  onEntityAction = () => {},
  emptyState = null,
  className = '',
  userData = null  // Add userData prop
}) => {
  // Loading skeleton
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 })?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-12 h-12 bg-muted rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-2/3" />
          </div>
          <div className="h-8 bg-muted rounded" />
        </div>
      ))}
    </div>
  );

  // Empty state
  const renderEmptyState = () => {
    if (emptyState) return emptyState;
    
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No entities found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
        <Button variant="outline" iconName="RotateCcw" iconPosition="left">
          Reset Filters
        </Button>
      </div>
    );
  };

  if (loading && entities?.length === 0) {
    return renderSkeleton();
  }

  if (entities?.length === 0) {
    return renderEmptyState();
  }

  return (
    <div className={className}>
      {/* Entity Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {entities?.map((entity) => (
          <EntityCard
            key={entity?.id}
            entity={entity}
            userData={userData}
            onAction={onEntityAction}
          />
        ))}
      </div>
      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            loading={loading}
            iconName="ChevronDown"
            iconPosition="left"
            onClick={onLoadMore}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
      {/* Loading More Indicator */}
      {loading && entities?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 4 })?.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-12 h-12 bg-muted rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
              <div className="h-8 bg-muted rounded" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntityGrid;