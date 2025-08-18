import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import Button from '../../../components/ui/Button';

const GrowthChart = ({ className = '' }) => {
  const [dateRange, setDateRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('both');

  const data = [
    { month: 'Jan', users: 1240, entities: 89, date: '2024-01' },
    { month: 'Feb', users: 1456, entities: 102, date: '2024-02' },
    { month: 'Mar', users: 1789, entities: 118, date: '2024-03' },
    { month: 'Apr', users: 2134, entities: 145, date: '2024-04' },
    { month: 'May', users: 2567, entities: 178, date: '2024-05' },
    { month: 'Jun', users: 2890, entities: 203, date: '2024-06' },
    { month: 'Jul', users: 3245, entities: 234, date: '2024-07' },
    { month: 'Aug', users: 3678, entities: 267, date: '2024-08' }
  ];

  const dateRangeOptions = [
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="font-medium text-foreground mb-2">{label} 2024</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleExport = () => {
    console.log('Exporting growth data...');
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Growth Analytics</h3>
          <p className="text-sm text-muted-foreground">User and entity growth over time</p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-md bg-surface text-foreground"
          >
            {dateRangeOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            iconName="Download"
            iconSize={16}
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#1e40af" 
              strokeWidth={3}
              dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1e40af', strokeWidth: 2 }}
              name="Users"
            />
            <Line 
              type="monotone" 
              dataKey="entities" 
              stroke="#059669" 
              strokeWidth={3}
              dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
              name="Entities"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm text-muted-foreground">Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-sm text-muted-foreground">Entities</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date()?.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default GrowthChart;