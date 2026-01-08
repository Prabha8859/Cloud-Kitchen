import { useState } from 'react';
import { Mail, Lock, ChefHat } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@foodhub.com');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    // This is where you would call your API
    // For this demo, we'll just use the dummy login function
    login(email, password, role);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">
        <div className="text-center">
          <div className="inline-block p-3 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl mb-4">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to your FoodHub Admin Panel</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Your Role</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-3 rounded-lg border text-sm font-semibold transition-all ${
                  role === 'admin'
                    ? 'bg-orange-50 text-orange-600 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700 ring-2 ring-orange-200 dark:ring-orange-800'
                    : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole('super-admin')}
                className={`p-3 rounded-lg border text-sm font-semibold transition-all ${
                  role === 'super-admin'
                    ? 'bg-orange-50 text-orange-600 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700 ring-2 ring-orange-200 dark:ring-orange-800'
                    : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                }`}
              >
                Super Admin
              </button>
            </div>
          </div>

          <Input
            icon={Mail}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="flex items-center justify-between text-sm">
            <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
              Forgot your password?
            </a>
          </div>

          <div>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}