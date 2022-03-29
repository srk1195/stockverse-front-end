import './App.css';
import { Routes, Route} from 'react-router-dom'

import PageNotFound from './components/Pages/PageNotFound';
import Form from './components/Pages/Form';
import Home from './components/Pages/Home';
import AdminDashboard from './components/Pages/AdminDashboard';
import Payment from './components/Pages/Payment';
import PaymentDetails from './components/Pages/PaymentDetails';
import Portfolio from './components/Pages/Portfolio';
import Dashboard from './components/Pages/Dashboard';
import Wishlist from './components/Pages/Wishlist';
import Register from './components/Pages/Register';
import ChangePassword from './components/Pages/ChangePassword';
import Profile from './components/Pages/Profile'

import UsersList from './components/Pages/UserList';

import AddPortfolioRecord from './components/Pages/AddPortfolioRecord';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/Pages/ForgotPassword';
import SecurityQuestion from './components/Pages/SecurityQuestion';
import 'react-toastify/dist/ReactToastify.css';
import UserStatistics from './components/Pages/UserStatistics';
function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route exact path="/login" element={<Form />} />
        <Route exact path="/register" element={<Register />} />
        {user &&<Route exact path="/home" element={<Home />}/>}
        
        {user &&<Route exact path="/dashboard" element={<Dashboard />} />}
        {user &&<Route pathexact path="/payment" element={<Payment />} />}
        {user &&<Route exact path='/payment/users/:userId/transactions/:transactionId' element={ <PaymentDetails />}/>}
        {user &&<Route exact path="/portfolio" element={<Portfolio />} />}

        {user &&<Route exact path="/wishlist" element={<Wishlist />} />}
        {user &&<Route exact path="/admin" element={<AdminDashboard />} />}
        {user &&<Route exact path="/usersList" element={<UsersList/>}/>}
        {user &&<Route exact path='/userStatistics' element={<UserStatistics/>}/>}
        {user &&<Route exact path="/add-portfolio/*" element={<AddPortfolioRecord />} />}
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/securityanswer/:id" element={<SecurityQuestion />} />
         <Route exact path="/changePassword/:id" element={<ChangePassword />} />
         <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="*" element={<PageNotFound />} />
        
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
