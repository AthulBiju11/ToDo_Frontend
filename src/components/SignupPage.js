import React, { useState } from 'react';
import '../styles/SignupPage.css';
import client from './api/client';
import { useNavigate } from "react-router-dom";

function SignupPage() {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();
    
        // Validate password match
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
    
        
    
        try {
            console.log(firstName);
          // Make API request to create user
          const response = await client.post("/register", {
          
            firstName:firstName,
            lastName:lastName,
            username:userName,
            password:password,
            role:'USER'
        });
    
          // Handle successful signup
          console.log('User signed up successfully:', response.data.token);
          if(response.data.token !== ''){
            localStorage.setItem('uid',JSON.stringify(response.data.userId));
            localStorage.setItem('userName',JSON.stringify(response.data.userName));
            localStorage.setItem('token',JSON.stringify(response.data.token));
            navigate("/projects")
          }else{
            alert('Error in signing up');
          }
    
          // Optionally redirect the user to another page
        } catch (error) {
          // Handle signup failure
          console.error('Error signing up:', error);
          // Optionally display an error message to the user
        }
      };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <input type="text" placeholder="First Name" required value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" required value={lastName} 
          onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="User Name" required value={userName} 
          onChange={(e) => setUserName(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} 
          onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirm Password" required value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
