import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ 
  user = { role: 'super-admin', name: 'Admin' },
  isCollapsed = false,
  onToggleCollapse = () => {},
  className = ''
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  // Admin navigation structure
  const navigationSections = [
    {
      title: 'Overview',
      items: [
        { 
          label: 'Dashboard', 
          path: '/super-admin-dashboard', 
          icon: 'LayoutDashboard',
          description: 'System overview and analytics'
        }
      ]
    },
    {
      title: 'Management',
      items: [
        { 
          label: 'Entity Management', 
          path: '/entity-management-panel', 
          icon: 'Building2',
          description: 'Manage all entities and organizations',
          badge: '12'
        },
        { 
          label: 'User Management', 
          path: '/user-management-interface', 
          icon: 'Users',
          description: 'User accounts and permissions',
          badge: '248'
        }
      ]
    },
    {
      title: 'System',
      items: [
        { 
          label: 'Analytics', 
          path: '/analytics', 
          icon: 'BarChart3',
          description: 'Platform metrics and insights'
        },
        { 
          label: 'Settings', 
          path: '/admin-settings', 
          icon: 'Settings',
          description: 'System configuration'
        },
        { 
          label: 'Audit Logs', 
          path: '/audit-logs', 
          icon: 'FileText',
          description: 'System activity logs'
        }
      ]
    }
  ];

  // Only show for super admin
  if (user?.role !== 'super-admin') {
    return null;
  }

  useEffect(() => {
    // Set active section based on current path
    const currentPath = location?.pathname;
    navigationSections?.forEach(section => {
      section?.items?.forEach(item => {
        if (item?.path === currentPath) {
          setActiveSection(section?.title);
        }
      });
    });
  }, [location?.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 z-900 bg-surface border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      } ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Icon name="Shield" size={14} color="white" />
              </div>
              <span className="text-sm font-semibold text-foreground">Admin Panel</span>
            </div>
          )}
          <Button
            variant="ghost"
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            iconSize={16}
            onClick={onToggleCollapse}
            className="p-1"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navigationSections?.map((section) => (
            <div key={section?.title} className="mb-6">
              {!isCollapsed && (
                <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section?.title}
                </h3>
              )}
              
              <div className="space-y-1 px-2">
                {section?.items?.map((item) => (
                  <button
                    key={`sidebar-${item?.path}`}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-micro group relative ${
                      isActive(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    title={isCollapsed ? item?.label : ''}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={18} 
                      className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}
                    />
                    
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item?.label}</span>
                            {item?.badge && (
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                isActive(item?.path)
                                  ? 'bg-primary-foreground text-primary'
                                  : 'bg-accent text-accent-foreground'
                              }`}>
                                {item?.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 group-hover:text-foreground">
                            {item?.description}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded text-xs text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-1100">
                        {item?.label}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-4">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground">Super Administrator</p>
              </div>
              <Button
                variant="ghost"
                iconName="MoreVertical"
                iconSize={16}
                className="p-1"
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;