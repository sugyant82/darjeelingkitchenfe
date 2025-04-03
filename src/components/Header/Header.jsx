import React from 'react'
import './Header.css'
import { useState, useEffect } from "react";

const Header = () => {
  const heroItems = [
    { type: "image", src: "/hero.gif" },
    { type: "video", src: "/hero2.mp4" }, // MP4 video included
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroItems.length);
    }, heroItems[currentIndex].type === "video" ? 5800 : 4800); // Video plays longer

    return () => clearInterval(interval);
  }, [currentIndex]);

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
          At Darjeeling Kitchen, we bring authentic Nepalese and Indian flavors to Auckland. From classic momos to
          aromatic curries, every dish is crafted with traditional recipes and fresh ingredients, offering you a taste
          of home in every bite.
        </p>
      </div>
    </div>
  );
};

export default Header;

