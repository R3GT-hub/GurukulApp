import React from 'react';
import './About.css';
// import profilePic from '../path/to/your/profilePic.jpg'; // Adjust the path to your image file

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <h1>About Me</h1>
        </div>
        {/* <div className="about-photo">
          <img src="https://i.ibb.co/YQPHjpZ/saranshpic.png" alt="Saransh Sharma" />
        </div> */}
        <div className="about-details">
          <p><strong>Name:</strong> Saransh Sharma</p>
          <p><strong>Education:</strong> NIT Raipur, 4th year ECE</p>
          <p><strong>Experience:</strong></p>
          <ul>
            <li>SWE Intern at Togethr</li>
            <li>Former Developer Intern at SEOUX</li>
          </ul>
          <p><strong>Achievements:</strong></p>
          <ul>
            <li>National Finalist (Top-12) GE Healthcare Precision Care Challenge 2024</li>
            <li>Achieved in non-CS category and overall in Coderush Coding Competition 2023 by Algo University</li>
            <li>National Semifinalist in Larsen and Turbo Createch Hackathon among 13k+ teams</li>
            <li>National Semifinalist in Nation with Namo among 31k+ teams</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
