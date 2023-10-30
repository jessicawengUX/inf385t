import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function Form() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  const weaponTypes = {
    individual: ["M4", "M249", "M17"],
    groundCrew: ["M240", "M2", "MK19"],
    vehicleCrew: ["M240", "M2", "MK19"],
    collective: ["TypeA", "TypeB", "TypeC"]
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowDetails(true);
  };

  return (
    <div className="container text-center mt-5">

      <br/>

      <div className="progress-line">
        <div className="checkpoint"></div>
        <div className="checkpoint"></div>
        <div className="checkpoint"></div>
      </div>

      <br/>
      <br/>

      <div className="selection-container">
        <div className="text-left mb-2">
          <strong style={{ fontSize: "20px", marginRight: "460px" }}>Select Event Type:</strong>
        </div>
        <div className="btn-group text-center">
          <button onClick={() => handleEventClick("individual")} className="btn btn-primary btn-lg rounded mb-3">Individual</button>
          <button onClick={() => handleEventClick("groundCrew")} className="btn btn-primary btn-lg rounded mb-3">Ground Crew</button>
          <button onClick={() => handleEventClick("vehicleCrew")} className="btn btn-primary btn-lg rounded mb-3">Vehicle Crew</button>
          <button onClick={() => handleEventClick("collective")} className="btn btn-primary btn-lg rounded mb-3">Collective</button>
        </div>
      </div>

      <br/>

      {showDetails && (
        <>
          <p className="mb-2"><strong style={{ fontSize: "20px", marginRight: "485px" }}>Training Details:</strong></p>
          <div className="container mt-1 container-section">
            <div className="row">
              <div className="col-md-8 form-container">
                <div className="mb-4">
                  <label htmlFor="dropdown" className="form-label1">Weapon Type</label>
                  <select className="form-select" id="dropdown">
                    {weaponTypes[selectedEvent].map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 form-container">
                <div className="mb-4">
                  <label htmlFor="textBox" className="form-label2">Number to Train</label>
                  <input type="text" className="form-control" id="textBox" placeholder="Enter text" style={{ width: "100%", padding: "5px" }} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Form;
