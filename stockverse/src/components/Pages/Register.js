import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../Css/Register.css"
import Form from 'react-bootstrap/Form'
const Register = () => {
    const navigate =useNavigate();
    const [userData, setUserData] = useState({ Name: "", email: "", password: "", cpassword: "", securityAnswer1: "", securityAnswer2: "", });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //Name
    const regexName = /^[a-zA-Z]+$/;
    const [warnFN, setWarnFN] = useState(false);
    const [msgFN, setMsgFN] = useState("");
    //email
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const [warnEmail, setWarnEmail] = useState(false);
    const [msgEmail, setMsgEmail] = useState("");
    //Password
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const [warnPass, setWarnPass] = useState(false);
    const [msgPass, setMsgPass] = useState("");
    const [warnCPass, setWarnCPass] = useState(false);
    const [msgCPass, setMsgCPass] = useState("");
    //Security Answer
    const regexSecurityAnswer1 = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/;
    const [warnSA1, setWarnSA1] = useState(false);
    const [msgSA1, setMsgSA1] = useState("");
    //Name
    const regexSecurityAnswer2 = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/;
    const [warnSA2, setWarnSA2] = useState(false);
    const [msgSA2, setMsgSA2] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        if (name === "Name") {
            if (!regexName.test(e.target.value) && e.target.value) {
                setWarnFN(true);
                setMsgFN("Invalid Name! Only alphabets allowed!");
            }
            else {
                setWarnFN(false);
                setUserData({ ...userData, Name: e.target.value });
            }
        }
        else if (name === "email") {
            if (!regexEmail.test(e.target.value) && e.target.value) {
                setWarnEmail(true);
                setMsgEmail("Please Enter Valid Emaild Id!");
            }
            else {
                setWarnEmail(false);
                setUserData({ ...userData, email: e.target.value });
            }
        }
        else if (name === "securityAnswer1") {
            if (!regexSecurityAnswer1.test(e.target.value) && e.target.value) {
                setWarnSA1(true);
                setMsgSA1("Please enter only alphabets and numeric values");
            }
            else {
                setWarnSA1(false);
                setUserData({ ...userData, securityAnswer1: e.target.value });
            }
        }
        else if (name === "securityAnswer2") {
            if (!regexSecurityAnswer2.test(e.target.value) && e.target.value) {
                setWarnSA2(true);
                setMsgSA2("Please enter only alphabets and numeric values");
            }
            else {
                setWarnSA2(false);
                setUserData({ ...userData, securityAnswer2: e.target.value });
            }
        }
        else if (name === "password") {
            if (!regexPass.test(e.target.value) && e.target.value) {
                setWarnPass(true);
                setMsgPass("Invalid Password! Alpha-numeric and special characters with minimum limit is 8 characters needed!");
            }
            else {
                setWarnPass(false);
                setUserData({ ...userData, password: e.target.value });
            }
        }
        else if (name === "cpassword") {
            if (e.target.value !== userData.password) {
                setWarnCPass(true);
                setMsgCPass("Password Doesn't match !");
            }
            else {
                setWarnCPass(false);
                setUserData({ ...userData, cpassword: e.target.value });
            }
        }

        setUserData({ ...userData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userData.Name === "") {
            setWarnFN(true);
            setMsgFN("Please Enter a valid Name.");
            return;
        }
        else if (userData.email === "") {
            setWarnEmail(true);
            setMsgEmail("Please Enter a valid Email Id.");
            return;
        }
        else if (userData.password === "") {
            setWarnPass(true);
            setMsgPass("Please Enter Password! Alpha-numeric and special characters with minimum limit is 8 characters needed.");
            return;
        }
        else if (userData.cpassword === "") {
            setWarnCPass(true);
            setMsgCPass("Please confirm the Password.");
            return;
        }
        else if (!warnFN && !warnEmail && !warnPass && !warnCPass) {
            
            alert("Submitted Successfully");
            navigate(`/login`);
        }
    };
    return (
        <>
            <div className="r-container">
                <div className="r-inner">
                    <div className="r-form">
                        <form >
                            <h1>Registration Form</h1>

                            <div className="r-input_text">
                                <input type="text" className={` ${warnFN ? "r-warning" : ""}`} name="Name" placeholder="Enter Name" value={userData.Name} onChange={handleChange} />
                                {warnFN ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgFN}</p> : null}
                            </div>

                            <div className="r-input_text">
                                <input type="text" className={` ${warnEmail ? "r-warning" : ""}`} name="email" placeholder="Enter Email Id" value={userData.email} onChange={handleChange} />
                                {warnEmail ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgEmail}</p> : null}
                            </div>

                            <div className="r-input_text">
                                <input type="password" className={` ${warnPass ? "r-warning" : ""}`} name="password" placeholder="Enter Password" value={userData.password} onChange={handleChange} />
                                {warnPass ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgPass}</p> : null}
                            </div>

                            <div className="r-input_text">
                                <input type="password" className={` ${warnCPass ? "r-warning" : ""}`} name="cpassword" placeholder="Confirm Password" value={userData.cpassword} onChange={handleChange} />
                                {warnCPass ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgCPass}</p> : null}
                            </div>
                            <div className="r-input_text">
                                <Form.Select aria-label="Default select example">
                                    <option>Select Question 1</option>
                                    <option value="Which city you were born in?">Which city you were born in?</option>
                                    <option value="What was your pets name?">What was your pets name?</option>
                                    <option value="What was your school name?">What was your school name?</option>
                                </Form.Select>
                            </div>
                            <div className="r-input_text">
                                <input type="text" className={` ${warnSA1 ? "r-warning" : ""}`} name="securityAnswer1" placeholder="Security Answer 1" value={userData.securityAnswer1} onChange={handleChange} />
                                {warnSA1 ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgSA1}</p> : null}
                            </div>
                            <div className="r-input_text">
                                <Form.Select aria-label="Default select example">
                                    <option>Select Question 2</option>
                                    <option value="Which city you were born in?">Which city you were born in?</option>
                                    <option value="What was your pets name?">What was your pets name?</option>
                                    <option value="What was your school name?">What was your school name?</option>
                                </Form.Select>
                            </div>
                            <div className="r-input_text">
                                <input type="text" className={` ${warnSA1 ? "r-warning" : ""}`} name="securityAnswer2" placeholder="Security Answer 2" value={userData.securityAnswer2} onChange={handleChange} />
                                {warnSA2 ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgSA2}</p> : null}
                            </div>

                            <div className="r-btn">
                                <button type="submit" onClick={handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Register