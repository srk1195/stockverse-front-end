import "./App.css";
import { Routes, Route } from "react-router-dom";

import PageNotFound from "./components/Pages/PageNotFound";
import UserNotAuthenticate from "./components/Pages/UserNotAuthenticate";
import Form from "./components/Pages/Form";
import Home from "./components/Pages/Home";
import AdminDashboard from "./components/Pages/AdminDashboard";
import Payment from "./components/Pages/Payment";
import PaymentDetails from "./components/Pages/PaymentDetails";
import Portfolio from "./components/Pages/Portfolio";
import Dashboard from "./components/Pages/Dashboard";
import Wishlist from "./components/Pages/Wishlist";
import Register from "./components/Pages/Register";
import ChangePassword from "./components/Pages/ChangePassword";
import Profile from "./components/Pages/Profile";

import UsersList from "./components/Pages/UserList";

import AddPortfolioRecord from "./components/Pages/AddPortfolioRecord";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./components/Pages/ForgotPassword";
import SecurityQuestion from "./components/Pages/SecurityQuestion";
import "react-toastify/dist/ReactToastify.css";
import EditPortfolioRecord from "./components/Pages/EditPortfolioRecord";

import UserStatistics from "./components/Pages/UserStatistics";
import CustomBasketForm from "./components/Pages/CustomBasketForm";
import CustomBasketListAdmin from "./components/Pages/CustomBasketListAdmin";
import CustomBasketList from "./components/Pages/CustomBasketList";
function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Form />} />
        {user && <Route exact path="/home" element={<Home />} />}

        {user && <Route exact path="/dashboard" element={<Dashboard />} />}
        {user && <Route exact path="/payment" element={<Payment />} />}
        {user && (
          <Route
            exact
            path="/payment/users/:userId/transactions/:transactionId"
            element={<PaymentDetails />}
          />
        )}
        {user && <Route exact path="/portfolio" element={<Portfolio />} />}

        {user && <Route exact path="/wishlist" element={<Wishlist />} />}
        {user && <Route exact path="/admin" element={<AdminDashboard />} />}
        {user && <Route exact path="/usersList" element={<UsersList />} />}
        {user && (
          <Route exact path="/userStatistics" element={<UserStatistics />} />
        )}
        {user && (
          <Route
            exact
            path="/add-portfolio/*"
            element={<AddPortfolioRecord />}
          />
        )}
        {user && (
          <Route
            exact
            path="/edit-portfolio/:id"
            element={<EditPortfolioRecord />}
          />
        )}
        {!user && <Route exact path="/*" element={<UserNotAuthenticate />} />}
        <Route exact path="/login" element={<Form />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/securityanswer/:id"
          element={<SecurityQuestion />}
        />
        <Route exact path="/changePassword/:id" element={<ChangePassword />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route path="/*" element={<PageNotFound />} />

        {user && (
          <Route
            exact
            path="/customBasketForm"
            element={<CustomBasketForm />}
          />
        )}
        {user && (
          <Route
            exact
            path="/customBasketList"
            element={<CustomBasketList />}
          />
        )}
        {user && (
          <Route
            exact
            path="/customBasketListAdmin"
            element={<CustomBasketListAdmin />}
          />
        )}
      </Routes>
      <ToastContainer position="bottom-right" autoClose={1000} />
    </>
  );
}

export default App;
