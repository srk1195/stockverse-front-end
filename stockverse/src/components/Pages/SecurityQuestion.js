import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../Css/Form.css"

function SecurityQuestion() {

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

        <div>
            <div className="f-container">
                <div className="f-card">
                    <div className="f-form">

                        <div className="f-right-side">

                            <br />
                            <div className="f-hello">
                                <h2>Change Password</h2>
                                <h4>Please answer the security question to change your password</h4>
                            </div>
                            <br />
                            <br />
                            <form>
                                <div className="f-input_text">
                                    <input type="text" className="" value="Where were you born?" placeholder=""></input>
                                </div>
                                <div className="f-input_text">
                                    <input type="text" className={` ${warnAnswer ? "f-warning" : ""}`} name="answer" placeholder="Enter the answer for the question" value={formData.answer} onChange={inputEvent} />
                                    {warnAnswer ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{msgAnswer}</p> : null}
                                </div>

                                <div className="f-btn">
                                    <button type="submit" onClick={submitForm}>Sign in</button>
                                </div>

                                <br />
                                {(!securityRes.status) ? <p style={{ color: "red" }}><i className="fa fa-warning"></i>{securityRes.message}</p> : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecurityQuestion;