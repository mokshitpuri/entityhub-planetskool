import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JoinRequestCard = ({ 
  request,
  onApprove = () => {},
  onReject = () => {},
  className = ''
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    await onApprove(request?.id);
    setIsProcessing(false);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await onReject(request?.id);
    setIsProcessing(false);
  };

  const formatRequestDate = (date) => {
    const now = new Date();
    const requestDate = new Date(date);
    const diffInHours = Math.floor((now - requestDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return requestDate?.toLocaleDateString();
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 hover:elevation-1 transition-micro ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {request?.avatar ? (
              <Image
                src={request?.avatar}
                alt={`${request?.name} avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Request Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-sm font-semibold text-foreground truncate">
                {request?.name}
              </h3>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-warning/10 text-warning">
                Pending
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground truncate mb-1">
              {request?.email}
            </p>
            
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>Requested {formatRequestDate(request?.requestedAt)}</span>
              {request?.mutualConnections && (
                <span>{request?.mutualConnections} mutual connections</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            variant="outline"
            iconName="X"
            iconSize={14}
            onClick={handleReject}
            disabled={isProcessing}
            className="text-error hover:bg-error/10 hover:border-error"
          >
            Reject
          </Button>
          
          <Button
            variant="default"
            iconName="Check"
            iconSize={14}
            onClick={handleApprove}
            disabled={isProcessing}
            loading={isProcessing}
          >
            Approve
          </Button>
        </div>
      </div>
      {/* Request Message */}
      {request?.message && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-1">Request Message:</p>
          <p className="text-sm text-foreground bg-muted rounded-lg p-2">
            "{request?.message}"
          </p>
        </div>
      )}
      {/* Additional Info */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          {request?.location && (
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{request?.location}</span>
            </div>
          )}
          {request?.profession && (
            <div className="flex items-center space-x-1">
              <Icon name="Briefcase" size={12} />
              <span>{request?.profession}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {formatRequestDate(request?.requestedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JoinRequestCard;