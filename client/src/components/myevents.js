import React, { useState,useEffect} from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

//import icons in react (BiCaretUp)
import { BiDownload, BiTrash, BiCaretDown, BiEdit, BiCalendar, BiTargetLock, BiNote, BiCalendarEvent} from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

function transformData(data, number_to_train) {
  let result = {};

  data.forEach(item => {
      if (!result[item.eventType]) {
          result[item.eventType] = {
              "_id": item._id,
              "eventType": item.eventType,
              "table": []
          };
      }

      result[item.eventType].table.push({
          "per person": "Per Person",
          "Ammo Type": item.ammoType,
          ...item.data
      });

      let multipliedData = {};
      for (let key in item.data) {
          multipliedData[key] = item.data[key] * number_to_train;
      }

      result[item.eventType].table.push({
          "People": `x${number_to_train} People`,
          "Ammo Type": item.ammoType,
          ...multipliedData
      });
  });

  return Object.values(result);
}

export default function Myevents() {
  //Collapsible Content
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const toggleCollapsible = () => {
    setCollapsibleOpen(!collapsibleOpen);
  };


  const userId = localStorage.getItem('userId');

  //Access to the eventsCollection
  const [eventsData, setEventsData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`/myevents?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setEventsData(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

    fetchData();
  }, [userId]); 

  //rendertable
  const renderTableData = (event) => {

    const number_to_train = event.numberToTrain
    const tableData = event.tableData;
    const trasformedData = transformData(tableData, number_to_train);
    console.log(trasformedData);

    return (
      <>
        {Object.values(trasformedData).map((item, index) => (
          <div key={index} className="mt-4">
          <h3>{item.eventType}</h3>
          <table className="table">
            <thead>
              <tr>
                {Object.keys(item.table[0]).map((key, i) => (
                  <th key={i}>{i === 0 ? (
                    // the first key
                    <span></span>
                  ) : (
                    // For the rest of the th
                    key
                  )}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(item.table).map((row ,rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? '' : 'table-info'}>
                {Object.values(row).map((value, j) => (
                <td key={j}>{value}</td>
                ))}
              </tr>
              ))}
            </tbody>
          </table>
          </div>
        ))}

        <div className="mt-4">
          <h3>Total Ammo Required</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Ammo Type</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </>
    );

  };
 

  //delete event card
  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`/myevents/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        // Remove the deleted event from the local state
        setEventsData((prevData) => prevData.filter((event) => event._id !== _id));
        console.log(result.message);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  
  // This function handles the download PDF button
  const handleDownloadPdf = () => {
    // Target the specific container holding the tables
    const content = document.getElementById('tables-container'); 
  
    html2canvas(content, {
      scale: 3, // You can adjust the scale for better quality
      useCORS: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
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


  const spacing = '0.5';

    return (
      <div className="container mt-main">
        <h3 className="mb-4">My Events</h3>

        {eventsData.map((event) => (
        <div key={event._id} className="card event-card mt-5">
          <div className="card-body">
            <h5 className="card-title mb-3">{event.eventName}</h5>
            <h6 className="card-subtitle mb-2">
              <BiCalendar size={24} style={{marginRight:spacing+'rem'}} /> {event.startDate} to {event.endDate}</h6>
            <h6 className="card-subtitle mb-2">
              <BiTargetLock size={24} style={{marginRight:spacing+'rem'}} /> {event.location}</h6>
            <h6 className="card-subtitle mb-2">
              <BiNote size={24} style={{marginRight:spacing+'rem'}} /> {event.additionalInfo}</h6>
            <p className="card-text p-color mb-3">
              <BiCalendarEvent size={24} style={{marginRight:spacing+'rem'}} /> Event Type: <strong>{event.eventType}</strong>, Weapon Type: <strong>{event.numberToTrain}</strong>, Number to Train: <strong>{event.numberToTrain}</strong>
            </p>


            <p className="gap-1">
              <div className='d-flex justify-content-between'>
                <div className="flex-row">
                  <button className="btn btn-event" onClick={toggleCollapsible}>
                    <BiCaretDown size={24} style={{marginRight:spacing+'rem'}} />
                    View Table
                  </button>
                  <button className="btn btn-event" onClick={handleDownloadPdf}>
                   <BiDownload size={24} style={{marginRight:spacing+'rem'}} />
                   Download as PDF
                  </button>
                </div>
                <div className="flex-row-reverse">
                  <button className="btn btn-edit">
                    <BiEdit size={24} style={{marginRight:spacing+'rem'}} />
                   Edit
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(event._id)}>
                    <BiTrash size={24} style={{marginRight:spacing+'rem'}} />
                    Delete
                  </button>
                </div>
              </div>
              </p>
              <div className={`collapse ${collapsibleOpen ? 'show' : ''}`}>
                <div className="card card-body">
                  <h2>Training Qualification Details</h2>
                  <br/>
                  <p><strong>Event Type:</strong> {event.eventType}</p>
                  <p><strong>Weapon Type:</strong> {event.numberToTrain}</p>
                  <p><strong>Number to Train:</strong> {event.numberToTrain}</p>
                  <br/>
                    {renderTableData(event)}
                </div>
              </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
  