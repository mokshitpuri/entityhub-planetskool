import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EntityDataTable = ({ 
  entities = [], 
  onEntityAction = () => {}, 
  onBulkAction = () => {},
  selectedEntities = [],
  onSelectionChange = () => {},
  sortConfig = { key: null, direction: 'asc' },
  onSort = () => {}
}) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: 'CheckCircle' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: 'Clock' },
      archived: { color: 'bg-gray-100 text-gray-800', icon: 'Archive' },
      suspended: { color: 'bg-red-100 text-red-800', icon: 'AlertTriangle' }
    };

    const config = statusConfig?.[status] || statusConfig?.active;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" />
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const getActivityLevel = (level) => {
    const colors = {
      high: 'text-green-600',
      medium: 'text-yellow-600',
      low: 'text-orange-600',
      inactive: 'text-red-600'
    };

    return (
      <span className={`text-sm font-medium ${colors?.[level] || colors?.medium}`}>
        {level?.charAt(0)?.toUpperCase() + level?.slice(1)}
      </span>
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(entities?.map(entity => entity?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectEntity = (entityId, checked) => {
    if (checked) {
      onSelectionChange([...selectedEntities, entityId]);
    } else {
      onSelectionChange(selectedEntities?.filter(id => id !== entityId));
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleActionClick = (entityId, action) => {
    onEntityAction(entityId, action);
    setActionMenuOpen(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isAllSelected = entities?.length > 0 && selectedEntities?.length === entities?.length;
  const isIndeterminate = selectedEntities?.length > 0 && selectedEntities?.length < entities?.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Bulk Actions Toolbar */}
      {selectedEntities?.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedEntities?.length} entities selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Archive"
                iconPosition="left"
                onClick={() => onBulkAction('archive', selectedEntities)}
              >
                Archive
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="AlertTriangle"
                iconPosition="left"
                onClick={() => onBulkAction('suspend', selectedEntities)}
              >
                Suspend
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={() => onBulkAction('delete', selectedEntities)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Entity</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Category</span>
                  <Icon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('memberCount')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Members</span>
                  <Icon name={getSortIcon('memberCount')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Created</span>
                  <Icon name={getSortIcon('createdAt')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entities?.map((entity) => (
              <tr key={entity?.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedEntities?.includes(entity?.id)}
                    onChange={(e) => handleSelectEntity(entity?.id, e?.target?.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {entity?.logo ? (
                        <Image
                          src={entity?.logo}
                          alt={`${entity?.name} logo`}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Icon name="Building2" size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{entity?.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{entity?.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 capitalize">{entity?.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <Image
                        src={entity?.admin?.avatar}
                        alt={entity?.admin?.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{entity?.admin?.name}</div>
                      <div className="text-sm text-gray-500">{entity?.admin?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entity?.memberCount?.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getActivityLevel(entity?.activityLevel)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(entity?.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(entity?.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreVertical"
                      onClick={() => setActionMenuOpen(actionMenuOpen === entity?.id ? null : entity?.id)}
                    />
                    
                    {actionMenuOpen === entity?.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => handleActionClick(entity?.id, 'edit')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Icon name="Edit" size={16} />
                          <span>Edit Entity</span>
                        </button>
                        <button
                          onClick={() => handleActionClick(entity?.id, 'view')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Icon name="Eye" size={16} />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={() => handleActionClick(entity?.id, 'archive')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Icon name="Archive" size={16} />
                          <span>Archive</span>
                        </button>
                        <button
                          onClick={() => handleActionClick(entity?.id, 'suspend')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-yellow-600"
                        >
                          <Icon name="AlertTriangle" size={16} />
                          <span>Suspend</span>
                        </button>
                        <button
                          onClick={() => handleActionClick(entity?.id, 'delete')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                        >
                          <Icon name="Trash2" size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden">
        {entities?.map((entity) => (
          <div key={entity?.id} className="border-b border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedEntities?.includes(entity?.id)}
                  onChange={(e) => handleSelectEntity(entity?.id, e?.target?.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-shrink-0">
                  {entity?.logo ? (
                    <Image
                      src={entity?.logo}
                      alt={`${entity?.name} logo`}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                      <Icon name="Building2" size={24} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{entity?.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{entity?.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(entity?.status)}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreVertical"
                  onClick={() => setActionMenuOpen(actionMenuOpen === entity?.id ? null : entity?.id)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Members:</span>
                <span className="ml-1 font-medium">{entity?.memberCount?.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Activity:</span>
                <span className="ml-1">{getActivityLevel(entity?.activityLevel)}</span>
              </div>
              <div>
                <span className="text-gray-500">Admin:</span>
                <span className="ml-1 font-medium">{entity?.admin?.name}</span>
              </div>
              <div>
                <span className="text-gray-500">Created:</span>
                <span className="ml-1">{formatDate(entity?.createdAt)}</span>
              </div>
            </div>

            {actionMenuOpen === entity?.id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                    iconPosition="left"
                    onClick={() => handleActionClick(entity?.id, 'edit')}
                    className="justify-start"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => handleActionClick(entity?.id, 'view')}
                    className="justify-start"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Archive"
                    iconPosition="left"
                    onClick={() => handleActionClick(entity?.id, 'archive')}
                    className="justify-start"
                  >
                    Archive
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="Trash2"
                    iconPosition="left"
                    onClick={() => handleActionClick(entity?.id, 'delete')}
                    className="justify-start"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Empty State */}
      {entities?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Building2" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No entities found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EntityDataTable;