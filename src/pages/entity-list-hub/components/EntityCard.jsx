import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EntityCard = ({ 
  entity,
  userRole = 'normal',
  userData = null,  // Add userData prop
  onAction = () => {},
  className = ''
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Calculate actual user relationship with entity
  const getUserRelationship = () => {
    if (!userData) return 'none';
    
    // Check if user owns this entity (entity admin)
    if (userData.ownedEntities?.includes(entity?.id)) {
      return 'admin';
    }
    
    // Check if user is a member of this entity
    if (userData.memberships?.includes(entity?.id)) {
      return 'member';
    }
    
    // Super admin has admin access to all entities
    if (userData.role === 'super-admin') {
      return 'admin';
    }
    
    return 'none';
  };

  const userRelationship = getUserRelationship();

  const handleViewDetails = () => {
    navigate(`/entity-detail-page?id=${entity?.id}`);
    onAction('view-details', entity);
  };

  const handleManage = () => {
    navigate(`/admin-hub?id=${entity?.id}`);
    onAction('manage', entity);
  };

  const handlePersonalView = () => {
    navigate(`/personal-entity-page?id=${entity?.id}`);
    onAction('personal-view', entity);
  };

  const getActivityColor = (level) => {
    switch (level) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getActivityIcon = (level) => {
    switch (level) {
      case 'high':
        return 'TrendingUp';
      case 'medium':
        return 'Minus';
      case 'low':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const renderActionButton = () => {
    if (userRelationship === 'admin') {
      return (
        <Button
          variant="default"
          size="sm"
          iconName="Settings"
          iconPosition="left"
          iconSize={14}
          onClick={handleManage}
          fullWidth
        >
          Manage
        </Button>
      );
    } else if (userRelationship === 'member') {
      return (
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Info"
            iconPosition="left"
            iconSize={14}
            onClick={handleViewDetails}
          >
            About
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
            onClick={handlePersonalView}
          >
            View
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          variant="outline"
          size="sm"
          iconName="Info"
          iconPosition="left"
          iconSize={14}
          onClick={handleViewDetails}
          fullWidth
        >
          About Entity
        </Button>
      );
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-4 transition-micro hover:elevation-2 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Entity Header */}
      <div className="flex items-start space-x-3 mb-3">
        <div className="flex-shrink-0">
          {entity?.logo ? (
            <Image
              src={entity?.logo}
              alt={`${entity?.name} logo`}
              className="w-12 h-12 rounded-lg object-cover border border-border"
            />
          ) : (
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="Building2" size={20} className="text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm truncate mb-1">
            {entity?.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {entity?.category}
            </span>
            {entity?.isVerified && (
              <Icon name="CheckCircle" size={14} className="text-success" />
            )}
          </div>
        </div>
      </div>
      {/* Entity Stats */}
      <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={12} />
          <span>{entity?.memberCount?.toLocaleString()} members</span>
        </div>
        
        <div className={`flex items-center space-x-1 ${getActivityColor(entity?.activityLevel)}`}>
          <Icon name={getActivityIcon(entity?.activityLevel)} size={12} />
          <span className="capitalize">{entity?.activityLevel} activity</span>
        </div>
      </div>
      {/* Entity Type & Status */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted-foreground">
          {entity?.type}
        </span>
        
        {userRelationship !== 'none' && (
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            userRelationship === 'admin' ?'bg-primary text-primary-foreground'
              : userRelationship === 'member' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
          }`}>
            {userRelationship === 'admin' ? 'Admin' : 
             userRelationship === 'member' ? 'Member' : 'Visitor'}
          </span>
        )}
      </div>
      {/* Action Button */}
      <div onClick={(e) => e?.stopPropagation()}>
        {renderActionButton()}
      </div>
      {/* Hover Effect Indicator */}
      {isHovered && (
        <div className="absolute inset-0 bg-primary/5 rounded-lg pointer-events-none" />
      )}
    </div>
  );
};

export default EntityCard;