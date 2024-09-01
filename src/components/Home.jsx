import React, { useEffect, useState } from 'react';
import { getUserData } from '../utils/auth';
import {Link, useNavigate } from 'react-router-dom';
import axios from '../server/index';
import "./home.css"


const SomeComponent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedUser = getUserData();
    if (!fetchedUser) {
      navigate('/login');
    } else {
      setUser(fetchedUser);
    }
  }, [navigate]);

  function Play(){
    navigate("/home/ctf")
  }

  return (
    <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "10px", position: "relative", zIndex: 1 }}>
      {user ? (
        <>
          <header style={{ textAlign: "center" ,display:'flex', alignItems:"end", justifyContent:'space-between'}}>
            <div>
                <h2 style={{ display: "flex", alignItems: "center", fontSize:"35px" }}>
                    centi<p style={{ color: "red",fontSize:"40px" }}>CTF</p>
                </h2>
            </div>

            <nav style={{width:'250px'}}>
                <ul style={{listStyle:"none",fontFamily:'SDGlitchDemo',fontSize:'20px', display:'flex', alignItems:"center", justifyContent:'space-between'}}>
                    <li ><Link to={"/Rating"} className='list_ul'>{"<"}Rating{">"}</Link> </li>
                    <li ><Link to={"/Players"} className='list_ul'>{"<"}Players{">"}</Link></li>
                </ul>
            </nav>
          </header>
          <div >

          <div style={{display:"flex", flexDirection:"column",justifyContent:"space-around",alignItems:'center'}}>
            <div style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ fontFamily: 'SDGlitchDemo', fontSize: '46px',display:"flex",alignItems:"baseline" }}>Welcome back, <p style={{color:"red", margin:0,padding:0,fontFamily: 'SDGlitchDemo'}}>{user.name}</p>!</h1>
            </div>
            <button onClick={() => Play()} className='play_button'>Play</button>

          </div>

          </div>

        </>
      ) : (
        <div style={{ textAlign: "center", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h1>Please log in.</h1>
        </div>
      )}
    </div>
  );
};

export default SomeComponent;
