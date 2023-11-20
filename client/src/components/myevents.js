import React, { useState,useEffect, Fragment} from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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

  //rendertable
  const renderTableData = (tableData) => {
    return tableData.map((tableRow, index) => {
      if (index===0){
      const { eventType, ammoType, data } = tableRow;
      const { TIV, TV, TVI, Total} = data;
      return (
      <div key={index}>
        <h3>{eventType}</h3>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>AmmoType</th>
              <th>TIV</th>
              <th>TV</th>
              <th>TVI</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Per Person</td>
              <td>{ammoType}</td>
              <td>{TIV}</td>
              <td>{TV}</td>
              <td>{TVI}</td>
              <td>{Total}</td>
            </tr>
            <tr className="table-info">
              <td>X? People</td>
              <td>{ammoType}</td>
              <td>{TIV}</td>
              <td>{TV}</td>
              <td>{TVI}</td>
              <td>{Total}</td>
            </tr>
          </tbody>
        </table>
        </div>
        );
        } else { 
          const { eventType, ammoType, data } = tableRow;
          const { Day_CBRN, Night, Night_CBRN, Total } = data;
          return(
            <div key={index}>
              <h3>{eventType}</h3>
              <br/>
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>AmmoType</th>
                    <th>Day CBRN</th>
                    <th>Night</th>
                    <th>Night CBRN</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Per Person</td>
                    <td>{ammoType}</td>
                    <td>{Day_CBRN}</td>
                    <td>{Night}</td>
                    <td>{Night_CBRN}</td>
                    <td>{Total}</td>
                  </tr>
                  <tr className="table-info">
                    <td>X? People</td>
                    <td>{ammoType}</td>
                    <td>{Day_CBRN*2}</td>
                    <td>{Night}</td>
                    <td>{Night_CBRN}</td>
                    <td>{Total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
      )
    }
    });
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
            <h5 className="card-title">{event.eventName}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Time: {event.startDate} to {event.endDate} <br/>
              Location: {event.location}<br/>
              Additional Info: {event.additionalInfo}
            </h6>
            <p className="card-text">
              Event Type:  , Weapon Type:  , Number to Train: 
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
                  <p> Event Type:</p>
                  <p> Weapon Type:</p>
                  <p> Number to Train:</p>
                  <br/>
                    {renderTableData(event.tableData)}
                </div>
              </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
  