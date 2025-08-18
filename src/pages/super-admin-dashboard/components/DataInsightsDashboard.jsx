import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DataInsightsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'users', label: 'User Insights', icon: 'Users' },
    { id: 'entities', label: 'Entity Insights', icon: 'Building2' },
    { id: 'engagement', label: 'Engagement', icon: 'Activity' }
  ];

  const overviewMetrics = [
    { label: 'Total Platform Revenue', value: '$127,450', change: '+23.5%', positive: true },
    { label: 'Monthly Active Users', value: '2,654', change: '+12.3%', positive: true },
    { label: 'Entity Signup Rate', value: '89.2%', change: '+5.7%', positive: true },
    { label: 'Support Tickets', value: '23', change: '-15.2%', positive: true }
  ];

  const userInsights = [
    { region: 'North America', users: 1245, percentage: 46.9 },
    { region: 'Europe', users: 782, percentage: 29.4 },
    { region: 'Asia Pacific', users: 456, percentage: 17.2 },
    { region: 'Other', users: 171, percentage: 6.5 }
  ];

  const entityCategories = [
    { category: 'Education', count: 345, percentage: 28.0, color: 'bg-blue-500' },
    { category: 'Technology', count: 289, percentage: 23.4, color: 'bg-green-500' },
    { category: 'Healthcare', count: 234, percentage: 19.0, color: 'bg-red-500' },
    { category: 'Community', count: 198, percentage: 16.0, color: 'bg-purple-500' },
    { category: 'Business', count: 123, percentage: 10.0, color: 'bg-yellow-500' },
    { category: 'Non-profit', count: 45, percentage: 3.6, color: 'bg-gray-500' }
  ];

  const engagementMetrics = [
    { metric: 'Average Session Duration', value: '8m 32s', trend: 'up' },
    { metric: 'Pages per Session', value: '4.2', trend: 'up' },
    { metric: 'Bounce Rate', value: '23.5%', trend: 'down' },
    { metric: 'Return Visitor Rate', value: '67.8%', trend: 'up' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {overviewMetrics.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">{metric.label}</div>
            <div className="text-2xl font-bold text-foreground mt-1">{metric.value}</div>
            <div className={`text-sm mt-1 flex items-center ${
              metric.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              <Icon 
                name={metric.positive ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
                className="mr-1" 
              />
              {metric.change}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Platform Growth Trend</h3>
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Icon name="TrendingUp" size={48} className="mx-auto mb-2" />
            <p>Growth chart visualization would appear here</p>
            <p className="text-sm">Connect your analytics service for live data</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserInsights = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">User Distribution by Region</h3>
        <div className="space-y-4">
          {userInsights.map((region, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-foreground">{region.region}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-foreground font-medium">{region.users.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{region.percentage}%</div>
                </div>
                <div className="w-20 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">User Activity Heatmap</h3>
        <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Icon name="Calendar" size={48} className="mx-auto mb-2" />
            <p>Activity heatmap would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEntityInsights = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Entity Categories</h3>
        <div className="space-y-3">
          {entityCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span className="text-foreground">{category.category}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-foreground font-medium">{category.count}</div>
                  <div className="text-sm text-muted-foreground">{category.percentage}%</div>
                </div>
                <div className="w-20 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Entity Performance</h3>
        <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Icon name="BarChart" size={48} className="mx-auto mb-2" />
            <p>Entity performance chart would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEngagement = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {engagementMetrics.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{metric.metric}</div>
                <div className="text-xl font-bold text-foreground mt-1">{metric.value}</div>
              </div>
              <Icon 
                name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={24} 
                className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'} 
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Engagement Timeline</h3>
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Icon name="Activity" size={48} className="mx-auto mb-2" />
            <p>Engagement timeline chart would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'users': return renderUserInsights();
      case 'entities': return renderEntityInsights();
      case 'engagement': return renderEngagement();
      default: return renderOverview();
    }
  };

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="PieChart" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Data Insights Dashboard</h2>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default DataInsightsDashboard;
