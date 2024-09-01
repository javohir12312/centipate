import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserData } from '../../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://192.168.0.59:5000/api/login', {
        method: 'POST',
        headers: {
          "access-control-allow-origin" : "*",
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set('userData', JSON.stringify({ id: data.user.id, email: data.user.email, name: data.user.name }), { expires: 7 }); // Expires in 7 days
        setSuccess(data.message);
        setError('');

        navigate('/home');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <section>
      {[...Array(1200)].map((_, index) => (
        <span key={index}></span>
      ))}
      
      <div className="signin">
        <div className="content">
          <h2>Sign In</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <i>Password</i>
            </div>
            {error && <p className="error" style={{ color: "red" }}>{error}</p>}
            {success && <p className="success" style={{ color: "green" }}>{success}</p>}
            <div className="links">
              <a href="/register">Signup</a>
            </div>
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
