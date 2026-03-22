import React, { useEffect, useState } from "react";

const Data = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const roles = ["Frontend Developer", "React Specialist", "UI/UX Enthusiast"];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "10+", label: "Projects Completed" },
    { value: "5+", label: "Technologies" },
  ];

  return (
    <div className="home__data">
      <span className="home__greeting">Hello, I'm</span>
      <h1 className="home__name">Vũ Xuân Anh</h1>

      <h3 className="home__education">
        {displayText}
        <span className="home__cursor">|</span>
      </h3>

      <p className="home__description">
        I craft beautiful, interactive web experiences with modern technologies.
        Passionate about clean code, intuitive design, and bringing ideas to life
        through innovative frontend solutions.
      </p>

      <div className="home__stats">
        {stats.map((stat, index) => (
          <div className="home__stat" key={index}>
            <h3 className="home__stat-value">{stat.value}</h3>
            <p className="home__stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="home__buttons">
        <a href="#contact" className="button button--flex">
          Get In Touch
          <i className="uil uil-message button__icon"></i>
        </a>
        <a href="#about" className="button button--ghost">
          Learn More
          <i className="uil uil-arrow-right button__icon"></i>
        </a>
      </div>
    </div>
  );
};

export default Data;