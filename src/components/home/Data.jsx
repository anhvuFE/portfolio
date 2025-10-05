import React, { useEffect, useState } from "react";

const Data = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const roles = ["Frontend Developer"];

  useEffect(() => {
    const currentRole = roles[currentIndex];
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(currentRole.slice(0, index));
      index++;
      if (index > currentRole.length) {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="home__data">
      <div className="home__greeting">
        <span className="home__greeting-text">Hello, I'm</span>
      </div>

      <h1 className="home__title">
        <span className="home__title-main">Vũ Xuân Anh</span>
        <div className="home__title-wave">
          <svg
            width="38"
            height="38"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="home__wave-icon"
          >
            <path
              d="M25.4995 32.0305L31.3495 33.1555L36.1495 8.48051C36.4495 6.83051 35.3995 5.18051 33.8245 4.88051C32.1745 4.58051 30.5995 5.70551 30.2995 7.35551L25.4995 32.0305Z"
              fill="currentColor"
            />
            <path
              d="M19.4995 32.7802H26.5495V5.55518C26.5495 3.53018 24.9745 1.80518 23.0245 1.80518C21.1495 1.80518 19.4995 3.45518 19.4995 5.55518V32.7802Z"
              fill="currentColor"
            />
            <path
              d="M15.7495 32.7054L21.7495 31.1304L15.2245 6.30541C14.7745 4.58041 13.0495 3.53041 11.3995 3.90541C9.74948 4.35541 8.77448 6.08041 9.22448 7.80541L15.7495 32.7054Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </h1>

      <div className="home__subtitle-container">
        <h3 className="home__subtitle">
          <span className="home__subtitle-text">{displayText}</span>
          <span className="home__cursor">|</span>
        </h3>
      </div>

      <p className="home__description">
        I craft beautiful, interactive web experiences with modern technologies.
        Passionate about clean code, intuitive design, and bringing ideas to life
        through innovative frontend solutions.
      </p>

      <div className="home__stats">
        <div className="home__stat-item">
          <span className="home__stat-number">2+</span>
          <span className="home__stat-label">Years Experience</span>
        </div>
        <div className="home__stat-item">
          <span className="home__stat-number">10+</span>
          <span className="home__stat-label">Projects Completed</span>
        </div>
        <div className="home__stat-item">
          <span className="home__stat-number">5+</span>
          <span className="home__stat-label">Technologies</span>
        </div>
      </div>

      <div className="home__cta">
        <a href="#contact" className="btn btn--primary btn--large home__contact-btn">
          <span>Get In Touch</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </a>

        <a href="#about" className="btn btn--secondary home__about-btn">
          <span>Learn More</span>
        </a>
      </div>
    </div>
  );
};

export default Data;
