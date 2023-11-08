import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

function Table() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const query = location.state || {};
  
    if (query.weapon) {
      // If the user selected "M4", you want to filter for M4 events
      query.eventType = query.weapon + '.*'; // This will create a regex pattern to match all events starting with "M4"
    }
  
    const searchParams = new URLSearchParams(query).toString();
  
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
