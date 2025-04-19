import React from 'react'
import './Header.css'
import { useState, useEffect } from "react";

const Header = () => {
  const heroItems = [
    { type: "image", src: "/hero1.gif" },
    { type: "image", src: "/hero2.gif" }, 
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true); // Track if auto-slide is active

  useEffect(() => {
    if (!autoSlide) return; // Stop auto-slide when manually changed

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroItems.length);
    }, heroItems[currentIndex].type === "video" ? 9800 : 8000); // Video plays longer

    return () => clearInterval(interval);
  }, [currentIndex, autoSlide]);

  // Function to manually switch slides
  const handleDotClick = (index) => {
    setCurrentIndex(index); // Immediately update the image
    setAutoSlide(false); // Stop auto-slide

    // Restart the auto-slide after a short delay
    setTimeout(() => {
      setAutoSlide(true);
    }, 3000);
  };

  return (
    <div className="header">
      {heroItems[currentIndex].type === "video" ? (
        <video className="hero-video" autoPlay loop muted playsInline >
          <source src={heroItems[currentIndex].src} type="video/mp4" />
        </video>
      ) : (
        <div className="hero-image" style={{ backgroundImage: `url(${heroItems[currentIndex].src})` }}></div>
      )}
      <div className="header-contents">
        <h2>Authentic Flavors in Auckland</h2>
        <p>
        At Darjeeling Momo NZ, we specialize in authentic Nepalese momos, handmade with love and bursting with flavor. 
        From classic steamed veg, chicken, and mutton momos to unique variations like Jhol momos, Rose momos, Phaley, cheese, schezwan, green, 
        and paneer momos. Each bite brings a taste of the hills of Darjeeling to the heart of Auckland. Choose steamed or fried, your momo journey starts here.
        </p>
      </div>

      {/* Dots Navigation */}
      <div className="dot-container">
        {heroItems.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>

    </div>
  );
};

export default Header;

