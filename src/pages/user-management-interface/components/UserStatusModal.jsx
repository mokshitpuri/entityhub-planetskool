import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const UserStatusModal = ({ 
  user = null,
  isOpen = false,
  onClose = () => {},
  onStatusUpdate = () => {},
  className = ''
}) => {
  const [selectedStatus, setSelectedStatus] = useState(user?.status || 'active');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !user) return null;

  const statusOptions = [
    {
      value: 'active',
      label: 'Active',
      description: 'User has full access to the platform',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      value: 'suspended',
      label: 'Suspended',
      description: 'User access is temporarily restricted',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      value: 'banned',
      label: 'Banned',
      description: 'User is permanently blocked from the platform',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    if (status === 'active') {
      setReason('');
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    
    try {
      await onStatusUpdate(user?.id, selectedStatus, reason);
      onClose();
    } catch (error) {
      console.error('Failed to update user status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEntityRoleBadge = (role) => {
    const roleConfig = {
      owner: 'bg-primary text-primary-foreground',
      admin: 'bg-accent text-accent-foreground',
      member: 'bg-muted text-muted-foreground'
    };
    return roleConfig?.[role] || roleConfig?.member;
  };

  return (
    <div className="fixed inset-0 z-1200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className={`relative bg-surface border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Manage User Status</h2>
          </div>
          <Button
            variant="ghost"
            iconName="X"
            iconSize={20}
            onClick={onClose}
          />
        </div>

        {/* User Information */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start space-x-4">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground">{user?.name}</h3>
              <p className="text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                User ID: {user?.id}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span className="text-muted-foreground">
                  Joined: {user?.joinDate?.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="text-muted-foreground">
                  Last Active: {user?.lastActive?.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Entity Memberships */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Entity Memberships</h4>
            <div className="space-y-2">
              {user?.entityMemberships?.map((entity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name="Building2" size={16} color="white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{entity}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEntityRoleBadge('member')}`}>
                    Member
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Management Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Current Status */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Current Status
              </label>
              <div className="space-y-3">
                {statusOptions?.map((option) => (
                  <label key={option?.value} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={option?.value}
                      checked={selectedStatus === option?.value}
                      onChange={(e) => handleStatusChange(e?.target?.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${option?.color}`}>
                          {option?.label}
                        </span>
                        {selectedStatus === option?.value && (
                          <div className={`w-2 h-2 rounded-full ${option?.color?.replace('text-', 'bg-')}`} />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {option?.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Reason Field */}
            {(selectedStatus === 'suspended' || selectedStatus === 'banned') && (
              <div>
                <Input
                  label="Reason for Status Change"
                  type="text"
                  placeholder={`Enter reason for ${selectedStatus === 'suspended' ? 'suspension' : 'ban'}...`}
                  value={reason}
                  onChange={(e) => setReason(e?.target?.value)}
                  required
                  description="This reason will be recorded in the audit log and may be visible to the user."
                />
              </div>
            )}

            {/* Warning Messages */}
            {selectedStatus === 'suspended' && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-warning">Suspension Warning</p>
                    <p className="text-xs text-warning/80 mt-1">
                      The user will lose access to all platform features until their status is changed back to active.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedStatus === 'banned' && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Ban" size={16} className="text-error mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-error">Permanent Ban Warning</p>
                    <p className="text-xs text-error/80 mt-1">
                      This action will permanently block the user from accessing the platform. This action should be used with extreme caution.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={selectedStatus === 'banned' ? 'destructive' : 'default'}
              loading={isLoading}
              iconName={selectedStatus === 'banned' ? 'Ban' : 'Check'}
              iconPosition="left"
            >
              {selectedStatus === 'banned' ? 'Ban User' : 
               selectedStatus === 'suspended'? 'Suspend User' : 'Update Status'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserStatusModal;