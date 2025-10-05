import React, { useState } from "react";
import "./services.css";

const Services = () => {
  const [activeModal, setActiveModal] = useState(null);

  const services = [
    {
      id: 1,
      icon: "uil-web-grid",
      title: "Frontend Development",
      description: "Modern web applications with React & JavaScript",
      features: [
        "Responsive UI/UX development with HTML5, CSS3, JavaScript ES6+",
        "Modern React applications with hooks and state management",
        "Interactive user interfaces with smooth animations",
        "Performance optimization and SEO implementation",
        "Cross-browser compatibility and mobile-first design"
      ]
    },
    {
      id: 2,
      icon: "uil-server-network",
      title: "Backend Development",
      description: "Robust server-side solutions with .NET & Java",
      features: [
        "RESTful API development with C# .NET and Java",
        "Database design and optimization with SQL Server & MySQL",
        "Microservices architecture and cloud deployment",
        "Authentication and authorization systems",
        "Performance monitoring and error handling"
      ]
    },
    {
      id: 3,
      icon: "uil-mobile-android",
      title: "Full-Stack Solutions",
      description: "End-to-end web application development",
      features: [
        "Complete MERN stack development (MongoDB, Express, React, Node.js)",
        "E-commerce platforms with payment integration",
        "Content Management Systems (CMS) and admin panels",
        "Real-time applications with WebSocket connectivity",
        "DevOps and CI/CD pipeline implementation"
      ]
    }
  ];

  const openModal = (serviceId) => {
    setActiveModal(serviceId);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.classList.remove('modal-open');
  };

  return (
    <section className="services section" id="services">
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">What I can do for you</span>

      <div className="services__container container">
        <div className="services__grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card__header">
                <div className="service-card__icon">
                  <i className={`uil ${service.icon}`}></i>
                </div>
                <div className="service-card__content">
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__description">{service.description}</p>
                </div>
              </div>

              <div className="service-card__features">
                <ul className="service-card__list">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="service-card__item">
                      <i className="uil uil-check service-card__check"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-card__footer">
                <button
                  className="btn btn--outline service-card__btn"
                  onClick={() => openModal(service.id)}
                >
                  <span>View Details</span>
                  <i className="uil uil-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Modal */}
      {services.map((service) => (
        <div
          key={service.id}
          className={`service-modal ${activeModal === service.id ? 'service-modal--active' : ''}`}
          onClick={closeModal}
        >
          <div className="service-modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="service-modal__header">
              <div className="service-modal__icon">
                <i className={`uil ${service.icon}`}></i>
              </div>
              <div className="service-modal__title-section">
                <h3 className="service-modal__title">{service.title}</h3>
                <p className="service-modal__description">{service.description}</p>
              </div>
              <button
                className="service-modal__close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <i className="uil uil-times"></i>
              </button>
            </div>

            <div className="service-modal__body">
              <h4 className="service-modal__features-title">What's included:</h4>
              <ul className="service-modal__features-list">
                {service.features.map((feature, index) => (
                  <li key={index} className="service-modal__feature">
                    <div className="service-modal__feature-icon">
                      <i className="uil uil-check-circle"></i>
                    </div>
                    <span className="service-modal__feature-text">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-modal__footer">
              <a href="#contact" className="btn btn--primary" onClick={closeModal}>
                <span>Get Started</span>
                <i className="uil uil-message"></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
