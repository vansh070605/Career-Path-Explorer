import React from 'react';
import './CollegeExplorer.css';

const tier1Colleges = [
  { name: 'IIT Bombay', location: 'Mumbai', link: 'https://www.iitb.ac.in/' },
  { name: 'IIT Delhi', location: 'Delhi', link: 'https://home.iitd.ac.in/' },
  { name: 'IIT Madras', location: 'Chennai', link: 'https://www.iitm.ac.in/' },
];

const tier2Colleges = [
  { name: 'NIT Trichy', location: 'Tiruchirappalli', link: 'https://www.nitt.edu/' },
  { name: 'NIT Warangal', location: 'Warangal', link: 'https://www.nitw.ac.in/' },
  { name: 'VIT Vellore', location: 'Vellore', link: 'https://vit.ac.in/' },
];

const CollegeCard = ({ college }) => (
  <div className="college-card">
    <h3>{college.name}</h3>
    <p>{college.location}</p>
    <a href={college.link} target="_blank" rel="noopener noreferrer">Visit Website</a>
  </div>
);

const CollegeExplorer = () => {
  return (
    <div className="college-explorer-container">
      <h2>Explore Top Engineering Colleges</h2>
      <div className="college-section">
        <h3>Tier 1 Colleges</h3>
        <div className="college-list">
          {tier1Colleges.map((college, index) => (
            <CollegeCard key={index} college={college} />
          ))}
        </div>
      </div>
      <div className="college-section">
        <h3>Tier 2 Colleges</h3>
        <div className="college-list">
          {tier2Colleges.map((college, index) => (
            <CollegeCard key={index} college={college} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollegeExplorer;