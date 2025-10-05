import React from "react";
import "./home.css";
import Social from "./Social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";
import ConstellationBackground from "./ConstellationBackground";
import NewAvatar from "../../assets/new-avt.png";

const Home = () => {
  return (
    <section className="home section" id="home">
      <ConstellationBackground />
      <div className="home__container container grid">
        <div className="home__content grid">
          <Social />

          <div className="home__img">
            <img src={NewAvatar} alt="Vũ Xuân Anh" className="home__img-photo" />
          </div>
          <Data />
        </div>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
