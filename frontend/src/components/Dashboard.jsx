import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CollegeExplorer from './CollegeExplorer';
import CareerQuiz from './CareerQuiz';
import SkillBuilder from './SkillBuilder';
import CareerPathVisualizer from './CareerPathVisualizer';
import TimelineTracker from './TimelineTracker'; // 1. Import the new component
import './Dashboard.css';
import { useTranslation } from 'react-i18next';

const Dashboard = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('home');
  const { t } = useTranslation();

  const features = [
    {
      key: 'colleges',
      icon: 'fas fa-university',
      title: t('common.exploreColleges'),
      description: t('dashboard.exploreCollegesDesc', 'Search and filter colleges across India by state and rank.'),
    },
    {
      key: 'quiz',
      icon: 'fas fa-tasks',
      title: t('common.aiCareerQuiz'),
      description: t('dashboard.aiCareerQuizDesc', 'Answer questions to get a personalized career recommendation.'),
    },
    {
      key: 'skills',
      icon: 'fas fa-lightbulb',
      title: t('common.skillBuilder'),
      description: t('dashboard.skillBuilderDesc', 'Discover the key skills required for your chosen career path.'),
    },
    {
      key: 'visualizer',
      icon: 'fas fa-project-diagram',
      title: t('common.careerVisualizer'),
      description: t('dashboard.careerVisualizerDesc', 'Visually explore the connections between subjects, degrees, and careers.'),
    },
    {
      key: 'timeline',
      icon: 'fas fa-calendar-alt',
      title: t('common.timelineTracker'),
      description: t('dashboard.timelineTrackerDesc', 'Stay updated on all important admission and scholarship dates.'),
    },
  ];

  const handleQuizComplete = (result) => {
    setActiveView('home');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'colleges':
        return <CollegeExplorer />;
      case 'quiz':
        return <CareerQuiz onQuizComplete={handleQuizComplete} />;
      case 'skills':
        return <SkillBuilder />;
      case 'visualizer':
        return <CareerPathVisualizer />;
      case 'timeline':
        return <TimelineTracker />;
      case 'home':
      default:
        return (
          <div className="home-view">
            <header className="home-header">
              <h1>{t('dashboard.welcomeBackUser', { name: user?.name || 'Explorer' })}</h1>
              <p>{t('dashboard.welcomeSub', 'Your journey to a successful career continues here. What would you like to do today?')}</p>
            </header>
            <div className="feature-cards-container">
              {features.map((feature, index) => (
                <div 
                  key={feature.key} 
                  className="feature-card" 
                  onClick={() => setActiveView(feature.key)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-icon"><i className={feature.icon}></i></div>
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