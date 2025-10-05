import React, { useState } from "react";
import "./qualification.css";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section className="qualification section" id="portfolio">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personal journey</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className={
              toggleState === 1
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i>
            Education
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i>
            Experience
          </div>
        </div>

        <div className="qualification__sections">
          {/* Education */}
          <div
            className={
              toggleState === 1
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">Computer Science</h3>
                <span className="qualification__subtitle">FPT University</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> 2020 - 2025
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">High School Education</h3>
                <span className="qualification__subtitle">
                  Ha Bac High School
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> 2017 - 2020
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">
                  LCMS (Laundry Chain Management System)
                </h3>
                <span className="qualification__subtitle">
                  FPT University - Project Manager, Full-stack Developer
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> 2025 - Graduation Project
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">Mark Management System</h3>
                <span className="qualification__subtitle">
                  FPT University - Backend & Frontend Developer
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> 2024
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">
                  Frontend Developer (ReactJs)
                </h3>
                <span className="qualification__subtitle">
                  Technixo Software Company Limited
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Dec 2023 - Apr 2024
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">Sell Phone Card</h3>
                <span className="qualification__subtitle">
                  FPT University - Java Developer
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> 2023 - Mini Project
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">Frontend Developer</h3>
                <span className="qualification__subtitle">
                  TrueConnect Joint Stock Company
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> July 2022 - Nov 2022
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">Frontend Developer</h3>
                <span className="qualification__subtitle">
                  Eztek Digital Solutions Company
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Mar 2022 - July 2022
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">Thriffly – Mobileapp</h3>
                <span className="qualification__subtitle">
                  FPT University - Android Developer
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Project
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">E-commerce Website</h3>
                <span className="qualification__subtitle">
                  FPT University - Full-stack Developer
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Project
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>

            <div className="qualification__data">
              <div className="qualification__content-card">
                <h3 className="qualification__title">
                  Alex – Princess Rescue Game
                </h3>
                <span className="qualification__subtitle">
                  FPT University - Game Developer (Unity)
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> Project
                </div>
              </div>

              <div className="qualification__timeline">
                <span className="qualification__rounder"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
