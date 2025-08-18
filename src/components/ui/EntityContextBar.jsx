import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';

const EntityContextBar = ({ 
  entity = {
    id: '1',
    name: 'Sample Entity',
    logo: null,
    type: 'Organization',
    memberCount: 156,
    status: 'active',
    userRole: 'member' // member, admin, owner
  },
  user = { role: 'normal' },
  onAction = () => {},
  className = ''
}) => {
  const navigate = useNavigate();
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

  // Get available actions based on user role and entity relationship
  const getAvailableActions = () => {
    const baseActions = [
      { label: 'View Details', icon: 'Eye', action: 'view-details' },
      { label: 'Share', icon: 'Share2', action: 'share' }
    ];

    const memberActions = [
      { label: 'Leave Entity', icon: 'LogOut', action: 'leave', variant: 'destructive' }
    ];

    const adminActions = [
      { label: 'Manage Members', icon: 'Users', action: 'manage-members' },
      { label: 'Edit Entity', icon: 'Edit', action: 'edit' },
      { label: 'Settings', icon: 'Settings', action: 'settings' }
    ];

    const ownerActions = [
      { label: 'Analytics', icon: 'BarChart3', action: 'analytics' },
      { label: 'Delete Entity', icon: 'Trash2', action: 'delete', variant: 'destructive' }
    ];

    let actions = [...baseActions];

    if (entity?.userRole === 'member') {
      actions = [...actions, ...memberActions];
    } else if (entity?.userRole === 'admin') {
      actions = [...actions, ...adminActions, ...memberActions];
    } else if (entity?.userRole === 'owner') {
      actions = [...actions, ...adminActions, ...ownerActions];
    }

    return actions;
  };

  const availableActions = getAvailableActions();

  const handleAction = (actionType) => {
    onAction(actionType, entity);
    setIsActionsMenuOpen(false);
    
    // Handle navigation for specific actions
    switch (actionType) {
      case 'view-details':
        navigate(`/entity-detail-page?id=${entity?.id}`);
        break;
      case 'manage-members':
        navigate(`/admin-hub?tab=members&id=${entity?.id}`);
        break;
      case 'analytics':
        navigate(`/admin-hub?tab=analytics&id=${entity?.id}`);
        break;
      case 'settings':
        navigate(`/admin-hub?tab=settings&id=${entity?.id}`);
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'inactive':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'owner':
        return 'bg-primary text-primary-foreground';
      case 'admin':
        return 'bg-accent text-accent-foreground';
      case 'member':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={`bg-surface border-b border-border ${className}`}>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Entity Information */}
          <div className="flex items-center space-x-4">
            {/* Entity Logo */}
            <div className="flex-shrink-0">
              {entity?.logo ? (
                <Image
                  src={entity?.logo}
                  alt={`${entity?.name} logo`}
                  className="w-12 h-12 rounded-lg object-cover border border-border"
                />
              ) : (
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={24} className="text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Entity Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-lg font-semibold text-foreground truncate">
                  {entity?.name}
                </h1>
                
                {/* Status Indicator */}
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    entity?.status === 'active' ? 'bg-success' : 
                    entity?.status === 'pending' ? 'bg-warning' : 'bg-muted-foreground'
                  }`} />
                  <span className={`text-xs font-medium capitalize ${getStatusColor(entity?.status)}`}>
                    {entity?.status}
                  </span>
                </div>

                {/* User Role Badge */}
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getRoleBadgeColor(entity?.userRole)}`}>
                  {entity?.userRole}
                </span>
              </div>

              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-muted-foreground">
                  {entity?.type}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {entity?.memberCount?.toLocaleString()} members
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-2">
              {entity?.userRole === 'owner' && (
                <Button
                  variant="outline"
                  iconName="BarChart3"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => handleAction('analytics')}
                >
                  Analytics
                </Button>
              )}
              
              {(entity?.userRole === 'admin' || entity?.userRole === 'owner') && (
                <Button
                  variant="outline"
                  iconName="Users"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => handleAction('manage-members')}
                >
                  Members
                </Button>
              )}

              <Button
                variant="default"
                iconName="Eye"
                iconPosition="left"
                iconSize={16}
                onClick={() => handleAction('view-details')}
              >
                View Details
              </Button>
            </div>

            {/* Actions Menu */}
            <div className="relative">
              <Button
                variant="outline"
                iconName="MoreVertical"
                iconSize={16}
                onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}
              />

              {isActionsMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg elevation-2 py-1 z-1100">
                  {availableActions?.map((action, index) => (
                    <button
                      key={action?.action}
                      onClick={() => handleAction(action?.action)}
                      className={`w-full px-3 py-2 text-left text-sm transition-micro hover:bg-muted flex items-center space-x-2 ${
                        action?.variant === 'destructive' ? 'text-error hover:bg-error/10' : 'text-foreground'
                      }`}
                    >
                      <Icon name={action?.icon} size={16} />
                      <span>{action?.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="md:hidden mt-4 flex items-center space-x-2 overflow-x-auto">
          {entity?.userRole === 'owner' && (
            <Button
              variant="outline"
              iconName="BarChart3"
              iconSize={16}
              onClick={() => handleAction('analytics')}
              className="flex-shrink-0"
            >
              Analytics
            </Button>
          )}
          
          {(entity?.userRole === 'admin' || entity?.userRole === 'owner') && (
            <Button
              variant="outline"
              iconName="Users"
              iconSize={16}
              onClick={() => handleAction('manage-members')}
              className="flex-shrink-0"
            >
              Members
            </Button>
          )}

          <Button
            variant="default"
            iconName="Eye"
            iconSize={16}
            onClick={() => handleAction('view-details')}
            className="flex-shrink-0"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EntityContextBar;