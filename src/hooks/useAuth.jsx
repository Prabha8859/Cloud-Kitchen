// import { createContext, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginUser, logout as logoutAction } from '../API/store/slices/authSlice';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // Get auth state from Redux store
//   const { user, loading, error } = useSelector((state) => state.auth);

//   const login = async (email, password, role) => {
//     // Dispatch the login API action
//     const resultAction = await dispatch(loginUser({ email, password, role }));
    
//     if (loginUser.fulfilled.match(resultAction)) {
//       navigate('/');
//     }
//   };

//   const logout = () => {
//     dispatch(logoutAction());
//     navigate('/login', { replace: true });
//   };

//   const value = { user, login, logout, loading, error };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === null) {
//     throw new Error('useAuth() must be used within an <AuthProvider>.');
//   }
//   return context;
// };

import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });
  const navigate = useNavigate();

  const login = (email, password, role) => {
    // In a real app, you would make an API call to verify credentials
    const userData = { email, role, name: 'Admin User' }; // Dummy user data
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login', { replace: true });
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth() must be used within an <AuthProvider>.');
  }
  return context;
};