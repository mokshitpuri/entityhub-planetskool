import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = ({ className = '' }) => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'user_joined',
      title: 'New user registration',
      description: 'Sarah Johnson joined TechCorp University',
      timestamp: new Date(Date.now() - 300000),
      icon: 'UserPlus',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 2,
      type: 'entity_created',
      title: 'Entity created',
      description: 'Digital Marketing Hub was created by Alex Chen',
      timestamp: new Date(Date.now() - 900000),
      icon: 'Building2',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 3,
      type: 'join_request',
      title: 'Join request pending',
      description: 'Michael Rodriguez requested to join Innovation Lab',
      timestamp: new Date(Date.now() - 1800000),
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 4,
      type: 'user_suspended',
      title: 'User suspended',
      description: 'Account suspended for policy violation',
      timestamp: new Date(Date.now() - 3600000),
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 5,
      type: 'entity_archived',
      title: 'Entity archived',
      description: 'Old Community Group was archived by admin',
      timestamp: new Date(Date.now() - 7200000),
      icon: 'Archive',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'user_joined', label: 'User Actions' },
    { value: 'entity_created', label: 'Entity Actions' },
    { value: 'join_request', label: 'Requests' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return timestamp?.toLocaleDateString();
    }
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest platform events</p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-md bg-surface text-foreground"
          >
            {filterOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            iconName="RefreshCw"
            iconSize={16}
          />
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-micro">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity?.bgColor}`}>
              <Icon name={activity?.icon} size={16} className={activity?.color} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground">{activity?.title}</h4>
                <span className="text-xs text-muted-foreground">{getTimeAgo(activity?.timestamp)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={16}
        >
          View All Activities
        </Button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;