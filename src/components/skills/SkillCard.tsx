import React from "react";
import { Skill } from "./skillsData";

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const { name, icon, description, level } = skill;

  return (
    <div
      className="skill-card"
      style={{
        background: "#161616",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "12px",
        padding: "1.5rem",
        transition: "all 0.3s ease"
      }}
    >
      <div
        className="skill-card__icon"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem"
        }}
      >
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt={name}
            style={{ width: 48, height: 48, objectFit: "contain" }}
          />
        ) : (
          icon
        )}
      </div>
      <div className="skill-card__content">
        <h3
          className="skill-card__name"
          style={{ color: "#e6edf3", fontWeight: 600, marginBottom: "0.5rem" }}
        >
          {name}
        </h3>
        <p
          className="skill-card__description"
          style={{ color: "#8b949e", fontSize: "0.875rem", lineHeight: 1.6 }}
        >
          {description}
        </p>
        <div className="skill-card__level" style={{ marginTop: "0.75rem" }}>
          <span
            className="skill-card__level-text"
            style={{
              color: "#0eaddf",
              fontSize: "0.8rem",
              fontWeight: 500,
              textTransform: "capitalize"
            }}
          >
            {level}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
