import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UserDetailModal = ({ 
  user = null,
  isOpen = false,
  onClose = () => {},
  onStatusChange = () => {},
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !user) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'entities', label: 'Entities', icon: 'Building2' },
    { id: 'audit', label: 'Audit Log', icon: 'FileText' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', label: 'Active' },
      suspended: { color: 'bg-warning/10 text-warning', label: 'Suspended' },
      banned: { color: 'bg-error/10 text-error', label: 'Banned' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const mockActivityData = [
    {
      id: 1,
      action: 'Joined entity',
      entity: 'Tech Innovators Hub',
      timestamp: new Date('2024-08-14T10:30:00'),
      type: 'join'
    },
    {
      id: 2,
      action: 'Updated profile',
      details: 'Changed profile picture and bio',
      timestamp: new Date('2024-08-13T15:45:00'),
      type: 'profile'
    },
    {
      id: 3,
      action: 'Posted content',
      entity: 'Creative Minds Collective',
      details: 'Shared a new project showcase',
      timestamp: new Date('2024-08-12T09:20:00'),
      type: 'content'
    }
  ];

  const mockAuditLog = [
    {
      id: 1,
      action: 'Status Changed',
      details: 'Status changed from Active to Suspended',
      admin: 'Super Admin',
      reason: 'Violation of community guidelines',
      timestamp: new Date('2024-08-10T14:30:00')
    },
    {
      id: 2,
      action: 'Account Created',
      details: 'User account created via email registration',
      timestamp: new Date('2024-01-15T08:15:00')
    }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Basic Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Full Name</label>
              <p className="text-sm text-foreground">{user?.name}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email Address</label>
              <p className="text-sm text-foreground">{user?.email}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">User ID</label>
              <p className="text-sm text-foreground font-mono">{user?.id}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Join Date</label>
              <p className="text-sm text-foreground">
                {user?.joinDate?.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Last Active</label>
              <p className="text-sm text-foreground">
                {user?.lastActive?.toLocaleDateString('en-US', { 
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })} at {user?.lastActive?.toLocaleTimeString('en-US', { 
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Activity Level</label>
              <p className="text-sm text-foreground capitalize">{user?.activityLevel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Account Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-foreground">{user?.entityMemberships?.length || 0}</p>
            <p className="text-xs text-muted-foreground">Entity Memberships</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-foreground">47</p>
            <p className="text-xs text-muted-foreground">Posts Created</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-xs text-muted-foreground">Interactions</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-foreground">23</p>
            <p className="text-xs text-muted-foreground">Days Active</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Recent Activity</h4>
      <div className="space-y-3">
        {mockActivityData?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon 
                name={activity?.type === 'join' ? 'UserPlus' : 
                      activity?.type === 'profile' ? 'User' : 'FileText'} 
                size={16} 
                color="white" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity?.action}</p>
              {activity?.entity && (
                <p className="text-xs text-muted-foreground">in {activity?.entity}</p>
              )}
              {activity?.details && (
                <p className="text-xs text-muted-foreground">{activity?.details}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {activity?.timestamp?.toLocaleDateString('en-US', { 
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEntitiesTab = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Entity Memberships</h4>
      <div className="space-y-3">
        {user?.entityMemberships?.map((entity, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={20} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{entity}</p>
                <p className="text-xs text-muted-foreground">Member since Jan 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                Member
              </span>
              <Button
                variant="ghost"
                iconName="ExternalLink"
                iconSize={14}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAuditTab = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Audit Log</h4>
      <div className="space-y-3">
        {mockAuditLog?.map((log) => (
          <div key={log?.id} className="p-4 border border-border rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-foreground">{log?.action}</p>
              <p className="text-xs text-muted-foreground">
                {log?.timestamp?.toLocaleDateString('en-US', { 
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{log?.details}</p>
            {log?.admin && (
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Admin:</span> {log?.admin}
              </p>
            )}
            {log?.reason && (
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Reason:</span> {log?.reason}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-1200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className={`relative bg-surface border border-border rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            {getStatusBadge(user?.status)}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              iconName="Settings"
              iconPosition="left"
              onClick={() => onStatusChange(user)}
            >
              Manage Status
            </Button>
            <Button
              variant="ghost"
              iconName="X"
              iconSize={20}
              onClick={onClose}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-micro ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'activity' && renderActivityTab()}
          {activeTab === 'entities' && renderEntitiesTab()}
          {activeTab === 'audit' && renderAuditTab()}
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;