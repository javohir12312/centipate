import React, { useEffect } from 'react';
import { getUserData } from './utils/auth';
import { useNavigate } from 'react-router-dom';

const Checker = () => {  // Renamed to 'Checker'
    const user = getUserData(); 
    const navigate = useNavigate();
    console.log(user); 
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
            method: 'GET'
          });
  
          if (response.status === 200) {
            navigate("/");
          } else {
            navigate("/login");
          }
        } catch (error) {
          alert(error);
        }
      };
  
      if (user && user.id) {
        getData();
      } else {
        navigate("/login");
      }
    }, [user, navigate]);  // Added dependencies to useEffect
  
    return (
      <div>Checker</div>
    );
}

export default Checker;
