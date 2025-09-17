import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../features/i18n';

const Header = ({ user, onLogout }) => {
  const { t, i18n } = useTranslation();
  const raw = user?.name || user || '';
  const username = typeof raw === 'string' && raw.includes('@') ? raw.split('@')[0] : (raw || t('common.appName'));

  const handleLangChange = (e) => {
    changeLanguage(e.target.value);
  };
  
  return (
    <header className="dashboard-header">
      <div className="header-insights">
        <h2>{t('common.insights')}</h2>
      </div>
      <div className="header-user-profile">
        <select value={i18n.language || 'en'} onChange={handleLangChange} className="lang-switcher">
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="ur">اردو</option>
        </select>
        <span>{t('common.welcomeUser', { name: username })}</span>
        <button onClick={onLogout} className="btn-logout">{t('common.logout')}</button>
      </div>
    </header>
  );
};

export default Header;