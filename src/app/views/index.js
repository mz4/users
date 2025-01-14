import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../views/auth/store/authSlice';
import Layout from './layout/containers/Layout';
import Login from './auth/containers/login/Login';
import Users from './users/containers/usersManagement/UsersManagement';
import Meetings from './meetings/containers/meetingsManagement/MeetingsManagement';
import Chat from './chat/containers/chatManagement/chatManagement';

const PrivateRoute = ({ isAuth, component }) => {
  return isAuth ? (
    <Layout>{component}</Layout>
  ) : (
    <Navigate replace to="/login" />
  );
};

const AuthRoute = ({ isAuth, component }) => {
  return isAuth ? <Navigate replace to="/users" /> : component;
};

export const Views = () => {
  const isAuth = useSelector(isAuthenticated);
  return (
    <Routes>
      <Route exact path="/" element={<Navigate replace to="/login" />} />
      <Route
        exact
        path="/login"
        element={<AuthRoute isAuth={isAuth} component={<Login />} />}
      />
      <Route
        exact
        path="/users"
        element={<PrivateRoute isAuth={isAuth} component={<Users />} />}
      />
      <Route
        exact
        path="/meetings"
        element={<PrivateRoute isAuth={isAuth} component={<Meetings />} />}
      />
      <Route
        exact
        path="/chat"
        element={<PrivateRoute isAuth={isAuth} component={<Chat />} />}
      />
    </Routes>
  );
};

export default Views;
