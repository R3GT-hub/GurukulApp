// src/components/CarouselComponent.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import "./CarouselComponent.css"
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
        <div>
        <h2>Full Time Jobs</h2>
        <p>Discover lots amazing job opprotunities in different industries. From tech titans to hidden gems, find your perfect fit! </p>
        </div>
        <img src="https://www.proelevate.in/assets/Home/Archive1.svg" alt="" />
      </div>
      <div className='carousel-slide'>
        <div>
        <h2>Internships</h2>
        <p>Gain real-world experience, network with pros, and ignite your passion. Step into your future with internships taht pave the way to success.</p>
        </div>
        <img src="https://www.proelevate.in/assets/Home/Archive2.svg" alt="" />
      </div>
      <div className='carousel-slide'>
        <div>
        <h2>Hackathons</h2>
        <p>Bild awesome projects, solve real-world problems, and network with tech leaders. Hack the future with like-minded peers and unlock endless possibilities.</p>
        </div>
        <img src="https://www.proelevate.in/assets/Home/Archive3.svg" alt="" />
      </div>
      <div className='carousel-slide'>
        <div>
        <h2>Competitions</h2>
        <p>Push your limits, win big and get noticed! Compete in diverse challenges, sharpen your skills and leave your mark on the world.</p>
        </div>
        <img src="https://www.proelevate.in/assets/Home/Archive4.svg" alt="" />
      </div>
    </Carousel>
  );
}

export default CarouselComponent;
