import React from "react";

const Social = () => {
  return (
    <div className="home__social-horizontal">
      <a
        href="https://github.com/anhvuFE"
        className="home__social-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="uil uil-github-alt"></i>
      </a>

      <a
        href="https://www.facebook.com/xuananhvu2312/"
        className="home__social-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="uil uil-facebook"></i>
      </a>

      <a
        href="https://www.linkedin.com/in/xu%C3%A2n-anh-v%C5%A9-515580367/"
        className="home__social-icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="uil uil-linkedin"></i>
      </a>
    </div>
  );
};

export default Social;
