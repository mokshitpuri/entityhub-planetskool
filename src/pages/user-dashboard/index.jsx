import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('my-subscriptions'); // my-subscriptions, explore, my-entities, courses
  const [recentActivity, setRecentActivity] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [courseRecommendations, setCourseRecommendations] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [myOwnedEntities, setMyOwnedEntities] = useState([]);
  const [exploreEntities, setExploreEntities] = useState([]);

  // Entity database for reference
  const entityDatabase = {
    '1': { id: 1, name: 'Harvard University', category: 'Education', memberCount: 45000, image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400' },
    '2': { id: 2, name: 'Google Inc', category: 'Technology', memberCount: 156000, image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400' },
    '3': { id: 3, name: 'Red Cross International', category: 'Nonprofit', memberCount: 12500, image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400' },
    '4': { id: 4, name: 'Local Community Center', category: 'Community', memberCount: 850, image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400' },
    '5': { id: 5, name: 'Tech Startup Hub', category: 'Business', memberCount: 2300, image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400' },
    '6': { id: 6, name: 'Healthcare Alliance', category: 'Healthcare', memberCount: 8900, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400' },
    '7': { id: 7, name: 'Environmental Action Group', category: 'Nonprofit', memberCount: 1200, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400' },
    '8': { id: 8, name: 'City Sports Club', category: 'Sports', memberCount: 450, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400' }
  };

  // Course database for recommendations
  const courseDatabase = [
    {
      id: 'course_1',
      title: 'React Complete Developer Course',
      category: 'Technology',
      subcategory: 'Web Development',
      instructor: 'John Mitchell',
      duration: '42 hours',
      level: 'Intermediate',
      rating: 4.8,
      enrollments: 85400,
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      description: 'Master React.js from basics to advanced concepts including hooks, context, and state management.',
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Redux'],
      isRecommended: true,
      matchReason: 'Based on your interest in Web Development',
      entity: 'Tech Startup Hub',
      isVerified: true
    },
    {
      id: 'course_2',
      title: 'Machine Learning Fundamentals',
      category: 'Technology',
      subcategory: 'Data Science',
      instructor: 'Dr. Sarah Chen',
      duration: '38 hours',
      level: 'Beginner',
      rating: 4.9,
      enrollments: 120500,
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
      description: 'Learn the fundamentals of machine learning with hands-on projects using Python.',
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'NumPy', 'Pandas'],
      isRecommended: true,
      matchReason: 'Popular in Technology category',
      entity: 'Google Inc',
      isVerified: true
    },
    {
      id: 'course_3',
      title: 'Digital Marketing Strategy',
      category: 'Business',
      subcategory: 'Marketing',
      instructor: 'Maria Rodriguez',
      duration: '25 hours',
      level: 'Intermediate',
      rating: 4.7,
      enrollments: 67800,
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400',
      description: 'Build comprehensive digital marketing strategies for modern businesses.',
      skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics', 'PPC'],
      isRecommended: true,
      matchReason: 'Matches your business interests',
      entity: 'Tech Startup Hub',
      isVerified: false
    },
    {
      id: 'course_4',
      title: 'Healthcare Data Analytics',
      category: 'Healthcare',
      subcategory: 'Data Analytics',
      instructor: 'Dr. Michael Thompson',
      duration: '32 hours',
      level: 'Advanced',
      rating: 4.6,
      enrollments: 34200,
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
      description: 'Analyze healthcare data to improve patient outcomes and operational efficiency.',
      skills: ['R', 'SQL', 'Healthcare', 'Statistics', 'Tableau'],
      isRecommended: false,
      matchReason: 'Trending in Healthcare',
      entity: 'Healthcare Alliance',
      isVerified: true
    },
    {
      id: 'course_5',
      title: 'Sustainable Business Practices',
      category: 'Environment',
      subcategory: 'Sustainability',
      instructor: 'Emma Green',
      duration: '20 hours',
      level: 'Beginner',
      rating: 4.5,
      enrollments: 28900,
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      description: 'Learn how to implement sustainable practices in business operations.',
      skills: ['Sustainability', 'Business Strategy', 'Environmental Impact', 'ESG'],
      isRecommended: false,
      matchReason: 'Environmental focus',
      entity: 'Environmental Action Group',
      isVerified: false
    },
    {
      id: 'course_6',
      title: 'Leadership in Nonprofit Organizations',
      category: 'Nonprofit',
      subcategory: 'Leadership',
      instructor: 'David Park',
      duration: '18 hours',
      level: 'Intermediate',
      rating: 4.4,
      enrollments: 19600,
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      description: 'Develop leadership skills specific to nonprofit sector challenges.',
      skills: ['Leadership', 'Nonprofit Management', 'Fundraising', 'Volunteer Management'],
      isRecommended: false,
      matchReason: 'Community involvement',
      entity: 'Red Cross International',
      isVerified: true
    }
  ];

  // Load user subscriptions based on their membership data
  const loadUserSubscriptions = (userData) => {
    if (!userData || !userData.memberships) {
      setMySubscriptions([]);
      return;
    }
    
    const subscriptions = userData.memberships.map(entityId => {
      const entity = entityDatabase[entityId];
      if (!entity) return null;
      
      return {
        id: entity.id,
        name: entity.name,
        role: 'member',
        status: 'active',
        memberCount: entity.memberCount,
        lastActivity: `${Math.floor(Math.random() * 24)} hours ago`,
        unreadCount: Math.floor(Math.random() * 10),
        category: entity.category,
        joinedDate: '2024-07-20',
        engagementLevel: Math.random() > 0.5 ? 'high' : 'medium',
        upcomingEvents: Math.floor(Math.random() * 5),
        subscriptionType: Math.random() > 0.5 ? 'premium' : 'free'
      };
    }).filter(Boolean);
    
    setMySubscriptions(subscriptions);
  };

  // Load explore entities (entities user is not a member of)
  const loadExploreEntities = (userData) => {
    if (!userData) {
      setExploreEntities([]);
      return;
    }
    
    const userMemberships = userData.memberships || [];
    const userOwnedEntities = userData.ownedEntities || [];
    
    const exploreList = Object.values(entityDatabase)
      .filter(entity => {
        const entityIdStr = entity.id.toString();
        // Filter out entities user is a member of OR owns
        return !userMemberships.includes(entityIdStr) && !userOwnedEntities.includes(entityIdStr);
      })
      .map(entity => ({
        id: entity.id,
        name: entity.name,
        category: entity.category,
        memberCount: entity.memberCount,
        image: entity.image,
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        isVerified: Math.random() > 0.3,
        tags: [], // Would be populated from entity data
        subscriptionTypes: ['free', 'premium'],
        description: `Explore ${entity.name} and join their community`
      }));
    
    setExploreEntities(exploreList);
  };

  // Load owned entities (for entity-admin users)
  const loadOwnedEntities = (userData) => {
    if (!userData || !userData.ownedEntities || userData.role !== 'entity-admin') {
      setMyOwnedEntities([]);
      return;
    }
    
    const ownedEntities = userData.ownedEntities.map(entityId => {
      const entity = entityDatabase[entityId];
      if (!entity) return null;
      
      return {
        id: entity.id,
        name: entity.name,
        role: 'admin',
        status: 'active',
        memberCount: entity.memberCount,
        lastActivity: `${Math.floor(Math.random() * 24)} hours ago`,
        category: entity.category,
        createdDate: '2024-06-15',
        totalRevenue: Math.floor(Math.random() * 50000) + 10000,
        monthlyGrowth: (Math.random() * 20 + 5).toFixed(1) + '%',
        image: entity.image
      };
    }).filter(Boolean);
    
    setMyOwnedEntities(ownedEntities);
  };

  // Load course recommendations based on user's entity memberships and interests
  const loadCourseRecommendations = (userData) => {
    if (!userData) {
      setCourseRecommendations([]);
      return;
    }

    const userMemberships = userData.memberships || [];
    const userInterests = userData.interests || [];
    
    // Get categories from user's subscribed entities
    const userCategories = userMemberships.map(entityId => {
      const entity = entityDatabase[entityId];
      return entity ? entity.category : null;
    }).filter(Boolean);

    // Filter and rank courses based on user's interests and entity categories
    const recommendedCourses = courseDatabase.map(course => {
      let score = 0;
      let matchReason = 'Trending course';

      // Higher score for courses matching user's entity categories
      if (userCategories.includes(course.category)) {
        score += 3;
        matchReason = `Based on your interest in ${course.category}`;
      }

      // Higher score for courses from entities user is subscribed to
      const courseEntity = Object.values(entityDatabase).find(entity => entity.name === course.entity);
      if (courseEntity && userMemberships.includes(courseEntity.id.toString())) {
        score += 2;
        matchReason = `From ${course.entity} - your subscribed entity`;
      }

      // Higher score for popular/highly rated courses
      if (course.rating >= 4.7) score += 1;
      if (course.enrollments > 50000) score += 1;

      return {
        ...course,
        recommendationScore: score,
        matchReason
      };
    })
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 8); // Top 8 recommendations

    setCourseRecommendations(recommendedCourses);
  };

  // Load user's enrolled courses
  const loadEnrolledCourses = (userData) => {
    if (!userData || !userData.enrolledCourses) {
      setEnrolledCourses([]);
      return;
    }

    const enrolled = userData.enrolledCourses.map(courseId => {
      const course = courseDatabase.find(c => c.id === courseId);
      if (!course) return null;

      return {
        ...course,
        enrollmentDate: '2024-07-15',
        progress: Math.floor(Math.random() * 80) + 10, // 10-90% progress
        lastAccessed: `${Math.floor(Math.random() * 7) + 1} days ago`,
        status: Math.random() > 0.3 ? 'in-progress' : 'completed'
      };
    }).filter(Boolean);

    setEnrolledCourses(enrolled);
  };

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('entityhub_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Allow both normal users and entity-admin users
      if (parsedUser.role !== 'normal' && parsedUser.role !== 'entity-admin') {
        navigate('/login'); // Redirect users who are not normal or entity-admin
        return;
      }
      setUser(parsedUser);
      
      // Add mock enrolled courses and interests for testing if not present
      if (!parsedUser.enrolledCourses) {
        parsedUser.enrolledCourses = ['course_1', 'course_2']; // Some default enrolled courses
      }
      if (!parsedUser.interests) {
        parsedUser.interests = ['Technology', 'Business']; // Some default interests
      }
      
      // Load user-specific data only if user is valid
      loadUserSubscriptions(parsedUser);
      loadExploreEntities(parsedUser);
      loadOwnedEntities(parsedUser);
      loadCourseRecommendations(parsedUser);
      loadEnrolledCourses(parsedUser);
    } else {
      navigate('/login');
      return;
    }

    // Load static data
    setRecentActivity([
      {
        id: 1,
        type: 'joined',
        entity: 'Tech Innovators Community',
        timestamp: '2 hours ago',
        icon: 'UserPlus',
        description: 'You joined this community'
      },
      {
        id: 2,
        type: 'completed',
        entity: 'React Advanced Course',
        timestamp: '1 day ago',
        icon: 'CheckCircle',
        description: 'You completed the course'
      },
      {
        id: 3,
        type: 'attended',
        entity: 'AI Workshop 2025',
        timestamp: '2 days ago',
        icon: 'Calendar',
        description: 'You attended the workshop'
      },
      {
        id: 4,
        type: 'liked',
        entity: 'Local Community Center',
        timestamp: '3 days ago',
        icon: 'Heart',
        description: 'You liked this entity'
      },
      {
        id: 5,
        type: 'commented',
        entity: 'Tech Discussion Forum',
        timestamp: '4 days ago',
        icon: 'MessageCircle',
        description: 'You commented on a post'
      },
      {
        id: 6,
        type: 'enrolled',
        entity: 'Machine Learning Fundamentals',
        timestamp: '5 days ago',
        icon: 'BookOpen',
        description: 'You enrolled in this course'
      },
      {
        id: 7,
        type: 'achieved',
        entity: 'React Complete Developer Course',
        timestamp: '1 week ago',
        icon: 'Award',
        description: 'You earned a certificate'
      }
    ]);

    setRecommendations([
      {
        id: 1,
        name: 'AI Research Group',
        category: 'Technology',
        members: 543,
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
        matchReason: 'Based on your interest in Tech Innovators',
        rating: 4.8,
        isVerified: true,
        tags: ['AI', 'Machine Learning', 'Research']
      },
      {
        id: 2,
        name: 'Startup Accelerator',
        category: 'Business',
        members: 1200,
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
        matchReason: 'Popular in your area',
        rating: 4.6,
        isVerified: true,
        tags: ['Startup', 'Entrepreneurship', 'Funding']
      },
      {
        id: 3,
        name: 'Web Development Bootcamp',
        category: 'Education',
        members: 890,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
        matchReason: 'Matches your learning goals',
        rating: 4.9,
        isVerified: false,
        tags: ['Web Dev', 'Coding', 'Career']
      }
    ]);
  }, [navigate]);

  const handleSearch = (query) => {
    console.log('Searching:', query);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleJoinEntity = (entityId) => {
    console.log('Joining entity:', entityId);
    // Move entity from explore to subscriptions
    const entityToJoin = exploreEntities.find(e => e.id === entityId);
    if (entityToJoin) {
      const newSubscription = {
        ...entityToJoin,
        role: 'member',
        status: 'active',
        joinedDate: new Date().toISOString().split('T')[0],
        engagementLevel: 'low',
        upcomingEvents: 0,
        unreadCount: 0,
        subscriptionType: 'free'
      };
      setMySubscriptions(prev => [...prev, newSubscription]);
      setExploreEntities(prev => prev.filter(e => e.id !== entityId));
    }
  };

  const handleViewEntity = (entityId) => {
    navigate(`/entity-detail-page?id=${entityId}`);
  };

  const handlePersonalView = (entityId) => {
    navigate(`/personal-entity-page?id=${entityId}`);
  };

  const handleLeaveEntity = (entityId) => {
    setMySubscriptions(prev => prev.filter(e => e.id !== entityId));
    console.log('Left entity:', entityId);
  };

  const handleManageEntity = (entityId) => {
    navigate(`/entity-admin-dashboard?id=${entityId}`);
  };

  const handleEnrollCourse = (courseId) => {
    console.log('Enrolling in course:', courseId);
    // Move course to enrolled courses
    const courseToEnroll = courseRecommendations.find(c => c.id === courseId);
    if (courseToEnroll) {
      const enrolledCourse = {
        ...courseToEnroll,
        enrollmentDate: new Date().toISOString().split('T')[0],
        progress: 0,
        lastAccessed: 'Just enrolled',
        status: 'in-progress'
      };
      setEnrolledCourses(prev => [...prev, enrolledCourse]);
      setCourseRecommendations(prev => prev.filter(c => c.id !== courseId));
    }
  };

  const handleViewCourse = (courseId) => {
    console.log('Viewing course details:', courseId);
    // In a real app, this would navigate to course detail page
  };

  const handleContinueCourse = (courseId) => {
    console.log('Continuing course:', courseId);
    // In a real app, this would navigate to course learning interface
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - EntityHub</title>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <RoleAdaptiveHeader
          user={user}
          onSearch={handleSearch}
          onNavigate={handleNavigation}
        />

        {/* Main Content */}
        <main className="pt-16 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-muted-foreground">
                Discover and connect with entities that match your interests
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={20} className="text-blue-600" />
                      <span className="text-2xl font-bold text-foreground">{mySubscriptions.length}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Subscriptions</p>
                    <p className="text-xs text-blue-600 mt-1">Member of</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2">
                      <Icon name="Activity" size={20} className="text-green-600" />
                      <span className="text-2xl font-bold text-foreground">{recentActivity.length}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Recent Activities</p>
                    <p className="text-xs text-green-600 mt-1">Last: 2h ago</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2">
                      <Icon name="Bell" size={20} className="text-orange-600" />
                      <span className="text-2xl font-bold text-foreground">{mySubscriptions.reduce((sum, entity) => sum + entity.unreadCount, 0)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Notifications</p>
                    <p className="text-xs text-orange-600 mt-1">Unread</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2">
                      <Icon name={activeSection === 'courses' ? 'BookOpen' : 'Calendar'} size={20} className={activeSection === 'courses' ? 'text-indigo-600' : 'text-purple-600'} />
                      <span className="text-2xl font-bold text-foreground">
                        {activeSection === 'courses' ? enrolledCourses.length : mySubscriptions.reduce((sum, entity) => sum + entity.upcomingEvents, 0)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activeSection === 'courses' ? 'Enrolled Courses' : 'Upcoming Events'}
                    </p>
                    <p className={`text-xs mt-1 ${activeSection === 'courses' ? 'text-indigo-600' : 'text-purple-600'}`}>
                      {activeSection === 'courses' ? 'In progress' : 'Across communities'}
                    </p>
                  </div>
                </div>

                {/* Section Navigation */}
                <div className="bg-card rounded-lg border mb-6">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-foreground">My Communities</h2>
                    </div>
                    <div className="flex space-x-1 bg-muted rounded-lg p-1">
                      <button
                        onClick={() => setActiveSection('my-subscriptions')}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                          activeSection === 'my-subscriptions'
                            ? 'bg-white text-primary shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Icon name="Users" size={16} />
                          <span>My Subscriptions ({mySubscriptions.length})</span>
                        </div>
                      </button>
                      {user?.role === 'entity-admin' && (
                        <button
                          onClick={() => setActiveSection('my-entities')}
                          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                            activeSection === 'my-entities'
                              ? 'bg-white text-primary shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <Icon name="Building2" size={16} />
                            <span>Admin Hub ({myOwnedEntities.length})</span>
                          </div>
                        </button>
                      )}
                      <button
                        onClick={() => setActiveSection('explore')}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                          activeSection === 'explore'
                            ? 'bg-white text-primary shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Icon name="Compass" size={16} />
                          <span>Explore Entities</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setActiveSection('courses')}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                          activeSection === 'courses'
                            ? 'bg-white text-primary shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Icon name="BookOpen" size={16} />
                          <span>My Courses ({enrolledCourses.length})</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* My Entities Section */}
                {activeSection === 'my-entities' && (
                  <div className="bg-card rounded-lg border">
                    <div className="p-6 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Entities I Own/Admin</h3>
                          <p className="text-sm text-muted-foreground">Entities you created or have admin access to</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      {myOwnedEntities.length > 0 ? (
                        <div className="space-y-4">
                          {myOwnedEntities.map((entity) => (
                            <div key={entity.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                                  <Icon name="Crown" size={20} color="white" />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium text-foreground">{entity.name}</h4>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      entity.role === 'owner' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {entity.role}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <span>{entity.memberCount} members</span>
                                    <span>•</span>
                                    <span>{entity.category}</span>
                                    <span>•</span>
                                    <span>Revenue: ${entity.revenue}</span>
                                    {entity.unreadCount > 0 && (
                                      <>
                                        <span>•</span>
                                        <span className="text-primary font-medium">
                                          {entity.unreadCount} notifications
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleManageEntity(entity.id)}
                                  iconName="Settings"
                                >
                                  Manage
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewEntity(entity.id)}
                                  iconName="ExternalLink"
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Icon name="Crown" size={48} className="text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-foreground mb-2">No entities assigned</h3>
                          <p className="text-muted-foreground mb-4">You don't have administrative access to any entities yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* My Subscriptions Section */}
                {activeSection === 'my-subscriptions' && (
                  <div className="bg-card rounded-lg border">
                    <div className="p-6 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">My Subscriptions</h3>
                          <p className="text-sm text-muted-foreground">Entities you're a member of</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setActiveSection('explore')}
                        >
                          Find More
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      {mySubscriptions.length > 0 ? (
                        <div className="space-y-4">
                          {mySubscriptions.map((entity) => (
                            <div key={entity.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                  <Icon name="Users" size={20} color="white" />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium text-foreground">{entity.name}</h4>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      entity.subscriptionType === 'premium' 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {entity.subscriptionType}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <span>{entity.memberCount} members</span>
                                    <span>•</span>
                                    <span>Joined {entity.joinedDate}</span>
                                    <span>•</span>
                                    <span>{entity.category}</span>
                                    {entity.unreadCount > 0 && (
                                      <>
                                        <span>•</span>
                                        <span className="text-primary font-medium">
                                          {entity.unreadCount} new
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewEntity(entity.id)}
                                  iconName="Info"
                                >
                                  About
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handlePersonalView(entity.id)}
                                  iconName="Eye"
                                >
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleLeaveEntity(entity.id)}
                                  iconName="LogOut"
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  Leave
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-foreground mb-2">No subscriptions</h3>
                          <p className="text-muted-foreground mb-4">Join entities to start connecting with communities</p>
                          <Button
                            variant="default"
                            onClick={() => setActiveSection('explore')}
                            iconName="Compass"
                            iconPosition="left"
                          >
                            Explore Entities
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Explore Entities Section */}
                {activeSection === 'explore' && (
                  <div className="bg-card rounded-lg border">
                    <div className="p-6 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Explore Entities</h3>
                          <p className="text-sm text-muted-foreground">Discover new communities to join</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate('/entity-list-hub?tab=explore')}
                        >
                          View All Entities
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {exploreEntities.map((entity) => (
                          <div key={entity.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start space-x-4">
                              <img 
                                src={entity.image} 
                                alt={entity.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium text-foreground">{entity.name}</h4>
                                  {entity.isVerified && (
                                    <Icon name="CheckCircle" size={16} className="text-blue-500" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{entity.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                                  <span>{entity.memberCount} members</span>
                                  <span>•</span>
                                  <span>{entity.category}</span>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Star" size={12} className="text-yellow-500" />
                                    <span>{entity.rating}</span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {entity.tags.slice(0, 3).map((tag, index) => (
                                    <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleJoinEntity(entity.id)}
                                    iconName="UserPlus"
                                    iconPosition="left"
                                  >
                                    Join
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleViewEntity(entity.id)}
                                    iconName="Info"
                                  >
                                    About
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Courses Section */}
                {activeSection === 'courses' && (
                  <div className="space-y-6">
                    {/* My Enrolled Courses */}
                    <div className="bg-card rounded-lg border">
                      <div className="p-6 border-b border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">My Enrolled Courses</h3>
                            <p className="text-sm text-muted-foreground">Continue your learning journey</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        {enrolledCourses.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {enrolledCourses.map((course) => (
                              <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-4">
                                  <img 
                                    src={course.image} 
                                    alt={course.title}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className="font-medium text-foreground">{course.title}</h4>
                                      {course.isVerified && (
                                        <Icon name="CheckCircle" size={14} className="text-blue-500" />
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">by {course.instructor}</p>
                                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                                      <span>{course.duration}</span>
                                      <span>•</span>
                                      <span>{course.level}</span>
                                      <span>•</span>
                                      <div className="flex items-center space-x-1">
                                        <Icon name="Star" size={12} className="text-yellow-500" />
                                        <span>{course.rating}</span>
                                      </div>
                                    </div>
                                    <div className="mb-3">
                                      <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">{course.progress}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                          className="bg-blue-600 h-2 rounded-full" 
                                          style={{ width: `${course.progress}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => handleContinueCourse(course.id)}
                                        iconName="Play"
                                        iconPosition="left"
                                      >
                                        {course.status === 'completed' ? 'Review' : 'Continue'}
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleViewCourse(course.id)}
                                        iconName="Info"
                                      >
                                        Details
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-foreground mb-2">No courses enrolled yet</h3>
                            <p className="text-muted-foreground mb-4">Start learning with our recommended courses below</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Course Recommendations */}
                    <div className="bg-card rounded-lg border">
                      <div className="p-6 border-b border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">Recommended Courses</h3>
                            <p className="text-sm text-muted-foreground">Courses tailored to your interests and goals</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {courseRecommendations.map((course) => (
                            <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start space-x-4">
                                <img 
                                  src={course.image} 
                                  alt={course.title}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="font-medium text-foreground">{course.title}</h4>
                                    {course.isVerified && (
                                      <Icon name="CheckCircle" size={14} className="text-blue-500" />
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">by {course.instructor}</p>
                                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                                    <span>{course.duration}</span>
                                    <span>•</span>
                                    <span>{course.level}</span>
                                    <span>•</span>
                                    <div className="flex items-center space-x-1">
                                      <Icon name="Star" size={12} className="text-yellow-500" />
                                      <span>{course.rating}</span>
                                    </div>
                                  </div>
                                  <div className="mb-2">
                                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                      {course.matchReason}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {course.skills.slice(0, 3).map((skill, index) => (
                                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-foreground">${course.price}</span>
                                    <span className="text-xs text-muted-foreground">{course.enrollments.toLocaleString()} enrolled</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="default"
                                      size="sm"
                                      onClick={() => handleEnrollCourse(course.id)}
                                      iconName="UserPlus"
                                      iconPosition="left"
                                    >
                                      Enroll Now
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleViewCourse(course.id)}
                                      iconName="Info"
                                    >
                                      Preview
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Activity */}
                <div className="bg-card rounded-lg border">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Icon name={activity.icon} size={16} className="text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">
                              You <span className="font-medium">{activity.type}</span>{' '}
                              <span className="font-medium">{activity.entity}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Recommendations */}
                <div className="bg-card rounded-lg border">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">
                      {activeSection === 'my-entities' ? 'Entity Growth Tips' : 
                       activeSection === 'my-subscriptions' ? 'Similar Communities' : 
                       activeSection === 'courses' ? 'Featured Courses' :
                       'Recommended for You'}
                    </h2>
                  </div>
                  <div className="p-6">
                    {activeSection === 'my-entities' && myOwnedEntities.length > 0 ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon name="TrendingUp" size={16} className="text-blue-600" />
                            <h3 className="font-medium text-blue-900">Growth Tip</h3>
                          </div>
                          <p className="text-sm text-blue-800">
                            Engage with your members regularly. Communities with daily admin interaction grow 3x faster.
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon name="Users" size={16} className="text-green-600" />
                            <h3 className="font-medium text-green-900">Member Retention</h3>
                          </div>
                          <p className="text-sm text-green-800">
                            Host regular events to keep members engaged. Your next event should be scheduled!
                          </p>
                        </div>
                      </div>
                    ) : activeSection === 'courses' ? (
                      <div className="space-y-4">
                        {courseRecommendations.slice(0, 2).map((course) => (
                          <div key={course.id} className="space-y-3">
                            <img 
                              src={course.image} 
                              alt={course.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-medium text-foreground">{course.title}</h3>
                                {course.isVerified && (
                                  <Icon name="CheckCircle" size={14} className="text-blue-500" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                              <div className="flex items-center space-x-1 mt-1">
                                <Icon name="Star" size={12} className="text-yellow-500" />
                                <span className="text-xs text-muted-foreground">{course.rating}</span>
                              </div>
                              <p className="text-xs text-blue-600 mt-1">{course.matchReason}</p>
                              <p className="text-sm font-semibold text-foreground">${course.price}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              fullWidth
                              onClick={() => handleEnrollCourse(course.id)}
                            >
                              Enroll Now
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recommendations.slice(0, 2).map((rec) => (
                          <div key={rec.id} className="space-y-3">
                            <img 
                              src={rec.image} 
                              alt={rec.name}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-medium text-foreground">{rec.name}</h3>
                                {rec.isVerified && (
                                  <Icon name="CheckCircle" size={14} className="text-blue-500" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{rec.category} • {rec.members} members</p>
                              <div className="flex items-center space-x-1 mt-1">
                                <Icon name="Star" size={12} className="text-yellow-500" />
                                <span className="text-xs text-muted-foreground">{rec.rating}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{rec.matchReason}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              fullWidth
                              onClick={() => handleJoinEntity(rec.id)}
                            >
                              {activeSection === 'explore' ? 'View Details' : 'Join Entity'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-card rounded-lg border">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {activeSection === 'my-entities' ? (
                        <>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="BarChart3"
                            iconPosition="left"
                            onClick={() => navigate('/entity-admin-dashboard')}
                          >
                            View Analytics
                          </Button>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="Users"
                            iconPosition="left"
                          >
                            Manage Members
                          </Button>
                        </>
                      ) : activeSection === 'my-subscriptions' ? (
                        <>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="Search"
                            iconPosition="left"
                            onClick={() => setActiveSection('explore')}
                          >
                            Find More Communities
                          </Button>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="Calendar"
                            iconPosition="left"
                          >
                            View Events
                          </Button>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="MessageCircle"
                            iconPosition="left"
                          >
                            Join Discussions
                          </Button>
                        </>
                      ) : activeSection === 'courses' ? (
                        <>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="Search"
                            iconPosition="left"
                          >
                            Browse All Courses
                          </Button>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="BookOpen"
                            iconPosition="left"
                          >
                            My Learning Path
                          </Button>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="Award"
                            iconPosition="left"
                          >
                            View Certificates
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="Search"
                            iconPosition="left"
                            onClick={() => navigate('/entity-list-hub')}
                          >
                            Advanced Search
                          </Button>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="Filter"
                            iconPosition="left"
                          >
                            Filter by Category
                          </Button>
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="Bookmark"
                            iconPosition="left"
                          >
                            View Saved
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="Settings"
                        iconPosition="left"
                      >
                        Account Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomTabNavigation
          user={user}
          onNavigate={handleNavigation}
        />
      </div>
    </>
  );
};

export default UserDashboard;
