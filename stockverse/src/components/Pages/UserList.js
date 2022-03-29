import axios from 'axios';
import React, { useState, useEffect} from 'react';
import "../Css/UserList.css"
import {AdminNavigation} from './AdminNavigation';
import {useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap"; 

function UsersList() {
    const navigate = useNavigate();
    const [showProfs, setShowProfs] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
    const getAllUsersApi = 'http://localhost:5000/api/userList';
    useEffect(() => {
        axios.get(getAllUsersApi).then(
        (response) => {
            setAllProfiles(response.data.users)
            setShowProfs(response.data.users);
        }
    )
    },[1]);

    const btnClick = () =>{
        navigate("/userStatistics")
    }

    const onModification = (c) => {
        let profs = [];
        if(c.target.value)
        {
            let filteredValues = showProfs.filter(item => (item.firstName && item.firstName.toLowerCase().includes(c.target.value.toLowerCase()) || (item.lastName && item.lastName.toLowerCase().includes(c.target.value.toLowerCase()))));
            setShowProfs(filteredValues)
            profs = filteredValues
        }else{
            setShowProfs(allProfiles)
            profs = allProfiles
        }
        if(profs.length == 0){
            document.getElementById("nullUsers").style.display = "block";
            document.getElementById("list").style.display = "none";
        }else{
            document.getElementById("nullUsers").style.display = "none";
            document.getElementById("list").style.display = "block";
        }
    }

  return (
    <div className='userlist'>
        <AdminNavigation/>
        <div className="bg">
            <div className='heading'>
                <p className='text'>ACTIVE USERS</p>
            </div>
            <div className='search'>
                    <input className="searchText" placeholder="Search by names" type="text" name="search" onChange={onModification}>
                    </input>
            </div>
            <div id="list" className='list'>
                { showProfs.map(user => (
                <div className='eachItem'>
                    {user.firstName}  {user.lastName}
                    <b className='premiumUsers'>{ user.isPremium ? 'Premium': 'Non Premium'}</b>
                </div>
            ))}
            </div>
            <div id="nullUsers" className='nullUsers'>
                <p className='text'>No Users found</p>
            </div>
            <Button style={{fontSize:18, float:'right', margin: '20px'}} variant="outline-primary" onClick={btnClick}>Statistics</Button>
        </div>
    </div>
  );
}

export default UsersList;
