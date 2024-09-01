import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
        const navigate = useNavigate();
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [number, setNumber] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');
      
        const handlePasswordChange = (e) => {
          const value = e.target.value;
          setPassword(value);
          if (value === confirmPassword) {
            setError('');
          } else {
            setError('Check Your Passwords');
          }
        };
      
        const handleConfirmPasswordChange = (e) => {
          const value = e.target.value;
          setConfirmPassword(value);
          if (value === password) {
            setError('');
          } else {
            setError('Passwords do not match!');
          }
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
          }
      
          try {
            const response = await fetch('http://localhost:5000/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password, name: username, number }),
            });
      
            const data = await response.json();
            if (response.ok) {
              setSuccess('User registered successfully!');
              navigate("/Login")
              setError('');
              setUsername('');
              setEmail('');
              setNumber('');
              setPassword('');
              setConfirmPassword('');
            } else {
              setError(data.message || 'Failed to register user.');
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
          <h2>Sign Up</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <i>Username</i>
            </div>
            <div className="inputBox">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <i>Gmail</i>
            </div>
            <div className="inputBox">
              <input 
                type="text" 
                value={number} 
                onChange={(e) => setNumber(e.target.value)} 
                required 
              />
              <i>Phone number</i>
            </div>
            <div className="inputBox">
              <input 
                type="password" 
                value={password} 
                onChange={handlePasswordChange} 
                required 
              />
              <i>Password</i>
            </div>
            <div className="inputBox">
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={handleConfirmPasswordChange} 
                required 
              />
              <i>Confirm Password</i>
            </div>
            {error && <p className="error" style={{ color: "red" }}>{error}</p>}
            {success && <p className="success" style={{ color: "green" }}>{success}</p>}
            <div className="links">
              <a href="/login">Login</a>
            </div>
            <div className="inputBox">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
