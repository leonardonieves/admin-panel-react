import './app.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './routes/Layout';
import Dashboard from './components/pages/home/Dashboard';
import UserList from './components/userList/UserList';
import ProtectedRoutes from './routes/ProtectedRoutes';
import EmailVerifiedPage from './routes/EmailVerifiedPage';
import ForgotPasswordPage from './routes/ForgotPasswordPage';
import LoginPage from './routes/LoginPage';
import LogoutPage from './routes/LogoutPage';
import NotFoundPage from './routes/NotFoundPage';
import SignupPage from './routes/SignupPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Dashboard />} />         
          <Route path="/user" element={<UserList />} />         
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassw" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<EmailVerifiedPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
