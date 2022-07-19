import { Navigate, Outlet } from 'react-router-dom';
import SideBar from '../components/sidebar/SideBar';
import TopBar from '../components/topbar/TopBar';
import useAuth from '../hooks/useAuth';

const Layout = () => {
  const isAuth = useAuth();
  return (
    <>
    { isAuth && <Navigate to="/login" />}
      <div className="App">      
        <TopBar />
        <div className="container">
          <SideBar />       
          <Outlet />
        </div>      
    </div>
    </>
  );
}
export default Layout
