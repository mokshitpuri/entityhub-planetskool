import React from 'react';
import Icon from '../../../components/AppIcon';

const EntitySummaryCards = ({ summaryData = {} }) => {
  const cards = [
    {
      title: "Total Entities",
      value: summaryData?.totalEntities || 247,
      change: "+12%",
      changeType: "positive",
      icon: "Building2",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Active Entities",
      value: summaryData?.activeEntities || 198,
      change: "+8%",
      changeType: "positive",
      icon: "CheckCircle",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Pending Approval",
      value: summaryData?.pendingEntities || 15,
      change: "-3%",
      changeType: "negative",
      icon: "Clock",
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      title: "Suspended",
      value: summaryData?.suspendedEntities || 8,
      change: "+2",
      changeType: "neutral",
      icon: "AlertTriangle",
      color: "bg-red-50 text-red-600"
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card?.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card?.value?.toLocaleString()}</p>
              <p className={`text-sm font-medium mt-1 ${getChangeColor(card?.changeType)}`}>
                {card?.change} from last month
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card?.color}`}>
              <Icon name={card?.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntitySummaryCards;