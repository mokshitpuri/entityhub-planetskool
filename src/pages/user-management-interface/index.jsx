import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import UserMetricsCards from './components/UserMetricsCards';
import UserSearchFilters from './components/UserSearchFilters';
import UserTable from './components/UserTable';
import UserStatusModal from './components/UserStatusModal';
import UserDetailModal from './components/UserDetailModal';

const UserManagementInterface = () => {
  const navigate = useNavigate();
  const [user] = useState({ role: 'super-admin', name: 'Admin User' });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState({ show: false, duplicates: [] });

  // Export functionality
  const handleExportUsers = async (format = 'csv') => {
    setIsExporting(true);
    console.log('Starting user export in format:', format);
    
    try {
      // Mock user data for export
      const userData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'normal', status: 'active', joinDate: '2024-01-15', lastActive: '2024-08-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'entity-admin', status: 'active', joinDate: '2024-02-20', lastActive: '2024-08-14' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'normal', status: 'suspended', joinDate: '2024-03-10', lastActive: '2024-08-10' },
        // Add more mock data as needed
      ];

      if (format === 'csv') {
        const csvContent = convertToCSV(userData);
        console.log('Generated CSV content:', csvContent.substring(0, 200) + '...');
        downloadFile(csvContent, 'users-export.csv', 'text/csv');
      } else if (format === 'json') {
        const jsonContent = JSON.stringify(userData, null, 2);
        console.log('Generated JSON content length:', jsonContent.length);
        downloadFile(jsonContent, 'users-export.json', 'application/json');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('User export completed successfully');
      alert(`Users exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Convert data to CSV format
  const convertToCSV = (data) => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle commas and quotes in values
        return typeof value === 'string' && (value.includes(',') || value.includes('"')) 
          ? `"${value.replace(/"/g, '""')}"` 
          : value;
      }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  };

  // Download file utility
  const downloadFile = (content, filename, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Handle file selection for bulk upload
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadFile(file);
    
    try {
      const fileContent = await readFile(file);
      let parsedData = [];
      
      if (file.name.endsWith('.csv')) {
        parsedData = parseCSV(fileContent);
      } else if (file.name.endsWith('.json')) {
        parsedData = JSON.parse(fileContent);
      } else {
        throw new Error('Unsupported file format. Please use CSV or JSON.');
      }

      // Check for internal duplicates in the uploaded file
      const internalDuplicates = checkInternalDuplicates(parsedData);
      
      // Add unique IDs for checkbox tracking and validation
      const dataWithIds = parsedData.map((row, index) => {
        const validation = validateUserRow(row);
        return {
          ...row,
          _previewId: index,
          _isValid: validation.isValid && !validation.isDuplicate,
          _isDuplicate: validation.isDuplicate,
          _hasInternalDuplicate: internalDuplicates.some(dup => dup.index === index)
        };
      });

      // Find all duplicates (both external and internal)
      const allDuplicates = [
        ...dataWithIds.filter(row => row._isDuplicate).map(row => ({
          name: row.name,
          email: row.email,
          type: 'existing',
          message: 'Email already exists in the system'
        })),
        ...internalDuplicates.map(dup => ({
          name: dup.name,
          email: dup.email,
          type: 'internal',
          message: `Duplicate email within uploaded file (rows ${dup.firstOccurrence + 1} and ${dup.index + 1})`
        }))
      ];

      if (allDuplicates.length > 0) {
        setDuplicateWarning({
          show: true,
          duplicates: allDuplicates
        });
      }

      setPreviewData(dataWithIds);
      setSelectedRows(dataWithIds.filter(row => row._isValid && !row._isDuplicate && !row._hasInternalDuplicate).map(row => row._previewId));
      setShowPreview(true);
    } catch (error) {
      console.error('File parsing failed:', error);
      alert(`File parsing failed: ${error.message}`);
      setUploadFile(null);
    }
  };

  // Validate user row data and check for duplicates
  const validateUserRow = (row) => {
    const hasRequiredFields = row.name && row.email && row.role;
    if (!hasRequiredFields) return { isValid: false, isDuplicate: false };

    // Check for duplicates in existing users (mock data for now)
    const existingUsers = [
      { email: 'admin@example.com' },
      { email: 'user@example.com' },
      { email: 'test@example.com' }
    ];
    
    const isDuplicate = existingUsers.some(user => 
      user.email.toLowerCase().trim() === row.email.toLowerCase().trim()
    );

    return { isValid: hasRequiredFields, isDuplicate };
  };

  // Check for duplicates within the uploaded data itself
  const checkInternalDuplicates = (data) => {
    const seen = new Map();
    const duplicates = [];

    data.forEach((row, index) => {
      const key = row.email?.toLowerCase().trim();
      if (seen.has(key)) {
        duplicates.push({
          index,
          name: row.name,
          email: row.email,
          firstOccurrence: seen.get(key)
        });
      } else {
        seen.set(key, index);
      }
    });

    return duplicates;
  };

  // Toggle row selection
  const toggleRowSelection = (previewId) => {
    setSelectedRows(prev => 
      prev.includes(previewId) 
        ? prev.filter(id => id !== previewId)
        : [...prev, previewId]
    );
  };

  // Toggle all rows selection
  const toggleAllSelection = () => {
    const validRows = previewData.filter(row => row._isValid).map(row => row._previewId);
    setSelectedRows(prev => 
      prev.length === validRows.length ? [] : validRows
    );
  };

  // Bulk upload functionality
  const handleBulkUpload = async () => {
    if (!uploadFile || !previewData.length) {
      alert('Please select a file and preview the data first');
      return;
    }

    if (selectedRows.length === 0) {
      alert('Please select at least one row to upload');
      return;
    }

    setIsBulkUploading(true);
    try {
      const selectedData = previewData.filter(row => selectedRows.includes(row._previewId));
      const cleanedData = selectedData.map(({ _previewId, _isValid, ...row }) => row);
      
      await processBulkUsers(cleanedData);

      alert(`Successfully processed ${selectedRows.length} users from ${uploadFile.name}`);
      setUploadFile(null);
      setPreviewData([]);
      setSelectedRows([]);
      setShowPreview(false);
      
      // Reset file input
      const fileInput = document.getElementById('bulk-upload-input');
      if (fileInput) fileInput.value = '';
      
      // Refresh user list
      window.location.reload();
    } catch (error) {
      console.error('Bulk upload failed:', error);
      alert(`Bulk upload failed: ${error.message}`);
    } finally {
      setIsBulkUploading(false);
    }
  };

  // Cancel upload and reset
  const cancelUpload = () => {
    setUploadFile(null);
    setPreviewData([]);
    setSelectedRows([]);
    setShowPreview(false);
    
    const fileInput = document.getElementById('bulk-upload-input');
    if (fileInput) fileInput.value = '';
  };

  // Read file content
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  // Parse CSV content
  const parseCSV = (csvContent) => {
    const lines = csvContent.split('\n').filter(line => line.trim());
    if (lines.length < 2) throw new Error('CSV file must have headers and at least one data row');
    
    const headers = lines[0].split(',').map(h => h.trim());
    const users = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const user = {};
      headers.forEach((header, index) => {
        user[header] = values[index] || '';
      });
      users.push(user);
    }
    
    return users;
  };

  // Process bulk users (mock implementation)
  const processBulkUsers = async (users) => {
    // Simulate API processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Validate and process each user
    const processedUsers = users.map(user => ({
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      status: user.status || 'active',
      role: user.role || 'normal',
      joinDate: user.joinDate || new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0]
    }));
    
    console.log('Processed users:', processedUsers);
    return processedUsers;
  };

  // Mock user metrics
  const userMetrics = {
    totalUsers: 2847,
    newRegistrations: 156,
    activeUsers: 2654,
    suspendedUsers: 142,
    bannedUsers: 51,
    growthRate: 12.5
  };

  // Breadcrumb navigation
  const breadcrumbs = [
    { label: 'Dashboard', path: '/super-admin-dashboard' },
    { label: 'Super Admin', path: '/super-admin-dashboard' },
    { label: 'User Management', path: '/user-management-interface', current: true }
  ];

  useEffect(() => {
    // Simulate loading users based on search and filters
    setIsLoading(true);
    const timer = setTimeout(() => {
      // In a real app, this would be an API call
      setUsers([]); // UserTable component has its own mock data
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({});
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const handleStatusChange = (user) => {
    setSelectedUser(user);
    setIsStatusModalOpen(true);
  };

  const handleStatusUpdate = async (userId, newStatus, reason) => {
    // Simulate API call
    console.log('Updating user status:', { userId, newStatus, reason });
    
    // Show success notification (in a real app)
    alert(`User status updated to ${newStatus}${reason ? ` (Reason: ${reason})` : ''}`);
    
    // Close modal
    setIsStatusModalOpen(false);
    setSelectedUser(null);
  };

  const handleBulkAction = (action, userIds) => {
    console.log('Bulk action:', action, 'for users:', userIds);
    
    switch (action) {
      case 'activate':
        alert(`Activated ${userIds?.length} user(s)`);
        break;
      case 'suspend':
        alert(`Suspended ${userIds?.length} user(s)`);
        break;
      case 'ban':
        if (confirm(`Are you sure you want to ban ${userIds?.length} user(s)? This action cannot be undone.`)) {
          alert(`Banned ${userIds?.length} user(s)`);
        }
        break;
      case 'export':
        alert(`Exporting data for ${userIds?.length} user(s)`);
        break;
      default:
        break;
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleAdaptiveHeader 
        user={user}
        onNavigate={handleNavigation}
      />
      {/* Sidebar */}
      <AdminSidebar
        user={user}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
      }`}>
        <div className="p-4 lg:p-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            {breadcrumbs?.map((crumb, index) => (
              <React.Fragment key={crumb?.path}>
                {index > 0 && <Icon name="ChevronRight" size={14} />}
                {crumb?.current ? (
                  <span className="text-foreground font-medium">{crumb?.label}</span>
                ) : (
                  <button
                    onClick={() => navigate(crumb?.path)}
                    className="hover:text-foreground transition-micro"
                  >
                    {crumb?.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage platform users, monitor activity, and control access permissions
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Bulk Upload Section */}
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="bulk-upload-input"
                />
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  onClick={() => document.getElementById('bulk-upload-input').click()}
                  disabled={isBulkUploading}
                >
                  {uploadFile ? uploadFile.name.substring(0, 20) + (uploadFile.name.length > 20 ? '...' : '') : 'Select File'}
                </Button>
                {showPreview && (
                  <>
                    <Button
                      variant="default"
                      iconName="Upload"
                      iconPosition="left"
                      onClick={handleBulkUpload}
                      loading={isBulkUploading}
                      disabled={selectedRows.length === 0}
                    >
                      Upload Selected ({selectedRows.length})
                    </Button>
                    <Button
                      variant="outline"
                      iconName="X"
                      iconPosition="left"
                      onClick={cancelUpload}
                      disabled={isBulkUploading}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
              
              {/* Export Section */}
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => handleExportUsers('csv')}
                  loading={isExporting}
                  disabled={isExporting}
                >
                  Export CSV
                </Button>
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => handleExportUsers('json')}
                  loading={isExporting}
                  disabled={isExporting}
                >
                  Export JSON
                </Button>
              </div>
              
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <UserMetricsCards metrics={userMetrics} />

          {/* Search and Filters */}
          <UserSearchFilters
            onSearch={handleSearch}
            onFilter={handleFilter}
            onClearFilters={handleClearFilters}
          />

          {/* Bulk Upload Preview */}
          {showPreview && previewData.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Upload Preview</h3>
                  <p className="text-sm text-muted-foreground">
                    Review and select rows to upload from {uploadFile?.name}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    {selectedRows.length} of {previewData.filter(row => row._isValid).length} selected
                  </span>
                  <Button
                    variant="outline"
                    iconName={selectedRows.length === previewData.filter(row => row._isValid).length ? 'Square' : 'CheckSquare'}
                    iconPosition="left"
                    onClick={toggleAllSelection}
                    size="sm"
                  >
                    {selectedRows.length === previewData.filter(row => row._isValid).length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Select</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Validation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className={`border-b border-border ${!row._isValid ? 'bg-red-50' : ''}`}>
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row._previewId)}
                            onChange={() => toggleRowSelection(row._previewId)}
                            disabled={!row._isValid}
                            className="rounded border-border"
                          />
                        </td>
                        <td className="py-3 px-4 text-foreground">{row.name || '-'}</td>
                        <td className="py-3 px-4 text-foreground">{row.email || '-'}</td>
                        <td className="py-3 px-4 text-foreground">{row.role || '-'}</td>
                        <td className="py-3 px-4 text-foreground">{row.status || 'active'}</td>
                        <td className="py-3 px-4">
                          {row._isValid ? (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                              <Icon name="Check" size={12} className="mr-1" />
                              Valid
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                              <Icon name="X" size={12} className="mr-1" />
                              Invalid
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {previewData.filter(row => !row._isValid).length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="flex items-center">
                    <Icon name="AlertTriangle" size={16} className="text-yellow-600 mr-2" />
                    <span className="text-sm text-yellow-800">
                      {previewData.filter(row => !row._isValid).length} rows have validation errors and cannot be uploaded. 
                      Please ensure all rows have name, email, and role fields.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Users Table */}
          {isLoading ? (
            <div className="bg-surface border border-border rounded-lg p-12 text-center">
              <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Loading users...</p>
            </div>
          ) : (
            <UserTable
              users={users}
              onUserSelect={handleUserSelect}
              onStatusChange={handleStatusChange}
              onBulkAction={handleBulkAction}
            />
          )}
        </div>
      </main>
      {/* Modals */}
      <UserStatusModal
        user={selectedUser}
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedUser(null);
        }}
        onStatusUpdate={handleStatusUpdate}
      />
      <UserDetailModal
        user={selectedUser}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedUser(null);
        }}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default UserManagementInterface;