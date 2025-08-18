import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import TabNavigation from './components/TabNavigation';
import SearchHeader from './components/SearchHeader';
import FilterPanel from './components/FilterPanel';
import EntityGrid from './components/EntityGrid';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EntityListHub = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [activeTab, setActiveTab] = useState(searchParams?.get('tab') || 'explore');
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams?.get('search') || '',
    category: searchParams?.get('category') || '',
    type: searchParams?.get('type') || '',
    activity: searchParams?.get('activity') || '',
    sort: searchParams?.get('sort') || 'relevance'
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [entities, setEntities] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get user data from localStorage
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('entityhub_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
      
      // Redirect super-admin away from memberships tab
      if (parsedUser.role === 'super-admin' && activeTab === 'memberships') {
        setActiveTab('explore');
        setSearchParams({ tab: 'explore' });
      }
    } else {
      navigate('/login');
    }
  }, [navigate, activeTab, setSearchParams]);

  // Mock entities data
  const mockEntities = [
    {
      id: '1',
      name: 'Harvard University',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
      category: 'education',
      type: 'geographical',
      memberCount: 45000,
      activityLevel: 'high',
      isVerified: true,
      userRelation: 'member',
      description: 'Leading research university with global impact'
    },
    {
      id: '2',
      name: 'Google Inc',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400',
      category: 'technology',
      type: 'custom',
      memberCount: 156000,
      activityLevel: 'high',
      isVerified: true,
      userRelation: 'member',
      description: 'Technology company focused on search and advertising'
    },
    {
      id: '3',
      name: 'Red Cross International',
      logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      category: 'nonprofit',
      type: 'political',
      memberCount: 12500,
      activityLevel: 'medium',
      isVerified: true,
      userRelation: null,
      description: 'Humanitarian organization providing emergency assistance'
    },
    {
      id: '4',
      name: 'Local Community Center',
      logo: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400',
      category: 'community',
      type: 'geographical',
      memberCount: 850,
      activityLevel: 'medium',
      isVerified: false,
      userRelation: 'member',
      description: 'Community hub for local events and activities'
    },
    {
      id: '5',
      name: 'Tech Startup Hub',
      logo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
      category: 'business',
      type: 'custom',
      memberCount: 2300,
      activityLevel: 'high',
      isVerified: true,
      userRelation: null,
      description: 'Innovation hub for technology startups'
    },
    {
      id: '6',
      name: 'Healthcare Alliance',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
      category: 'healthcare',
      type: 'political',
      memberCount: 8900,
      activityLevel: 'medium',
      isVerified: true,
      userRelation: 'admin',
      description: 'Professional alliance for healthcare workers'
    },
    {
      id: '7',
      name: 'Environmental Action Group',
      logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      category: 'nonprofit',
      type: 'political',
      memberCount: 1200,
      activityLevel: 'low',
      isVerified: false,
      userRelation: null,
      description: 'Grassroots environmental advocacy organization'
    },
    {
      id: '8',
      name: 'City Sports Club',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      category: 'sports',
      type: 'geographical',
      memberCount: 450,
      activityLevel: 'medium',
      isVerified: false,
      userRelation: 'member',
      description: 'Multi-sport recreational club for all ages'
    }
  ];

  // Filter entities based on active tab and filters
  const getFilteredEntities = () => {
    let filtered = [...mockEntities];

    // Filter by tab based on actual user data
    if (currentUser) {
      switch (activeTab) {
        case 'memberships':
          // Show only entities the user is a member of
          filtered = filtered?.filter(entity => 
            currentUser.memberships?.includes(entity.id) || 
            currentUser.ownedEntities?.includes(entity.id)
          );
          break;
        case 'explore':
        default:
          // For normal users: show entities they're NOT a member of
          if (currentUser.role === 'normal') {
            filtered = filtered?.filter(entity => !currentUser.memberships?.includes(entity.id));
          }
          // For entity admins: show entities they're NOT an owner of AND NOT a member of
          else if (currentUser.role === 'entity-admin') {
            filtered = filtered?.filter(entity => 
              !currentUser.ownedEntities?.includes(entity.id) && 
              !currentUser.memberships?.includes(entity.id)
            );
          }
          // For super-admin: show all entities (they don't have memberships)
          break;
      }
    }

    // Apply search filter
    if (filters?.search) {
      filtered = filtered?.filter(entity =>
        entity?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        entity?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(entity => entity?.category === filters?.category);
    }

    // Apply type filter
    if (filters?.type) {
      filtered = filtered?.filter(entity => entity?.type === filters?.type);
    }

    // Apply activity filter
    if (filters?.activity) {
      filtered = filtered?.filter(entity => entity?.activityLevel === filters?.activity);
    }

    // Apply sorting
    switch (filters?.sort) {
      case 'popularity':
        filtered?.sort((a, b) => b?.memberCount - a?.memberCount);
        break;
      case 'newest':
        // Mock newest sort (would use creation date in real app)
        filtered?.reverse();
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'members':
        filtered?.sort((a, b) => b?.memberCount - a?.memberCount);
        break;
      case 'activity':
        const activityOrder = { high: 3, medium: 2, low: 1 };
        filtered?.sort((a, b) => activityOrder?.[b?.activityLevel] - activityOrder?.[a?.activityLevel]);
        break;
      case 'relevance':
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  };

  // Get tab counts based on actual user data
  const getTabCounts = () => {
    if (!currentUser) return { explore: 0, admin: 0, memberships: 0 };
    
    const counts = {
      explore: 0,
      admin: 0,
      memberships: 0
    };

    // Calculate explore count based on role
    if (currentUser.role === 'normal') {
      counts.explore = mockEntities?.filter(e => !currentUser.memberships?.includes(e.id))?.length;
    } else if (currentUser.role === 'entity-admin') {
      counts.explore = mockEntities?.filter(e => 
        !currentUser.ownedEntities?.includes(e.id) && 
        !currentUser.memberships?.includes(e.id)
      )?.length;
    } else if (currentUser.role === 'super-admin') {
      counts.explore = mockEntities?.length;
    }

    // Admin count
    if (currentUser.role === 'entity-admin') {
      counts.admin = mockEntities?.filter(e => currentUser.ownedEntities?.includes(e.id))?.length;
    } else if (currentUser.role === 'super-admin') {
      counts.admin = mockEntities?.length;
    }

    // Memberships count
    if (currentUser.role !== 'super-admin') {
      counts.memberships = mockEntities?.filter(e => 
        currentUser.memberships?.includes(e.id) || 
        currentUser.ownedEntities?.includes(e.id)
      )?.length;
    }

    return counts;
  };

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeTab !== 'explore') params?.set('tab', activeTab);
    if (filters?.search) params?.set('search', filters?.search);
    if (filters?.category) params?.set('category', filters?.category);
    if (filters?.type) params?.set('type', filters?.type);
    if (filters?.activity) params?.set('activity', filters?.activity);
    if (filters?.sort !== 'relevance') params?.set('sort', filters?.sort);
    
    setSearchParams(params);
  }, [activeTab, filters, setSearchParams]);

  // Load entities (simulate API call)
  useEffect(() => {
    if (!currentUser) return;
    
    setLoading(true);
    const timer = setTimeout(() => {
      setEntities(getFilteredEntities());
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeTab, filters, currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleTabChange = (tab) => {
    if (tab === 'admin') {
      // Navigate to admin dashboard instead of showing admin tab content here
      navigate('/admin-hub');
    } else {
      setActiveTab(tab);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      type: '',
      activity: '',
      sort: 'relevance'
    };
    setFilters(clearedFilters);
    setSearchQuery('');
  };

  const handleEntityAction = (action, entity) => {
    console.log(`Action: ${action}`, entity);
    // Handle entity actions like view, manage, visit
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate loading more entities
      setLoading(false);
      setHasMore(false); // No more items to load in this demo
    }, 1000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEntities(getFilteredEntities());
    setIsRefreshing(false);
  };

  const filteredEntities = getFilteredEntities();
  const tabCounts = getTabCounts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleAdaptiveHeader
        user={currentUser}
        onSearch={handleSearchChange}
        onNavigate={(path) => navigate(path)}
      />
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-6">
        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabCounts={tabCounts}
          userRole={currentUser?.role || 'normal'}
        />

        {/* Search Header */}
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showFilters={showFilters}
          resultCount={filteredEntities?.length}
          activeTab={activeTab}
        />

        <div className="flex flex-col lg:flex-row">
          {/* Filter Sidebar - Desktop */}
          <aside className={`lg:w-80 lg:flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="lg:sticky lg:top-20 p-4 lg:p-6">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isVisible={true}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 p-4 lg:p-6">
            {/* Mobile Filter Panel */}
            {showFilters && (
              <div className="lg:hidden mb-6">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                  isVisible={true}
                />
              </div>
            )}

            {/* Pull to Refresh Indicator */}
            {isRefreshing && (
              <div className="flex items-center justify-center py-4 mb-4">
                <Icon name="RotateCw" size={20} className="animate-spin text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Refreshing...</span>
              </div>
            )}

            {/* Entity Grid */}
            <EntityGrid
              entities={filteredEntities}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              onEntityAction={handleEntityAction}
              userData={currentUser}
              emptyState={
                activeTab === 'memberships' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Users" size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No memberships</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't joined any entities yet. Explore to find communities to join.
                    </p>
                    <Button 
                      variant="default" 
                      iconName="Compass" 
                      iconPosition="left"
                      onClick={() => setActiveTab('explore')}
                    >
                      Explore Entities
                    </Button>
                  </div>
                ) : null
              }
            />
          </div>
        </div>
      </main>
      {/* Bottom Navigation */}
      <BottomTabNavigation
        user={currentUser}
        onNavigate={(path) => navigate(path)}
      />
    </div>
  );
};

export default EntityListHub;