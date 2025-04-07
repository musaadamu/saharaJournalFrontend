import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

const Navigation = ({ user }) => {
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
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Updated main navigation links with role-based items
  const mainNavLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/journals", label: "Journals" },
    { to: "/archive", label: "Archive" },
    { to: "/guide", label: "Author's Guide" },
    { to: "/submission", label: "Submit Article" },
  ];

  // Updated user navigation links with role-based items
  const userNavLinks = user ? [
    { to: "/dashboard", label: "Dashboard" },
    ...(user.role === "admin" ? [{ to: "/manage-journals", label: "Manage Journals" }] : []),
    { to: "/updateprofile", label: "Profile" },
    { to: "/logout", label: "Logout" }
  ] : [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" }
  ];

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-logo">Sahara Journal</div>
        
        <button 
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-icon">{menuOpen ? "✖" : "☰"}</span>
        </button>
        
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {/* Main Navigation Links */}
          {mainNavLinks.map((link, index) => (
            <li key={`main-${index}`}>
              <NavLink 
                to={link.to}
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          
          {/* User-specific Navigation Links */}
          {userNavLinks.map((link, index) => (
            <li key={`user-${index}`}>
              <NavLink 
                to={link.to}
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;