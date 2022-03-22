import React, { useState } from "react";
import Form from './Form';
import "../Css/Register.css"
const Register = () => {
    const[userData,setUserData]=useState({Name:"",email:"",password:"",cpassword:""});
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    //Name
    const regexName = /^[a-zA-Z]+$/;
    const[warnFN,setWarnFN]=useState(false);
    const [msgFN, setMsgFN] = useState("");
    //email
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const[warnEmail,setWarnEmail]=useState(false);
    const [msgEmail, setMsgEmail] = useState("");
    //Password
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const[warnPass,setWarnPass]=useState(false);
    const [msgPass, setMsgPass] = useState("");
    const[warnCPass,setWarnCPass]=useState(false);
    const [msgCPass, setMsgCPass] = useState("");
    
    const handleChange = (e) => {
        e.preventDefault();
        const name=e.target.name;
        const value=e.target.value;
        if(name=="Name"){           
            if(!regexName.test(e.target.value) && e.target.value)
            {
                setWarnFN(true);
                setMsgFN("Invalid Name! Only alphabets allowed!");
            }
            else
            {
                setWarnFN(false);
                setUserData({...userData,Name:e.target.value});
            }
        }
        else if(name=="email"){           
            if(!regexEmail.test(e.target.value) && e.target.value)
            {
                setWarnEmail(true);
                setMsgEmail("Please Enter Valid Emaild Id!");
            }
            else
            {
                setWarnEmail(false);
                setUserData({...userData,email:e.target.value});
            }
        }
        else if(name=="password"){           
            if(!regexPass.test(e.target.value) && e.target.value)
            {
                setWarnPass(true);
                setMsgPass("Invalid Password! Alpha-numeric and special characters with minimum limit is 8 characters needed!");
            }
            else
            {
                setWarnPass(false);
                setUserData({...userData,password:e.target.value});
            }
        }
        else if(name=="cpassword"){   
            if(e.target.value !== userData.password) 
            {
                setWarnCPass(true);
                setMsgCPass("Password Doesn't match !");
            }
            else
            {
                setWarnCPass(false);
                setUserData({...userData,cpassword:e.target.value});
            }
        }
        setUserData({...userData,[name]:value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(userData.Name=="")
        { 
            setWarnFN(true); 
            setMsgFN("Please Enter a valid Name."); 
            return;                   
        } 
        else if(userData.email=="")
        { 
            setWarnEmail(true); 
            setMsgEmail("Please Enter a valid Email Id.");
            return;
        }  
        else if(userData.password=="")
        { 
            setWarnPass(true); 
            setMsgPass("Please Enter Password! Alpha-numeric and special characters with minimum limit is 8 characters needed.");
            return;
        } 
        else if(userData.cpassword=="")
        { 
            setWarnCPass(true); 
            setMsgCPass("Please confirm the Password.");
            return;
        }   
        else if(!warnFN && !warnEmail && !warnPass && !warnCPass)
        {
            setIsLoggedIn(true);
            alert("Submitted Successfully");
        } 
    };
  return (
    <>
     {isLoggedIn ? (
      <Form />
      ):(
      <>
      <div className="r-container">
        <div className="r-inner">
        <div className="r-form">
        <form >
            <h1>Registration Form</h1>

            <div className="r-input_text">
                <input type="text" className={` ${warnFN ? "r-warning" : "" }`}  name="Name" placeholder="Enter Name"  value={userData.Name} onChange={handleChange} />    
                {warnFN ? <p style={{color:"red"}}><i className="fa fa-warning"></i>{msgFN}</p> : null}             
            </div>

            <div className="r-input_text">
                <input type="text" className={` ${warnEmail ? "r-warning" : "" }`}  name="email" placeholder="Enter Email Id"  value={userData.email} onChange={handleChange} />     
                {warnEmail ? <p style={{color:"red"}}><i className="fa fa-warning"></i>{msgEmail}</p> : null}            
            </div>

            <div className="r-input_text">
                <input type="password" className={` ${warnPass ? "r-warning" : "" }`}  name="password" placeholder="Enter Password"  value={userData.password} onChange={handleChange} />     
                {warnPass ? <p style={{color:"red"}}><i className="fa fa-warning"></i>{msgPass}</p> : null}            
            </div>

            <div className="r-input_text">
                <input type="password" className={` ${warnCPass ? "r-warning" : "" }`}  name="cpassword" placeholder="Confirm Password"  value={userData.cpassword} onChange={handleChange} />     
                {warnCPass ? <p style={{color:"red"}}><i className="fa fa-warning"></i>{msgCPass}</p> : null}            
            </div>

            <div className="r-btn">
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </form> 
        </div>
        </div>
    </div>
      </>
      )}
    </>
  )
}

export default Register