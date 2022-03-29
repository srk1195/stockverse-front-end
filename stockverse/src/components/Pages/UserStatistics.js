//Author : Pallavi Cherukupalli (B00887062)
import React, { useEffect, useState } from 'react';
import '../Css/UserStatistics.css'
import { AdminNavigation } from './AdminNavigation';
import axios from 'axios';
import CONSTANTS from '../../utils/constants';


const UserStatistics = () => {
  const [wishlists, setWishlists] = useState([]);
  const [allWishlists, setAllWishlists] = useState([]);
  const [filterData, setFilterData] = useState({});
  const getAllWishlistsApi = CONSTANTS.LOCAL_BACKEND_URL + '/wishlist/allWishlists'
  useEffect(() =>{
      axios.get(getAllWishlistsApi).then((res) => 
      {
        setWishlists(res.data.wishlist)
        setAllWishlists(res.data.wishlist)
      }
      )}, [1])



    const onModification = (c) => {
      var filterAttribute;
      var filteredValues = [];
      switch(c.target.id){
        case 'name':
          filterAttribute = 'Name'
          break;
        case 'investments':
          filterAttribute = 'Investments'
          break;
        case 'created':
          filterAttribute = 'createdAt'
          break;
        case 'updated':
          filterAttribute = 'updatedAt'
          break;
      }
      console.log(filterAttribute)
      if(c.target.value){
        let obj = {};
        filteredValues = wishlists.filter(item => item[filterAttribute] && item[filterAttribute].toLowerCase().includes(c.target.value.toLowerCase()))
        setWishlists(filteredValues);
        obj[filterAttribute] = c.target.value
        setFilterData(filterData => ({
          ...filterData,
          ...obj
        }));
      }else{
        let obj = {};
        obj = filterData;
        delete obj[filterAttribute];
        setFilterData(obj)
        setWishlists(allWishlists)
      }
    }

  return (
    <div className='profile'>
       <AdminNavigation/>
       <div>
          <p className='text'>User Statistics</p>
       </div>
      <div className='statistics'>
        <h4 className='textstats'>Total number of users found: {allWishlists.length}</h4>
        <div className='filteredData'>
          <h4 className='textstats' >Numbers of users after filtering fields: {wishlists.length}</h4>
        </div>
      </div>
       <table>
        <tr>
          <th>Name
            <div className='inputsection'>
              <input type="text" id="name" placeholder='Search name' onChange={onModification}></input>
            </div>
          </th>
          <th>Investment Wishlists
          <div className='inputsection'>
            <input type="text" id="investments" placeholder='Search investments' onChange={onModification}></input>
          </div>
          </th>
          <th>CreatedAt
          <div className='inputsection'>
            <input type="text" id="created" placeholder='Search by date' onChange={onModification}></input>
          </div>
          </th>
          <th>UpdatedAt
          <div className='inputsection'>
            <input type="text" id="updated" placeholder='Search by date' onChange={onModification}></input>
          </div>
          </th>
        </tr>
        {wishlists.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.Name}</td>
              <td>{val.Investments}</td>
              <td>{val.createdAt}</td>
              <td>{val.updatedAt}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default UserStatistics