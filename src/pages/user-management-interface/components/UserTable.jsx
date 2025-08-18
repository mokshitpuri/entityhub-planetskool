import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UserTable = ({ 
  users = [],
  onUserSelect = () => {},
  onStatusChange = () => {},
  onBulkAction = () => {},
  className = ''
}) => {
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'joinDate', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Mock users data
  const mockUsers = [
    {
      id: 'usr_001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      status: 'active',
      joinDate: new Date('2024-01-15'),
      lastActive: new Date('2024-08-14'),
      entityMemberships: ['Tech Innovators Hub', 'Creative Minds Collective'],
      activityLevel: 'high'
    },
    {
      id: 'usr_002',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      status: 'active',
      joinDate: new Date('2024-02-20'),
      lastActive: new Date('2024-08-13'),
      entityMemberships: ['Business Leaders Network'],
      activityLevel: 'medium'
    },
    {
      id: 'usr_003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      status: 'suspended',
      joinDate: new Date('2023-11-10'),
      lastActive: new Date('2024-08-10'),
      entityMemberships: ['Education First Academy', 'Health & Wellness Community'],
      activityLevel: 'low'
    },
    {
      id: 'usr_004',
      name: 'David Thompson',
      email: 'david.thompson@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      status: 'banned',
      joinDate: new Date('2023-08-05'),
      lastActive: new Date('2024-07-28'),
      entityMemberships: ['Tech Innovators Hub'],
      activityLevel: 'inactive'
    },
    {
      id: 'usr_005',
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      status: 'active',
      joinDate: new Date('2024-03-12'),
      lastActive: new Date('2024-08-14'),
      entityMemberships: ['Creative Minds Collective', 'Business Leaders Network', 'Health & Wellness Community'],
      activityLevel: 'high'
    }
  ];

  const displayUsers = users?.length > 0 ? users : mockUsers;

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', label: 'Active' },
      suspended: { color: 'bg-warning/10 text-warning', label: 'Suspended' },
      banned: { color: 'bg-error/10 text-error', label: 'Banned' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getActivityBadge = (level) => {
    const activityConfig = {
      high: { color: 'bg-success/10 text-success', icon: 'TrendingUp' },
      medium: { color: 'bg-accent/10 text-accent-foreground', icon: 'Minus' },
      low: { color: 'bg-warning/10 text-warning', icon: 'TrendingDown' },
      inactive: { color: 'bg-muted text-muted-foreground', icon: 'Circle' }
    };
    
    const config = activityConfig?.[level] || activityConfig?.medium;
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span className="capitalize">{level}</span>
      </div>
    );
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectUser = (userId) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected?.has(userId)) {
      newSelected?.delete(userId);
    } else {
      newSelected?.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedUsers?.size === displayUsers?.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(displayUsers.map(user => user.id)));
    }
  };

  const sortedUsers = [...displayUsers]?.sort((a, b) => {
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedUsers = sortedUsers?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil(sortedUsers?.length / usersPerPage);

  return (
    <div className={`bg-surface border border-border rounded-lg ${className}`}>
      {/* Bulk Actions Bar */}
      {selectedUsers?.size > 0 && (
        <div className="px-6 py-4 border-b border-border bg-muted/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedUsers?.size} user{selectedUsers?.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                iconName="UserCheck"
                iconPosition="left"
                onClick={() => onBulkAction('activate', Array.from(selectedUsers))}
              >
                Activate
              </Button>
              <Button
                variant="outline"
                iconName="UserX"
                iconPosition="left"
                onClick={() => onBulkAction('suspend', Array.from(selectedUsers))}
              >
                Suspend
              </Button>
              <Button
                variant="destructive"
                iconName="Ban"
                iconPosition="left"
                onClick={() => onBulkAction('ban', Array.from(selectedUsers))}
              >
                Ban
              </Button>
              <Button
                variant="ghost"
                iconName="Download"
                iconPosition="left"
                onClick={() => onBulkAction('export', Array.from(selectedUsers))}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers?.size === displayUsers?.length && displayUsers?.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground transition-micro"
                >
                  <span>User</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground transition-micro"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('joinDate')}
                  className="flex items-center space-x-1 hover:text-foreground transition-micro"
                >
                  <span>Join Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Entity Memberships
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Activity
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-muted/50 transition-micro">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.has(user?.id)}
                    onChange={() => handleSelectUser(user?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(user?.status)}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-foreground">
                      {user?.joinDate?.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last active: {user?.lastActive?.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {user?.entityMemberships?.slice(0, 2)?.map((entity, index) => (
                      <span key={index} className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded mr-1">
                        {entity}
                      </span>
                    ))}
                    {user?.entityMemberships?.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{user?.entityMemberships?.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getActivityBadge(user?.activityLevel)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      iconName="Eye"
                      iconSize={16}
                      onClick={() => onUserSelect(user)}
                    />
                    <Button
                      variant="ghost"
                      iconName="Settings"
                      iconSize={16}
                      onClick={() => onStatusChange(user)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {paginatedUsers?.map((user) => (
          <div key={user?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedUsers?.has(user?.id)}
                  onChange={() => handleSelectUser(user?.id)}
                  className="rounded border-border mt-1"
                />
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              {getStatusBadge(user?.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <p className="text-muted-foreground">Joined</p>
                <p className="text-foreground">
                  {user?.joinDate?.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Activity</p>
                {getActivityBadge(user?.activityLevel)}
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-muted-foreground mb-1">Entity Memberships</p>
              <div className="flex flex-wrap gap-1">
                {user?.entityMemberships?.slice(0, 2)?.map((entity, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                    {entity}
                  </span>
                ))}
                {user?.entityMemberships?.length > 2 && (
                  <span className="text-xs text-muted-foreground px-2 py-1">
                    +{user?.entityMemberships?.length - 2} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onUserSelect(user)}
                className="flex-1"
              >
                View
              </Button>
              <Button
                variant="outline"
                iconName="Settings"
                iconPosition="left"
                onClick={() => onStatusChange(user)}
                className="flex-1"
              >
                Manage
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, sortedUsers?.length)} of {sortedUsers?.length} users
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                iconName="ChevronLeft"
                iconSize={16}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              />
              <span className="text-sm text-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                iconName="ChevronRight"
                iconSize={16}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;