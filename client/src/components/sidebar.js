import React, { useRef, useState, useEffect } from "react";

//import react icon will need to put'npm install react-icons' in the client folder
//library in https://react-icons.github.io/react-icons/search?q=Bilog
import { BiAddToQueue, BiCalendarEvent, BiInfoCircle, BiSend, BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

export default function Sidebar({ onLogout }) {
  const mySidebarRef = useRef(null);
  const [mini, setMini] = useState(true);
  const navigate = useNavigate();
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
  }, [mini, toggleSidebar]);
  const spacing = '1.25';

  const handleLogoutClick = () => {
    // Handle logout logic
    onLogout();
    // Navigate to the /app route after logout
    localStorage.removeItem('userId');
    navigate("/app");
  };
  
  return (
    <nav role="Side" className="sidebar" id="mySidebar" ref={mySidebarRef}>
      <ol className="nav text-left">
        <li>
          <NavLink to="/app" activeClassName="active-link">
            <BiAddToQueue size={24} style={{ marginRight: spacing +'em' }} />
            <span>Create Event</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/myevents" exact activeClassName="active-link">
            <BiCalendarEvent size={24} style={{ marginRight: spacing+'em' }} />
            <span>My Events</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/faq" activeClassName="active-link">
            <BiInfoCircle size={24} style={{ marginRight: spacing +'em'}} />
            <span>FAQs</span>
          </NavLink>
        </li>
        <li>
          <a href="/../index_home.html#contact-bg" activeClassName="active-link">
            <BiSend size={24} style={{ marginRight: `${spacing}em` }} />
            <span>Contact Us</span>
          </a>
        </li>
        <li>
          <a href="/app" onClick={() => navigate("/app")}>
            <BiLogOut size={24} style={{ marginRight: spacing + 'em' }} onClick={handleLogoutClick} />
            <span onClick={handleLogoutClick}>Log Out</span>
          </a>
        </li>
      </ol>
    </nav>
  );
}