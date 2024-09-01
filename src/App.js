import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './components/index';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import Home from './components/Matrix';
import ProtectedRoute from './protect/protected';
import Ctf from './components/Ctf/Ctf';
import MainComponent from './components/index';
import Rate from './components/Rate/Rate';
import Notfound from "./components/notfound"
import Players from './components/Players/Players';

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <MainComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/ctf"
        element={
          <ProtectedRoute>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <Ctf />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/Rating"
        element={
          <ProtectedRoute>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <Rate />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/Rating"
        element={
          <ProtectedRoute>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <Rate />
            </div>
          </ProtectedRoute>
        }
      />
      <Route 
        path='/*' 
        element={
          <ProtectedRoute>
            <div style={{maxWidth:"1200px", margin:"0 auto"}}>
            <Notfound/>
            </div>
          </ProtectedRoute>
        } 
      />

<Route 
        path='/Players' 
        element={
          <ProtectedRoute>
            <div style={{maxWidth:"1200px", margin:"0 auto"}}>
            <Players/>
            </div>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default App;
