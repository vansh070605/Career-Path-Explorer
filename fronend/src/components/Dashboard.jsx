import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CollegeExplorer from './CollegeExplorer';
import CareerQuiz from './CareerQuiz';
import SkillBuilder from './SkillBuilder';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('home');

  const renderContent = () => {
    switch (activeView) {
      case 'colleges':
        return <CollegeExplorer />;
      case 'quiz':
        return <CareerQuiz />;
      case 'skills':
        return <SkillBuilder />;
      case 'home':
      default:
        return (
          <div className="home-view">
            <h1>Your Career Journey Starts Here</h1>
            <div className="feature-cards-container">
              <div className="feature-card" onClick={() => setActiveView('colleges')}>
                <i className="fas fa-university"></i>
                <h2>Explore Colleges</h2>
                <p>Find details about Tier 1 and Tier 2 engineering colleges across India.</p>
              </div>
              <div className="feature-card" onClick={() => setActiveView('quiz')}>
                <i className="fas fa-tasks"></i>
                <h2>AI Career Path Explorer</h2>
                <p>Answer 10 questions to get a personalized career recommendation.</p>
              </div>
              <div className="feature-card" onClick={() => setActiveView('skills')}>
                <i className="fas fa-lightbulb"></i>
                <h2>Skill Builder</h2>
                <p>Discover and learn the key skills required for your chosen career path.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setActiveView={setActiveView} />
      <Header user={user} onLogout={onLogout} />
      <main className="dashboard-main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;