import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function SaveEvent() {
  const location = useLocation();
  const tableData = location.state.tableData; // Retrieve passed table data
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [locationText, setLocationText] = useState('');

  const handleSubmit = async () => {
    const combinedData = {
      tableData,
      eventName,
      dates: { start: startDate, end: endDate },
      location: locationText,
      additionalInfo
    };

    // Code to send combinedData to your server for saving to MongoDB
  };

  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <h2>Save Event Details</h2>
      {/* Form for event details */}
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Event Name"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start Date"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="End Date"
      />
      <input
        type="text"
        value={locationText}
        onChange={(e) => setLocationText(e.target.value)}
        placeholder="Location"
      />
      <input
        type="text"
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        placeholder="Additional Info"
      />
      <button className="btn btn-submit" onClick={handleSubmit}>Save Event Info</button>
    </div>
  );
}

export default SaveEvent;
