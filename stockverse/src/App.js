import './App.css';
import { Routes, Route } from 'react-router-dom';
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
import UsersList from './components/Pages/UserList';
import Profile from './components/Pages/Profile';
import AddPortfolioRecord from './components/Pages/AddPortfolioRecord';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPortfolioRecord from './components/Pages/EditPortfolioRecord';

import UserStatistics from './components/Pages/UserStatistics';
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route exact path="/login" element={<Form />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path='/payment/users/:userId/transactions/:transactionId' element={ <PaymentDetails />}/>
        <Route exact path="/portfolio" element={<Portfolio />} />

        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/usersList" element={<UsersList/>}/>
        <Route exact path='/userStatistics' element={<UserStatistics/>}/>
        <Route exact path="/add-portfolio/*" element={<AddPortfolioRecord />} />
        <Route
          exact
          path="/edit-portfolio/:id"
          element={<EditPortfolioRecord />}
        />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
