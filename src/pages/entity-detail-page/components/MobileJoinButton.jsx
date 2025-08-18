import React from 'react';
import Button from '../../../components/ui/Button';

const MobileJoinButton = ({ isMember, onRequestJoin, onAccessContent, isLoading }) => {
  if (isMember) {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-700 bg-surface border-t border-border p-4 safe-area-inset-bottom">
        <Button
          variant="default"
          onClick={onAccessContent}
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
          className="h-12"
        >
          Access Content
        </Button>
      </div>
    );
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-700 bg-surface border-t border-border p-4 safe-area-inset-bottom">
      <Button
        variant="default"
        onClick={onRequestJoin}
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
        fullWidth
        className="h-12"
      >
        {isLoading ? 'Requesting...' : 'Request to Join'}
      </Button>
    </div>
  );
};

export default MobileJoinButton;