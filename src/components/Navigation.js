
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

const Navigation = ({ user, toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    // Log menu state for debugging
    console.log('Menu toggled, new state:', !menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Function to get the full label for tooltips
  const getFullLabel = (shortLabel) => {
    // Map of shortened labels to their full versions
    const labelMap = {
      // Main navigation
      'About': 'About Us',
      'Guide': 'Author\'s Guide',
      'Submit': 'Submit Article',
      'Contact': 'Contact Us',

      // User navigation
      'Dashboard': 'User Dashboard',
      'Profile': 'Update Profile',
      'Manage Journals': 'Manage All Journals'
    };

    // Return the full label if it exists, otherwise return the short label
    return labelMap[shortLabel] || shortLabel;
  };

  // Function to format the label based on screen size
  const formatLabel = (label, isMobile) => {
    // For mobile, always show the full label
    if (isMobile) {
      return getFullLabel(label);
    }

    // For desktop, use shortened labels for certain items
    const shortLabels = {
      'Dashboard': 'Dash',
      'Manage Journals': 'Manage',
      'Submit': 'Submit',
      'Contact': 'Contact'
    };

    // Return the shortened label if available, otherwise use the original
    return shortLabels[label] || label;
  };

  // Updated main navigation links with role-based items
  const mainNavLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/journals", label: "Journals" },
    { to: "/archive", label: "Archive" },
    { to: "/guide", label: "Guide" },
    { to: "/submission", label: "Submit" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Login" },
    { to: "/logout", label: "Logout" }
  ];

  // Updated user navigation links with role-based items
  const userNavLinks = user ? [
    { to: "/dashboard", label: "Dashboard" },
    // Explicitly check for admin role and add the Manage Journals link
    ...(user.role === "admin" ? [{ to: "/manage-journals", label: "Manage Journals" }] : []),
    { to: "/updateprofile", label: "Profile" }
  ] : [
    { to: "/register", label: "Register" }
  ];

  // Debug user role for navigation
  console.log('Navigation - User:', user);
  console.log('Navigation - Is Admin:', user?.role === "admin");

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <button
          className="hamburger main-menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-icon" style={{
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>
            {menuOpen ? "✖" : "☰"}
          </span>
        </button>

        <div className="nav-brand">
          <div className="nav-logo">Sahara Journal</div>
        </div>

        <button
          className="hamburger sidebar-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <span className="hamburger-icon" style={{
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>
            ☰
          </span>
        </button>

        <div className={`nav-menu-container ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links main-links">
            {/* Main Navigation Links */}
            {mainNavLinks.map((link, index) => (
              <li key={`main-${index}`}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => isActive ? "active" : ""}
                  onClick={closeMenu}
                  title={getFullLabel(link.label)} // Add tooltip for shortened labels
                >
                  {/* Use formatLabel to show appropriate label based on screen size */}
                  {formatLabel(link.label, menuOpen)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-divider"></div>

          <ul className="nav-links user-links">
            {/* User-specific Navigation Links */}
            {userNavLinks.map((link, index) => (
              <li key={`user-${index}`}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => isActive ? "active" : ""}
                  onClick={closeMenu}
                  title={getFullLabel(link.label)} // Add tooltip for shortened labels
                >
                  {/* Use formatLabel to show appropriate label based on screen size */}
                  {formatLabel(link.label, menuOpen)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;