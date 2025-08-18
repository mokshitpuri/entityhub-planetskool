import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import KPICard from './components/KPICard';
import EntityDistributionChart from './components/EntityDistributionChart';
import GrowthChart from './components/GrowthChart';
import RecentActivityFeed from './components/RecentActivityFeed';
import QuickActionPanel from './components/QuickActionPanel';
import AnalyticsExportPanel from './components/AnalyticsExportPanel';
import DataInsightsDashboard from './components/DataInsightsDashboard';
import ExportTestPanel from './components/ExportTestPanel';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get user data from localStorage
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('entityhub_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({ ...parsedUser, role: 'super-admin' });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Mock KPI data
  const kpiData = [
    {
      title: 'Total Entities',
      value: '1,234',
      trend: 'up',
      trendValue: '+12%',
      icon: 'Building2',
      description: 'Active entities on platform'
    },
    {
      title: 'Total Users',
      value: '2,847',
      trend: 'up',
      trendValue: '+8.5%',
      icon: 'Users',
      description: 'Registered platform users'
    },
    {
      title: 'Pending Requests',
      value: '23',
      trend: 'down',
      trendValue: '-15%',
      icon: 'Clock',
      description: 'Awaiting approval'
    },
    {
      title: 'Monthly Revenue',
      value: '$127K',
      trend: 'up',
      trendValue: '+23.5%',
      icon: 'DollarSign',
      description: 'Current month earnings'
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('entityhub_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({ ...parsedUser, role: 'super-admin' });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handleKPIClick = (title) => {
    switch (title) {
      case 'Total Entities': 
        navigate('/entity-management-panel');
        break;
      case 'Total Users': 
        navigate('/user-management-interface');
        break;
      case 'Pending Requests': 
        // Navigate to user management with pending filter
        navigate('/user-management-interface', { state: { filter: 'pending' } });
        break;
      case 'Monthly Revenue': 
        // For now, show an alert with revenue details
        alert('Revenue Analytics: $127,450 this month (+23.5% from last month)');
        break;
      default:
        break;
    }
  };

  const handleSearch = (query) => {
    console.log('Searching:', query);
  };

  const handleNavigation = (path) => {
    console.log('Navigating to:', path);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Super Admin Dashboard - EntityHub</title>
        <meta name="description" content="Comprehensive platform oversight and analytics for EntityHub administrators" />
      </Helmet>
      {/* Header */}
      <RoleAdaptiveHeader
        user={user}
        onSearch={handleSearch}
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
            <span>Dashboard</span>
            <Icon name="ChevronRight" size={16} />
            <span>Super Admin</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Overview</span>
          </nav>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Super Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Platform overview and system analytics
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
              </div>
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconSize={16}
                loading={isRefreshing}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                trend={kpi?.trend}
                trendValue={kpi?.trendValue}
                icon={kpi?.icon}
                description={kpi?.description}
                onClick={() => handleKPIClick(kpi?.title)}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <EntityDistributionChart />
            <GrowthChart />
          </div>

          {/* Export Test Panel - Temporary for debugging */}
          <div className="mb-8">
            <ExportTestPanel />
          </div>

          {/* Analytics Export Panel */}
          <div className="mb-8">
            <AnalyticsExportPanel />
          </div>

          {/* Data Insights Dashboard */}
          <div className="mb-8">
            <DataInsightsDashboard />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RecentActivityFeed />
            <QuickActionPanel />
          </div>

          {/* Mobile Spacing */}
          <div className="h-20 md:hidden" />
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;