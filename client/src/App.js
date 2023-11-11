import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

import './App.css'; // Import your global styles
import "bootstrap/dist/css/bootstrap.css";


 // We import all the components we need in our app
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Login from "./components/login";
import Register from "./components/register";
import Form from "./components/form";
import Table from "./components/table";

 const App = () => {
 return (
   <div>
     <Navbar />
     <div className="d-flex flex-row"> 
      <div className="flex-fill">
          <Sidebar />
      </div>
      <div className="flex-fill">
        <Routes>
            <Route exact path="/" element={<Form/>} />
            <Route path="/app" element={<Form />} />
            <Route path="/table" element={<Table />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        </div>
     </div>
   </div>
 );
};
 export default App;







