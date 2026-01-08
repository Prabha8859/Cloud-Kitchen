import { Outlet } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

export default function Layout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
