import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

const Navigation = ({ user, toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);
      if (!mobileView) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Desktop shortened labels
  const shortLabels = {
    'Dashboard': 'Dash',
    'Manage Journals': 'Manage',
    'Submit': 'Sub',
    'Archive': 'Arch'
  };

  const formatLabel = (label) => {
    // Show full labels on mobile or when menu is open
    if (isMobile || menuOpen) return label;
    return shortLabels[label] || label;
  };

  const mainNavLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/journals", label: "Journals" },
    { to: "/archive", label: "Archive" },
    { to: "/guide", label: "Guide" },
    { to: "/submission", label: "Submit" },
    { to: "/contact", label: "Contact" }
  ];

  const userNavLinks = user ? [
    { to: "/dashboard", label: "Dashboard" },
    ...(user.role === "admin" ? [{ to: "/manage-journals", label: "Manage Journals" }] : []),
    { to: "/updateprofile", label: "Profile" },
    { to: "/logout", label: "Logout" }
  ] : [
    { to: "/register", label: "Register" },
    { to: "/login", label: "Login" }
  ];

  const hamburgerStyle = {
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  };

  const renderNavLinks = (links, keyPrefix) => (
    links.map((link, index) => (
      <li key={`${keyPrefix}-${index}`}>
        <NavLink
          to={link.to}
          className={({ isActive }) => isActive ? "active" : ""}
          onClick={closeMenu}
        >
          {formatLabel(link.label)}
        </NavLink>
      </li>
    ))
  );

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <button
          className="hamburger main-menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-icon" style={hamburgerStyle}>
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
          <span className="hamburger-icon" style={hamburgerStyle}>
            ☰
          </span>
        </button>

        <div className={`nav-menu-container ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links main-links">
            {renderNavLinks(mainNavLinks, 'main')}
          </ul>

          <div className="nav-divider"></div>

          <ul className="nav-links user-links">
            {renderNavLinks(userNavLinks, 'user')}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;