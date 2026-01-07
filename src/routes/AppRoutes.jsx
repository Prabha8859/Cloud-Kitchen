import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Kitchens from "../pages/Kitchens";
import Orders from "../pages/Orders";
import Societies from "../pages/Societies";
import Subscriptions from "../pages/Subscriptions";
import Delivery from "../pages/Delivery";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/societies" element={<Societies />} />
      <Route path="/kitchens" element={<Kitchens />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/delivery" element={<Delivery />} />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}