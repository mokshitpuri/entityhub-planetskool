import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MemberCard = ({ 
  member,
  onRoleChange = () => {},
  onStatusChange = () => {},
  onRemoveMember = () => {},
  className = ''
}) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const roleOptions = [
    { value: 'member', label: 'Member' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'admin', label: 'Admin' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'pending', label: 'Pending' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'suspended':
        return 'text-error bg-error/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'text-primary bg-primary/10';
      case 'moderator':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatLastLogin = (date) => {
    const now = new Date();
    const loginDate = new Date(date);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return loginDate?.toLocaleDateString();
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 hover:elevation-1 transition-micro ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {member?.avatar ? (
              <Image
                src={member?.avatar}
                alt={`${member?.name} avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Member Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-sm font-semibold text-foreground truncate">
                {member?.name}
              </h3>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${getRoleColor(member?.role)}`}>
                {member?.role}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground truncate mb-1">
              {member?.email}
            </p>
            
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>Joined {new Date(member.joinedAt)?.toLocaleDateString()}</span>
              <span>Last login {formatLastLogin(member?.lastLogin)}</span>
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(member?.status)}`}>
            {member?.status}
          </span>
          
          <div className="relative">
            <Button
              variant="ghost"
              iconName="MoreVertical"
              iconSize={16}
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="p-1"
            />
            
            {isActionsOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg elevation-2 py-1 z-50">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-xs font-medium text-muted-foreground">Change Role</p>
                  <Select
                    options={roleOptions}
                    value={member?.role}
                    onChange={(value) => onRoleChange(member?.id, value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-xs font-medium text-muted-foreground">Change Status</p>
                  <Select
                    options={statusOptions}
                    value={member?.status}
                    onChange={(value) => onStatusChange(member?.id, value)}
                    className="mt-1"
                  />
                </div>
                
                <button
                  onClick={() => {
                    onRemoveMember(member?.id);
                    setIsActionsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-error hover:bg-error/10 transition-micro flex items-center space-x-2"
                >
                  <Icon name="UserMinus" size={14} />
                  <span>Remove Member</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Activity Indicators */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MessageCircle" size={12} />
            <span>{member?.messageCount || 0} messages</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>{member?.eventAttendance || 0} events</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full ${
            member?.isOnline ? 'bg-success' : 'bg-muted-foreground'
          }`} />
          <span className="text-xs text-muted-foreground">
            {member?.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;