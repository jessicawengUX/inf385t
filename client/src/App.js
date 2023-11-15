import React, { useState } from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";

import './App.css'; // Import your global styles
import "bootstrap/dist/css/bootstrap.css";


 // We import all the components we need in our app
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Login from "./components/login";
import Register from "./components/register";
import Form from "./components/form";
import Table from "./components/table";
import Myevents from "./components/myevents";
import SaveEvent from "./components/saveEvent";
import Faq from "./components/faq";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogin = (userName) => {
    setLoggedIn(true);
    setUserName(userName);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserName("");
  };

 return (
   <div>
     <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
      <div className="d-flex flex-row">
        <div className="flex-fill">
          <Sidebar onLogout={handleLogout} />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route exact path="/" element={<Form/>} />
            <Route path="/app" element={<Form />} />
            <Route path="/table" element={<Table />} />
            <Route path="/myevents" element={<Myevents />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/saveEvent" element={<SaveEvent />} />
            <Route path="/faq" element={<Faq />} />
        </Routes>
        </div>
     </div>
   </div>
 );
};
 export default App;



