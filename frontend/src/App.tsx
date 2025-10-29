import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import MembershipPage from './pages/MembershipPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/projects' element={<ProjectListPage />} />
            <Route path='/project/:projectId' element={<ProjectDetailsPage />} />
            <Route path='/admin' element={<PrivateRoute />}>
              <Route path='/admin' element={<AdminPage />} />
            </Route>
            <Route path='/membership' element={<MembershipPage />} />
            <Route path='/paymentsuccess' element={<PaymentSuccessPage />} />
            <Route path='/payment-history' element={<PaymentHistoryPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
