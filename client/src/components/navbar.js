import React from "react";
//import brandLogo from '../images/zara-logo.png';
 
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
    <nav role="main" id="navbar" className="navbar navbar-expand-lg navbar-dark --black">
        <div class="container-fluid">
            <a id="brandfont" className="navbar-brand ms-3" href="/../index_home.html">Ammunition Forecast Tool</a>
        <div>
            <ul className="navbar-nav navi-pills me-3">
                 <li className="nav-item">
                 <a id="header-btn-yellow" className="nav-link" href="/login">Log In</a>
                </li>
             </ul>
        </div>       
        </div>
    </nav>
 );
}