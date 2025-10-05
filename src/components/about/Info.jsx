import React from "react";

const Info = () => {
  const stats = [
    {
      icon: "bx-award",
      title: "Experience",
      subtitle: "2+ Years Working",
      color: "primary"
    },
    {
      icon: "bx-briefcase-alt",
      title: "Completed",
      subtitle: "15+ Projects",
      color: "success"
    },
    {
      icon: "bx-support",
      title: "Support",
      subtitle: "Online 24/7",
      color: "info"
    }
  ];

  return (
    <div className="about__info">
      {stats.map((stat, index) => (
        <div key={index} className={`about__box about__box--${stat.color}`}>
          <div className="about__box-icon">
            <i className={`bx ${stat.icon} about__icon`}></i>
          </div>
          <div className="about__box-content">
            <h3 className="about__box-title">{stat.title}</h3>
            <span className="about__box-subtitle">{stat.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
