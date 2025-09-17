import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import CollegeExplorer from './CollegeExplorer';
import CareerQuiz from './CareerQuiz';
import SkillBuilder from './SkillBuilder';
import CareerPathVisualizer from './CareerPathVisualizer';
import TimelineTracker from './TimelineTracker';
import './Dashboard.css';

const features = [
  { key: 'colleges', icon: 'fas fa-university', title: 'Explore Colleges', description: 'Search and filter colleges across India by state and rank.' },
  { key: 'quiz', icon: 'fas fa-tasks', title: 'AI Career Quiz', description: 'Answer questions for a personalized recommendation.' },
  { key: 'skills', icon: 'fas fa-lightbulb', title: 'Skill Builder', description: 'Discover the key skills required for your chosen career path.' },
  { key: 'visualizer', icon: 'fas fa-project-diagram', title: 'Career Visualizer', description: 'Visually explore the connections between subjects and careers.' },
  { key: 'timeline', icon: 'fas fa-calendar-alt', title: 'Timeline Tracker', description: 'Stay updated on all important admission and scholarship dates.' },
];

const Notifications = ({ notifications, onClear }) => (
    <div className="notifications-panel">
        <div className="notifications-header">
            <h3>Notifications</h3>
            <button onClick={onClear}>Mark all as read</button>
        </div>
        <div className="notifications-list">
            {notifications.length > 0 ? (
                notifications.map((item, index) => (
                    <div key={index} className="notification-item">
                        <i className="fas fa-calendar-alt"></i>
                        <div className="notification-content">
                            <p><strong>{item.title}</strong></p>
                            <span>Deadline: {new Date(item.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-notifications">No new notifications</p>
            )}
        </div>
    </div>
);
Notifications.propTypes = { notifications: PropTypes.array.isRequired, onClear: PropTypes.func.isRequired };

const Dashboard = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('home');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchNotifications = useCallback(() => {
    const eventsData = [
        { title: 'JEE Main 2026 (Session 1) Application', date: '2025-11-22T21:00:00' },
        { title: 'GATE 2026 Registration (with late fee)', date: '2025-10-11T23:59:59' },
        { title: 'Prime Minister\'s Scholarship Scheme (PMSS)', date: '2025-11-30T23:59:59' },
        { title: 'NEET UG 2026 Application', date: '2026-03-07T21:00:00' },
    ];
    const upcomingEvents = eventsData.filter(event => new Date(event.date) > new Date());
    setNotifications(upcomingEvents);
    setUnreadCount(upcomingEvents.length);
  }, []);

  useEffect(() => { fetchNotifications() }, [fetchNotifications]);
  const handleClearNotifications = () => { setUnreadCount(0) };
  
  const renderContent = () => {
    switch (activeView) {
      case 'colleges': return <CollegeExplorer />;
      case 'quiz': return <CareerQuiz />;
      case 'skills': return <SkillBuilder />;
      case 'visualizer': return <CareerPathVisualizer />;
      case 'timeline': return <TimelineTracker />;
      case 'home':
      default:
        return (
          <div className="home-view">
             <header className="home-header">
               <h1>Welcome back, {user?.name || 'Explorer'}!</h1>
               <p>Your journey to a successful career continues here.</p>
             </header>
             <div className="feature-cards-container">
              {features.map((feature, index) => (
                <div key={feature.key} className="feature-card" onClick={() => setActiveView(feature.key)} style={{ animationDelay: `${index * 100}ms` }}>
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
      <Header user={user} onLogout={onLogout} unreadCount={unreadCount} onNotificationClick={() => setShowNotifications(!showNotifications)} />
      {showNotifications && <Notifications notifications={notifications} onClear={handleClearNotifications} />}
      <main className="dashboard-main-content">
        {renderContent()}
      </main>
    </div>
  );
};
Dashboard.propTypes = { user: PropTypes.object, onLogout: PropTypes.func.isRequired };

export default Dashboard;