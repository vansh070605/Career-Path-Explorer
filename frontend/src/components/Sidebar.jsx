import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ activeView, setActiveView }) => {
  const { t } = useTranslation();

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        {/* If /assets/logo.png exists under public/, this will work */}
        <img src="/assets/logo.png" alt="Site Logo" className="sidebar-logo" />
        <h3>{t('common.appName', 'Career Explorer')}</h3>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li
            className={activeView === 'home' ? 'active' : ''}
            onClick={() => setActiveView('home')}
          >
            <i className="fas fa-home"></i> {t('common.dashboard', 'Dashboard')}
          </li>

          <li
            className={activeView === 'colleges' ? 'active' : ''}
            onClick={() => setActiveView('colleges')}
          >
            <i className="fas fa-university"></i> {t('common.exploreColleges', 'Explore Colleges')}
          </li>

          <li
            className={activeView === 'quiz' ? 'active' : ''}
            onClick={() => setActiveView('quiz')}
          >
            <i className="fas fa-tasks"></i> {t('common.aiCareerQuiz', 'AI Career Quiz')}
          </li>

          <li
            className={activeView === 'skills' ? 'active' : ''}
            onClick={() => setActiveView('skills')}
          >
            <i className="fas fa-lightbulb"></i> {t('common.skillBuilder', 'Skill Builder')}
          </li>

          <li
            className={activeView === 'visualizer' ? 'active' : ''}
            onClick={() => setActiveView('visualizer')}
          >
            <i className="fas fa-project-diagram"></i> {t('common.careerVisualizer', 'Career Visualizer')}
          </li>

          <li
            className={activeView === 'timeline' ? 'active' : ''}
            onClick={() => setActiveView('timeline')}
          >
            <i className="fas fa-calendar-alt"></i> {t('common.timelineTracker', 'Timeline Tracker')}
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
