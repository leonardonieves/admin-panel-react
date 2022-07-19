import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';


const ProtectedRoutes = () => {
  const isAuth = useAuth();
  const location = useLocation();

  if(location.pathname === '/logout' && !isAuth) { return <Navigate to="/" replace /> }

  return isAuth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoutes;
