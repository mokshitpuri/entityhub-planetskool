import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

import Button from '../../../components/ui/Button';

const EntityDistributionChart = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const data = [
    { name: 'Educational', value: 35, count: 142, color: '#1e40af' },
    { name: 'Corporate', value: 28, count: 113, color: '#059669' },
    { name: 'Non-Profit', value: 18, count: 72, color: '#d97706' },
    { name: 'Community', value: 12, count: 48, color: '#dc2626' },
    { name: 'Government', value: 7, count: 28, color: '#7c3aed' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            {data?.count} entities ({data?.value}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting entity distribution data...');
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Entity Distribution</h3>
          <p className="text-sm text-muted-foreground">By category breakdown</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Download"
            iconSize={16}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            variant="ghost"
            iconName="RefreshCw"
            iconSize={16}
          />
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={(_, index) => setSelectedCategory(index)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              {data?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry?.color}
                  stroke={selectedCategory === index ? '#ffffff' : 'none'}
                  strokeWidth={selectedCategory === index ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span style={{ color: entry?.color }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data?.map((item, index) => (
          <div 
            key={item?.name}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-micro cursor-pointer ${
              selectedCategory === index ? 'bg-muted' : 'hover:bg-muted/50'
            }`}
            onMouseEnter={() => setSelectedCategory(index)}
            onMouseLeave={() => setSelectedCategory(null)}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item?.color }}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item?.name}</p>
              <p className="text-xs text-muted-foreground">{item?.count} entities</p>
            </div>
            <span className="text-sm font-medium text-foreground">{item?.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntityDistributionChart;