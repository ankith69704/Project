import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';
import { RootState, AppDispatch } from '../store/store';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Rotary Club</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                Register
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to='/projects'>
            Projects
          </Link>
        </li>
        {user && user.role === 'Admin' && (
          <li>
            <Link to='/admin'>
              Admin
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link to='/membership'>
              Membership
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link to='/payment-history'>
              Payment History
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
