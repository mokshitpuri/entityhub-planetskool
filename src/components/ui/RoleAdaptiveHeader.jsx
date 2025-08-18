import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const RoleAdaptiveHeader = ({ 
  user = { role: 'normal', name: 'User', avatar: null },
  onSearch = () => {},
  onNavigate = () => {},
  className = ''
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { label: 'Dashboard', path: '/user-dashboard', icon: 'LayoutDashboard', roles: ['normal'], id: 'normal-dashboard' },
      { label: 'Dashboard', path: '/user-dashboard', icon: 'LayoutDashboard', roles: ['entity-admin'], id: 'entity-admin-dashboard' },
      { label: 'Dashboard', path: '/super-admin-dashboard', icon: 'LayoutDashboard', roles: ['super-admin'], id: 'super-admin-dashboard' },
      { label: 'Entities', path: '/entity-list-hub', icon: 'Building2', roles: ['normal', 'entity-admin'], id: 'entities' },
    ];

    const adminItems = [
      { label: 'Entity Management', path: '/entity-management-panel', icon: 'Settings', roles: ['super-admin'], id: 'entity-management' },
      { label: 'User Management', path: '/user-management-interface', icon: 'Users', roles: ['super-admin'], id: 'user-management' },
    ];

    const allItems = [...baseItems, ...adminItems];
    
    // Filter by role and ensure uniqueness
    const filteredItems = allItems.filter(item => 
      item?.roles?.includes(user?.role)
    );
    
    // Remove duplicates by path to ensure unique keys
    const uniqueItems = filteredItems.filter((item, index, self) => 
      index === self.findIndex(i => i.path === item.path)
    );
    
    return uniqueItems;
  };

  const navigationItems = getNavigationItems();
  const primaryItems = navigationItems?.slice(0, 4);
  const overflowItems = navigationItems?.slice(4);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef?.current && !profileMenuRef?.current?.contains(event?.target)) {
        setIsProfileMenuOpen(false);
      }
      if (mobileMenuRef?.current && !mobileMenuRef?.current?.contains(event?.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('entityhub_user');
    navigate('/login');
  };

  const handleSearch = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery);
    }
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border ${className}`}>
      <div className="flex items-center justify-between h-16 lg:h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer transition-micro hover:opacity-80"
            onClick={() => handleNavigation('/')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Building2" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:block">EntityHub</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryItems?.map((item) => (
            <Button
              key={item?.id || item?.path}
              variant={isActive(item?.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="transition-micro"
            >
              {item?.label}
            </Button>
          ))}
          
          {overflowItems?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                iconName="MoreHorizontal"
                iconSize={16}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                More
              </Button>
              
              {isProfileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg elevation-2 py-1">
                  {overflowItems?.map((item) => (
                    <button
                      key={item?.id || item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full px-3 py-2 text-left text-sm transition-micro hover:bg-muted flex items-center space-x-2 ${
                        isActive(item?.path) ? 'bg-muted text-primary' : 'text-foreground'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={`relative transition-micro ${isSearchFocused ? 'ring-2 ring-ring rounded-lg' : ''}`}>
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder="Search entities..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 pr-4 py-2 w-full bg-muted border-0 focus:bg-surface"
              />
            </div>
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search */}
          <Button
            variant="ghost"
            iconName="Search"
            iconSize={20}
            className="md:hidden"
            onClick={() => {/* Handle mobile search */}}
          />

          {/* Notifications */}
          <Button
            variant="ghost"
            iconName="Bell"
            iconSize={20}
            className="relative"
          >
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </Button>

          {/* User Profile */}
          <div className="relative" ref={profileMenuRef}>
            <Button
              variant="ghost"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 px-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden lg:block text-sm font-medium">{user?.name}</span>
              <Icon name="ChevronDown" size={16} className="hidden lg:block" />
            </Button>

            {isProfileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg elevation-2 py-1">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace('-', ' ')}</p>
                </div>
                <button className="w-full px-3 py-2 text-left text-sm transition-micro hover:bg-muted flex items-center space-x-2">
                  <Icon name="User" size={16} />
                  <span>Profile</span>
                </button>
                <button className="w-full px-3 py-2 text-left text-sm transition-micro hover:bg-muted flex items-center space-x-2">
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </button>
                <button className="w-full px-3 py-2 text-left text-sm transition-micro hover:bg-muted flex items-center space-x-2">
                  <Icon name="HelpCircle" size={16} />
                  <span>Help</span>
                </button>
                <div className="border-t border-border mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm transition-micro hover:bg-muted flex items-center space-x-2 text-error"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            iconName="Menu"
            iconSize={20}
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden bg-surface border-t border-border elevation-2"
        >
          <div className="px-4 py-2">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  type="search"
                  placeholder="Search entities..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 w-full bg-muted border-0"
                />
              </div>
            </form>
            
            <nav className="space-y-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.id || item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full px-3 py-3 text-left transition-micro rounded-lg flex items-center space-x-3 ${
                    isActive(item?.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default RoleAdaptiveHeader;