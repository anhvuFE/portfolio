import React from "react";
import "./footer.css";
import Sakura from "../sakura/Sakura";

const Footer = () => {
  return (
    <footer className="footer sakura-container">
      <Sakura />
      <div className="footer__container container">
        <div className="footer__header">
          <h1 className="footer__title">Xuan Anh</h1>
          <p className="footer__subtitle">Frontend Developer</p>
        </div>

        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>
          <li>
            <a href="#portfolio" className="footer__link">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="footer__link">
              Contact
            </a>
          </li>
        </ul>

        <div className="footer__social">
          <a
            href="https://www.facebook.com/xuananhvu2312/"
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-facebook"></i>
          </a>
          <a
            href="https://github.com/anhvuFE"
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-github"></i>
          </a>
          <a
            href="https://web.telegram.org/"
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-telegram"></i>
          </a>
        </div>

        <span className="footer__copy">
          &#169; {new Date().getFullYear()} Xuan Anh. All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
