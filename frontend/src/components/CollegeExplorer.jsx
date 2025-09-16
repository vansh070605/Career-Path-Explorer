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

const CollegeCard = ({ college, animationDelay }) => (
  <div 
    className="college-card" 
    style={{ animationDelay: `${animationDelay}ms` }}
  >
    <div className="card-content">
      <h3>{college.name}</h3>
      <p><i className="fas fa-map-marker-alt"></i> {college.location}</p>
    </div>
    <a href={college.link} target="_blank" rel="noopener noreferrer" className="btn-visit">
      Visit Website <i className="fas fa-external-link-alt"></i>
    </a>
  </div>
);

const CollegeExplorer = () => {
  return (
    <div className="college-explorer-container">
      <div className="college-explorer-header">
        <h2 className="explorer-title">Explore Top Engineering Colleges</h2>
      </div>
      
      <div className="college-section">
        <h3>Tier 1 Colleges</h3>
        <div className="college-list">
          {tier1Colleges.map((college, index) => (
            <CollegeCard 
              key={index} 
              college={college} 
              animationDelay={index * 100} 
            />
          ))}
        </div>
      </div>
      
      <div className="college-section">
        <h3>Tier 2 Colleges</h3>
        <div className="college-list">
          {tier2Colleges.map((college, index) => (
            <CollegeCard 
              key={index} 
              college={college} 
              animationDelay={(tier1Colleges.length + index) * 100} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollegeExplorer;