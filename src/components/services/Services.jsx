import React, { useState } from "react";
import "./services.css";

const Services = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    // If clicking the same tab, close it
    if (toggleState === index) {
      setToggleState(0);
    } else {
      // Otherwise set to the new tab
      setToggleState(index);
    }
  };

  return (
    <section className="services section" id="services">
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">What I Offer</span>
      <div className="services__container container grid">
        <div className="services__content">
          <div>
            <i className="uil uil-web-grid services__icon"></i>
            <h3 className="services__title">
              Full-stack <br /> Web Developer
            </h3>
          </div>

          <span className="services__button" onClick={() => toggleTab(1)}>
            View More
            <i className="uil uil-arrow-right services__button-icon"></i>
          </span>
        </div>

        <div className="services__content">
          <div>
            <i className="uil uil-arrow services__icon"></i>
            <h3 className="services__title">
              C# .NET <br /> Developer
            </h3>
          </div>

          <span className="services__button" onClick={() => toggleTab(2)}>
            View More
            <i className="uil uil-arrow-right services__button-icon"></i>
          </span>
        </div>

        <div className="services__content">
          <div>
            <i className="uil uil-mobile-android services__icon"></i>
            <h3 className="services__title">
              Mobile & Game <br /> Developer
            </h3>
          </div>

          <span className="services__button" onClick={() => toggleTab(3)}>
            View More
            <i className="uil uil-arrow-right services__button-icon"></i>
          </span>
        </div>
      </div>

      {/* Full-stack Web Developer Modal */}
      <div
        className={
          toggleState === 1 ? "services__modal active-modal" : "services__modal"
        }
      >
        <div className="services__modal-content">
          <i
            onClick={() => toggleTab(0)}
            className="uil uil-times services__modal-close"
          ></i>
          <h3 className="services__modal-title">Full-stack Web Developer</h3>
          <p className="services__modal-description">
            Services with professional experience in both front-end and back-end
            technologies, delivering quality solutions for clients and
            companies.
          </p>
          <ul className="services__modal-services grid">
            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Responsive UI/UX development with HTML, CSS, JavaScript
              </p>
            </li>

            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Front-end development with Angular, React frameworks
              </p>
            </li>

            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Back-end development with .NET, Java, and SQL databases
              </p>
            </li>

            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                E-commerce solutions and content management systems
              </p>
            </li>
            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                WordPress development and customization
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* C# .NET Developer Modal */}
      <div
        className={
          toggleState === 2 ? "services__modal active-modal" : "services__modal"
        }
      >
        <div className="services__modal-content">
          <i
            onClick={() => toggleTab(0)}
            className="uil uil-times services__modal-close"
          ></i>
          <h3 className="services__modal-title">C# .NET Developer</h3>
          <p className="services__modal-description">
            Specialized in developing robust .NET applications with modern
            architecture patterns and database integration.
          </p>
          <ul className="services__modal-services grid">
            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Management systems: Student records, Library, Hotel management
              </p>
            </li>

            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                E-commerce platforms: Bookstore, Health supplements
              </p>
            </li>

            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Web API development with C# and .NET framework
              </p>
            </li>

            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                MVC architecture implementation with Entity Framework
              </p>
            </li>
            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Database design and optimization with SQL Server and MySQL
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile & Game Developer Modal */}
      <div
        className={
          toggleState === 3 ? "services__modal active-modal" : "services__modal"
        }
      >
        <div className="services__modal-content">
          <i
            onClick={() => toggleTab(0)}
            className="uil uil-times services__modal-close"
          ></i>
          <h3 className="services__modal-title">Mobile & Game Developer</h3>
          <p className="services__modal-description">
            Creating engaging mobile applications and interactive games with
            modern technologies and development frameworks.
          </p>
          <ul className="services__modal-services grid">
            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Mobile application development (Thriffly - second-hand
                marketplace)
              </p>
            </li>

            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Unity game development (Alex - Princess Rescue game)
              </p>
            </li>

            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Responsive UI design for mobile applications
              </p>
            </li>

            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Cross-platform solutions and native app development
              </p>
            </li>
            <li className="services__modal-service">
              <i className="uil uil-check-circle services__modal-icon"></i>
              <p className="services__modal-info">
                Final year project: Laundry Chain Management System (LCMS) with
                React and C# Web API
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
