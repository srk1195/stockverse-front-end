import React,{useState} from 'react';
import {Navigation} from './Navigation';
import {useNavigate} from "react-router-dom";
import "../Css/Profile.css"

function Profile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ answer: '' });
    const [warnAnswer, setWarnAnswer] = useState(false);
    const [msgAnswer, setMsgAnswer] = useState("");
    const [securityRes, setSecurityRes] = useState({ message: '', status: true });
    const inputEvent = (e) => {
        setSecurityRes({ message: '', status: true });
        if (e.target.name === "answer") {

            setWarnAnswer(false);
            setFormData({ ...formData, answer: e.target.value });

        }
        setFormData((lastValue) => {
            return { ...lastValue, [e.target.name]: e.target.value }
        });
    };
    const submitForm = (e) => {
        setSecurityRes({ message: '', status: true });
        e.preventDefault();
        setWarnAnswer(false);

        if (formData.answer === "") {
            setWarnAnswer(true);
            setMsgAnswer("Please enter a valid answer");
            return;
        }

        else if (!warnAnswer) {
            if (formData.answer === "hello") {
                navigate("/login");
            }
            else {
                setSecurityRes({ message: 'Please enter a valid answer.', status: false });
            }
        }
    };
    
    return (
        <>
        <Navigation/>
        <div>
            <div className="p-container">
                
                    <div className="p-form">

                        <div className="p-right-side">

                            
                            <div className="p-hello">
                                <h2>Profile</h2>
                                <h4>See your profile details</h4>
                            </div>
                            <br />
                            <br />
                            <form>
                                <div className="p-input_text">
                                    <input type="text" className="" value="Amandeep Singh" placeholder=""></input>
                                </div>
                                <div className="p-input_text">
                                    <input type="text" className="" value="amansingh78622@gmail.com" placeholder=""></input>
                                </div>

                                

                                <div className="p-btn">
                                    <button type="submit" onClick={submitForm}>Sign in</button>
                                </div>

                                <br />
                                {(!securityRes.status) ? <p style={{ color: "red" }}><i className="pa fa-warning"></i>{securityRes.message}</p> : null}
                            </form>
                        </div>
                    </div>
                
            </div>
        </div>
        </>
        
         
    );
  }
  
  export default Profile;
