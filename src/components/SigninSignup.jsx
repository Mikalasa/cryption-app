import React, { useState } from 'react'
import './SigninSignup.css'
import axios from "axios";
function SigninSignup(props) {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false)
    const handleSignUpClick = () => {
        setIsRightPanelActive(true)
    }

    const handleSignInClick = () => {
        setIsRightPanelActive(false)
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault()

        const formElements = e.target.elements;
        const username = formElements.namedItem("username").value;
        const firstName = formElements.namedItem("firstname").value;
        const lastName = formElements.namedItem("lastname").value;
        const password = formElements.namedItem("password").value;

        if (!username || !firstName || !lastName || !password) {
            alert('all input fields are required');
            return;
        }


        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username,
                firstName,
                lastName,
                password,
            })
            console.log(response.data)
            setIsRightPanelActive(false)
        } catch (error) {
            console.error('Registration failed', error)
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        const formElements = e.target.elements;
        const username = formElements.namedItem("username").value;
        const password = formElements.namedItem("password").value;

        try {
            const response = await axios.post('http://localhost:5000/signin', {
                username,
                password,
            });

            // login success，store JWT
            props.storeToken(response.data.token);
            console.log('User logged in successfully');
            // jump to user dashboard

        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="signupsingin-container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUpSubmit}>
                    <h1>Create Account</h1>
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="text" name="firstname" placeholder="First Name"/>
                    <input type="text" name="lastname" placeholder="Last Name"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleSignInSubmit}>
                    <h1>Sign in</h1>
                    <span>or fill 123456 blow for experience</span>
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome!</h1>
                        <p>Please login after your registration</p>
                        <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Create your account to start journey</p>
                        <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninSignup