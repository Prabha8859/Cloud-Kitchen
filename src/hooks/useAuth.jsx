import { useDispatch, useSelector } from "react-redux";
import { useAdminLoginMutation } from "../api/auth/authapi";
import { setCredentials, logout } from "../api/auth/authslice";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => <>{children}</>;

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [adminLogin] = useAdminLoginMutation();

  const login = async (email, password) => {
    try {
      const data = await adminLogin({ email, password }).unwrap();
      const token = data?.accessToken || data?.token;
      if (!token) return { ok: false, error: data?.message || 'No token returned' };
      dispatch(setCredentials(token));
      navigate('/');
      return { ok: true, payload: data };
    } catch (err) {
      const msg = err?.data?.message || err?.error || err?.message || 'Login failed';
      return { ok: false, error: msg };
    }
  };

  const logoutAuth = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return { ...auth, login, logout: logoutAuth };
};
