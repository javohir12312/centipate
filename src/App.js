import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './components/index';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import Home from './components/Matrix';
import ProtectedRoute from './protect/protected';
import Ctf from './components/Ctf/Ctf';
import MainComponent from './components/index';

export const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      
      <Route 
        path='/home'
        element={
          <ProtectedRoute>
            <MainComponent />
          </ProtectedRoute>
        } 
      />
      <Route 
        path='/home/ctf' 
        element={
          <ProtectedRoute>
            <Ctf />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default App;
