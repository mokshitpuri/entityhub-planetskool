import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Image from '../../components/AppImage';

const PersonalEntityPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('entityhub_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const entityId = searchParams?.get('id') || '1';
  
  // Entity database (same as other components)
  const entityDatabase = {
    '1': { id: 1, name: 'Harvard University', category: 'Education', memberCount: 45000, image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400' },
    '2': { id: 2, name: 'Google Inc', category: 'Technology', memberCount: 156000, image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400' },
    '3': { id: 3, name: 'Red Cross International', category: 'Nonprofit', memberCount: 12500, image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400' },
    '4': { id: 4, name: 'Local Community Center', category: 'Community', memberCount: 850, image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400' },
    '5': { id: 5, name: 'Tech Startup Hub', category: 'Business', memberCount: 2300, image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400' },
    '6': { id: 6, name: 'Healthcare Alliance', category: 'Healthcare', memberCount: 8900, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d76b6e?w=400' },
    '7': { id: 7, name: 'Environmental Action Group', category: 'Nonprofit', memberCount: 1200, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
    '8': { id: 8, name: 'City Sports Club', category: 'Sports', memberCount: 450, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400' }
  };

  const entity = entityDatabase[entityId];
  
  // Check if user is a member
  const isMember = user?.memberships?.includes(entityId) || false;
  
  // Mock joining date based on entity ID
  const getJoiningDate = () => {
    const dates = {
      '1': '2024-01-15',
      '2': '2024-03-22',
      '4': '2024-02-10',
      '8': '2024-04-05'
    };
    return dates[entityId] || '2024-01-01';
  };

  // Mock activity data
  const getActivityData = () => ({
    totalPosts: Math.floor(Math.random() * 50) + 10,
    totalComments: Math.floor(Math.random() * 100) + 20,
    eventsAttended: Math.floor(Math.random() * 15) + 5,
    contentViewed: Math.floor(Math.random() * 200) + 50,
    lastActive: '2 hours ago',
    streak: Math.floor(Math.random() * 30) + 5
  });

  const activityData = getActivityData();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'activity', label: 'My Activity', icon: 'Activity' },
    { id: 'content', label: 'Content', icon: 'FileText' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' }
  ];

  if (!user || !entity) {
    return <div>Loading...</div>;
  }

  if (!isMember) {
    return (
      <>
        <RoleAdaptiveHeader user={user} />
        <main className="pt-16 pb-20 md:pb-6 min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <Icon name="Lock" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Access Restricted</h1>
              <p className="text-muted-foreground mb-4">
                You need to be a member of {entity.name} to access this page.
              </p>
              <Button onClick={() => navigate(-1)} variant="outline">
                Go Back
              </Button>
            </div>
          </div>
        </main>
        <BottomTabNavigation />
      </>
    );
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Membership Summary */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={entity.image} 
            alt={entity.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-xl font-semibold text-foreground">{entity.name}</h2>
            <p className="text-muted-foreground">{entity.category}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <Icon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Member Since</p>
            <p className="font-semibold text-foreground">
              {new Date(getJoiningDate()).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="text-center p-4 bg-success/5 rounded-lg">
            <Icon name="Users" size={24} className="text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Total Members</p>
            <p className="font-semibold text-foreground">{entity.memberCount.toLocaleString()}</p>
          </div>
          
          <div className="text-center p-4 bg-warning/5 rounded-lg">
            <Icon name="Flame" size={24} className="text-warning mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Activity Streak</p>
            <p className="font-semibold text-foreground">{activityData.streak} days</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Activity Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{activityData.totalPosts}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{activityData.totalComments}</div>
            <div className="text-sm text-muted-foreground">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{activityData.eventsAttended}</div>
            <div className="text-sm text-muted-foreground">Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{activityData.contentViewed}</div>
            <div className="text-sm text-muted-foreground">Content Viewed</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { type: 'post', action: 'Posted in discussion forum', time: '2 hours ago', icon: 'MessageSquare' },
            { type: 'event', action: 'Attended weekly meetup', time: '1 day ago', icon: 'Calendar' },
            { type: 'content', action: 'Viewed lecture: Advanced Topics', time: '3 days ago', icon: 'Play' },
            { type: 'comment', action: 'Commented on announcement', time: '1 week ago', icon: 'MessageCircle' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name={activity.icon} size={16} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">My Content Access</h3>
        <div className="space-y-4">
          {[
            { title: 'Beginner Course Series', progress: 85, type: 'Course' },
            { title: 'Weekly Announcements', progress: 100, type: 'Announcements' },
            { title: 'Community Events', progress: 60, type: 'Events' },
            { title: 'Discussion Forums', progress: 75, type: 'Discussions' },
          ].map((content, index) => (
            <div key={index} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{content.title}</h4>
                <span className="text-sm text-muted-foreground">{content.type}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${content.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{content.progress}% completed</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProgressTab = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Progress Tracking</h3>
        
        {/* Overall Progress */}
        <div className="mb-6 p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">Overall Engagement</h4>
            <span className="text-sm font-bold text-primary">78%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div className="bg-primary h-3 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Milestones Achieved</h4>
          <div className="space-y-3">
            {[
              { title: 'First Post', achieved: true, date: '2024-02-15' },
              { title: '10 Comments', achieved: true, date: '2024-03-01' },
              { title: '30 Days Active', achieved: true, date: '2024-03-15' },
              { title: '50 Posts', achieved: false, progress: '35/50' },
              { title: 'Event Organizer', achieved: false, progress: 'Coming Soon' },
            ].map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                <Icon 
                  name={milestone.achieved ? "CheckCircle" : "Circle"} 
                  size={20} 
                  className={milestone.achieved ? "text-success" : "text-muted-foreground"} 
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{milestone.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {milestone.achieved ? `Achieved on ${milestone.date}` : milestone.progress}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverviewTab();
      case 'activity': return renderActivityTab();
      case 'content': return renderContentTab();
      case 'progress': return renderProgressTab();
      default: return renderOverviewTab();
    }
  };

  return (
    <>
      <RoleAdaptiveHeader user={user} />
      <main className="pt-16 pb-20 md:pb-6 min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                iconName="ArrowLeft"
              >
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <img 
                  src={entity.image} 
                  alt={entity.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <h1 className="text-xl font-bold text-foreground">My {entity.name} Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Personal view and tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-card border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {renderTabContent()}
        </div>
      </main>
      <BottomTabNavigation />
    </>
  );
};

export default PersonalEntityPage;
