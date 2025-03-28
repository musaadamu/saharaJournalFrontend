import React, { useState } from "react";
import Header from "../components/Common/Header";
import Navigation from "../components/Common/Navigation";
import Footer from "../components/Common/Footer";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to submit contact form goes here
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* <Header />
      <Navigation /> */}
      <header className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out with any questions or comments.</p>
      </header>

      {/* Contact Information Section */}
      <section className="contact-info">
                <h2>Our Contact Information</h2>
                <p>Address: College of Education and Legal Studies, Nguru, Yobe State, Nigeria</p>
                <p>Phone: +234 806 627 6806</p>
                <p>Email: info@coels.edu.ng</p>
                <div className="map-container">
                  <iframe
                    title="Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15600.066464289654!2d12.864423371581164!3d12.879254747462692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11aa0fb532bc31f5%3A0xcf428c236e650e7b!2sNguru%2C%20Nigeria!5e0!3m2!1sen!2s!4v1614363282415!5m2!1sen!2s"
                    width="100%"
                    height="250"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>
                </div>
              </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        {submitted ? (
          <p>Thank you for contacting us! We will get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        )}
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Contact;
