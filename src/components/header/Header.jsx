import React, { useState, useEffect } from "react";
import "./header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: "uil-estate" },
    { id: "about", label: "About", icon: "uil-user" },
    { id: "skills", label: "Skills", icon: "uil-file-alt" },
    { id: "services", label: "Services", icon: "uil-briefcase-alt" },
    { id: "qualification", label: "Portfolio", icon: "uil-scenery" },
    { id: "contact", label: "Contact", icon: "uil-message" },
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <nav className="nav container">
        <a href="#home" className="nav__logo">
          <span className="nav__logo-text">Xuan Anh</span>
          <span className="nav__logo-dot">.</span>
        </a>

        <div className={`nav__menu ${isMenuOpen ? "nav__menu--open" : ""}`}>
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.id} className="nav__item">
                <a
                  href={`#${item.id}`}
                  className={`nav__link ${activeSection === item.id ? "nav__link--active" : ""}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <i className={`uil ${item.icon} nav__icon`}></i>
                  <span className="nav__text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <button
            className="nav__close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="uil uil-times"></i>
          </button>
        </div>

        <button
          className="nav__toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="nav__toggle-line"></span>
          <span className="nav__toggle-line"></span>
          <span className="nav__toggle-line"></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
