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


  //Access to the eventsCollection
   const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/events'); // Assuming your Express server has an endpoint for fetching events
        const data = await response.json();
        setEventsData(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

  
  
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
        {eventsData.map((event, index) => (
        <div key={index} className="card event-card">
          <div className="card-body">
            <h5 className="card-title">{event.eventName}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary" >
              {event.StartDate}
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
        ))}
      </div>
    );
  }
  