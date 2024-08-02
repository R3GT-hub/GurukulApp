// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure you create this CSS file for styling
import CarouselComponent from './CarouselComponent'; // Adjust the path as necessary
import Footer from '../Footer';




export default function HomePage() {

  useEffect(()=>{
    window.scrollTo(0, 0);
  })

  return (
    <div className='homepage'>
      <header className='hero-section'>
        <div className='hero-content'>
          <h1>Welcome to <span className='gurukul'>Gurukul</span></h1>
          <p>Your one-stop solution for managing and discovering amazing posts and resources.</p>
          <div className='button-container'>
            <Link to='/resources' className='cta-button'>Explore Resources</Link>
            <Link to='/opportunities' className='cta-button'>Explore Jobs/Internships</Link>
          </div>
        </div>
      </header>
      <section className='carousel-section'>
        <CarouselComponent />
      </section>
      <section className='about'>
        <h2>About Us</h2>
        <p>Learn more about our mission and the team behind this project.</p>
        <Link to='/about' className='cta-button'>Learn More</Link>
      </section>
      {/* <footer className='homepage-footer'>
        <p>&copy; {new Date().getFullYear()} Gurukul. All rights reserved.</p>
      </footer> */}
      {/* <Footer/> */}
    </div>
  );
}
