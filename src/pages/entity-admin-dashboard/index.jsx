import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import EntityContextBar from '../../components/ui/EntityContextBar';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';

// Import components
import MemberCard from './components/MemberCard';
import JoinRequestCard from './components/JoinRequestCard';
import ContentCard from './components/ContentCard';
import EntitySettingsForm from './components/EntitySettingsForm';
import MetricsCard from './components/MetricsCard';

const EntityAdminDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams?.get('tab') || 'members');
  const [searchQuery, setSearchQuery] = useState('');
  const [memberFilter, setMemberFilter] = useState('all');
  const [contentFilter, setContentFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Get user data from localStorage
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('entityhub_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser({ ...parsedUser, role: 'entity-admin' });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Mock entity data
  const currentEntity = {
    id: '1',
    name: 'Tech Innovators Community',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=200&fit=crop',
    type: 'Community',
    category: 'technology',
    memberCount: 1247,
    status: 'active',
    userRole: 'admin',
    description: 'A vibrant community of technology enthusiasts, developers, and innovators sharing knowledge and building the future together.',
    website: 'https://techinnovators.com',
    contactEmail: 'hello@techinnovators.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    primaryColor: '#1e40af',
    secondaryColor: '#64748b',
    isPublic: true,
    allowJoinRequests: true,
    requireApproval: true
  };

  // Mock metrics data
  const metricsData = [
    {
      title: 'Total Members',
      value: '1,247',
      change: 12,
      changeType: 'positive',
      icon: 'Users',
      description: 'Active community members'
    },
    {
      title: 'Pending Requests',
      value: '23',
      change: -5,
      changeType: 'negative',
      icon: 'UserPlus',
      description: 'Awaiting approval'
    },
    {
      title: 'Published Content',
      value: '156',
      change: 8,
      changeType: 'positive',
      icon: 'FileText',
      description: 'Lectures, courses & events'
    },
    {
      title: 'Engagement Rate',
      value: '87%',
      change: 3,
      changeType: 'positive',
      icon: 'Activity',
      description: 'Member participation'
    }
  ];

  // Mock members data
  const [members, setMembers] = useState([
    {
      id: '1',
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'moderator',
      status: 'active',
      joinedAt: '2024-01-15',
      lastLogin: '2024-08-14T05:30:00Z',
      messageCount: 142,
      eventAttendance: 8,
      isOnline: true
    },
    {
      id: '2',
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      role: 'member',
      status: 'active',
      joinedAt: '2024-02-20',
      lastLogin: '2024-08-13T18:45:00Z',
      messageCount: 89,
      eventAttendance: 12,
      isOnline: false
    },
    {
      id: '3',
      name: 'Michael Thompson',
      email: 'michael.thompson@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      role: 'member',
      status: 'suspended',
      joinedAt: '2024-03-10',
      lastLogin: '2024-08-10T12:20:00Z',
      messageCount: 23,
      eventAttendance: 2,
      isOnline: false
    },
    {
      id: '4',
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      role: 'admin',
      status: 'active',
      joinedAt: '2023-11-05',
      lastLogin: '2024-08-14T07:15:00Z',
      messageCount: 267,
      eventAttendance: 15,
      isOnline: true
    }
  ]);

  // Mock join requests data
  const [joinRequests, setJoinRequests] = useState([
    {
      id: '1',
      name: 'David Kumar',
      email: 'david.kumar@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      requestedAt: '2024-08-13T14:30:00Z',
      message: 'I am a software engineer with 5 years of experience in React and Node.js. I would love to contribute to this community and learn from fellow developers.',
      location: 'New York, NY',
      profession: 'Software Engineer',
      mutualConnections: 3
    },
    {
      id: '2',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      requestedAt: '2024-08-12T09:15:00Z',
      message: 'As a UX designer passionate about technology, I believe I can bring valuable insights to your community discussions.',
      location: 'Austin, TX',
      profession: 'UX Designer',
      mutualConnections: 7
    },
    {
      id: '3',
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      requestedAt: '2024-08-11T16:45:00Z',
      message: 'I am interested in joining to stay updated with the latest tech trends and network with like-minded professionals.',
      location: 'Seattle, WA',
      profession: 'Product Manager',
      mutualConnections: 2
    }
  ]);

  // Mock content data
  const [content, setContent] = useState([
    {
      id: '1',
      title: 'Introduction to React Hooks',
      description: 'Learn the fundamentals of React Hooks and how to use them effectively in your applications.',
      type: 'lecture',
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
      createdAt: '2024-08-10',
      publishedAt: '2024-08-12',
      views: 1247,
      likes: 89,
      comments: 23
    },
    {
      id: '2',
      title: 'Full Stack Development Course',
      description: 'Complete course covering frontend and backend development with modern technologies.',
      type: 'course',
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
      createdAt: '2024-08-05',
      publishedAt: '2024-08-08',
      views: 2156,
      likes: 156,
      comments: 45
    },
    {
      id: '3',
      title: 'Tech Meetup: AI & Machine Learning',
      description: 'Join us for an exciting discussion about the latest trends in AI and machine learning.',
      type: 'event',
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop',
      createdAt: '2024-08-08',
      publishedAt: '2024-08-09',
      eventDate: '2024-08-20',
      eventTime: '6:00 PM PST',
      views: 567,
      likes: 34,
      comments: 12
    },
    {
      id: '4',
      title: 'Community Guidelines Update',
      description: 'Important updates to our community guidelines and code of conduct.',
      type: 'announcement',
      status: 'draft',
      createdAt: '2024-08-13',
      views: 0,
      likes: 0,
      comments: 0
    }
  ]);

  const memberFilterOptions = [
    { value: 'all', label: 'All Members' },
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'pending', label: 'Pending' },
    { value: 'admin', label: 'Admins' },
    { value: 'moderator', label: 'Moderators' }
  ];

  const contentFilterOptions = [
    { value: 'all', label: 'All Content' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Drafts' },
    { value: 'lecture', label: 'Lectures' },
    { value: 'course', label: 'Courses' },
    { value: 'event', label: 'Events' },
    { value: 'announcement', label: 'Announcements' }
  ];

  // Filter functions
  const filteredMembers = members?.filter(member => {
    const matchesSearch = member?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         member?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesFilter = memberFilter === 'all' || member?.status === memberFilter || member?.role === memberFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredContent = content?.filter(item => {
    const matchesSearch = item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesFilter = contentFilter === 'all' || item?.status === contentFilter || item?.type === contentFilter;
    return matchesSearch && matchesFilter;
  });

  // Event handlers
  const handleMemberRoleChange = (memberId, newRole) => {
    setMembers(prev => prev?.map(member => 
      member?.id === memberId ? { ...member, role: newRole } : member
    ));
  };

  const handleMemberStatusChange = (memberId, newStatus) => {
    setMembers(prev => prev?.map(member => 
      member?.id === memberId ? { ...member, status: newStatus } : member
    ));
  };

  const handleRemoveMember = (memberId) => {
    setMembers(prev => prev?.filter(member => member?.id !== memberId));
  };

  const handleApproveRequest = (requestId) => {
    const request = joinRequests?.find(req => req?.id === requestId);
    if (request) {
      // Add to members
      const newMember = {
        id: `new_${Date.now()}`,
        name: request?.name,
        email: request?.email,
        avatar: request?.avatar,
        role: 'member',
        status: 'active',
        joinedAt: new Date()?.toISOString()?.split('T')?.[0],
        lastLogin: new Date()?.toISOString(),
        messageCount: 0,
        eventAttendance: 0,
        isOnline: false
      };
      setMembers(prev => [...prev, newMember]);
      
      // Remove from requests
      setJoinRequests(prev => prev?.filter(req => req?.id !== requestId));
    }
  };

  const handleRejectRequest = (requestId) => {
    setJoinRequests(prev => prev?.filter(req => req?.id !== requestId));
  };

  const handleContentEdit = (contentId) => {
    console.log('Edit content:', contentId);
  };

  const handleContentDelete = (contentId) => {
    setContent(prev => prev?.filter(item => item?.id !== contentId));
  };

  const handleContentPublish = (contentId) => {
    setContent(prev => prev?.map(item => 
      item?.id === contentId ? { ...item, status: 'published', publishedAt: new Date()?.toISOString()?.split('T')?.[0] } : item
    ));
  };

  const handleContentUnpublish = (contentId) => {
    setContent(prev => prev?.map(item => 
      item?.id === contentId ? { ...item, status: 'draft' } : item
    ));
  };

  const handleSettingsSave = (formData) => {
    console.log('Save settings:', formData);
    // Simulate save
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleEntityAction = (action, entity) => {
    console.log('Entity action:', action, entity);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const userData = localStorage.getItem('entityhub_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser({ ...parsedUser, role: 'entity-admin' });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab && ['members', 'content', 'settings']?.includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleAdaptiveHeader
        user={currentUser}
        onSearch={handleSearch}
        onNavigate={handleNavigation}
      />
      {/* Entity Context Bar */}
      <div className="pt-16">
        <EntityContextBar
          entity={currentEntity}
          user={currentUser}
          onAction={handleEntityAction}
        />
      </div>
      {/* Main Content */}
      <main className="px-4 lg:px-6 py-6 pb-20 md:pb-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <span>Dashboard</span>
            <Icon name="ChevronRight" size={16} />
            <span>{currentEntity?.name}</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Admin Panel</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Entity Administration</h1>
          <p className="text-muted-foreground">
            Manage your entity's members, content, and settings
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metricsData?.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              description={metric?.description}
            />
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'members', label: 'Members', icon: 'Users', count: members?.length },
              { id: 'content', label: 'Content', icon: 'FileText', count: content?.length },
              { id: 'settings', label: 'Settings', icon: 'Settings' }
            ]?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-micro ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
                {tab?.count !== undefined && (
                  <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Members Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Members Management</h2>
                <p className="text-sm text-muted-foreground">
                  Manage member roles, status, and permissions
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Input
                  type="search"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64"
                />
                <Select
                  options={memberFilterOptions}
                  value={memberFilter}
                  onChange={setMemberFilter}
                  className="w-40"
                />
              </div>
            </div>

            {/* Join Requests */}
            {joinRequests?.length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-foreground mb-4">
                  Pending Join Requests ({joinRequests?.length})
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                  {joinRequests?.map((request) => (
                    <JoinRequestCard
                      key={request?.id}
                      request={request}
                      onApprove={handleApproveRequest}
                      onReject={handleRejectRequest}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Members List */}
            <div>
              <h3 className="text-md font-semibold text-foreground mb-4">
                Current Members ({filteredMembers?.length})
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredMembers?.map((member) => (
                  <MemberCard
                    key={member?.id}
                    member={member}
                    onRoleChange={handleMemberRoleChange}
                    onStatusChange={handleMemberStatusChange}
                    onRemoveMember={handleRemoveMember}
                  />
                ))}
              </div>
              
              {filteredMembers?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No members found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || memberFilter !== 'all' ?'Try adjusting your search or filter criteria' :'No members have joined this entity yet'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Content Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Content Management</h2>
                <p className="text-sm text-muted-foreground">
                  Create and manage lectures, courses, events, and announcements
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Input
                  type="search"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64"
                />
                <Select
                  options={contentFilterOptions}
                  value={contentFilter}
                  onChange={setContentFilter}
                  className="w-40"
                />
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Create Content
                </Button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent?.map((item) => (
                <ContentCard
                  key={item?.id}
                  content={item}
                  onEdit={handleContentEdit}
                  onDelete={handleContentDelete}
                  onPublish={handleContentPublish}
                  onUnpublish={handleContentUnpublish}
                />
              ))}
            </div>
            
            {filteredContent?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No content found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || contentFilter !== 'all' ?'Try adjusting your search or filter criteria' :'Start creating content for your community'
                  }
                </p>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Create Your First Content
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <EntitySettingsForm
              entity={currentEntity}
              onSave={handleSettingsSave}
              onCancel={() => setActiveTab('members')}
            />
          </div>
        )}
      </main>
      {/* Bottom Navigation */}
      <BottomTabNavigation
        user={currentUser}
        onNavigate={handleNavigation}
      />
    </div>
  );
};

export default EntityAdminDashboard;