import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);

  // Define role-based permissions
  const getRolePermissions = (role) => {
    switch (role) {
      case 'normal':
        return {
          canJoinEntities: true,
          canViewContent: true,
          canParticipateInEvents: true,
          canCreateEntities: false,
          canManageEntities: false,
          canManageUsers: false,
          canAccessGlobalAdmin: false
        };
      case 'entity-admin':
        return {
          canJoinEntities: true, // Can join other entities as member
          canViewContent: true,
          canParticipateInEvents: true,
          canCreateEntities: true,
          canManageEntities: true, // Only their own entities
          canManageEntityMembers: true,
          canCreateContent: true,
          canManageUsers: false, // Cannot manage global users
          canAccessGlobalAdmin: false
        };
      case 'super-admin':
        return {
          canJoinEntities: false, // Cannot be member of any entity
          canViewContent: false, // No content access, only admin functions
          canParticipateInEvents: false,
          canCreateEntities: true,
          canManageEntities: true, // All entities
          canManageUsers: true, // Global user management
          canAccessGlobalAdmin: true,
          canDeleteEntities: true,
          canSuspendEntities: true,
          canBanUsers: true,
          canApproveRequests: true
        };
      default:
        return {};
    }
  };

  const roles = [
    {
      id: 'normal',
      title: 'Normal User',
      description: 'Browse and join entities as a member',
      icon: 'User',
      color: 'bg-blue-500',
      dashboard: '/user-dashboard'
    },
    {
      id: 'entity-admin',
      title: 'Entity Admin',
      description: 'Own entities and be a member of others',
      icon: 'Settings',
      color: 'bg-green-500',
      dashboard: '/user-dashboard'
    },
    {
      id: 'super-admin',
      title: 'Super Admin',
      description: 'Global system administration only',
      icon: 'Shield',
      color: 'bg-purple-500',
      dashboard: '/super-admin-dashboard'
    }
  ];

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store user role in localStorage for the app to use
    const userData = {
      role: selectedRole,
      name: selectedRole === 'super-admin' ? 'Super Admin' : 
            selectedRole === 'entity-admin' ? 'Entity Admin' : 'John Doe',
      email: selectedRole === 'super-admin' ? 'admin@entityhub.com' : 
             selectedRole === 'entity-admin' ? 'entityadmin@company.com' : 'user@example.com',
      avatar: null,
      loginTime: new Date().toISOString(),
      // Role-specific permissions and data
      permissions: getRolePermissions(selectedRole),
      // Entity admin owns specific entities, normal users have memberships
      ownedEntities: selectedRole === 'entity-admin' ? ['4'] : [], // Local Community Center for demo
      memberships: selectedRole === 'normal' ? ['1', '2', '4', '8'] : 
                   selectedRole === 'entity-admin' ? ['1', '2', '8'] : [], // Entity admin can be member of other entities
      // Super admin has no memberships, only administrative access
    };
    
    localStorage.setItem('entityhub_user', JSON.stringify(userData));
    
    // Navigate to appropriate dashboard
    const role = roles.find(r => r.id === selectedRole);
    navigate(role.dashboard);
    
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Login - EntityHub</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Building2" size={24} color="white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">EntityHub</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Select your role to continue</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Choose your role
              </label>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      selectedRole === role.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${role.color} rounded-lg flex items-center justify-center`}>
                        <Icon name={role.icon} size={20} color="white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{role.title}</h3>
                        <p className="text-xs text-gray-500">{role.description}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                        selectedRole === role.id
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      }`}>
                        {selectedRole === role.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Access</h4>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-mono">demo@entityhub.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Password:</span>
                  <span className="font-mono">password123</span>
                </div>
              </div>
            </div>

            {/* Login Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue="demo@entityhub.com"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  defaultValue="password123"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName="LogIn"
              iconPosition="left"
            >
              Login as {roles.find(r => r.id === selectedRole)?.title}
            </Button>

            {/* Quick Access Buttons */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center mb-3">Quick Access</p>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((role) => (
                  <Button
                    key={role.id}
                    onClick={() => {
                      setSelectedRole(role.id);
                      setTimeout(handleLogin, 100);
                    }}
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    className="text-xs"
                  >
                    {role.title.split(' ')[0]}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              This is a demo application with role-based access control
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
