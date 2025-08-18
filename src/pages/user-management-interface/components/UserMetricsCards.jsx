import React from 'react';
import Icon from '../../../components/AppIcon';

const UserMetricsCards = ({ metrics = {} }) => {
  const defaultMetrics = {
    totalUsers: 2847,
    newRegistrations: 156,
    activeUsers: 2654,
    suspendedUsers: 142,
    bannedUsers: 51,
    growthRate: 12.5
  };

  const data = { ...defaultMetrics, ...metrics };

  const cards = [
    {
      title: "Total Users",
      value: data?.totalUsers?.toLocaleString(),
      icon: "Users",
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: `+${data?.growthRate}%`,
      changeType: "positive"
    },
    {
      title: "New Registrations",
      value: data?.newRegistrations?.toLocaleString(),
      icon: "UserPlus",
      color: "text-success",
      bgColor: "bg-success/10",
      change: "+23 today",
      changeType: "positive"
    },
    {
      title: "Active Users",
      value: data?.activeUsers?.toLocaleString(),
      icon: "UserCheck",
      color: "text-success",
      bgColor: "bg-success/10",
      change: "93.2%",
      changeType: "neutral"
    },
    {
      title: "Issues Requiring Attention",
      value: (data?.suspendedUsers + data?.bannedUsers)?.toLocaleString(),
      icon: "AlertTriangle",
      color: "text-warning",
      bgColor: "bg-warning/10",
      change: `${data?.suspendedUsers} suspended, ${data?.bannedUsers} banned`,
      changeType: "warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-6 elevation-1">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${card?.bgColor} flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              card?.changeType === 'positive' ? 'bg-success/10 text-success' :
              card?.changeType === 'warning'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
            }`}>
              {card?.change}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{card?.value}</h3>
            <p className="text-sm text-muted-foreground">{card?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserMetricsCards;