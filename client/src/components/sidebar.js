import React, { useRef, useState, useEffect } from "react";

//import react icon will need to put'npm install react-icons' in the client folder
//library in https://react-icons.github.io/react-icons/search?q=Bilog
import { BiAddToQueue, BiCalendarEvent, BiInfoCircle, BiSend, BiLogOut } from "react-icons/bi";

import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const mySidebarRef = useRef(null);
    const [mini, setMini] = useState(true);
  
    useEffect(() => {
      const mySidebar = mySidebarRef.current;
  
      const handleMouseEnter = () => {
        toggleSidebar(true);
      };
  
      const handleMouseLeave = () => {
        toggleSidebar(false);
      };
  
      mySidebar.addEventListener("mouseenter", handleMouseEnter);
      mySidebar.addEventListener("mouseleave", handleMouseLeave);
  
      return () => {
        mySidebar.removeEventListener("mouseenter", handleMouseEnter);
        mySidebar.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [mini]);
  
    const toggleSidebar = (isMouseEnter) => {
      const mySidebar = mySidebarRef.current;
  
      if (isMouseEnter && !mini) {
        mySidebar.style.width = "13.5rem";
        setMini(true);
      } else if (!isMouseEnter && mini) {
        mySidebar.style.width = "4.75rem";
        setMini(false);
      }
    };

  return (
    <nav role="Side" className="sidebar" id="mySidebar" ref={mySidebarRef}>
      <ol className="nav text-left .active-link">
        <li>
            <NavLink to="/app">
            <BiAddToQueue size={24} style={{marginRight:'1.25rem'}} />
            <span>Create Event</span>
          </NavLink>
        </li>
        <li>
            <NavLink to="/myevents">
            <BiCalendarEvent size={24} style={{marginRight:'1.25rem'}} />
            <span>My Events</span>
          </NavLink>
        </li>
        <li className="logo-details">
          <a href="#">
            <BiInfoCircle size={24} style={{marginRight:'1.25rem'}} />
            <span>FAQs</span>
          </a>
        </li>
        <li>
          <a href="/../index_home.html#contact-bg">
            <BiSend size={24} style={{marginRight:'1.25rem'}} />
            <span>Contact Us</span>
          </a>
        </li>
        <li>
          <a href="#">
            <BiLogOut size={24} style={{marginRight:'1.25rem'}} />
            <span>Log Out</span>
          </a>
        </li>
      </ol>
    </nav>
  );
}
