import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check if user is logged in by checking for token - no API calls
  const isLoggedIn = localStorage.getItem('authToken') ? true : false;
  const storedUser = localStorage.getItem('authUser');
  const userName = storedUser ? JSON.parse(storedUser)?.name || 'User' : 'Guest';

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => isMobile && setIsSidebarOpen(false);

  return (
    <>
      {isMobile && (
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          {isSidebarOpen ? "✖" : "☰"}
        </button>
      )}

      <div className={`site-sidebar ${isSidebarOpen ? "open" : ""} ${isMobile ? "mobile" : ""}`}>
        <div className="sidebar-profile">
          <img src="/path/to/avatar.jpg" alt="Avatar" className="avatar" onClick={closeSidebar} />
          <div className="user-info">
            <p className="user-name">{userName}</p>
            {isLoggedIn ? (
              <p className="user-role">Researcher</p>
            ) : (
              <p className="user-role">Welcome, Guest</p>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {/* Always visible links */}
            <li><Link to="/" onClick={closeSidebar}>Home</Link></li>
            <li><Link to="/journals" onClick={closeSidebar}>View Journals</Link></li>
            <li><Link to="/about" onClick={closeSidebar}>About</Link></li>
            <li><Link to="/contact" onClick={closeSidebar}>Contact</Link></li>
            <li><Link to="/guide" onClick={closeSidebar}>Author's Guide</Link></li>
            <li><Link to="/logout" onClick={closeSidebar}>Logout</Link></li>

            {/* Links for logged-in users */}
            {isLoggedIn ? (
              <>
                <li><Link to="/dashboard" onClick={closeSidebar}>Dashboard</Link></li>
                <li><Link to="/submission" onClick={closeSidebar}>Submit Journal</Link></li>
                <li><Link to="/updateprofile" onClick={closeSidebar}>Update Profile</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/register" onClick={closeSidebar}>Register</Link></li>
                <li><Link to="/login" onClick={closeSidebar}>Login</Link></li>
              </>
            )}
          </ul>
        </nav>

        <div className="sidebar-utilities">
          <input className="sidebar-search" type="text" placeholder="Search..." />
          {isLoggedIn && (
            <Link to="/journals/uploads" className="create-action" onClick={closeSidebar}>
              Create New Journal
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
