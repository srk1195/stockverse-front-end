import React from 'react'
import "../Css/Home.css"
import Dashboard from './Dashboard'
import { useParams } from "react-router-dom";
const Home = () => {
  const params = useParams();
  console.log(params.id);
  return (
    <>
    <Dashboard value={params.id} />  
    
    </>
  )
}

export default Home