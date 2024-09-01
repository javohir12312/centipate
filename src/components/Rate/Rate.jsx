import React, { useEffect, useState } from 'react';
import axios from '../../server/index';
import { Link } from 'react-router-dom';

const Rate = () => {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get('/user/stats'); 
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setError('Failed to fetch ratings.'); 
      }
    };

    fetchRatings();
  }, []);

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

      <div>
        <h1>User Ratings</h1>
        {error && <p>{error}</p>}
        {ratings.length > 0 ? (
          <ul style={{ width: "80%", margin: "0 auto", marginTop: '50px', listStyle: "none",display:'flex',flexDirection:'column',gap:"10px" }}>
            {ratings.map((user) => (
              <li style={{ width: "100%" }} key={user.rank}>
                <strong>{user.name}</strong> - Rating: {user.rating}
                {user.lastSubmissionTime ? (
                  <span>Last Submission Time: {new Date(user.lastSubmissionTime).toLocaleString()}</span>
                ) : (
                  <span>No submissions</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ratings available.</p>
        )}
      </div>
    </>
  );
};

export default Rate;
