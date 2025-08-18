import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = ({ className = '' }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      path: '/user-management-interface',
      badge: '248 users'
    },
    {
      title: 'Entity Management',
      description: 'Oversee all entities and organizations',
      icon: 'Building2',
      color: 'text-success',
      bgColor: 'bg-success/10',
      path: '/entity-management-panel',
      badge: '403 entities'
    },
    {
      title: 'Pending Requests',
      description: 'Review join requests and approvals',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      path: '/pending-requests',
      badge: '12 pending'
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: 'Settings',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      path: '/system-settings',
      badge: null
    }
  ];

  const handleActionClick = (path) => {
    if (path === '/pending-requests' || path === '/system-settings') {
      // Mock navigation for non-existent routes
      console.log(`Navigating to ${path}`);
      return;
    }
    navigate(path);
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Common administrative tasks</p>
        </div>
        <Button
          variant="ghost"
          iconName="MoreHorizontal"
          iconSize={16}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action?.path)}
            className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-micro text-left group"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action?.bgColor} group-hover:scale-105 transition-micro`}>
              <Icon name={action?.icon} size={20} className={action?.color} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground">{action?.title}</h4>
                {action?.badge && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {action?.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{action?.description}</p>
            </div>
            
            <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-micro" />
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">System Status</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-success font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;