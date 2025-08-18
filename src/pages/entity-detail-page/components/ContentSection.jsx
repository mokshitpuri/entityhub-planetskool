import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ContentSection = ({ entity, isMember, user }) => {
  const [activeTab, setActiveTab] = useState('lectures');

  const contentTabs = [
    { id: 'lectures', label: 'Lectures', icon: 'BookOpen', count: entity?.content?.lectures?.length || 0 },
    { id: 'courses', label: 'Courses', icon: 'GraduationCap', count: entity?.content?.courses?.length || 0 },
    { id: 'events', label: 'Events', icon: 'Calendar', count: entity?.content?.events?.length || 0 },
    { id: 'announcements', label: 'Announcements', icon: 'Megaphone', count: entity?.content?.announcements?.length || 0 }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderContentCard = (item, type) => {
    if (!isMember && item?.requiresMembership) {
      return (
        <div key={item?.id} className="bg-surface border border-border rounded-lg p-4 opacity-60 flex flex-col h-full">
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <h3 className="font-medium text-foreground line-clamp-2 flex-1 pr-2">{item?.title}</h3>
            <Icon name="Lock" size={16} className="text-muted-foreground flex-shrink-0" />
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
            {item?.description?.substring(0, 100)}...
          </p>
          <div className="text-xs text-muted-foreground flex-shrink-0 mt-auto">
            Members only content
          </div>
        </div>
      );
    }

    return (
      <div key={item?.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-micro flex flex-col h-full">
        {item?.thumbnail && (
          <div className="mb-3 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item?.thumbnail}
              alt={item?.title}
              className="w-full h-32 object-cover"
            />
          </div>
        )}
        <div className="flex items-start justify-between mb-2 flex-shrink-0">
          <h3 className="font-medium text-foreground line-clamp-2 flex-1 pr-2">{item?.title}</h3>
          {item?.isNew && (
            <span className="px-2 py-1 bg-success text-success-foreground text-xs rounded-full flex-shrink-0">
              New
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
          {item?.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground flex-shrink-0 mt-auto">
          <div className="flex items-center flex-wrap gap-2 flex-1 min-w-0">
            {item?.date && (
              <span className="flex items-center space-x-1 flex-shrink-0">
                <Icon name="Calendar" size={12} />
                <span className="truncate">{formatDate(item?.date)}</span>
              </span>
            )}
            
            {item?.time && (
              <span className="flex items-center space-x-1 flex-shrink-0">
                <Icon name="Clock" size={12} />
                <span className="truncate">{formatTime(item?.time)}</span>
              </span>
            )}
            
            {item?.duration && (
              <span className="flex items-center space-x-1 flex-shrink-0">
                <Icon name="Timer" size={12} />
                <span className="truncate">{item?.duration}</span>
              </span>
            )}
            
            {item?.instructor && (
              <span className="flex items-center space-x-1 flex-shrink-0">
                <Icon name="User" size={12} />
                <span className="truncate">{item?.instructor}</span>
              </span>
            )}
          </div>
          
          {isMember && (
            <button className="text-primary hover:text-primary/80 font-medium flex-shrink-0 ml-2">
              {type === 'events' ? 'Register' : 'View'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    const content = entity?.content?.[activeTab] || [];
    
    if (content?.length === 0) {
      return (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No {activeTab} available
          </h3>
          <p className="text-muted-foreground">
            Check back later for new content.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {content?.map(item => renderContentCard(item, activeTab))}
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {contentTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-micro whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="font-medium">{tab?.label}</span>
              {tab?.count > 0 && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {user?.role === 'super-admin' ? (
          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={16} className="text-purple-600" />
              <span className="font-medium text-purple-600">Administrator View</span>
            </div>
            <p className="text-sm text-purple-700">
              You have full administrative access to manage this entity's content and settings.
            </p>
          </div>
        ) : !isMember && user?.permissions?.canJoinEntities && (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-accent" />
              <span className="font-medium text-accent">Member Access Required</span>
            </div>
            <p className="text-sm text-accent/80">
              Some content may be restricted to members only. Join this entity to access all available content.
            </p>
          </div>
        )}
        
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ContentSection;