import React from "react";

interface SkillItem {
  name: string;
  level: string;
}

const Frontend: React.FC = () => {
  const leftSkills: SkillItem[] = [
    { name: "HTML", level: "Advanced" },
    { name: "CSS", level: "Intermediate" },
    { name: "JavaScript", level: "Intermediate" },
    { name: "TypeScript", level: "Basic" }
  ];

  const rightSkills: SkillItem[] = [
    { name: "Bootstrap", level: "Intermediate" },
    { name: "Git", level: "Intermediate" },
    { name: "React", level: "Intermediate" },
    { name: "Wordpress", level: "Intermediate" }
  ];

  return (
    <div
      className="skills__content"
      style={{
        background: "#161616",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "12px",
        padding: "2rem"
      }}
    >
      <h3
        className="skills__title"
        style={{ color: "#e6edf3", fontWeight: 600, marginBottom: "1.5rem" }}
      >
        Frontend Developer
      </h3>
      <div
        className="skills__box"
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
      >
        <div className="skills__group" style={{ flex: 1, minWidth: "200px" }}>
          {leftSkills.map((skill: SkillItem) => (
            <div
              key={skill.name}
              className="skills__data"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem"
              }}
            >
              <i
                className="bx bx-badge-check"
                style={{ color: "#0eaddf", fontSize: "1.2rem" }}
              />
              <div>
                <h3
                  className="skills__name"
                  style={{
                    color: "#e6edf3",
                    fontSize: "1rem",
                    fontWeight: 500,
                    margin: 0
                  }}
                >
                  {skill.name}
                </h3>
                <span
                  className="skills__level"
                  style={{ color: "#6e7681", fontSize: "0.85rem" }}
                >
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="skills__group" style={{ flex: 1, minWidth: "200px" }}>
          {rightSkills.map((skill: SkillItem) => (
            <div
              key={skill.name}
              className="skills__data"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem"
              }}
            >
              <i
                className="bx bx-badge-check"
                style={{ color: "#0eaddf", fontSize: "1.2rem" }}
              />
              <div>
                <h3
                  className="skills__name"
                  style={{
                    color: "#e6edf3",
                    fontSize: "1rem",
                    fontWeight: 500,
                    margin: 0
                  }}
                >
                  {skill.name}
                </h3>
                <span
                  className="skills__level"
                  style={{ color: "#6e7681", fontSize: "0.85rem" }}
                >
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Frontend;
