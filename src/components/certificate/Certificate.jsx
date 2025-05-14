import React, { useState, useEffect } from "react";
import "./certificate.css";

// Import certificate images
import ssl from "../../assets/SSL.jpg";
import nwc from "../../assets/NWC.jpg";
import swe from "../../assets/SWE.jpg";
import wed from "../../assets/WED.jpg";
import enw from "../../assets/ENW.jpg";
import project from "../../assets/Project.jpg";
import pmg from "../../assets/PMG.jpg";
import design from "../../assets/Design.jpg";

const Certificate = () => {
  const certificates = [
    {
      id: 1,
      image: design,
      title: "Design",
      issuer: "Coursera",
    },
    {
      id: 2,
      image: enw,
      title: "English for Networking",
      issuer: "Coursera",
    },
    {
      id: 3,
      image: nwc,
      title: "Network Configuration",
      issuer: "Coursera",
    },
    {
      id: 4,
      image: pmg,
      title: "	Ethics In IT",
      issuer: "Coursera",
    },
    {
      id: 5,
      image: project,
      title: "Project Management",
      issuer: "Coursera",
    },
    {
      id: 6,
      image: ssl,
      title: "SSL Certificate",
      issuer: "Coursera",
    },
    {
      id: 7,
      image: swe,
      title: "Software Engineering",
      issuer: "Coursera",
    },
    {
      id: 8,
      image: wed,
      title: "Web Development",
      issuer: "Coursera",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [autoSlide, setAutoSlide] = useState(true);

  // Handle responsive slides count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalSlides = certificates.length;
  const maxIndex = totalSlides - slidesToShow;

  // Auto slide function with smooth transition
  useEffect(() => {
    let interval;

    if (autoSlide && !modalOpen) {
      interval = setInterval(() => {
        if (!isAnimating) {
          handleNext();
        }
      }, 3000); // slide every 3 seconds
    }

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, isAnimating, autoSlide, modalOpen]);

  // Handle smooth transition to next slide
  const handleNext = () => {
    setIsAnimating(true);

    if (currentIndex >= maxIndex) {
      // When at the end, we go to position 0 smoothly
      // First, set a position just after the end
      setCurrentIndex(currentIndex + 1);

      // After a brief delay, remove the transition and jump to the beginning
      setTimeout(() => {
        setCurrentIndex(0);
        setIsAnimating(false);
      }, 500); // Match this with your CSS transition time
    } else {
      setCurrentIndex(currentIndex + 1);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  // Handle smooth transition to previous slide
  const handlePrev = () => {
    setIsAnimating(true);

    if (currentIndex <= 0) {
      // When at the beginning, we go to the end smoothly
      // First set position just before the beginning
      setCurrentIndex(-1);

      // After a brief delay, remove the transition and jump to the end
      setTimeout(() => {
        setCurrentIndex(maxIndex);
        setIsAnimating(false);
      }, 500); // Match this with your CSS transition time
    } else {
      setCurrentIndex(currentIndex - 1);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  // Manual navigation with smooth transitions
  const nextSlide = () => {
    if (!isAnimating) {
      handleNext();
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      handlePrev();
    }
  };

  // Open modal with certificate details
  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    setModalOpen(true);
    setAutoSlide(false); // Pause auto-sliding when modal is open
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCertificate(null);
    setAutoSlide(true); // Resume auto-sliding when modal is closed
  };

  // Handle click outside modal to close it
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("certificate__modal")) {
      closeModal();
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [modalOpen]);

  // Calculate how many indicators we need
  const indicatorCount = Math.ceil((totalSlides - slidesToShow + 1) / 1);

  // Get the actual index for display, handling edge cases
  const getDisplayIndex = () => {
    if (currentIndex < 0) return 0;
    if (currentIndex > maxIndex) return maxIndex;
    return currentIndex;
  };

  return (
    <section className="certificate section" id="certificates">
      <h2 className="section__title">Certificates</h2>
      <span className="section__subtitle">My coursera certifications</span>

      <div className="certificate__container container">
        <div className="certificate__content">
          <div className="certificate__slider">
            {/* Slider navigation */}
            <div className="certificate__navigation">
              <div className="certificate__button prev" onClick={prevSlide}>
                <i className="uil uil-angle-left"></i>
              </div>
              <div className="certificate__button next" onClick={nextSlide}>
                <i className="uil uil-angle-right"></i>
              </div>
            </div>

            {/* Certificates */}
            <div
              className="certificate__track"
              style={{
                transform: `translateX(-${
                  (getDisplayIndex() * 100) / slidesToShow
                }%)`,
                gridTemplateColumns: `repeat(${totalSlides}, calc(100% / ${slidesToShow}))`,
                transition: isAnimating ? "transform 0.5s ease" : "none",
              }}
            >
              {certificates.map((cert) => (
                <div className="certificate__item" key={cert.id}>
                  <div
                    className="certificate__card"
                    onClick={() => openModal(cert)}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="certificate__img"
                    />
                    <h3 className="certificate__name">{cert.title}</h3>
                    <span className="certificate__issuer">{cert.issuer}</span>
                    <div className="certificate__view">
                      <i className="uil uil-eye"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicators */}
            <div className="certificate__indicators">
              {Array.from({ length: indicatorCount }).map((_, index) => (
                <span
                  key={index}
                  className={`certificate__indicator ${
                    index === Math.floor(getDisplayIndex() / slidesToShow)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index * slidesToShow);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {modalOpen && selectedCertificate && (
        <div className="certificate__modal" onClick={handleOutsideClick}>
          <div className="certificate__modal-content">
            <div className="certificate__modal-close" onClick={closeModal}>
              <i className="uil uil-times"></i>
            </div>

            <h3 className="certificate__modal-title">
              {selectedCertificate.title}
            </h3>

            <div className="certificate__modal-img-container">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="certificate__modal-img"
              />
            </div>

            <div className="certificate__modal-info">
              <p className="certificate__modal-description">
                This is a certificate issued by {selectedCertificate.issuer} for
                completing the {selectedCertificate.title} course.
              </p>
              <p className="certificate__modal-date">
                Issue Date: January 2025
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificate;
