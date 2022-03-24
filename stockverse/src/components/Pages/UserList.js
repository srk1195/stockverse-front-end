import axios from 'axios';
import React, { useState, useEffect} from 'react';
import "../Css/UserList.css"
import {AdminNavigation} from './AdminNavigation';

function UsersList() {
    const [showProfs, setShowProfs] = useState([]);
    const [allProfiles, setAllProfiles] = useState([]);
    const userList = [{'name':"Pallavi1", 'id':1}, {'name':"Pallavi11", 'id':2}, {'name':"Pallavi", 'id':3}, {'name':"Pallavi4", 'id':4}, {'name':"Pallavi5", 'id':5}, {'name':"Pallavi16", 'id':6}, {'name':"Pallavi7", 'id':7}, {'name':"Pallavi8", 'id':8}, {'name':"Pallavi9", 'id':9}]
    useEffect(() => {
        axios.get('https://tutorial4-api.herokuapp.com/api/users/').then(
        (response) => {
            setAllProfiles(userList)
            setShowProfs(userList);
        }
    )
    },[1]);

    const onModification = (c) => {
        let profs = [];
        if(c.target.value)
        {
            let filteredValues = userList.filter(item => (item.name.toLowerCase().includes(c.target.value.toLowerCase())));
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
                    {user.name}
                </div>
            ))}
            </div>
            <div id="nullUsers" className='nullUsers'>
                <p className='text'>No Users found</p>
            </div>
        </div>
    </div>
  );
}

export default UsersList;