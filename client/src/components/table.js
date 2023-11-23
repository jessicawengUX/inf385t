import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import ProgressBar from "./progressbar-table";

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


function Table() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [numberToTrain, setNumberToTrain] = useState(1); // Default to 1 if not specified

  useEffect(() => {
    const query = location.state || {};
    setNumberToTrain(query.number || 1); // Set number to train from query

    if (query.weapon) {
      query.eventType = query.weapon + '.*';
    }

    /*const searchParams = new URLSearchParams(query).toString();*/

    const fetchData = async () => {
      const searchParams = new URLSearchParams(query).toString();
      const response = await fetch(`/api/tableData?${searchParams}`);
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

  // This function calculates the values for the last table (Total Ammo Required)
  const calculateAmmoTotals = (groupedData) => {
    const totals = {};
  
    Object.values(groupedData).forEach(eventDataSet => {
      eventDataSet.forEach(item => {
        const ammoType = item.ammoType;
        const totalQuantity = item.data['Total'] * numberToTrain;
  
        if (!totals[ammoType]) {
          totals[ammoType] = 0;
        }
        
        totals[ammoType] += totalQuantity;
      });
    });
  
    return totals;
  };
  
  const ammoTotals = calculateAmmoTotals(groupedData);
  
  // This function handles the download PDF button
  const handleDownloadPdf = () => {
    // Target the specific container holding the tables
    const content = document.getElementById('tables-container'); 
  
    html2canvas(content, {
      scale: 3, // You can adjust the scale for better quality
      useCORS: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
  
      // Calculate the PDF page size based on the canvas size
      const pdfWidth = canvas.width;
      const pdfHeight = canvas.height;
  
      // Create a PDF with calculated dimensions
      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [pdfWidth, pdfHeight]
      });
  
      pdf.addImage(imgData, 'PNG', 25, 0, pdfWidth-50, pdfHeight);
      pdf.save('tables-screenshot.pdf');
    });
  };
  
  const handleSaveData = () => {
    // Assuming location.state contains the necessary details
    navigate('/saveEvent', { 
      state: { 
        tableData: data, 
        numberToTrain: location.state.number, 
        eventType: location.state.event, 
        weaponType: location.state.weapon 
      } 
    });
  };
  

  return (
    <div className="container mt-main">
      <ProgressBar />
      <div className="mb-5">
        <h4><strong>Your Table of Results: </strong></h4>
      </div>
    <div id="tables-container">
      <h2>Training Qualification Details</h2>
      <br/>
      {location.state.event && <p><strong>Event Type:</strong> {location.state.event}</p>}
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
      <br/>
      <h3>{eventType}</h3>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Ammo Type</th>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
            <th>Total</th> 
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
    <div className="mt-4">
      <br/>
      <h3>Total Ammo Required</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Ammo Type</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(ammoTotals).map(ammoType => (
            <tr key={ammoType}>
              <td>{ammoType}</td>
              <td>{ammoTotals[ammoType]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <br/>
  </div>
  <div className="button-container">
    <button className="btn btn-submit" onClick={handleDownloadPdf}>Download as PDF</button>
    <button className="btn btn-submit" onClick={handleSaveData}>Save Event</button>
  </div>
    <br/>
    <br/>
  </div>
  );
}

export default Table;
