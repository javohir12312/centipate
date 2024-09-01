import React, { useState, useEffect } from 'react';
import axios from '../../server/index';
import { Link } from 'react-router-dom';
import { getUserData } from '../../utils/auth';

const CTFPage = () => {
  const [userID, setUserID] = useState('');
  const [descriptions, setDescriptions] = useState([]);
  const [flags, setFlags] = useState({});
  const [hints, setHints] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for button status
  const user = getUserData();

  useEffect(() => {
    if (user && user.id) {
      setUserID(user.id);
    }
  }, [user]);

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const response = await axios.get('/descriptions');
        setDescriptions(response.data);
      } catch (error) {
        console.error("Error fetching descriptions:", error);
      }
    };

    const fetchHints = async () => {
      try {
        const response = await axios.get('/hints');
        setHints(response.data);
      } catch (error) {
        console.error("Error fetching hints:", error);
      }
    };

    fetchHints();
    fetchDescriptions();
  }, []);

  const handleFlagSubmit = async (flag, desID) => {
    setIsSubmitting(true); // Disable the button
    try {
      const response = await axios.post('/check', {
        flag,
        desID,
        userID 
      });

      if (response.data.valid) {
        alert('Flag submitted successfully!');
      } else {
        alert(response.data.message || 'Incorrect flag');
      }
    } catch (error) {
      console.error("Error submitting flag:", error);
      alert('Error submitting flag');
    } finally {
      setIsSubmitting(false); // Re-enable the button after response
    }
  };

  const handleInputChange = (desID, value) => {
    setFlags((prevFlags) => ({
      ...prevFlags,
      [desID]: value,
    }));
  };

  return (
    <>
      <header style={{ textAlign: "center", display: 'flex', alignItems: "end", justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ display: "flex", alignItems: "center", fontSize: "35px" }}>
            centi<p style={{ color: "red", fontSize: "40px" }}>CTF</p>
          </h2>
        </div>

        <nav style={{ width: '250px' }}>
          <ul style={{ listStyle: "none", fontFamily: 'SDGlitchDemo', fontSize: '20px', display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
            <li><Link to={"/Rating"} className='list_ul'>{"<"}Rating{">"}</Link></li>
            <li><Link to={"/Players"} className='list_ul'>{"<"}Players{">"}</Link></li>
          </ul>
        </nav>
      </header>

      <div style={{ margin: "0 auto", marginTop: "50px", width: "700px" }}>
        <ul style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
          {descriptions.map((item) => (
            <li key={item._id} style={{ listStyle: "none", width: "100%" }}>
              <div>
                {item.content}
                <br />
                <br />
                {hints.filter(hint => hint.desID === item._id).map(hint => (
                  <p key={hint._id}>HINT: {hint.content}</p>
                ))}
                <br />
              </div>
              <div>
                <input
                  id={item._id}
                  style={{ width: "70%", background: "#FAF8F1", border: "none", padding: "5px", borderRadius: "2px", color: "black" }}
                  type="text"
                  placeholder='Enter your flag'
                  value={flags[item._id] || ''}
                  onChange={(e) => handleInputChange(item._id, e.target.value)}
                />
                <button
                  style={{ width: "80px", color: "black", padding: "5px", border: "none", marginLeft: "10px", borderRadius: "8px", background: "black", color: "white", cursor: "pointer" }}
                  onClick={() => handleFlagSubmit(flags[item._id], item._id)}
                  disabled={isSubmitting} // Disable button when submitting
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CTFPage;
