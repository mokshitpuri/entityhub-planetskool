import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon, 
  onClick,
  description = '',
  className = '' 
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    if (onClick) onClick();
  };
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 transition-all duration-200 hover:shadow-lg cursor-pointer hover:border-primary/50 ${
        isClicked ? 'scale-95 shadow-sm' : ''
      } ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-200 ${
          isClicked ? 'bg-primary/20' : ''
        }`}>
          <Icon name={icon} size={24} className="text-primary" />
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
          <Icon name={getTrendIcon(trend)} size={16} />
          <span className="text-sm font-medium">{trendValue}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground/80 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default KPICard;