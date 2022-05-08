import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faEye, faEyeDropper, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import "../styles/sign.css";
import Header from "./Header";

export default function SignUp({id}) {

    const containerRef = useRef();
    const history = useHistory();

    const [signUsername, setSignUsername] = useState("");
    const [signEmail, setSignEmail] = useState("");
    const [signPassword, setSignPassword] = useState("");
    const [signRePassword, setSignRePassword] = useState("");

    const [logEmail, setLogEmail] = useState("");
    const [logPassword, setLogPassword] = useState("");

    const [logSeePassword, setLogSeePassword] = useState(false);
    const [signSeePassword, setSignSeePassword] = useState(false);

    const [error, setError] = useState(null);

    const signIn = async e => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: logEmail,
                password: logPassword
            })
        };

        const req = await fetch(`http://localhost:8000/login-user`, options);
        const data = await req.json();
        if (await data.error) {
            setError(data.error);
            e.preventDefault();
            return;
        }

        localStorage.setItem("email", JSON.stringify(await data.email));
        localStorage.setItem("username", JSON.stringify(await data.username));
        localStorage.setItem("friends", await data.friends);
        localStorage.setItem("points", await data.points ? JSON.stringify(data.points) : JSON.stringify(0));
        localStorage.setItem("id", JSON.stringify(await data.id));
        
        history.goBack();
        
    };

    const signUp = async e => {
        if (signRePassword !== signPassword) {
            setError("Passwords don't match");
            e.preventDefault();
            return;
        }
        console.log(signEmail, signPassword, signUsername);
        const options = {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: signEmail,
                password: signPassword,
                username: signUsername,
                socketId: id
            })
        };

        const req = await fetch('http://localhost:8000/create-account', options);
        const data = await req.json();
        if (await data.error) {
            setError(data.error);
            return;
        }

        localStorage.setItem("email", JSON.stringify(signEmail));
        localStorage.setItem("username", JSON.stringify(signUsername));
        localStorage.setItem("friends", JSON.strinify([]));
        localStorage.setItem("points", JSON.strinfiy(0));
        localStorage.setItem("id", JSON.stringify(await data.id));
        
        //window.location.href = "/";
        //history.push("/");
    };
    
    return (
        <div className="container">
        <Header />
        <div className="sign-container" ref={containerRef}>
            
            <div className="forms-container">
                <div className="signin-signup">
                <div className="form sign-in-form">
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <FontAwesomeIcon
                            icon={faUser}
                        />
                        <input 
                            type="text" 
                            placeholder="Email"
                            value={logEmail}
                            onChange={e => setLogEmail(e.target.value)} 
                        />
                    </div>
                    <div className="input-field">
                        <FontAwesomeIcon 
                            icon={faLock}
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={logPassword}
                            onChange={e => setLogPassword(e.target.value)}
                        />

                        <div className="eye-password">
                            <FontAwesomeIcon
                                icon={logSeePassword ? faEyeSlash : faEye}
                            />
                        </div>
                    </div>
                    <input 
                        type="text" 
                        value="Login" 
                        onClick={async e => await signIn(e)}
                        className="btn solid" 
                    />
                </div>
                <div className="form sign-up-form">
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                        <FontAwesomeIcon
                            icon={faUser}
                        />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={signUsername}
                            onChange={e => setSignUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <FontAwesomeIcon
                            icon={faEnvelope}
                        />
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={signEmail}
                            onChange={e => setSignEmail(e.target.value)} 
                        />
                    </div>
                    <div className="input-field">
                        <FontAwesomeIcon 
                            icon={faLock}
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={signPassword}
                            onChange={e => setSignPassword(e.target.value)}
                        />
                    </div>

                    <div className="input-field">
                        <FontAwesomeIcon 
                            icon={faLock}
                        />
                        <input 
                            type="password" 
                            placeholder="Repeat password" 
                            value={signRePassword}
                            onChange={e => setSignRePassword(e.target.value)}
                        />
                    </div>

                    <button 
                        
                        className="btn" 
                        onClick={async e => await signUp(e)}
                    >Sign Up</button>
                </div>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                <div className="sign-content">
                    <h3>New here ?</h3>
                    <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                    ex ratione. Aliquid!
                    </p>
                    <button className="btn transparent" id="sign-up-btn" onClick={() => containerRef.current.classList.add("sign-up-mode")}>
                    Sign up
                    </button>
                </div>
                <img src="img/log.svg" className="image" alt="" />
                </div>
                <div className="panel right-panel">
                <div className="sign-content">
                    <h3>One of us ?</h3>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                    laboriosam ad deleniti.
                    </p>
                    <button className="btn transparent" id="sign-in-btn" onClick={() => containerRef.current.classList.remove("sign-up-mode")}>
                    Sign in
                    </button>
                </div>
                <img src="img/register.svg" className="image" alt="" />
                </div>
            </div>
        </div>
        </div>
    );
};