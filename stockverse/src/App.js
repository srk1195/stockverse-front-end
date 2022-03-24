
import './App.css';
import { Routes, Route} from 'react-router-dom'
import PageNotFound from './components/Pages/PageNotFound';
import Form from './components/Pages/Form';
import Home from './components/Pages/Home';

import Payment from './components/Pages/Payment'
import Portfolio from './components/Pages/Portfolio'
import Dashboard from './components/Pages/Dashboard'
import Wishlist from './components/Pages/Wishlist';
import Register from './components/Pages/Register';
import ForgetPassword from './components/Pages/ForgotPassword'
import Profile from './components/Pages/Profile'
import SecurityQuestion from './components/Pages/SecurityQuestion';

function App() {
  
  return (
    <>
    <Routes>
       <Route exact path='/' element={ <Form />}  />
       <Route exact path='/login' element={ <Form />}  />
       <Route exact path='/register' element={ <Register />}  />
       <Route exact path='/home' element={ <Home/>}/>      
       <Route exact path='/dashboard' element={ <Dashboard />}/>
       <Route exact path='/payment' element={ <Payment />}/>
       <Route exact path='/portfolio' element={ <Portfolio />}/>
       <Route exact path='/wishlist' element={ <Wishlist />}/>
       <Route exact path='/forget' element={ <ForgetPassword />}/>
       <Route exact path='/profile' element={ <Profile />}/>
       <Route exact path='/securityanswer' element={ <SecurityQuestion/> }/>
       <Route exact path='*' element={ <PageNotFound />}/>
     </Routes>      
    </>    
  );
}

export default App;
