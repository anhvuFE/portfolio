import React, { useState } from "react";
import "./skills.css";
import SkillCard from "./SkillCard";
import { skillsData, getSkillsByCategory, getCategories } from "./skillsData";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = getCategories();

  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return skillsData;
    }
    return getSkillsByCategory(activeCategory);
  };

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      tools: "Tools & Others"
    };
    return categoryNames[category] || category;
  };

  return (
    <section className="skill section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">My technical expertise</span>

      {/* Category Filter */}
      <div className="skills__filter">
        <button
          className={`skills__filter-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All Skills
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`skills__filter-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {getCategoryDisplayName(category)}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="skills__container container">
        <div className="skills__grid">
          {getFilteredSkills().map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
