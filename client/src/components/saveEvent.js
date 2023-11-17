import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

function SaveEvent() {
  const location = useLocation();
  const navigate = useNavigate();
  const tableData = location.state ? location.state.tableData : null; // Handle undefined state

  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [locationText, setLocationText] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form and check user login status
  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId');
    const isUserLoggedIn = !!loggedInUserId;
    setIsFormValid(!!eventName.trim() && !!startDate && !!endDate && isUserLoggedIn);
  }, [eventName, startDate, endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      window.alert("Please fill out the Event Name, Start Date, End Date, and ensure you are logged in.");
      return;
    }

    const userId = localStorage.getItem('userId'); // Get the user ID at submission time
    const eventData = {
      eventName,
      startDate,
      endDate,
      location: locationText,
      additionalInfo,
      tableData,
      userId
    };

    try {
      const response = await fetch('http://localhost:5050/saveEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.text();

      if (response.ok) {
        navigate('/path-to-redirect');
      } else {
        window.alert(data);
      }
    } catch (error) {
      window.alert("There was a problem with saving the event: " + error.message);
    }
  };

  return (
    <div>
      <br/><br/><br/><br/><br/>
      <h2>Save Event Details</h2>
      <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
      <input type="text" value={locationText} onChange={(e) => setLocationText(e.target.value)} placeholder="Location" />
      <input type="text" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="Additional Info" />
      <button className={`btn btn-submit ${!isFormValid ? 'disabled-button' : ''}`} onClick={handleSubmit} disabled={!isFormValid}>Save Event Info</button>
    </div>
  );
}

export default SaveEvent;
