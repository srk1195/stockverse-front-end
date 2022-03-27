import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../Css/Form.css";
import axios from "axios";


function Form() {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ email: '', password: '' });
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [warnEmail, setWarnEmail] = useState(false);
    const [msgEmail, setMsgEmail] = useState("");
    const [warnPass, setWarnPass] = useState(false);
    const [msgPass, setMsgPass] = useState("");
    const [eye, seteye] = useState(true);
    const [pass, setpass] = useState("password");

    const [loginRes, setLoginRes] = useState({ message: '', status: true });
    const inputEvent = (e) => {
        setLoginRes({ message: '', status: true });
        if (e.target.name === "email") {
            if (!regexEmail.test(e.target.value) && e.target.value) {
                setWarnEmail(true);
                setMsgEmail("Please Enter Valid Emaild Id!");
            }
            else {
                setWarnEmail(false);
                setFormData({ ...formData, email: e.target.value });
            }
        }
        setFormData((lastValue) => {
            return { ...lastValue, [e.target.name]: e.target.value }
        });
    };
    const submitForm = async(e) => {
        setLoginRes({ message: '', status: true });
        e.preventDefault();
        // setWarnEmail(false);
        // setWarnPass(false);
        // if (formData.email === "") {
        //     setWarnEmail(true);
        //     setMsgEmail("Please enter a Email Id.");
        //     return;
        // }
        // else if (formData.password === "") {
        //     setWarnPass(true);
        //     setMsgPass("Please enter a Password!");
        //     return;
        // }
        // else if (!warnEmail && !warnPass) {
        //     if (formData.email === "admin@gmail.com" && formData.password === "Admin123") {
        //         navigate("/home");
        //     }
        //     else {
        //         setLoginRes({ message: 'Oops! Something went wrong.', status: false });
        //     }
        // }
        try {
			const url = "http://localhost:5000/api/signin";
			const { data: res } = await axios.post(url, formData);
			localStorage.setItem("token", res.formData);
			window.location = "/home";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
    };
    const Eye = () => {
        if (pass === "password") {
            setpass("text");
            seteye(false);
        }
        else {
            setpass("password");
            seteye(true);
        }
    };
    const btnRegister = (e) => {
        navigate(`/register`);
    }
    const btnReset = (e) => {
        navigate(`/forget`);
    }
    return (

        <div>
            <div className="f-container">
                <div className="f-card">
                    <div className="f-form">

                        <div className="f-right-side">
                            <div className="f-register">
                                <p>Not a member? <div onClick={btnRegister}><span>Register Now</span></div></p>
                            </div>

                            <br />
                            <div className="f-hello">
                                <h2>Sign In</h2>
                                <h4>Welcome Back. Let's sign you in. </h4>
                            </div>
                            <br />
                            <br />
                            <form>
                                <div className="f-input_text">
                                    <input type="text" className={` ${warnEmail ? "f-warning" : ""}`} name="email" placeholder="Enter Email Id" value={formData.email} onChange={inputEvent} />
                                    {warnEmail ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgEmail}</p> : null}
                                </div>

                                <div className="f-input_text">
                                    <input type={pass} className={` ${warnPass ? "f-warning" : ""}`} name="password" placeholder="Enter Password" value={formData.password} onChange={inputEvent} />
                                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                                    {warnPass ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgPass}</p> : null}
                                </div>
                                {error && <div className="fa fa-warning">{error}</div>}
                                <div className="f-btn">
                                    <button type="submit" onClick={submitForm}>Sign in</button>
                                </div>
                                <div className="f-forgot">
                                    <p>Forgot Password? <div onClick={btnReset}><span>Reset Password</span></div></p>
                                </div>
                                <br />
                                {(!loginRes.status) ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{loginRes.message}</p> : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form