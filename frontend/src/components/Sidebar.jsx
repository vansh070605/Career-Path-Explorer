import React from 'react';

const Sidebar = ({ setActiveView }) => {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <h3>Career Explorer</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li onClick={() => setActiveView('home')}>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </li>
          <li onClick={() => setActiveView('colleges')}>
            <i className="fas fa-university"></i> Explore Colleges
          </li>
          <li onClick={() => setActiveView('quiz')}>
            <i className="fas fa-tasks"></i> AI Career Quiz
          </li>
          <li onClick={() => setActiveView('skills')}>
            <i className="fas fa-lightbulb"></i> Skill Builder
          </li>
          <li onClick={() => setActiveView('visualizer')}>
            <i className="fas fa-project-diagram"></i> Career Visualizer
          </li>
          <li onClick={() => setActiveView('timeline')}>
            <i className="fas fa-calendar-alt"></i> Timeline Tracker
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;