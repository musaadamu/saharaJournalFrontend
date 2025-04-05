// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import "./Navigation.css";

// const Navigation = ({ user }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
//   // Handle window resize to dynamically adjust mobile view
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       // Close menu on larger screens
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
  
//   // Main nav links
//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About Us" },
//     { to: "/journals", label: "Journals" },
//     { to: "/archive", label: "Archive" }
//   ];
  
//   // User-related links
//   const userLinks = [
//     { to: "/submission", label: "Submit" },
//     { to: "/dashboard", label: "Dashboard" }
//   ];
  
//   // Auth related links - condensed
//   const authLinks = user ? [
//     { to: "/updateprofile", label: "Profile" },
//     { to: "/logout", label: "Logout" }
//   ] : [
//     { to: "/login", label: "Login" },
//     { to: "/register", label: "Register" }
//   ];

//   // Admin-only links
//   const adminLinks = [
//     { to: "/manage-journals", label: "Manage" }
//   ];
  
//   // Render NavLink with active state
//   const renderNavLink = (link, onClick) => (
//     <NavLink 
//       to={link.to}
//       className={({ isActive }) => `${link.className || ''} ${isActive ? 'active' : ''} nav-link px-3 py-1 text-sm whitespace-nowrap`}
//       onClick={onClick}
//     >
//       {link.label}
//     </NavLink>
//   );
  
//   return (
//     <nav className="main-navigation bg-gray-800 text-white px-8 py-3">
//       <div className="nav-content flex items-center justify-between max-w-7xl mx-auto">
//         {/* Title on the left with increased width */}
//         <div className="nav-logo text-lg font-bold w-1/4">Sahara Journal</div>
        
//         {/* Spacer div to create separation */}
//         <div className="flex-grow"></div>
        
//         {/* Mobile Hamburger Menu - positioned on the right */}
//         {isMobile && (
//           <button 
//             className="hamburger"
//             onClick={toggleMenu}
//             aria-label="Toggle Navigation Menu"
//           >
//             <span className="hamburger-icon">
//               {menuOpen ? "✖" : "☰"}
//             </span>
//           </button>
//         )}
        
//         {/* Navigation Links on the right with good spacing */}
//         <div className={`nav-links flex items-center space-x-4 w-3/4 justify-end ${isMobile && menuOpen ? "flex-col absolute top-14 right-0 bg-gray-800 p-4 z-50 w-full" : isMobile ? "hidden" : "flex-row"}`}>
//           {/* Main nav links */}
//           <div className="flex space-x-4">
//             {navLinks.map((link, index) => (
//               <div key={index}>
//                 {renderNavLink(link, closeMenu)}
//               </div>
//             ))}
//           </div>
          
//           {/* User links */}
//           <div className="flex space-x-4">
//             {userLinks.map((link, index) => (
//               <div key={`user-${index}`}>
//                 {renderNavLink(link, closeMenu)}
//               </div>
//             ))}
//           </div>
          
//           {/* Admin Links - only shown if user has admin role */}
//           {user?.role === "admin" && (
//             <div className="flex space-x-4">
//               {adminLinks.map((link, index) => (
//                 <div key={`admin-${index}`}>
//                   {renderNavLink(link, closeMenu)}
//                 </div>
//               ))}
//             </div>
//           )}
          
//           {/* Auth Links */}
//           <div className="flex space-x-4">
//             {authLinks.map((link, index) => (
//               <div key={`auth-${index}`}>
//                 {renderNavLink(link, closeMenu)}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

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
  
//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About Us" },
//     { to: "/journals", label: "Journals" },
//     { to: "/archive", label: "Archive" }
//   ];
  
//   const userLinks = [
//     { to: "/submission", label: "Submit" },
//     { to: "/dashboard", label: "Dashboard" }
//   ];
  
//   const authLinks = user ? [
//     { to: "/updateprofile", label: "Profile" },
//     { to: "/logout", label: "Logout" }
//   ] : [
//     { to: "/login", label: "Login" },
//     { to: "/register", label: "Register" }
//   ];

//   const adminLinks = [
//     { to: "/manage-journals", label: "Manage" }
//   ];
  
//   const renderNavLink = (link, onClick) => (
//     <NavLink 
//       to={link.to}
//       className={({ isActive }) => `${link.className || ''} ${isActive ? 'active' : ''} nav-link px-4 py-2 text-base rounded-lg transition duration-300 hover:bg-blue-500`}
//       onClick={onClick}
//     >
//       {link.label}
//     </NavLink>
//   );
  
//   return (
//     <nav className="main-navigation bg-blue-900 text-white px-8 py-4 shadow-lg">
//       <div className="nav-content flex items-center justify-between max-w-7xl mx-auto">
//         <div className="nav-logo text-xl font-bold tracking-wide">Sahara Journal</div>
//         <div className="flex-grow"></div>
//         {isMobile && (
//           <button 
//             className="hamburger"
//             onClick={toggleMenu}
//             aria-label="Toggle Navigation Menu"
//           >
//             <span className="hamburger-icon">
//               {menuOpen ? "✖" : "☰"}
//             </span>
//           </button>
//         )}
//         <div className={`nav-links flex items-center space-x-6 ${isMobile && menuOpen ? "flex-col absolute top-14 right-0 bg-blue-900 p-6 z-50 w-full shadow-md" : isMobile ? "hidden" : "flex-row"}`}>
//           <div className="flex space-x-6">
//             {navLinks.map((link, index) => (
//               <div key={index}>
//                 {renderNavLink(link, closeMenu)}
//               </div>
//             ))}
//           </div>
//           <div className="flex space-x-6">
//             {userLinks.map((link, index) => (
//               <div key={`user-${index}`}>
//                 {renderNavLink(link, closeMenu)}
//               </div>
//             ))}
//           </div>
//           {user?.role === "admin" && (
//             <div className="flex space-x-6">
//               {adminLinks.map((link, index) => (
//                 <div key={`admin-${index}`}>
//                   {renderNavLink(link, closeMenu)}
//                 </div>
//               ))}
//             </div>
//           )}
//           <div className="flex space-x-6">
//             {authLinks.map((link, index) => (
//               <div key={`auth-${index}`}>
//                 {renderNavLink(link, closeMenu)}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;



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

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/journals", label: "Journals" },
    { to: "/archive", label: "Archive" },
    { to: "/guide", label: "Author's Guide" }
  ];

  const userLinks = [
    { to: "/submission", label: "Submit" },
    { to: "/dashboard", label: "Dashboard" }
  ];

  const authLinks = user ? [
    { to: "/updateprofile", label: "Profile" },
    { to: "/logout", label: "Logout" }
  ] : [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" }
  ];

  const adminLinks = [
    { to: "/manage-journals", label: "Manage" }
  ];

  const renderNavLink = (link, onClick) => (
    <NavLink 
      to={link.to}
      className={({ isActive }) => `${link.className || ''} ${isActive ? 'active' : ''} nav-link px-4 py-2 text-base rounded-lg transition duration-300 hover:bg-blue-500`}
      onClick={onClick}
    >
      {link.label}
    </NavLink>
  );

  return (
    <nav className="main-navigation bg-blue-900 text-white px-8 py-4 shadow-lg md:ml-64">
      <div className="nav-content flex items-center justify-between max-w-7xl mx-auto">
        <div className="nav-logo text-xl font-bold tracking-wide">Sahara Journal</div>
        <div className="flex-grow"></div>
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
        <div className={`nav-links flex items-center space-x-6 ${isMobile && menuOpen ? "flex-col absolute top-14 right-0 bg-blue-900 p-6 z-50 w-full shadow-md" : isMobile ? "hidden" : "flex-row"}`}>
          <div className="flex space-x-6">
            {navLinks.map((link, index) => (
              <div key={index}>
                {renderNavLink(link, closeMenu)}
              </div>
            ))}
          </div>
          <div className="flex space-x-6">
            {userLinks.map((link, index) => (
              <div key={`user-${index}`}>
                {renderNavLink(link, closeMenu)}
              </div>
            ))}
          </div>
          {user?.role === "admin" && (
            <div className="flex space-x-6">
              {adminLinks.map((link, index) => (
                <div key={`admin-${index}`}>
                  {renderNavLink(link, closeMenu)}
                </div>
              ))}
            </div>
          )}
          <div className="flex space-x-6">
            {authLinks.map((link, index) => (
              <div key={`auth-${index}`}>
                {renderNavLink(link, closeMenu)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

