import React from 'react';
import './SkillBuilder.css';

const skills = [
  { name: 'Problem Solving', description: 'Essential for engineering and tech roles.' },
  { name: 'Communication', description: 'Key for teamwork and leadership.' },
  { name: 'Data Structures & Algorithms', description: 'The foundation of computer science.' },
  { name: 'Project Management', description: 'Learn to plan and execute projects efficiently.' },
  { name: 'Cloud Computing (AWS/Azure)', description: 'High-demand skill in the modern tech landscape.' },
];

const SkillBuilder = () => {
  return (
    <div className="skill-builder-container">
      <h2>Skill Builder – Learn What Matters</h2>
      <p>Here are some of the most in-demand skills for top careers. Click to learn more.</p>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
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