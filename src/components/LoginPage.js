import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from "react-router-dom";
import client from './api/client';



function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });

  const handleRegisterChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
    console.log(registerFormData)
  };

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    console.log(loginFormData)
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {

      // Make API request to create user
      const response = await client.post("/register", {

        firstName: registerFormData.firstName,
        lastName: registerFormData.lastName,
        username: registerFormData.username,
        password: registerFormData.password,
        role: 'USER'
      });

      // Handle successful signup
      console.log('User signed up successfully:', response.data.token);
      if (response.data.token !== '') {
        localStorage.setItem('uid', JSON.stringify(response.data.userId));
        localStorage.setItem('userName', JSON.stringify(response.data.userName));
        localStorage.setItem('token', JSON.stringify(response.data.token));
        navigate("/projects")
      } else {
        alert('Error in signing up');
      }

      // Optionally redirect the user to another page
    } catch (error) {
      // Handle signup failure
      console.error('Error signing up:', error);
      // Optionally display an error message to the user
    }




  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request to create user
      const response = await client.post("/login", {

        username: loginFormData.username,
        password: loginFormData.password
      });

      // Handle successful signup
      console.log('User signed up successfully:', response.data.token);
      if (response.data.token !== '') {
        localStorage.setItem('uid', JSON.stringify(response.data.userId));
        localStorage.setItem('userName', JSON.stringify(response.data.userName));
        localStorage.setItem('token', JSON.stringify(response.data.token));
        navigate("/projects")
      } else {
        alert('Error in signing up');
      }

    } catch (error) {
      console.error('Error signing up:', error);

    }

  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className='top-container'><div className={`login-container ${isSignUp ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-up-container">
        <form onSubmit={handleRegisterSubmit}>
          <h1 style={{ color: '#446ce4' }}>Create Account</h1>
          <span>Kindly use your email for registration</span>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={registerFormData.firstName}
            onChange={handleRegisterChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={registerFormData.lastName}
            onChange={handleRegisterChange}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={registerFormData.username}
            onChange={handleRegisterChange}
          />
          <input
            type="password"
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must Contain 8 characters with caps , small letters and number"
            name="password"
            value={registerFormData.password}
            onChange={handleRegisterChange}
          />
          <button className="buttonClass" type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleLoginSubmit}>
          <h1 style={{ color: '#446ce4' }}>Sign in</h1>
          <span>using your account</span>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={loginFormData.username}
            onChange={handleLoginChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginFormData.password}
            onChange={handleLoginChange}
          />
          <button type="submit" style={{ marginTop: "10px" }}>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={() => { setIsSignUp(false) }}>Sign In</button>
            <a href="/">
              <p style={{ color: 'white' }}>Return to Home Page</p>
            </a>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
            <a href="/">
              <p style={{ color: 'white' }}>Return to Home Page</p>
            </a>
          </div>
        </div>
      </div>
    </div></div>




  );
};

export default LoginPage;