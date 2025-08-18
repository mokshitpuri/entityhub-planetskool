import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const ExportTestPanel = () => {
  const [isExporting, setIsExporting] = useState(false);

  const downloadFile = (content, filename, contentType) => {
    console.log('Downloading file:', filename, 'Content type:', contentType);
    
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('File download completed for:', filename);
  };

  const testExportCSV = async () => {
    setIsExporting(true);
    console.log('Testing CSV export...');
    
    try {
      const testData = [
        { id: 1, name: 'Test User 1', email: 'test1@example.com' },
        { id: 2, name: 'Test User 2', email: 'test2@example.com' }
      ];
      
      const headers = Object.keys(testData[0]);
      const csvHeaders = headers.join(',');
      const csvRows = testData.map(row => 
        headers.map(header => row[header]).join(',')
      );
      const csvContent = [csvHeaders, ...csvRows].join('\n');
      
      console.log('CSV Content:', csvContent);
      downloadFile(csvContent, 'test-export.csv', 'text/csv');
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('CSV export test completed');
    } catch (error) {
      console.error('CSV export test failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const testExportJSON = async () => {
    setIsExporting(true);
    console.log('Testing JSON export...');
    
    try {
      const testData = [
        { id: 1, name: 'Test User 1', email: 'test1@example.com' },
        { id: 2, name: 'Test User 2', email: 'test2@example.com' }
      ];
      
      const jsonContent = JSON.stringify(testData, null, 2);
      
      console.log('JSON Content:', jsonContent);
      downloadFile(jsonContent, 'test-export.json', 'application/json');
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('JSON export test completed');
    } catch (error) {
      console.error('JSON export test failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Export Test Panel</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Test the export functionality to ensure all download buttons work properly.
      </p>
      
      <div className="flex space-x-3">
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          onClick={testExportCSV}
          loading={isExporting}
          disabled={isExporting}
        >
          Test CSV Export
        </Button>
        
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          onClick={testExportJSON}
          loading={isExporting}
          disabled={isExporting}
        >
          Test JSON Export
        </Button>
      </div>
      
      {isExporting && (
        <div className="mt-4 text-sm text-muted-foreground">
          Export in progress... Check browser downloads and console logs.
        </div>
      )}
    </div>
  );
};

export default ExportTestPanel;
