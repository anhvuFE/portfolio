import React from "react";

const SkillCard = ({ skill }) => {
  const { name, icon, description, level } = skill;

  return (
    <div className="skill-card">
      <div className="skill-card__icon">
        {icon}
      </div>
      <div className="skill-card__content">
        <h3 className="skill-card__name">{name}</h3>
        <p className="skill-card__description">{description}</p>
        <div className="skill-card__level">
          <span className="skill-card__level-text">{level}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;