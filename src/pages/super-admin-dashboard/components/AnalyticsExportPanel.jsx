import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsExportPanel = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('30days');
  const [selectedMetrics, setSelectedMetrics] = useState(['users', 'entities', 'engagement']);

  const dateRanges = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '1year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const availableMetrics = [
    { value: 'users', label: 'User Analytics', icon: 'Users' },
    { value: 'entities', label: 'Entity Analytics', icon: 'Building2' },
    { value: 'engagement', label: 'Engagement Metrics', icon: 'Activity' },
    { value: 'growth', label: 'Growth Analytics', icon: 'TrendingUp' },
    { value: 'revenue', label: 'Revenue Analytics', icon: 'DollarSign' },
    { value: 'performance', label: 'Performance Metrics', icon: 'BarChart3' }
  ];

  const handleExportAnalytics = async (format = 'csv') => {
    setIsExporting(true);
    console.log('Starting analytics export in format:', format);
    
    try {
      // Generate comprehensive analytics data
      const analyticsData = {
        metadata: {
          exportDate: new Date().toISOString(),
          dateRange: selectedDateRange,
          metrics: selectedMetrics
        },
        userAnalytics: {
          totalUsers: 2847,
          newRegistrations: 156,
          activeUsers: 2654,
          usersByRole: { normal: 2500, entityAdmin: 300, superAdmin: 47 },
          userGrowthRate: 12.5,
          topCountries: ['USA', 'UK', 'Canada', 'Australia', 'Germany']
        },
        entityAnalytics: {
          totalEntities: 1234,
          newEntities: 45,
          activeEntities: 1100,
          entitiesByCategory: {
            education: 300,
            technology: 250,
            healthcare: 200,
            community: 180,
            business: 150,
            nonprofit: 154
          },
          averageMembersPerEntity: 45.7
        },
        engagementMetrics: {
          averageSessionDuration: '8m 32s',
          averagePageViews: 4.2,
          bounceRate: '23.5%',
          mostVisitedPages: ['/entities', '/dashboard', '/profile'],
          peakUsageHours: ['9-11 AM', '2-4 PM', '7-9 PM']
        },
        growthAnalytics: {
          monthlyGrowthRate: '15.2%',
          userRetentionRate: '78.5%',
          entityGrowthRate: '8.7%',
          engagementGrowth: '22.1%'
        }
      };

      if (format === 'csv') {
        const csvContent = convertAnalyticsToCSV(analyticsData);
        console.log('Generated CSV content:', csvContent.substring(0, 200) + '...');
        downloadFile(csvContent, `analytics-report-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
      } else if (format === 'json') {
        const jsonContent = JSON.stringify(analyticsData, null, 2);
        console.log('Generated JSON content length:', jsonContent.length);
        downloadFile(jsonContent, `analytics-report-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
      } else if (format === 'excel') {
        // For Excel format, we'll generate a CSV that can be opened in Excel
        const excelContent = convertAnalyticsToExcel(analyticsData);
        console.log('Generated Excel content length:', excelContent.length);
        downloadFile(excelContent, `analytics-report-${new Date().toISOString().split('T')[0]}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      }

      // Simulate export delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Analytics export completed successfully');
      alert(`Analytics report exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Analytics export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const convertAnalyticsToCSV = (data) => {
    let csvContent = '';
    
    // Add metadata
    csvContent += 'Analytics Report\n';
    csvContent += `Export Date,${data.metadata.exportDate}\n`;
    csvContent += `Date Range,${data.metadata.dateRange}\n`;
    csvContent += `Metrics,${data.metadata.metrics.join(';')}\n\n`;
    
    // Add user analytics
    csvContent += 'User Analytics\n';
    csvContent += 'Metric,Value\n';
    csvContent += `Total Users,${data.userAnalytics.totalUsers}\n`;
    csvContent += `New Registrations,${data.userAnalytics.newRegistrations}\n`;
    csvContent += `Active Users,${data.userAnalytics.activeUsers}\n`;
    csvContent += `Growth Rate,${data.userAnalytics.userGrowthRate}%\n\n`;
    
    // Add entity analytics
    csvContent += 'Entity Analytics\n';
    csvContent += 'Metric,Value\n';
    csvContent += `Total Entities,${data.entityAnalytics.totalEntities}\n`;
    csvContent += `New Entities,${data.entityAnalytics.newEntities}\n`;
    csvContent += `Active Entities,${data.entityAnalytics.activeEntities}\n`;
    csvContent += `Average Members per Entity,${data.entityAnalytics.averageMembersPerEntity}\n\n`;
    
    // Add engagement metrics
    csvContent += 'Engagement Metrics\n';
    csvContent += 'Metric,Value\n';
    csvContent += `Average Session Duration,${data.engagementMetrics.averageSessionDuration}\n`;
    csvContent += `Average Page Views,${data.engagementMetrics.averagePageViews}\n`;
    csvContent += `Bounce Rate,${data.engagementMetrics.bounceRate}\n\n`;
    
    return csvContent;
  };

  const convertAnalyticsToExcel = (data) => {
    // This is a simplified version - in a real app, you'd use a library like xlsx
    return convertAnalyticsToCSV(data);
  };

  const downloadFile = (content, filename, contentType) => {
    console.log('Downloading file:', filename, 'Content type:', contentType, 'Content length:', content.length);
    
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('File download initiated for:', filename);
  };

  const toggleMetric = (metric) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Analytics Export Center</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Export comprehensive analytics and user data for analysis
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Date Range Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Date Range
          </label>
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Metrics Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Metrics to Include
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableMetrics.map(metric => (
              <label key={metric.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric.value)}
                  onChange={() => toggleMetric(metric.value)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <Icon name={metric.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{metric.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Export Format
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              iconName="FileSpreadsheet"
              iconPosition="left"
              onClick={() => handleExportAnalytics('csv')}
              loading={isExporting}
              disabled={isExporting}
              fullWidth
            >
              Export as CSV
            </Button>
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
              onClick={() => handleExportAnalytics('json')}
              loading={isExporting}
              disabled={isExporting}
              fullWidth
            >
              Export as JSON
            </Button>
            <Button
              variant="outline"
              iconName="FileSpreadsheet"
              iconPosition="left"
              onClick={() => handleExportAnalytics('excel')}
              loading={isExporting}
              disabled={isExporting}
              fullWidth
            >
              Export as Excel
            </Button>
          </div>
        </div>

        {/* Quick Stats Preview */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Preview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">2,847</div>
              <div className="text-xs text-muted-foreground">Total Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">1,234</div>
              <div className="text-xs text-muted-foreground">Total Entities</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">78.5%</div>
              <div className="text-xs text-muted-foreground">Retention Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">15.2%</div>
              <div className="text-xs text-muted-foreground">Growth Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsExportPanel;
