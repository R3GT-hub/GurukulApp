// src/components/CarouselComponent.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

function CarouselComponent() {
  return (
    <Carousel
      showThumbs={false}
      infiniteLoop
      autoPlay
      emulateTouch
      interval={3000}
      transitionTime={2000}
      className='carousel-custom'
    >
      <div className='carousel-slide'>
        <h2>Full Time Jobs</h2>
      </div>
      <div className='carousel-slide'>
        <h2>Internships</h2>
      </div>
      <div className='carousel-slide'>
        <h2>Hackathons</h2>
      </div>
      <div className='carousel-slide'>
        <h2>Competitions</h2>
      </div>
    </Carousel>
  );
}

export default CarouselComponent;
