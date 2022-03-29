import "./App.css";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/Pages/PageNotFound";
import Form from "./components/Pages/Form";
import Home from "./components/Pages/Home";
import AdminDashboard from "./components/Pages/AdminDashboard";
import Payment from "./components/Pages/Payment";
import Portfolio from "./components/Pages/Portfolio";
import Dashboard from "./components/Pages/Dashboard";
import Wishlist from "./components/Pages/Wishlist";
import Register from "./components/Pages/Register";
import UsersList from "./components/Pages/UserList";
import Profile from "./components/Pages/Profile";
import AddPortfolioRecord from "./components/Pages/AddPortfolioRecord";
import { ToastContainer } from "react-toastify";
import CustomBasketForm from "./components/Pages/CustomBasketForm";
import CustomBasketList from "./components/Pages/CustomBasketList";
import "react-toastify/dist/ReactToastify.css";
import CustomBasketListAdmin from "./components/Pages/CustomBasketListAdmin";

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
        <Route exact path="/portfolio" element={<Portfolio />} />
        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/customBasketForm" element={<CustomBasketForm />} />
        <Route exact path="/customBasketList" element={<CustomBasketList />} />
        <Route
          exact
          path="/customBasketListAdmin"
          element={<CustomBasketListAdmin />}
        />
        <Route path="/usersList">
          <Route path=":userId" element={<Profile></Profile>}></Route>
          <Route index element={<UsersList></UsersList>}></Route>
        </Route>
        <Route exact path="/add-portfolio/*" element={<AddPortfolioRecord />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
