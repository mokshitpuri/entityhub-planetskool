import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EntitySettingsForm = ({ 
  entity,
  onSave = () => {},
  onCancel = () => {},
  className = ''
}) => {
  const [formData, setFormData] = useState({
    name: entity?.name || '',
    description: entity?.description || '',
    type: entity?.type || 'organization',
    category: entity?.category || 'business',
    website: entity?.website || '',
    location: entity?.location || '',
    contactEmail: entity?.contactEmail || '',
    phone: entity?.phone || '',
    logo: entity?.logo || '',
    banner: entity?.banner || '',
    primaryColor: entity?.primaryColor || '#1e40af',
    secondaryColor: entity?.secondaryColor || '#64748b',
    isPublic: entity?.isPublic || true,
    allowJoinRequests: entity?.allowJoinRequests || true,
    requireApproval: entity?.requireApproval || true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const entityTypes = [
    { value: 'organization', label: 'Organization' },
    { value: 'community', label: 'Community' },
    { value: 'educational', label: 'Educational Institution' },
    { value: 'nonprofit', label: 'Non-Profit' },
    { value: 'business', label: 'Business' },
    { value: 'club', label: 'Club/Group' }
  ];

  const categories = [
    { value: 'business', label: 'Business & Professional' },
    { value: 'education', label: 'Education & Learning' },
    { value: 'technology', label: 'Technology' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'arts', label: 'Arts & Culture' },
    { value: 'sports', label: 'Sports & Recreation' },
    { value: 'social', label: 'Social & Community' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  const handleImageUpload = (field, file) => {
    // Simulate image upload
    const mockUrl = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop`;
    handleInputChange(field, mockUrl);
  };

  return (
    <div className={`bg-surface ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Entity Settings</h2>
          <p className="text-sm text-muted-foreground">
            Customize your entity's appearance and configuration
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName={previewMode ? "Edit" : "Eye"}
            iconPosition="left"
            iconSize={16}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>
      {previewMode ? (
        /* Preview Mode */
        (<div className="space-y-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Banner Preview */}
            <div className="h-32 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
              {formData?.banner && (
                <Image
                  src={formData?.banner}
                  alt="Entity banner"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/20" />
            </div>
            
            {/* Entity Info Preview */}
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-surface -mt-8 relative z-10">
                  {formData?.logo ? (
                    <Image
                      src={formData?.logo}
                      alt="Entity logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Icon name="Building2" size={24} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">{formData?.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{formData?.type} • {formData?.category}</p>
                  <p className="text-sm text-foreground mt-2">{formData?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>)
      ) : (
        /* Edit Mode */
        (<div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-md font-semibold text-foreground mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Entity Name"
                type="text"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                placeholder="Enter entity name"
                required
              />
              
              <Select
                label="Entity Type"
                options={entityTypes}
                value={formData?.type}
                onChange={(value) => handleInputChange('type', value)}
              />
              
              <Select
                label="Category"
                options={categories}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
              />
              
              <Input
                label="Location"
                type="text"
                value={formData?.location}
                onChange={(e) => handleInputChange('location', e?.target?.value)}
                placeholder="City, Country"
              />
            </div>
            
            <div className="mt-4">
              <Input
                label="Description"
                type="text"
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Describe your entity..."
                className="h-20"
              />
            </div>
          </div>
          {/* Contact Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-md font-semibold text-foreground mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Website"
                type="url"
                value={formData?.website}
                onChange={(e) => handleInputChange('website', e?.target?.value)}
                placeholder="https://example.com"
              />
              
              <Input
                label="Contact Email"
                type="email"
                value={formData?.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e?.target?.value)}
                placeholder="contact@example.com"
              />
              
              <Input
                label="Phone Number"
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          {/* Branding */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-md font-semibold text-foreground mb-4">Branding</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Logo</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-border">
                    {formData?.logo ? (
                      <Image
                        src={formData?.logo}
                        alt="Current logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Icon name="Building2" size={20} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    iconName="Upload"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleImageUpload('logo', null)}
                  >
                    Upload Logo
                  </Button>
                </div>
              </div>

              {/* Banner Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Banner</label>
                <div className="space-y-2">
                  <div className="w-full h-20 rounded-lg overflow-hidden border border-border">
                    {formData?.banner ? (
                      <Image
                        src={formData?.banner}
                        alt="Current banner"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Icon name="Image" size={20} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    iconName="Upload"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleImageUpload('banner', null)}
                    className="w-full"
                  >
                    Upload Banner
                  </Button>
                </div>
              </div>
            </div>

            {/* Color Scheme */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-foreground mb-3">Color Scheme</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData?.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e?.target?.value)}
                      className="w-8 h-8 rounded border border-border"
                    />
                    <Input
                      type="text"
                      value={formData?.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e?.target?.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Secondary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={formData?.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e?.target?.value)}
                      className="w-8 h-8 rounded border border-border"
                    />
                    <Input
                      type="text"
                      value={formData?.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e?.target?.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Privacy & Access */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-md font-semibold text-foreground mb-4">Privacy & Access</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Public Entity</p>
                  <p className="text-xs text-muted-foreground">Allow anyone to discover this entity</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData?.isPublic}
                  onChange={(e) => handleInputChange('isPublic', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Allow Join Requests</p>
                  <p className="text-xs text-muted-foreground">Let users request to join this entity</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData?.allowJoinRequests}
                  onChange={(e) => handleInputChange('allowJoinRequests', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Require Approval</p>
                  <p className="text-xs text-muted-foreground">Manually approve all join requests</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData?.requireApproval}
                  onChange={(e) => handleInputChange('requireApproval', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>)
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
        
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EntitySettingsForm;