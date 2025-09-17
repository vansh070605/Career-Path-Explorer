import React from 'react';
import PropTypes from 'prop-types';
// The import for the logo has been REMOVED

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        {/* FIX: The 'src' now points directly to the public path */}
        <img src="/assets/logo.png" alt="Site Logo" className="sidebar-logo" />
        <h3>Career Explorer</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className={activeView === 'home' ? 'active' : ''} onClick={() => setActiveView('home')}>
            <i className="fas fa-home"></i> Dashboard
          </li>
          <li className={activeView === 'colleges' ? 'active' : ''} onClick={() => setActiveView('colleges')}>
            <i className="fas fa-university"></i> Explore Colleges
          </li>
          <li className={activeView === 'quiz' ? 'active' : ''} onClick={() => setActiveView('quiz')}>
            <i className="fas fa-tasks"></i> AI Career Quiz
          </li>
          <li className={activeView === 'skills' ? 'active' : ''} onClick={() => setActiveView('skills')}>
            <i className="fas fa-lightbulb"></i> Skill Builder
          </li>
          <li className={activeView === 'visualizer' ? 'active' : ''} onClick={() => setActiveView('visualizer')}>
            <i className="fas fa-project-diagram"></i> Career Visualizer
          </li>
          <li className={activeView === 'timeline' ? 'active' : ''} onClick={() => setActiveView('timeline')}>
            <i className="fas fa-calendar-alt"></i> Timeline Tracker
          </li>
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  activeView: PropTypes.string.isRequired,
  setActiveView: PropTypes.func.isRequired,
};

export default Sidebar;