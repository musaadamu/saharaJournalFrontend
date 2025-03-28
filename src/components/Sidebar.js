import React, { useState, useEffect } from 'react';
import "./Sidebar.css";

const Sidebar = () => {
  const [userName, setUserName] = useState("John Doe");
  const [userJournals, setUserJournals] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Auto-close sidebar on larger screens
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Fetch user data and journals from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user"); // Replace with your user API endpoint
        const user = await response.json();
        setUserName(user.name || "Tagans");

        const journalsResponse = await fetch(`/api/journals?userId=${user.id}`); // Replace with your journals API endpoint
        const journals = await journalsResponse.json();
        setUserJournals(journals || []);
      } catch (error) {
        console.error("Error fetching user data or journals:", error);
      }
    };

    fetchUserData();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button - Only show on mobile */}
      {isMobile && (
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar} 
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>
      )}

      {/* Sidebar Content */}
      <div className={`site-sidebar ${isSidebarOpen ? "open" : ""} ${isMobile ? "mobile" : ""}`}>
        {/* User Profile Block */}
        <div className="sidebar-profile">
          <img 
            src="/path/to/avatar.jpg" 
            alt="Avatar" 
            className="avatar" 
            onClick={closeSidebar}
          />
          <div className="user-info">
            <p className="user-name">{userName}</p>
            <p className="user-role">Researcher</p>
          </div>
        </div>

        {/* User Journals Section */}
        <div className="user-journals">
          <h3>Your Journals</h3>
          {userJournals.length > 0 ? (
            <ul>
              {userJournals.map((journal, index) => (
                <li key={index}>
                  <a 
                    href={`#journal-${index}`} 
                    onClick={closeSidebar}
                  >
                    {journal.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-journals-message">
              You haven't submitted any journals yet. Start sharing your research today!
            </p>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul>
            {[
              { href: "#submit-journal", label: "Submit Journal" },
              { href: "#view-journals", label: "View Journals" },
              { href: "#user-info", label: "User Information" },
              { href: "#register", label: "Register" },
              { href: "#contact-us", label: "Contact Us" },
              { href: "#about-us", label: "About Us" }
            ].map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  onClick={closeSidebar}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Utility/Search Block */}
        <div className="sidebar-utilities">
          <input 
            className="sidebar-search" 
            type="text" 
            placeholder="Search..." 
          />
          <button 
            className="create-action" 
            onClick={closeSidebar}
          >
            Create New Journal
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;