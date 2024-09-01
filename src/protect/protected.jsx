import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserData } from '../utils/auth';
import axios from '../server/index'; 

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);
  
  const user = getUserData();

  useEffect(() => {
    const checkUserExists = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(`/users/${user.id}`); 
          if (response.status !== 200) {
            setIsUserValid(false);
          }
        } catch (error) {
          setIsUserValid(false);
        }
      } else {
        setIsUserValid(false);
      }
      setIsLoading(false);
    };

    checkUserExists();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!isUserValid) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
