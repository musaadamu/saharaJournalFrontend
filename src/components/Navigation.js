// // import React, { useState, useEffect } from 'react';
// // import { NavLink } from 'react-router-dom';
// // import "./Navigation.css";

// // const Navigation = ({ user }) => {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth <= 768);
// //       if (window.innerWidth > 768) {
// //         setMenuOpen(false);
// //       }
// //     };

// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   const toggleMenu = () => {
// //     setMenuOpen(prev => !prev);
// //   };

// //   const closeMenu = () => {
// //     setMenuOpen(false);
// //   };

// //   // Updated main navigation links with role-based items
// //   const mainNavLinks = [
// //     { to: "/", label: "Home" },
// //     { to: "/about", label: "About Us" },
// //     { to: "/journals", label: "Journals" },
// //     { to: "/archive", label: "Archive" },
// //     { to: "/guide", label: "Author's Guide" },
// //     { to: "/submission", label: "Submit Article" },
// //     { to: "/contact", label: "Contact Us" }
// //   ];

// //   // Updated user navigation links with role-based items
// //   const userNavLinks = user ? [
// //     { to: "/dashboard", label: "Dashboard" },
// //     ...(user.role === "admin" ? [{ to: "/manage-journals", label: "Manage Journals" }] : []),
// //     { to: "/updateprofile", label: "Profile" },
// //     { to: "/logout", label: "Logout" }
// //   ] : [
// //     { to: "/login", label: "Login" },
// //     { to: "/register", label: "Register" }
// //   ];

// //   return (
// //     <nav className="main-navigation">
// //       <div className="nav-container">
// //         <div className="nav-logo">Sahara Journal</div>

// //         <button
// //           className="hamburger"
// //           onClick={toggleMenu}
// //           aria-label="Toggle Navigation Menu"
// //         >
// //           <span className="hamburger-icon">{menuOpen ? "✖" : "☰"}</span>
// //         </button>

// //         <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
// //           {/* Main Navigation Links */}
// //           {mainNavLinks.map((link, index) => (
// //             <li key={`main-${index}`}>
// //               <NavLink
// //                 to={link.to}
// //                 className={({ isActive }) => isActive ? "active" : ""}
// //                 onClick={closeMenu}
// //               >
// //                 {link.label}
// //               </NavLink>
// //             </li>
// //           ))}

// //           {/* User-specific Navigation Links */}
// //           {userNavLinks.map((link, index) => (
// //             <li key={`user-${index}`}>
// //               <NavLink
// //                 to={link.to}
// //                 className={({ isActive }) => isActive ? "active" : ""}
// //                 onClick={closeMenu}
// //               >
// //                 {link.label}
// //               </NavLink>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navigation;

// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import "./Navigation.css";

// const Navigation = ({ user }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       if (window.innerWidth > 768) {
//         setMenuOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleMenu = () => {
//     setMenuOpen(prev => !prev);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   // Updated main navigation links with role-based items
//   const mainNavLinks = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About Us" },
//     { to: "/journals", label: "Journals" },
//     { to: "/archive", label: "Archive" },
//     { to: "/guide", label: "Author's Guide" },
//     { to: "/submission", label: "Submit Article" },
//     { to: "/contact", label: "Contact Us" }
//   ];

//   // Updated user navigation links with role-based items
//   const userNavLinks = user ? [
//     { to: "/dashboard", label: "Dashboard" },
//     ...(user.role === "admin" ? [{ to: "/manage-journals", label: "Manage Journals" }] : []),
//     { to: "/updateprofile", label: "Profile" },
//     { to: "/logout", label: "Logout" }
//   ] : [
//     { to: "/login", label: "Login" },
//     { to: "/register", label: "Register" }
//   ];

//   return (
//     <nav className="main-navigation">
//       <div className="nav-container">
//         <div className="nav-brand">
//           <div className="nav-logo">Sahara Journal</div>
//         </div>

//         <button
//           className="hamburger"
//           onClick={toggleMenu}
//           aria-label="Toggle Navigation Menu"
//         >
//           <span className="hamburger-icon">{menuOpen ? "✖" : "☰"}</span>
//         </button>

//         <div className={`nav-menu-container ${menuOpen ? "open" : ""}`}>
//           <ul className="nav-links main-links">
//             {/* Main Navigation Links */}
//             {mainNavLinks.map((link, index) => (
//               <li key={`main-${index}`}>
//                 <NavLink
//                   to={link.to}
//                   className={({ isActive }) => isActive ? "active" : ""}
//                   onClick={closeMenu}
//                 >
//                   {link.label}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>

//           <div className="nav-divider"></div>

//           <ul className="nav-links user-links">
//             {/* User-specific Navigation Links */}
//             {userNavLinks.map((link, index) => (
//               <li key={`user-${index}`}>
//                 <NavLink
//                   to={link.to}
//                   className={({ isActive }) => isActive ? "active" : ""}
//                   onClick={closeMenu}
//                 >
//                   {link.label}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

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

  // Updated main navigation links with role-based items
  const mainNavLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/journals", label: "Journals" },
    { to: "/archive", label: "Archive" },
    { to: "/guide", label: "Guide" },
    { to: "/submission", label: "Submit" },
    { to: "/contact", label: "Contact" }
  ];

  // Updated user navigation links with role-based items
  const userNavLinks = user ? [
    { to: "/dashboard", label: "Dashboard" },
    // Explicitly check for admin role and add the Manage Journals link
    ...(user.role === "admin" ? [{ to: "/manage-journals", label: "Manage Journals" }] : []),
    { to: "/updateprofile", label: "Profile" },
    { to: "/logout", label: "Logout" }
  ] : [
    { to: "/login", label: "Login" },
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
        >
          <span className="hamburger-icon">{menuOpen ? "✖" : "☰"}</span>
        </button>

        <div className="nav-brand">
          <div className="nav-logo">Sahara Journal</div>
        </div>

        <button
          className="hamburger sidebar-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <span className="hamburger-icon">☰</span>
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
                  {link.label}
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
                  {link.label}
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