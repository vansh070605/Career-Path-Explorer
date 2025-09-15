import React from 'react';
import './SkillBuilder.css';

const skills = [
  { name: 'Problem Solving', description: 'Essential for engineering and tech roles.', icon: 'fas fa-puzzle-piece' },
  { name: 'Communication', description: 'Key for teamwork and leadership.', icon: 'fas fa-comments' },
  { name: 'Data Structures & Algorithms', description: 'The foundation of computer science.', icon: 'fas fa-sitemap' },
  { name: 'Project Management', description: 'Learn to plan and execute projects efficiently.', icon: 'fas fa-tasks' },
  { name: 'Cloud Computing (AWS/Azure)', description: 'High-demand skill in the modern tech landscape.', icon: 'fas fa-cloud' },
];

const SkillBuilder = () => {
  return (
    <div className="skill-builder-container">
      <div className="skill-builder-header">
        <h2>Skill Builder – Learn What Matters</h2>
        <p>Here are some of the most in-demand skills for top careers. Click to learn more.</p>
      </div>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="skill-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="skill-icon">
              <i className={skill.icon}></i>
            </div>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
            <button className="btn-learn-more">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillBuilder;