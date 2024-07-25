import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <h1>About Me</h1>
        </div>
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
            <li>Achieved 1'st rank in non-CS category and overall 4'th in Coderush Coding Competition 2023 by Algo University</li>
            <li>National Semifinalist in Larsen and Turbo Createch Hackathon among 13k+ teams</li>
            <li>National Semifinalist in Nation with Namo among 31k+ teams</li>
          </ul>
          <p><strong>Aim:</strong></p>
          <ul>
            <li>
              Gurukul was developed to empower students by reducing their reliance on institutional support for internships and job placements. Our platform is designed to open doors to a broad spectrum of career opportunities that extend beyond traditional academic channels. Gurukul offers a single, comprehensive solution for discovering and accessing valuable opportunities in the job market, enabling students to take charge of their professional growth.
              <br />
              <br />
              In addition to facilitating career advancement, Gurukul is committed to nurturing coding skills from the ground up. We provide an extensive range of resources and carefully curated educational content to support students at every stage of their coding journey. Whether you're just starting out or seeking to enhance your existing skills, Gurukul equips you with the tools and knowledge needed to succeed in the competitive world of technology.
            </li>
          </ul>
          <p><strong>Socials:</strong></p>
          <ul className="socials-list">
            <li className="social-item">
              <a href="https://github.com/R3GT-hub" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" className="social-icon" />
                <span className="social-text">Github</span>
              </a>
            </li>
            <li className="social-item">
              <a href="https://www.linkedin.com/in/saransh-sharma-697857240/" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" className="social-icon" />
                <span className="social-text">LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
