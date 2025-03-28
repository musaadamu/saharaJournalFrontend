import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize to dynamically adjust mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close menu on larger screens
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

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/journals", label: "Journals" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" }
  ];

  const authLinks = [
    { to: "/login", label: "Login", className: "nav-cta" },
    { to: "/register", label: "Register", className: "nav-cta" },
    { to: "/manage-journals", label: "Manage Journals" },
    { to: "/logout", label: "Logout" }
  ];

  // Render NavLink with active state
  const renderNavLink = (link, onClick) => (
    <NavLink 
      to={link.to} 
      className={({ isActive }) => `${link.className || ''} ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {link.label}
    </NavLink>
  );

  return (
    <nav className="main-navigation">
      {/* Mobile Hamburger Menu */}
      {isMobile && (
        <button 
          className="hamburger" 
          onClick={toggleMenu} 
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-icon">
            {menuOpen ? "✖" : "☰"}
          </span>
        </button>
      )}

      {/* Navigation Links */}
      <ul className={`nav-links ${isMobile && menuOpen ? "open" : ""}`}>
        {navLinks.map((link, index) => (
          <li key={index}>
            {renderNavLink(link, closeMenu)}
          </li>
        ))}
        {authLinks.map((link, index) => (
          <li key={index} className={link.className}>
            {renderNavLink(link, closeMenu)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;