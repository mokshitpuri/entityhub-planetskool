import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import UserDashboard from './pages/user-dashboard';
import EntityManagementPanel from './pages/entity-management-panel';
import UserManagementInterface from './pages/user-management-interface';
import SuperAdminDashboard from './pages/super-admin-dashboard';
import EntityDetailPage from './pages/entity-detail-page';
import EntityListHub from './pages/entity-list-hub';
import EntityAdminDashboard from './pages/entity-admin-dashboard';
import PersonalEntityPage from './pages/personal-entity-page';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Role-specific Dashboards */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-hub" element={<EntityAdminDashboard />} />
        <Route path="/entity-admin-dashboard" element={<EntityAdminDashboard />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
        
        {/* Other Pages */}
        <Route path="/entity-management-panel" element={<EntityManagementPanel />} />
        <Route path="/user-management-interface" element={<UserManagementInterface />} />
        <Route path="/entity-detail-page" element={<EntityDetailPage />} />
        <Route path="/entity-list-hub" element={<EntityListHub />} />
        <Route path="/personal-entity-page" element={<PersonalEntityPage />} />
        
        {/* Default route - redirect to login */}
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
