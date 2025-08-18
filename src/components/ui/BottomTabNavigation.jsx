import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ 
  user = { role: 'normal' },
  onNavigate = () => {},
  className = ''
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Tab configuration based on user role
  const getTabs = () => {
    const baseTabs = [
      {
        label: 'Explore',
        path: '/entity-list-hub',
        icon: 'Compass',
        badge: null,
        roles: ['normal', 'entity-admin', 'super-admin']
      },
      {
        label: 'My Entities',
        path: '/my-entities',
        icon: 'Building2',
        badge: '3',
        roles: ['normal', 'entity-admin', 'super-admin']
      }
    ];

    const adminTabs = [
      {
        label: 'Admin Hub',
        path: '/admin-hub',
        icon: 'Settings',
        badge: '2',
        roles: ['entity-admin', 'super-admin']
      }
    ];

    const superAdminTabs = [
      {
        label: 'Dashboard',
        path: '/super-admin-dashboard',
        icon: 'LayoutDashboard',
        badge: null,
        roles: ['super-admin']
      }
    ];

    return [...baseTabs, ...adminTabs, ...superAdminTabs]?.filter(tab => 
      tab?.roles?.includes(user?.role)
    );
  };

  const tabs = getTabs();

  const handleTabPress = (path) => {
    navigate(path);
    onNavigate(path);
    
    // Haptic feedback for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const isActive = (path) => {
    // Handle special cases for active state
    if (path === '/entity-list-hub' && location?.pathname === '/entity-detail-page') {
      return true; // Entity detail is part of explore flow
    }
    return location?.pathname === path;
  };

  // Only show on mobile devices
  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-800 bg-surface border-t border-border safe-area-inset-bottom ${className}`}>
      <div className="flex items-center justify-around px-2 py-2">
        {tabs?.map((tab) => (
          <button
            key={tab?.path}
            onClick={() => handleTabPress(tab?.path)}
            className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-micro min-w-0 flex-1 relative ${
              isActive(tab?.path)
                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <div className="relative">
              <Icon 
                name={tab?.icon} 
                size={20} 
                className={`transition-micro ${
                  isActive(tab?.path) ? 'scale-110' : ''
                }`}
              />
              
              {/* Badge */}
              {tab?.badge && (
                <span className="absolute -top-2 -right-2 min-w-[16px] h-4 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center px-1">
                  {tab?.badge}
                </span>
              )}
            </div>
            
            <span className={`text-xs font-medium mt-1 truncate max-w-full ${
              isActive(tab?.path) ? 'text-primary' : ''
            }`}>
              {tab?.label}
            </span>

            {/* Active indicator */}
            {isActive(tab?.path) && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;