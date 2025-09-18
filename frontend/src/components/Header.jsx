// frontend/src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../features/i18n';

const formatUsername = (user) => {
  if (!user) return 'User';
  const raw = typeof user === 'string' ? user : user.name || 'User';
  const username = raw.includes('@') ? raw.split('@')[0] : raw;
  return username.charAt(0).toUpperCase() + username.slice(1);
};

const Header = ({ user, onLogout, unreadCount = 0, onNotificationClick }) => {
  const { t, i18n } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLangChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <header className="dashboard-header">
      {/* Left side: Date + Time */}
      <div className="header-datetime">
        <span>
          {currentTime.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <span>{currentTime.toLocaleTimeString()}</span>
      </div>

      {/* Right side: Lang switch, notifications, user info */}
      <div className="header-user-profile">
        <select
          value={i18n.language || 'en'}
          onChange={handleLangChange}
          className="lang-switcher"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="ur">اردو</option>
        </select>

        <div className="notification-bell" onClick={onNotificationClick}>
          <i className="fas fa-bell"></i>
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </div>

        <span>
          {t('common.welcomeUser', { name: formatUsername(user) })}
        </span>
        <button onClick={onLogout} className="btn-logout">
          {t('common.logout')}
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onLogout: PropTypes.func.isRequired,
  unreadCount: PropTypes.number,
  onNotificationClick: PropTypes.func,
};

export default Header;
