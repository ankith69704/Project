import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const PrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user && user.role === 'Admin') {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoute;
