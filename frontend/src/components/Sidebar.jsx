import React from 'react';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ setActiveView }) => {
  const { t } = useTranslation();
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <h3>{t('common.appName')}</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li onClick={() => setActiveView('home')}>
            <i className="fas fa-tachometer-alt"></i> {t('common.dashboard')}
          </li>
          <li onClick={() => setActiveView('colleges')}>
            <i className="fas fa-university"></i> {t('common.exploreColleges')}
          </li>
          <li onClick={() => setActiveView('quiz')}>
            <i className="fas fa-tasks"></i> {t('common.aiCareerQuiz')}
          </li>
          <li onClick={() => setActiveView('skills')}>
            <i className="fas fa-lightbulb"></i> {t('common.skillBuilder')}
          </li>
          <li onClick={() => setActiveView('visualizer')}>
            <i className="fas fa-project-diagram"></i> {t('common.careerVisualizer')}
          </li>
          <li onClick={() => setActiveView('timeline')}>
            <i className="fas fa-calendar-alt"></i> {t('common.timelineTracker')}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;