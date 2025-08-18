import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EntityAbout = ({ entity }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shouldShowExpand = entity?.description && entity?.description?.length > 300;
  const displayDescription = shouldShowExpand && !isExpanded 
    ? entity?.description?.substring(0, 300) + '...'
    : entity?.description;

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">About {entity?.name}</h2>
      {/* Description */}
      <div className="mb-6">
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {displayDescription}
        </p>
        
        {shouldShowExpand && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-primary hover:text-primary/80 font-medium text-sm transition-micro"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
      {/* Mission Statement */}
      {entity?.mission && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-medium text-foreground mb-2 flex items-center">
            <Icon name="Target" size={20} className="mr-2 text-primary" />
            Our Mission
          </h3>
          <p className="text-foreground leading-relaxed">
            {entity?.mission}
          </p>
        </div>
      )}
      {/* Key Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-foreground flex items-center">
            <Icon name="Contact" size={20} className="mr-2 text-primary" />
            Contact Information
          </h3>
          
          {entity?.email && (
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <a 
                href={`mailto:${entity?.email}`}
                className="text-primary hover:text-primary/80 transition-micro"
              >
                {entity?.email}
              </a>
            </div>
          )}
          
          {entity?.phone && (
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <a 
                href={`tel:${entity?.phone}`}
                className="text-primary hover:text-primary/80 transition-micro"
              >
                {entity?.phone}
              </a>
            </div>
          )}
          
          {entity?.website && (
            <div className="flex items-center space-x-3">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <a 
                href={entity?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-micro"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>

        {/* Additional Details */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-foreground flex items-center">
            <Icon name="Info" size={20} className="mr-2 text-primary" />
            Details
          </h3>
          
          <div className="flex items-center space-x-3">
            <Icon name="Building2" size={16} className="text-muted-foreground" />
            <span className="text-foreground">Type: {entity?.type}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <span className="text-foreground">Category: {entity?.category}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-foreground">Established: {entity?.establishedYear}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-foreground">{entity?.memberCount?.toLocaleString()} members</span>
          </div>
        </div>
      </div>
      {/* Tags */}
      {entity?.tags && entity?.tags?.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="Hash" size={20} className="mr-2 text-primary" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {entity?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityAbout;