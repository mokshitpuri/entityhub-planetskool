import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MembershipSidebar = ({ entity, isMember, onRequestJoin, onAccessContent, isLoading, user }) => {
  const [showTestimonials, setShowTestimonials] = useState(false);

  const recentActivity = [
    {
      id: 1,
      type: 'member_joined',
      user: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'content_added',
      title: 'New lecture: Advanced React Patterns',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      type: 'event_created',
      title: 'Monthly Meetup scheduled',
      timestamp: '1 day ago'
    },
    {
      id: 4,
      type: 'member_joined',
      user: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      timestamp: '2 days ago'
    }
  ];

  const testimonials = [
    {
      id: 1,
      user: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      role: 'Senior Developer',
      content: `Joining ${entity?.name} was one of the best decisions I made for my career. The community is incredibly supportive and the content is top-notch.`,
      rating: 5
    },
    {
      id: 2,
      user: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      role: 'Product Manager',
      content: `The networking opportunities here are amazing. I've connected with so many like-minded professionals and learned valuable skills.`,
      rating: 5
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'member_joined':
        return 'UserPlus';
      case 'content_added':
        return 'BookOpen';
      case 'event_created':
        return 'Calendar';
      default:
        return 'Activity';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Membership Action Card */}
      <div className="bg-surface rounded-lg border border-border p-6">
        {user?.role === 'super-admin' ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={24} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">System Administrator</h3>
            <p className="text-muted-foreground mb-4">
              You have administrative access to manage this entity.
            </p>
            <div className="space-y-2">
              <Button variant="default" fullWidth>
                <Icon name="Settings" size={16} className="mr-2" />
                Manage Entity
              </Button>
              <Button variant="outline" fullWidth>
                <Icon name="Users" size={16} className="mr-2" />
                View Members
              </Button>
            </div>
          </div>
        ) : user?.role === 'entity-admin' && user?.ownedEntities?.includes(entity?.id) ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Crown" size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Entity Owner</h3>
            <p className="text-muted-foreground mb-4">
              You own and manage this entity.
            </p>
            <div className="space-y-2">
              <Button variant="default" fullWidth>
                <Icon name="Settings" size={16} className="mr-2" />
                Entity Settings
              </Button>
              <Button variant="outline" fullWidth>
                <Icon name="Users" size={16} className="mr-2" />
                Manage Members
              </Button>
            </div>
          </div>
        ) : isMember ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">You're a Member!</h3>
            <p className="text-muted-foreground">
              Access all exclusive content and participate in community activities.
            </p>
          </div>
        ) : user?.permissions?.canJoinEntities ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Join Our Community</h3>
            <p className="text-muted-foreground mb-4">
              Get access to exclusive content, events, and connect with {entity?.memberCount?.toLocaleString()} members.
            </p>
            <Button
              variant="default"
              onClick={onRequestJoin}
              loading={isLoading}
              iconName="UserPlus"
              iconPosition="left"
              fullWidth
            >
              {isLoading ? 'Requesting...' : 'Request to Join'}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Your request will be reviewed by the admins
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Lock" size={24} className="text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Access Restricted</h3>
            <p className="text-muted-foreground">
              Your current role does not allow joining entities.
            </p>
          </div>
        )}
      </div>
      {/* Quick Stats */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Total Members</span>
            </div>
            <span className="font-semibold text-foreground">
              {entity?.memberCount?.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="BookOpen" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Content Items</span>
            </div>
            <span className="font-semibold text-foreground">
              {(entity?.content?.lectures?.length || 0) + 
               (entity?.content?.courses?.length || 0) + 
               (entity?.content?.events?.length || 0) + 
               (entity?.content?.announcements?.length || 0)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Established</span>
            </div>
            <span className="font-semibold text-foreground">{entity?.establishedYear}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Location</span>
            </div>
            <span className="font-semibold text-foreground">{entity?.location}</span>
          </div>
        </div>
      </div>
      
      {/* Admin Information */}
      {entity?.admin && (
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Admin Contact</h3>
          <div className="flex items-start space-x-3">
            <Image
              src={entity?.admin?.avatar}
              alt={entity?.admin?.name}
              className="w-12 h-12 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground">{entity?.admin?.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{entity?.admin?.title}</p>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                {entity?.admin?.bio}
              </p>
              <div className="space-y-2">
                {entity?.admin?.email && (
                  <a
                    href={`mailto:${entity?.admin?.email}`}
                    className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-primary transition-micro"
                  >
                    <Icon name="Mail" size={12} />
                    <span>{entity?.admin?.email}</span>
                  </a>
                )}
                {entity?.admin?.phone && (
                  <a
                    href={`tel:${entity?.admin?.phone}`}
                    className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-primary transition-micro"
                  >
                    <Icon name="Phone" size={12} />
                    <span>{entity?.admin?.phone}</span>
                  </a>
                )}
                {entity?.admin?.joinedDate && (
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    <span>Admin since {new Date(entity?.admin?.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Recent Activity */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={getActivityIcon(activity?.type)} size={14} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                {activity?.type === 'member_joined' ? (
                  <div className="flex items-center space-x-2">
                    <Image
                      src={activity?.avatar}
                      alt={activity?.user}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-sm text-foreground font-medium">{activity?.user}</span>
                    <span className="text-sm text-muted-foreground">joined</span>
                  </div>
                ) : (
                  <p className="text-sm text-foreground">{activity?.title}</p>
                )}
                <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Member Testimonials */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Member Reviews</h3>
          <button
            onClick={() => setShowTestimonials(!showTestimonials)}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-micro"
          >
            {showTestimonials ? 'Hide' : 'Show All'}
          </button>
        </div>
        
        <div className="space-y-4">
          {testimonials?.slice(0, showTestimonials ? testimonials?.length : 1)?.map((testimonial) => (
            <div key={testimonial?.id} className="border-l-4 border-primary/20 pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.user}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{testimonial?.user}</p>
                  <p className="text-xs text-muted-foreground">{testimonial?.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 mb-2">
                {renderStars(testimonial?.rating)}
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {testimonial?.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Get in Touch</h3>
        <div className="space-y-3">
          {entity?.email && (
            <a
              href={`mailto:${entity?.email}`}
              className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-micro"
            >
              <Icon name="Mail" size={16} />
              <span className="text-sm">{entity?.email}</span>
            </a>
          )}
          
          {entity?.phone && (
            <a
              href={`tel:${entity?.phone}`}
              className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-micro"
            >
              <Icon name="Phone" size={16} />
              <span className="text-sm">{entity?.phone}</span>
            </a>
          )}
          
          {entity?.website && (
            <a
              href={entity?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-micro"
            >
              <Icon name="Globe" size={16} />
              <span className="text-sm">Visit Website</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipSidebar;