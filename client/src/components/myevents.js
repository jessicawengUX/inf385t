import React, { useState } from "react";
//import { Route, Routes } from "react-router-dom";

//import icons in react (BiTargetLock, BiCalendar, BiCaretUp)
import { BiDownload, BiTrash, BiCaretDown, BiEdit} from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

export default function Myevents() {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const toggleCollapsible = () => {
    setCollapsibleOpen(!collapsibleOpen);
  };


  const spacing = '0.5';

    return (
      <div className="container mt-main">
        <h3 className="mb-4">My Events</h3>
        <div className="card event-card">
          <div className="card-body">
            <h5 className="card-title">Event 1</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Date Range and Location</h6>
            <p className="card-text">Training type, weapon and number to teain</p>

            <p className="gap-1">
              <div className='d-flex justify-content-between'>
                <div className="flex-row">
                  <button className="btn btn-event" onClick={toggleCollapsible}>
                  <BiCaretDown size={24} style={{marginRight:spacing+'rem'}} />
                  View Table
                  </button>
                  <button className="btn btn-event">
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
                  The table image
                </div>
              </div>
              </div>
            </div>

      </div>
    );
  }
  