import React from "react";
import "./about.css";
import AboutImg from "../../assets/new-avt.png";
import CV from "../../assets/CV-VuXuanAnh.pdf";
import Info from "./Info";

const About = () => {
  const techStack = [
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "TypeScript", level: 70 },
    { name: "Node.js", level: 75 },
    { name: "CSS/SCSS", level: 90 },
    { name: "HTML", level: 95 }
  ];

  const achievements = [
    {
      icon: "🏆",
      title: "Best Frontend Award",
      description: "University coding competition 2023"
    },
    {
      icon: "🎓",
      title: "Computer Science Degree",
      description: "Bachelor's in Computer Science"
    },
    {
      icon: "💼",
      title: "Professional Experience",
      description: "2+ years in web development"
    }
  ];

  return (
    <section className="about section" id="about">
      <h2 className="section__title">About Me</h2>
      <span className="section__subtitle">Get to know me better</span>

      <div className="about__container container">
        <div className="about__content">
          <div className="about__image-section">
            <div className="about__img-wrapper">
              <img src={AboutImg} alt="Vũ Xuân Anh" className="about__img" />
              <div className="about__img-overlay">
                <div className="about__img-pattern"></div>
              </div>
            </div>
          </div>

          <div className="about__info-section">
            <Info />

            <div className="about__story">
              <h3 className="about__story-title">My Journey</h3>
              <p className="about__description">
                Passionate frontend developer with a keen eye for creating beautiful,
                intuitive user experiences. I specialize in modern web technologies
                and love bringing creative ideas to life through clean, efficient code.
              </p>
              <p className="about__description">
                With 2+ years of experience, I've worked on diverse projects ranging
                from responsive websites to complex web applications, always focusing
                on performance, accessibility, and user satisfaction.
              </p>
            </div>

            <div className="about__skills-preview">
              <h4 className="about__skills-title">Core Technologies</h4>
              <div className="about__tech-stack">
                {techStack.map((tech, index) => (
                  <div key={index} className="about__tech-item">
                    <div className="about__tech-info">
                      <span className="about__tech-name">{tech.name}</span>
                      <span className="about__tech-level">{tech.level}%</span>
                    </div>
                    <div className="about__tech-bar">
                      <div
                        className="about__tech-progress"
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about__achievements">
              <h4 className="about__achievements-title">Highlights</h4>
              <div className="about__achievements-grid">
                {achievements.map((achievement, index) => (
                  <div key={index} className="about__achievement-card">
                    <div className="about__achievement-icon">{achievement.icon}</div>
                    <h5 className="about__achievement-title">{achievement.title}</h5>
                    <p className="about__achievement-desc">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="about__actions">
              <a download="" href={CV} className="btn btn--primary">
                <span>Download CV</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>

              <a href="#contact" className="btn btn--secondary">
                <span>Let's Talk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
