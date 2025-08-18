import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import EntitySummaryCards from './components/EntitySummaryCards';
import EntityFilters from './components/EntityFilters';
import EntityDataTable from './components/EntityDataTable';
import ConfirmationModal from './components/ConfirmationModal';
import EntityFormModal from './components/EntityFormModal';

const EntityManagementPanel = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [entities, setEntities] = useState([]);
  const [filteredEntities, setFilteredEntities] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isExporting, setIsExporting] = useState(false);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState({ show: false, duplicates: [] });

  // Modal states
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: 'default',
    title: '',
    message: '',
    action: null,
    entityId: null,
    loading: false
  });

  const [entityModal, setEntityModal] = useState({
    isOpen: false,
    entity: null,
    loading: false
  });

  // Mock user data
  const currentUser = {
    role: 'super-admin',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
  };

  // Mock entities data
  const mockEntities = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      description: 'Leading technology solutions provider specializing in enterprise software development and digital transformation services.',
      category: 'technology',
      type: 'company',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=200&fit=crop',
      admin: {
        name: 'Michael Chen',
        email: 'michael.chen@techcorp.com',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      memberCount: 1247,
      status: 'active',
      activityLevel: 'high',
      createdAt: '2023-01-15T10:30:00Z',
      website: 'https://techcorp.com',
      email: 'info@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, Silicon Valley, CA 94025'
    },
    {
      id: '2',
      name: 'Green Valley University',
      description: 'Premier educational institution offering undergraduate and graduate programs in various fields of study.',
      category: 'education',
      type: 'institution',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center',
      banner: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=200&fit=crop',
      admin: {
        name: 'Dr. Emily Rodriguez',
        email: 'emily.rodriguez@gvu.edu',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      memberCount: 8934,
      status: 'active',
      activityLevel: 'high',
      createdAt: '2022-08-20T14:15:00Z',
      website: 'https://greenvalleyuniversity.edu',
      email: 'admissions@gvu.edu',
      phone: '+1 (555) 987-6543',
      address: '456 University Ave, Green Valley, NY 12345'
    },
    {
      id: '3',
      name: 'Community Health Center',
      description: 'Non-profit healthcare organization providing comprehensive medical services to underserved communities.',
      category: 'healthcare',
      type: 'organization',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center',
      banner: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=200&fit=crop',
      admin: {
        name: 'Dr. James Wilson',
        email: 'james.wilson@chc.org',
        avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
      },
      memberCount: 456,
      status: 'active',
      activityLevel: 'medium',
      createdAt: '2023-03-10T09:45:00Z',
      website: 'https://communityhealthcenter.org',
      email: 'info@chc.org',
      phone: '+1 (555) 456-7890',
      address: '789 Health Blvd, Community City, TX 78901'
    },
    {
      id: '4',
      name: 'Digital Marketing Hub',
      description: 'Creative agency specializing in digital marketing strategies and brand development for modern businesses.',
      category: 'business',
      type: 'company',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=200&fit=crop',
      admin: {
        name: 'Lisa Thompson',
        email: 'lisa.thompson@dmhub.com',
        avatar: 'https://randomuser.me/api/portraits/women/35.jpg'
      },
      memberCount: 89,
      status: 'pending',
      activityLevel: 'low',
      createdAt: '2024-01-05T16:20:00Z',
      website: 'https://digitalmarketinghub.com',
      email: 'hello@dmhub.com',
      phone: '+1 (555) 234-5678',
      address: '321 Marketing Lane, Creative District, CA 90210'
    },
    {
      id: '5',
      name: 'City Sports Club',
      description: 'Community sports organization promoting fitness and athletic activities for all age groups.',
      category: 'sports',
      type: 'club',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
      banner: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=200&fit=crop',
      admin: {
        name: 'Robert Martinez',
        email: 'robert.martinez@citysports.org',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
      },
      memberCount: 234,
      status: 'archived',
      activityLevel: 'low',
      createdAt: '2022-11-12T11:30:00Z',
      website: 'https://citysportsclub.org',
      email: 'info@citysports.org',
      phone: '+1 (555) 345-6789',
      address: '654 Sports Ave, Athletic City, FL 33101'
    },
    {
      id: '6',
      name: 'Innovation Labs',
      description: 'Research and development facility focused on emerging technologies and scientific breakthroughs.',
      category: 'technology',
      type: 'organization',
      logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop&crop=center',
      banner: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=200&fit=crop',
      admin: {
        name: 'Dr. Amanda Foster',
        email: 'amanda.foster@innovationlabs.com',
        avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
      },
      memberCount: 67,
      status: 'suspended',
      activityLevel: 'inactive',
      createdAt: '2023-07-18T13:45:00Z',
      website: 'https://innovationlabs.com',
      email: 'research@innovationlabs.com',
      phone: '+1 (555) 567-8901',
      address: '987 Innovation Dr, Tech Park, WA 98101'
    }
  ];

  // Initialize data
  useEffect(() => {
    const loadEntities = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEntities(mockEntities);
      setFilteredEntities(mockEntities);
      setLoading(false);
    };

    loadEntities();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...entities];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(entity =>
        entity?.name?.toLowerCase()?.includes(searchTerm) ||
        entity?.description?.toLowerCase()?.includes(searchTerm) ||
        entity?.admin?.name?.toLowerCase()?.includes(searchTerm) ||
        entity?.admin?.email?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(entity => entity?.category === filters?.category);
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(entity => entity?.status === filters?.status);
    }

    // Apply activity level filter
    if (filters?.activityLevel) {
      filtered = filtered?.filter(entity => entity?.activityLevel === filters?.activityLevel);
    }

    // Apply date range filter
    if (filters?.dateRange) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters?.dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'quarter':
          filterDate?.setMonth(now?.getMonth() - 3);
          break;
        case 'year':
          filterDate?.setFullYear(now?.getFullYear() - 1);
          break;
        default:
          filterDate?.setFullYear(1970);
      }

      filtered = filtered?.filter(entity => new Date(entity.createdAt) >= filterDate);
    }

    // Apply sorting
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        // Handle nested properties
        if (sortConfig?.key === 'admin') {
          aValue = a?.admin?.name;
          bValue = b?.admin?.name;
        }

        // Handle different data types
        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredEntities(filtered);
    setCurrentPage(1);
  }, [entities, filters, sortConfig]);

  // Get summary data
  const getSummaryData = () => {
    return {
      totalEntities: entities?.length,
      activeEntities: entities?.filter(e => e?.status === 'active')?.length,
      pendingEntities: entities?.filter(e => e?.status === 'pending')?.length,
      suspendedEntities: entities?.filter(e => e?.status === 'suspended')?.length
    };
  };

  // Handle entity actions
  const handleEntityAction = (entityId, action) => {
    const entity = entities?.find(e => e?.id === entityId);
    
    switch (action) {
      case 'edit':
        setEntityModal({
          isOpen: true,
          entity: entity,
          loading: false
        });
        break;
      case 'view':
        navigate(`/entity-detail-page?id=${entityId}`);
        break;
      case 'archive':
        setConfirmModal({
          isOpen: true,
          type: 'warning',
          title: 'Archive Entity',
          message: `Are you sure you want to archive "${entity?.name}"? This will hide it from public view but preserve all data.`,
          action: () => updateEntityStatus(entityId, 'archived'),
          entityId: entityId,
          loading: false
        });
        break;
      case 'suspend':
        setConfirmModal({
          isOpen: true,
          type: 'warning',
          title: 'Suspend Entity',
          message: `Are you sure you want to suspend "${entity?.name}"? This will prevent all access to the entity.`,
          action: () => updateEntityStatus(entityId, 'suspended'),
          entityId: entityId,
          loading: false
        });
        break;
      case 'delete':
        setConfirmModal({
          isOpen: true,
          type: 'danger',
          title: 'Delete Entity',
          message: `Are you sure you want to permanently delete "${entity?.name}"? This action cannot be undone and will remove all associated data.`,
          action: () => deleteEntity(entityId),
          entityId: entityId,
          loading: false
        });
        break;
      default:
        break;
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action, entityIds) => {
    const entityNames = entityIds?.map(id => 
      entities?.find(e => e?.id === id)?.name
    )?.filter(Boolean);

    switch (action) {
      case 'archive':
        setConfirmModal({
          isOpen: true,
          type: 'warning',
          title: 'Archive Entities',
          message: `Are you sure you want to archive ${entityIds?.length} entities? This will hide them from public view but preserve all data.`,
          action: () => bulkUpdateStatus(entityIds, 'archived'),
          entityId: null,
          loading: false
        });
        break;
      case 'suspend':
        setConfirmModal({
          isOpen: true,
          type: 'warning',
          title: 'Suspend Entities',
          message: `Are you sure you want to suspend ${entityIds?.length} entities? This will prevent all access to these entities.`,
          action: () => bulkUpdateStatus(entityIds, 'suspended'),
          entityId: null,
          loading: false
        });
        break;
      case 'delete':
        setConfirmModal({
          isOpen: true,
          type: 'danger',
          title: 'Delete Entities',
          message: `Are you sure you want to permanently delete ${entityIds?.length} entities? This action cannot be undone and will remove all associated data.`,
          action: () => bulkDeleteEntities(entityIds),
          entityId: null,
          loading: false
        });
        break;
      default:
        break;
    }
  };

  // Update entity status
  const updateEntityStatus = async (entityId, status) => {
    setConfirmModal(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEntities(prev => prev?.map(entity =>
      entity?.id === entityId ? { ...entity, status } : entity
    ));
    
    setConfirmModal({ isOpen: false, type: 'default', title: '', message: '', action: null, entityId: null, loading: false });
    setSelectedEntities([]);
  };

  // Delete entity
  const deleteEntity = async (entityId) => {
    setConfirmModal(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEntities(prev => prev?.filter(entity => entity?.id !== entityId));
    
    setConfirmModal({ isOpen: false, type: 'default', title: '', message: '', action: null, entityId: null, loading: false });
    setSelectedEntities([]);
  };

  // Bulk update status
  const bulkUpdateStatus = async (entityIds, status) => {
    setConfirmModal(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEntities(prev => prev?.map(entity =>
      entityIds?.includes(entity?.id) ? { ...entity, status } : entity
    ));
    
    setConfirmModal({ isOpen: false, type: 'default', title: '', message: '', action: null, entityId: null, loading: false });
    setSelectedEntities([]);
  };

  // Bulk delete entities
  const bulkDeleteEntities = async (entityIds) => {
    setConfirmModal(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEntities(prev => prev?.filter(entity => !entityIds?.includes(entity?.id)));
    
    setConfirmModal({ isOpen: false, type: 'default', title: '', message: '', action: null, entityId: null, loading: false });
    setSelectedEntities([]);
  };

  // Handle entity form save
  const handleEntitySave = async (formData) => {
    setEntityModal(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (entityModal?.entity) {
      // Update existing entity
      setEntities(prev => prev?.map(entity =>
        entity?.id === entityModal?.entity?.id 
          ? { 
              ...entity, 
              ...formData,
              admin: {
                ...entity?.admin,
                email: formData?.adminEmail
              }
            }
          : entity
      ));
    } else {
      // Create new entity
      const newEntity = {
        id: Date.now()?.toString(),
        ...formData,
        admin: {
          name: 'New Admin',
          email: formData?.adminEmail,
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        memberCount: 0,
        status: 'pending',
        activityLevel: 'low',
        createdAt: new Date()?.toISOString()
      };
      
      setEntities(prev => [newEntity, ...prev]);
    }
    
    setEntityModal({ isOpen: false, entity: null, loading: false });
  };

  // Get paginated entities
  // Export functionality for entities
const handleExportEntities = async (format = 'csv') => {
  setIsExporting(true);
  console.log('Starting entity export in format:', format);
  
  try {
    const exportData = entities.map(entity => ({
      id: entity.id,
      name: entity.name,
      category: entity.category,
      type: entity.type,
      status: entity.status,
      memberCount: entity.memberCount,
      createdAt: entity.createdAt,
      adminEmail: entity.adminEmail,
      website: entity.website,
      phone: entity.phone,
      address: entity.address
    }));

    if (format === 'csv') {
      const csvContent = convertToCSV(exportData);
      console.log('Generated CSV content:', csvContent.substring(0, 200) + '...');
      downloadFile(csvContent, 'entities-export.csv', 'text/csv');
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(exportData, null, 2);
      console.log('Generated JSON content length:', jsonContent.length);
      downloadFile(jsonContent, 'entities-export.json', 'application/json');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Entity export completed successfully');
    alert(`Entities exported successfully as ${format.toUpperCase()}`);
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
        const validation = validateEntityRow(row);
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
          category: row.category,
          type: 'existing',
          message: 'Already exists in the system'
        })),
        ...internalDuplicates.map(dup => ({
          name: dup.name,
          category: dup.category,
          type: 'internal',
          message: `Duplicate within uploaded file (rows ${dup.firstOccurrence + 1} and ${dup.index + 1})`
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

  // Validate entity row data and check for duplicates
  const validateEntityRow = (row) => {
    const hasRequiredFields = row.name && row.category && row.type;
    if (!hasRequiredFields) return { isValid: false, isDuplicate: false };

    // Check for duplicates in existing entities
    const isDuplicate = entities.some(entity => 
      entity.name.toLowerCase().trim() === row.name.toLowerCase().trim() &&
      entity.category.toLowerCase().trim() === row.category.toLowerCase().trim()
    );

    return { isValid: hasRequiredFields, isDuplicate };
  };

  // Check for duplicates within the uploaded data itself
  const checkInternalDuplicates = (data) => {
    const seen = new Map();
    const duplicates = [];

    data.forEach((row, index) => {
      const key = `${row.name?.toLowerCase().trim()}-${row.category?.toLowerCase().trim()}`;
      if (seen.has(key)) {
        duplicates.push({
          index,
          name: row.name,
          category: row.category,
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
    const validRows = previewData.filter(row => row._isValid && !row._isDuplicate && !row._hasInternalDuplicate).map(row => row._previewId);
    setSelectedRows(prev => 
      prev.length === validRows.length ? [] : validRows
    );
  };

  // Cancel upload and reset
  const cancelUpload = () => {
    setUploadFile(null);
    setPreviewData([]);
    setSelectedRows([]);
    setShowPreview(false);
    setDuplicateWarning({ show: false, duplicates: [] });
    
    const fileInput = document.getElementById('entity-bulk-upload-input');
    if (fileInput) fileInput.value = '';
  };

  // Bulk upload functionality for entities
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
      
      await processBulkEntities(cleanedData);

      alert(`Successfully processed ${selectedRows.length} entities from ${uploadFile.name}`);
      setUploadFile(null);
      setPreviewData([]);
      setSelectedRows([]);
      setShowPreview(false);
      
      // Reset file input
      const fileInput = document.getElementById('entity-bulk-upload-input');
      if (fileInput) fileInput.value = '';
      
      // Refresh entity list
      window.location.reload();
    } catch (error) {
      console.error('Bulk upload failed:', error);
      alert(`Bulk upload failed: ${error.message}`);
    } finally {
      setIsBulkUploading(false);
    }
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
    const entities = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const entity = {};
      headers.forEach((header, index) => {
        entity[header] = values[index] || '';
      });
      entities.push(entity);
    }
    
    return entities;
  };

  // Process bulk entities (mock implementation)
  const processBulkEntities = async (entitiesData) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const processedEntities = entitiesData.map(entity => ({
      ...entity,
      id: Math.random().toString(36).substr(2, 9),
      status: entity.status || 'active',
      createdAt: entity.createdAt || new Date().toISOString(),
      memberCount: parseInt(entity.memberCount) || 0
    }));
    
    // Add processed entities to the existing list
    setEntities(prev => [...processedEntities, ...prev]);
    console.log('Processed entities:', processedEntities);
    return processedEntities;
  };

const getPaginatedEntities = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEntities?.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredEntities?.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <RoleAdaptiveHeader user={currentUser} />
        <AdminSidebar 
          user={currentUser}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className={`pt-16 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
          <div className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)]?.map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleAdaptiveHeader user={currentUser} />
      <AdminSidebar 
        user={currentUser}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`pt-16 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span>Dashboard</span>
              <Icon name="ChevronRight" size={16} />
              <span>Super Admin</span>
              <Icon name="ChevronRight" size={16} />
              <span className="text-gray-900 font-medium">Entity Management</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Entity Management</h1>
                <p className="text-gray-600 mt-1">
                  Manage all platform entities, monitor activity, and control access permissions
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
                    id="entity-bulk-upload-input"
                  />
                  <Button
                    variant="outline"
                    iconName="Upload"
                    iconPosition="left"
                    onClick={() => document.getElementById('entity-bulk-upload-input').click()}
                    disabled={isBulkUploading}
                  >
                    {uploadFile ? uploadFile.name.substring(0, 15) + (uploadFile.name.length > 15 ? '...' : '') : 'Select File'}
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
                    onClick={() => handleExportEntities('csv')}
                    loading={isExporting}
                    disabled={isExporting}
                  >
                    Export CSV
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => handleExportEntities('json')}
                    loading={isExporting}
                    disabled={isExporting}
                  >
                    Export JSON
                  </Button>
                </div>
                
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setEntityModal({ isOpen: true, entity: null, loading: false })}
                >
                  Add Entity
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <EntitySummaryCards summaryData={getSummaryData()} />

          {/* Filters */}
          <EntityFilters 
            onFiltersChange={setFilters}
            activeFilters={filters}
          />

          {/* Bulk Upload Preview */}
          {showPreview && previewData.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6" data-testid="preview-table">
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
                      <th className="text-left py-3 px-4 font-medium text-foreground">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Admin Email</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Validation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className={`border-b border-border ${
                        !row._isValid || row._isDuplicate || row._hasInternalDuplicate ? 'bg-red-50' : ''
                      }`}>
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row._previewId)}
                            onChange={() => toggleRowSelection(row._previewId)}
                            disabled={!row._isValid || row._isDuplicate || row._hasInternalDuplicate}
                            className="rounded border-border"
                          />
                        </td>
                        <td className="py-3 px-4 text-foreground">{row.name || '-'}</td>
                        <td className="py-3 px-4 text-foreground">{row.category || '-'}</td>
                        <td className="py-3 px-4 text-foreground">{row.type || '-'}</td>
                        <td className="py-3 px-4 text-foreground">{row.status || 'active'}</td>
                        <td className="py-3 px-4 text-foreground">{row.adminEmail || '-'}</td>
                        <td className="py-3 px-4">
                          {row._isDuplicate ? (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                              <Icon name="AlertTriangle" size={12} className="mr-1" />
                              Duplicate
                            </span>
                          ) : row._hasInternalDuplicate ? (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Icon name="Copy" size={12} className="mr-1" />
                              Internal Dup
                            </span>
                          ) : row._isValid ? (
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
                      Please ensure all rows have name, category, and type fields.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Duplicate Warning Modal */}
          {duplicateWarning.show && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Icon name="AlertTriangle" size={24} className="text-orange-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Duplicate Entries Detected</h3>
                  </div>
                  <button
                    onClick={() => setDuplicateWarning({ show: false, duplicates: [] })}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-4">
                    The following duplicate entries were found and have been automatically excluded from upload:
                  </p>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {duplicateWarning.duplicates.map((duplicate, index) => (
                      <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{duplicate.name}</p>
                            <p className="text-sm text-gray-600">Category: {duplicate.category}</p>
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            duplicate.type === 'existing' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {duplicate.type === 'existing' ? 'Existing Entity' : 'Internal Duplicate'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{duplicate.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    {duplicateWarning.duplicates.length} duplicate{duplicateWarning.duplicates.length !== 1 ? 's' : ''} found
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setDuplicateWarning({ show: false, duplicates: [] })}
                    >
                      Close
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => {
                        setDuplicateWarning({ show: false, duplicates: [] });
                        // Focus on the preview table
                        const previewTable = document.querySelector('[data-testid="preview-table"]');
                        if (previewTable) previewTable.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Review Selection
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Table */}
          <EntityDataTable
            entities={getPaginatedEntities()}
            onEntityAction={handleEntityAction}
            onBulkAction={handleBulkAction}
            selectedEntities={selectedEntities}
            onSelectionChange={setSelectedEntities}
            sortConfig={sortConfig}
            onSort={setSortConfig}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredEntities?.length)} of {filteredEntities?.length} entities
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronLeft"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  {[...Array(Math.min(5, totalPages))]?.map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronRight"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Modals */}
      <ConfirmationModal
        isOpen={confirmModal?.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, type: 'default', title: '', message: '', action: null, entityId: null, loading: false })}
        onConfirm={confirmModal?.action}
        title={confirmModal?.title}
        message={confirmModal?.message}
        type={confirmModal?.type}
        loading={confirmModal?.loading}
        confirmText={confirmModal?.type === 'danger' ? 'Delete' : 'Confirm'}
      />
      <EntityFormModal
        isOpen={entityModal?.isOpen}
        onClose={() => setEntityModal({ isOpen: false, entity: null, loading: false })}
        onSave={handleEntitySave}
        entity={entityModal?.entity}
        loading={entityModal?.loading}
      />
    </div>
  );
};

export default EntityManagementPanel;