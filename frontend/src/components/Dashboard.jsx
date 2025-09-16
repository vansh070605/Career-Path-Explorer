import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CollegeExplorer from './CollegeExplorer';
import CareerQuiz from './CareerQuiz';
import SkillBuilder from './SkillBuilder';
import './Dashboard.css';

const features = [
  {
    key: 'colleges',
    icon: 'fas fa-university',
    title: 'Explore Colleges',
    description: 'Find details about Tier 1 and Tier 2 engineering colleges across India.',
  },
  {
    key: 'quiz',
    icon: 'fas fa-tasks',
    title: 'AI Career Path Explorer',
    description: 'Answer 10 questions to get a personalized career recommendation.',
  },
  {
    key: 'skills',
    icon: 'fas fa-lightbulb',
    title: 'Skill Builder',
    description: 'Discover and learn the key skills required for your chosen career path.',
  },
];

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
            <header className="home-header">
              <h1>Welcome back, {user?.name || 'Explorer'}!</h1>
              <p>Your journey to a successful career continues here. What would you like to do today?</p>
            </header>
            <div className="feature-cards-container">
              {features.map((feature, index) => (
                <div 
                  key={feature.key} 
                  className="feature-card" 
                  onClick={() => setActiveView(feature.key)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-icon">
                    <i className={feature.icon}></i>
                  </div>
                  <div className="card-content">
                    <h2>{feature.title}</h2>
                    <p>{feature.description}</p>
                  </div>
                  <span className="card-arrow">&rarr;</span>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <Header user={user} onLogout={onLogout} />
      <main className="dashboard-main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;