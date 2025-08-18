import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentCard = ({ 
  content,
  onEdit = () => {},
  onDelete = () => {},
  onPublish = () => {},
  onUnpublish = () => {},
  className = ''
}) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'lecture':
        return 'Video';
      case 'course':
        return 'BookOpen';
      case 'event':
        return 'Calendar';
      case 'announcement':
        return 'Megaphone';
      default:
        return 'FileText';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-success bg-success/10';
      case 'draft':
        return 'text-warning bg-warning/10';
      case 'archived':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-surface border border-border rounded-lg overflow-hidden hover:elevation-1 transition-micro ${className}`}>
      {/* Content Thumbnail */}
      {content?.thumbnail && (
        <div className="aspect-video overflow-hidden">
          <Image
            src={content?.thumbnail}
            alt={content?.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getContentTypeIcon(content?.type)} 
              size={16} 
              className="text-primary" 
            />
            <span className="text-xs font-medium text-primary capitalize">
              {content?.type}
            </span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${getStatusColor(content?.status)}`}>
              {content?.status}
            </span>
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              iconName="MoreVertical"
              iconSize={16}
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="p-1"
            />
            
            {isActionsOpen && (
              <div className="absolute top-full right-0 mt-1 w-40 bg-popover border border-border rounded-lg elevation-2 py-1 z-50">
                <button
                  onClick={() => {
                    onEdit(content?.id);
                    setIsActionsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-micro flex items-center space-x-2"
                >
                  <Icon name="Edit" size={14} />
                  <span>Edit</span>
                </button>
                
                {content?.status === 'published' ? (
                  <button
                    onClick={() => {
                      onUnpublish(content?.id);
                      setIsActionsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-micro flex items-center space-x-2"
                  >
                    <Icon name="EyeOff" size={14} />
                    <span>Unpublish</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onPublish(content?.id);
                      setIsActionsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-micro flex items-center space-x-2"
                  >
                    <Icon name="Eye" size={14} />
                    <span>Publish</span>
                  </button>
                )}
                
                <button
                  onClick={() => {
                    onDelete(content?.id);
                    setIsActionsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-error hover:bg-error/10 transition-micro flex items-center space-x-2"
                >
                  <Icon name="Trash2" size={14} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Info */}
        <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">
          {content?.title}
        </h3>
        
        {content?.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {content?.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Created {formatDate(content?.createdAt)}</span>
            {content?.publishedAt && (
              <span>Published {formatDate(content?.publishedAt)}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {content?.views && (
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={12} />
                <span>{content?.views}</span>
              </div>
            )}
            {content?.likes && (
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={12} />
                <span>{content?.likes}</span>
              </div>
            )}
            {content?.comments && (
              <div className="flex items-center space-x-1">
                <Icon name="MessageCircle" size={12} />
                <span>{content?.comments}</span>
              </div>
            )}
          </div>
        </div>

        {/* Event specific info */}
        {content?.type === 'event' && content?.eventDate && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Calendar" size={14} className="text-primary" />
              <span className="text-foreground font-medium">
                {formatDate(content?.eventDate)}
              </span>
              {content?.eventTime && (
                <>
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{content?.eventTime}</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;