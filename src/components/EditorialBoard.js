import React from 'react';
import './EditorialBoard.css';

const EditorialBoard = () => {
  return (
    <div className="editorial-board-page">
      <div className="container">
        <h1 className="page-title">EDITORIAL BOARD</h1>
        
        <div className="section">
          <h2 className="section-title">EDITORS-IN-CHIEF</h2>
          <div className="editor">
            <h3 className="editor-name">Dr. Stephen M. Macqual</h3>
            <p className="editor-affiliation">Faculty of Education, University of Jos, Nigeria</p>
          </div>
          <div className="editor">
            <h3 className="editor-name">Prof. Hutkemri Zulnaidi</h3>
            <p className="editor-affiliation">University of Malaya, Malaysia</p>
          </div>
        </div>
        
        <div className="section">
          <h2 className="section-title">ASSOCIATE EDITORS</h2>
          <div className="editor">
            <h3 className="editor-name">Professor Melanie Walker</h3>
            <p className="editor-affiliation">University of Cape Town, South Africa</p>
          </div>
          <div className="editor">
            <h3 className="editor-name">Prof Suzanne</h3>
            <p className="editor-affiliation">Human University of Pretoria, South Africa</p>
          </div>
          <div className="editor">
            <h3 className="editor-name">Prof. Princewill Egwuasi</h3>
            <p className="editor-affiliation">Uyo State University, Nigeria</p>
          </div>
          <div className="editor">
            <h3 className="editor-name">Dr. Isaac Masheliza</h3>
            <p className="editor-affiliation">Federal University Kashere, Nigeria</p>
          </div>
        </div>
        
        <div className="section">
          <h2 className="section-title">EDITORIAL CONSULTANTS</h2>
          <div className="editor">
            <h3 className="editor-name">Dr. James Jovie</h3>
            <p className="editor-affiliation">Moi University Kenya</p>
          </div>
          <div className="editor">
            <h3 className="editor-name">Dr. Khaleel Ismail</h3>
            <p className="editor-affiliation">University of Dalanj, Sudan</p>
          </div>
          <div className="editor">
            <h3 className="editor-name">Dr. Riyan Hidayat Arheight</h3>
            <p className="editor-affiliation">UPSI, Malaysia</p>
          </div>
        </div>
        
        <div className="section">
          <h2 className="section-title">Published by:</h2>
          <p className="publisher-info">
            International Academic Research Consortium (IARCON)<br />
            3rd floor IARCON Building,<br />
            Assam 781038<br />
            India.
          </p>
        </div>
        
        <div className="section">
          <h2 className="section-title">Editorial correspondence:</h2>
          <p className="contact-info">
            Tagans Yohanna<br />
            saharajournal@yahoo.com<br />
            +2348138614901
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditorialBoard;
