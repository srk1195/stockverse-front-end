import React from 'react'
import "../Css/Home.css"
import Dashboard from './Dashboard'
import { useParams } from "react-router-dom";
import {isAuthenticated} from "../../utils/apiCalls";
const Home = () => {
  const params = useParams();
  console.log(params.id);
  const user=isAuthenticated();
  console.log("Home",user);
  return (
    <>
    <Dashboard value={params.id} />  
    
    </>
  )
}

export default Home