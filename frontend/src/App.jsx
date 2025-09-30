import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import PrivateRoute from './utils/PrivateRoute';

// Lazy load all the page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailsPage = lazy(() => import('./pages/PropertyDetailsPage'));
const ListingsPage = lazy(() => import('./pages/ListingsPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const LeadsPage = lazy(() => import('./pages/LeadsPage'));
const DealsPage = lazy(() => import('./pages/DealsPage'));
const DealDetailsPage = lazy(() => import('./pages/DealDetailsPage'));
const ConversationsPage = lazy(() => import('./pages/ConversationsPage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-xl font-semibold">Loading...</div>
  </div>
);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public Routes */}
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="properties" element={<PropertiesPage />} />
              <Route path="properties/:id" element={<PropertyDetailsPage />} />
              <Route path="listings" element={<ListingsPage />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="leads" element={<LeadsPage />} />
                <Route path="deals" element={<DealsPage />} />
                <Route path="deals/:id" element={<DealDetailsPage />} />
                <Route path="conversations" element={<ConversationsPage />} />
                <Route path="messages/:id" element={<MessagesPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;