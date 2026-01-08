import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";
import ProtectedRoute from "../pages/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import Kitchens from "../pages/Kitchens";
import Orders from "../pages/Orders";
import Societies from "../pages/Societies";
import Subscriptions from "../pages/Subscriptions";
import Delivery from "../pages/Delivery";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/societies" element={
          <ProtectedRoute><Societies /></ProtectedRoute>
        } />
        <Route path="/kitchens" element={
          <ProtectedRoute><Kitchens /></ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute><Orders /></ProtectedRoute>
        } />
        <Route path="/subscriptions" element={
          <ProtectedRoute><Subscriptions /></ProtectedRoute>
        } />
        <Route path="/delivery" element={
          <ProtectedRoute><Delivery /></ProtectedRoute>
        } />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}