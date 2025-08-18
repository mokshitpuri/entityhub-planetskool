import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ 
  activeTab = 'explore',
  onTabChange = () => {},
  tabCounts = {},
  className = '',
  userRole = 'normal'  // Add userRole prop
}) => {
  const allTabs = [
    {
      id: 'explore',
      label: 'Explore',
      icon: 'Compass',
      description: 'Discover new entities',
      roles: ['normal', 'entity-admin', 'super-admin']
    },
    {
      id: 'admin',
      label: 'Admin Hub',
      icon: 'Settings',
      description: 'Entities you manage',
      roles: ['entity-admin', 'super-admin']  // Only for admins
    },
    {
      id: 'memberships',
      label: 'My Memberships',
      icon: 'Users',
      description: 'Your joined entities',
      roles: ['normal', 'entity-admin']  // Not for super-admin
    }
  ];

  // Filter tabs based on user role
  const tabs = allTabs.filter(tab => tab.roles.includes(userRole));

  return (
    <div className={`bg-surface border-b border-border ${className}`}>
      <div className="flex items-center overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-micro whitespace-nowrap ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={18} />
            <span className="font-medium">{tab?.label}</span>
            
            {tabCounts?.[tab?.id] !== undefined && tabCounts?.[tab?.id] > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tabCounts?.[tab?.id]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;