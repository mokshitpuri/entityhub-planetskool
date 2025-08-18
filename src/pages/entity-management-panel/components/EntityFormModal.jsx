import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const EntityFormModal = ({ 
  isOpen = false, 
  onClose = () => {}, 
  onSave = () => {}, 
  entity = null, // null for create, object for edit
  loading = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    type: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    logo: '',
    banner: '',
    adminEmail: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'education',
    'technology',
    'healthcare',
    'finance',
    'nonprofit',
    'government',
    'community',
    'sports',
    'arts',
    'business'
  ];

  const types = [
    'organization',
    'company',
    'institution',
    'club',
    'association',
    'foundation',
    'agency',
    'group'
  ];

  useEffect(() => {
    if (entity) {
      setFormData({
        name: entity?.name || '',
        description: entity?.description || '',
        category: entity?.category || '',
        type: entity?.type || '',
        website: entity?.website || '',
        email: entity?.email || '',
        phone: entity?.phone || '',
        address: entity?.address || '',
        logo: entity?.logo || '',
        banner: entity?.banner || '',
        adminEmail: entity?.admin?.email || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        type: '',
        website: '',
        email: '',
        phone: '',
        address: '',
        logo: '',
        banner: '',
        adminEmail: ''
      });
    }
    setErrors({});
  }, [entity, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Entity name is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData?.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData?.type) {
      newErrors.type = 'Type is required';
    }

    if (!formData?.adminEmail?.trim()) {
      newErrors.adminEmail = 'Admin email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.adminEmail)) {
      newErrors.adminEmail = 'Please enter a valid email address';
    }

    if (formData?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData?.website && !formData?.website?.match(/^https?:\/\/.+/)) {
      newErrors.website = 'Please enter a valid URL (starting with http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col transform transition-all">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">
            {entity ? 'Edit Entity' : 'Create New Entity'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Entity Name"
                type="text"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
                placeholder="Enter entity name"
              />

              <Input
                label="Admin Email"
                type="email"
                value={formData?.adminEmail}
                onChange={(e) => handleInputChange('adminEmail', e?.target?.value)}
                error={errors?.adminEmail}
                required
                placeholder="admin@example.com"
              />
            </div>

            <Input
              label="Description"
              type="text"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              error={errors?.description}
              required
              placeholder="Brief description of the entity"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData?.category}
                  onChange={(e) => handleInputChange('category', e?.target?.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors?.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select category</option>
                  {categories?.map(category => (
                    <option key={category} value={category}>
                      {category?.charAt(0)?.toUpperCase() + category?.slice(1)}
                    </option>
                  ))}
                </select>
                {errors?.category && (
                  <p className="mt-1 text-sm text-red-600">{errors?.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData?.type}
                  onChange={(e) => handleInputChange('type', e?.target?.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors?.type ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select type</option>
                  {types?.map(type => (
                    <option key={type} value={type}>
                      {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
                    </option>
                  ))}
                </select>
                {errors?.type && (
                  <p className="mt-1 text-sm text-red-600">{errors?.type}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                placeholder="contact@example.com"
              />

              <Input
                label="Phone"
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                error={errors?.phone}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <Input
              label="Website"
              type="url"
              value={formData?.website}
              onChange={(e) => handleInputChange('website', e?.target?.value)}
              error={errors?.website}
              placeholder="https://example.com"
            />

            <Input
              label="Address"
              type="text"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              error={errors?.address}
              placeholder="123 Main St, City, State 12345"
            />
          </div>

          {/* Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Media</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Logo URL"
                type="url"
                value={formData?.logo}
                onChange={(e) => handleInputChange('logo', e?.target?.value)}
                error={errors?.logo}
                placeholder="https://example.com/logo.png"
              />

              <Input
                label="Banner URL"
                type="url"
                value={formData?.banner}
                onChange={(e) => handleInputChange('banner', e?.target?.value)}
                error={errors?.banner}
                placeholder="https://example.com/banner.jpg"
              />
            </div>

            {/* Preview */}
            {(formData?.logo || formData?.banner) && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Preview</h4>
                <div className="flex space-x-4">
                  {formData?.logo && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Logo</p>
                      <Image
                        src={formData?.logo}
                        alt="Logo preview"
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                      />
                    </div>
                  )}
                  {formData?.banner && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Banner</p>
                      <Image
                        src={formData?.banner}
                        alt="Banner preview"
                        className="w-32 h-16 rounded-lg object-cover border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={loading}
            >
              {entity ? 'Update Entity' : 'Create Entity'}
            </Button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntityFormModal;