import { 
  LayoutDashboard, 
  Building2, 
  ChefHat, 
  ShoppingCart, 
  Bike 
} from 'lucide-react';

export const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overall system summary'
  },
  {
    id: 'societies',
    label: 'Societies',
    path: '/societies',
    icon: Building2,
    description: 'Manage societies'
  },
  {
    id: 'kitchens',
    label: 'Kitchens',
    path: '/kitchens',
    icon: ChefHat,
    description: 'Kitchen management'
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/orders',
    icon: ShoppingCart,
    description: 'Order management'
  },
  {
    id: 'delivery',
    label: 'Delivery Partners',
    path: '/delivery',
    icon: Bike,
    description: 'Rider management'
  }
];