import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      {/* Top Section (Multiple Columns) */}
      <div className="footer-top">
        <div className="footer-column">
          <h3>Academic Journal Hub</h3>
          <p>Advancing knowledge through peer-reviewed research publications.</p>
        </div>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/submit">Submit Journal</a></li>
            <li><a href="/journals">View Journals</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/copyright">Copyright Policy</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul className="social-links">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Academic Journal Hub. All rights reserved.</p>
        <p>ISSN: 1234-5678 | Open Access Peer-Reviewed Publications</p>
      </div>
    </footer>
  );
};

export default Footer;
