import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const EntityBanner = ({ entity, onRequestJoin, isMember, isLoading }) => {
  const formatMemberCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000)?.toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000)?.toFixed(1)}K`;
    return count?.toString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'inactive':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
        <Image
          src={entity?.bannerImage}
          alt={`${entity?.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      {/* Entity Information Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <div className="flex items-end space-x-4">
          {/* Entity Logo */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={entity?.logo}
                alt={`${entity?.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Entity Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(entity?.status)}`}>
                {entity?.status}
              </span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white">
                {entity?.category}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 truncate">
              {entity?.name}
            </h1>
            
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span className="text-sm font-medium">
                  {formatMemberCount(entity?.memberCount)} members
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">{entity?.location}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span className="text-sm">Est. {entity?.establishedYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Join Button */}
      {!isMember && (
        <div className="md:hidden absolute top-4 right-4">
          <button
            onClick={onRequestJoin}
            disabled={isLoading}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium shadow-lg transition-micro hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? 'Requesting...' : 'Request to Join'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EntityBanner;