import React from "react";
 
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar({ isLoggedIn, userName, onLogout }) {
    return (
      <nav role="main" id="navbar" className="navbar navbar-expand-lg navbar-dark --black">
        <div className="container-fluid">
          <a id="brandfont" className="navbar-brand ms-3" href="/">Ammunition Forecast Tool</a>
          <div>
            <ul className="navbar-nav navi-pills me-3">
            {isLoggedIn ? (
                <li className="nav-item">
                  <span className="nav-link">Hi, {userName}!</span>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink id="header-btn-yellow" className="nav-link" to="/login">Log In</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }