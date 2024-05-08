import React,{useState} from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from "react-router-dom";
import client from './api/client';



function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (event) => {
        event.preventDefault();
    
        
    
        
        try {
          // Make API request to create user
          const response = await client.post("/login", {

            username:userName,
            password:password,
        });
    
          // Handle successful signup
          console.log('User signed in successfully:', response.data.token);
          if(response.data.token !== ''){
            localStorage.setItem('uid',JSON.stringify(response.data.userId));
            localStorage.setItem('userName',JSON.stringify(response.data.userName));
            localStorage.setItem('token',JSON.stringify(response.data.token));
            navigate("/projects")
          }else{
            alert('Error in logging');
          }
    
        } catch (error) {
          console.error('Error signing up:', error);
        }
      };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input className='login-input' type="text" placeholder="Username" required value={userName} 
          onChange={(e) => setUserName(e.target.value)}/>
        <input className='login-input' type="password" placeholder="Password" required value={password} 
          onChange={(e) => setPassword(e.target.value)} />
        <button className='login-button' type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;