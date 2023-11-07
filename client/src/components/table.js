import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

function Table() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Extract state from location if available
    const query = location.state ? location.state : {};
    
    // Construct the search params string from query object
    const searchParams = new URLSearchParams(query).toString();

    // Fetch the data from the server
    const fetchData = async () => {
      const response = await fetch(`/table?${searchParams}`);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [location]);

  return (
    <div className="container mt-5">
      <h2>Training Qualification Details</h2>
      
      <br/>

      <p><strong>Event Type:</strong> {location.state.event}</p>

      <p><strong>Weapon Type:</strong> {location.state.weapon}</p>

      <p><strong>Number to Train:</strong> {location.state.number}</p>


      <table className="table">
        <thead>
          <tr>
            <th>Event Type</th>
            <th>Ammo Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.eventType}</td>
              <td>{item.ammoType}</td>
              <td>{JSON.stringify(item.data)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
