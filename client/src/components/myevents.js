import React, { useState,useEffect } from 'react';
import html2canvas from 'html2canvas';
//import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver'; 

//import icons in react (BiTargetLock, BiCalendar, BiCaretUp)
import { BiDownload, BiTrash, BiCaretDown, BiEdit} from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

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

  const firstEvent = eventsData[0] || {}; // Use an empty object as a fallback
  const eventName = firstEvent?.eventName || '';
  const startDate = firstEvent?.startDate || '';
  const endDate = firstEvent?.endDate || '';
  const location = firstEvent?.location || '';
  const additionalInfo = firstEvent?.additionalInfo || '';
  
  
  //Download JPG
  const handleDownloadJpg = () => {
    const content = document.getElementById('tables-container');
  
    html2canvas(content, {
      scale: 3, // You can adjust the scale for better quality
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      saveAs(imgData, 'tables-screenshot.jpg');
    });
  };


  const spacing = '0.5';

    return (
      <div className="container mt-main">
        <h3 className="mb-4">My Events</h3>
        <div className="card event-card">
          <div className="card-body">
            <h5 className="card-title">{eventName}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Time: {startDate} to {endDate} <br/>
              Location: {location}<br/>
              Additional Info: {additionalInfo}
            </h6>
            <p className="card-text">Training type, weapon and number to teain</p>

            <p className="gap-1">
              <div className='d-flex justify-content-between'>
                <div className="flex-row">
                  <button className="btn btn-event" onClick={toggleCollapsible}>
                    <BiCaretDown size={24} style={{marginRight:spacing+'rem'}} />
                    View Table
                  </button>
                  <button className="btn btn-event" onClick={handleDownloadJpg}>
                   <BiDownload size={24} style={{marginRight:spacing+'rem'}} />
                   Download IMG
                  </button>
                </div>
                <div className="flex-row-reverse">
                  <button className="btn btn-edit">
                    <BiEdit size={24} style={{marginRight:spacing+'rem'}} />
                   Edit
                  </button>
                  <button className="btn btn-delete">
                    <BiTrash size={24} style={{marginRight:spacing+'rem'}} />
                    Delete
                  </button>
                </div>
              </div>
              </p>
              <div className={`collapse ${collapsibleOpen ? 'show' : ''}`}>
                <div className="card card-body">
                  <h4>Ammo Table</h4>
                  
                </div>
              </div>
              </div>
            </div>
      </div>
    );
  }
  