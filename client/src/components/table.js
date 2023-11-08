import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

function Table() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const [numberToTrain, setNumberToTrain] = useState(1); // Default to 1 if not specified

  useEffect(() => {
    const query = location.state || {};
    setNumberToTrain(query.number || 1); // Set number to train from query

    if (query.weapon) {
      query.eventType = query.weapon + '.*';
    }

    const searchParams = new URLSearchParams(query).toString();

    const fetchData = async () => {
      const response = await fetch(`/table?${searchParams}`);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [location]);

  // This function groups the data by eventType
  const groupByEventType = (data) => {
    return data.reduce((acc, item) => {
      const { eventType } = item;
      acc[eventType] = acc[eventType] || [];
      acc[eventType].push(item);
      return acc;
    }, {});
  };

  // This function calculates the 'x People' row by multiplying each value with numberToTrain
  const calculateXPeopleRow = (detail) => {
    return Object.keys(detail).reduce((acc, key) => {
      acc[key] = key === 'ammoType' ? detail[key] : detail[key] * numberToTrain;
      return acc;
    }, {});
  };

  const groupedData = groupByEventType(data);


  return (
    <div className="container mt-5">
      <h2>Training Qualification Details</h2>
      <p><strong>Event Type:</strong> {location.state.event}</p>
      {location.state.weapon && <p><strong>Weapon Type:</strong> {location.state.weapon}</p>}
      {location.state.number && <p><strong>Number to Train:</strong> {location.state.number}</p>}

      {Object.keys(groupedData).map((eventType, index) => {
  const eventDataSet = groupedData[eventType];

  if (eventDataSet.length === 0 || !eventDataSet[0].data) {
    return null; // or some error component
  }

  // Headers should exclude 'ammoType' since it's handled separately
  const headers = Object.keys(eventDataSet[0].data).filter(header => header !== 'ammoType' && header !== 'Total');

  return (
    <div key={index}>
      <h3>{eventType}</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Ammo Type</th>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
            <th>Total</th> {/* Single Total column header */}
          </tr>
        </thead>
        <tbody>
          {eventDataSet.map((item, idx) => (
            <>
              <tr key={`per-person-${idx}`}>
                <td>Per Person</td>
                <td>{item.ammoType}</td>
                {headers.map(header => (
                  <td key={header}>{item.data[header]}</td>
                ))}
                <td>{item.data.Total}</td>
              </tr>
              <tr key={`x-people-${idx}`} className="table-info">
                <td>x{numberToTrain} People</td>
                <td>{item.ammoType}</td>
                {headers.map(header => (
                  <td key={header}>{item.data[header] * numberToTrain}</td>
                ))}
                <td>{item.data.Total * numberToTrain}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
        );
      })}
    </div>
  );
}

export default Table;
