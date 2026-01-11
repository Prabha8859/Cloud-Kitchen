import { useState } from 'react';
import { Mail, Lock, ChefHat } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

import { useAdminLoginMutation } from '../api/auth/authapi';
import { setCredentials } from '../api/auth/authslice';

export default function LoginPage() {
  const [email, setEmail] = useState('super@admin.com');
  const [password, setPassword] = useState('Super@123');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const res = await adminLogin({ email, password }).unwrap();

      // ✅ token save (redux + localStorage)
      dispatch(setCredentials(res.accessToken));

      // ✅ redirect after login
      navigate('/');

    } catch (err) {
      setError(
        err?.data?.message ||
        err?.error ||
        'Login failed'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">

        <div className="text-center">
          <div className="inline-block p-3 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl mb-4">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sign in to your FoodHub Admin Panel
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

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

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
