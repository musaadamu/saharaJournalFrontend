import React from "react";
import Header from "../components/Common/Header";
import Navigation from "../components/Common/Navigation";
import Footer from "../components/Common/Footer";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      {/* <Header /> */}
      {/* <Navigation /> */}
      <header className="page-header">
        <h1>About E-Learn</h1>
        <p>Empowering Education Through Innovation</p>
      </header>

      {/* About the Platform Section */}
      <section className="platform-info">
        <h2>Our Vision, Mission & Objectives</h2>
        <p>
          E-Learn is designed to revolutionize academic management by streamlining
          operations, enhancing communication, and automating key tasks such as course
          organization, exam scheduling, and CGPA computation.
        </p>
        <p>
          Our mission is to empower educational institutions with a comprehensive, secure,
          and user-friendly platform that facilitates academic excellence and innovation.
        </p>
        <p>
          Established to modernize traditional academic systems, E-Learn enables both educators
          and students to thrive in a dynamic learning environment.
        </p>
      </section>

      {/* Team/Values Section (Optional) */}
      <section className="team-values">
        <h2>Meet Our Team & Core Values</h2>
        <div className="team-container">
          <div className="team-member">
            <img src="/assets/images/team1.jpg" alt="John Doe" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="/assets/images/team2.jpg" alt="Jane Smith" />
            <h3>Jane Smith</h3>
            <p>CTO</p>
          </div>
          {/* Additional team members */}
        </div>
        <div className="core-values">
          <h3>Our Core Values</h3>
          <ul>
            <li>Innovation</li>
            <li>Integrity</li>
            <li>Excellence</li>
            <li>Collaboration</li>
          </ul>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default About;
