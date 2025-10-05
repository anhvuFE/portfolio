import React from "react";

const Social = () => {
  return (
    <div className="home__social">
      <a
        href="https://www.facebook.com/xuananhvu2312/"
        className="home__social-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="uil uil-facebook"></i>
      </a>

      <a
        href="https://github.com/anhvuFE"
        className="home__social-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="uil uil-github-alt"></i>
      </a>

      <a
        href="https://web.telegram.org/"
        className="home__social-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="uil uil-telegram"></i>
      </a>
    </div>
  );
};

export default Social;
