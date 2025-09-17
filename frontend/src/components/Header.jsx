import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const formatUsername = (user) => {
  if (!user) return 'User';
  const username = user.includes('@') ? user.split('@')[0] : user;
  return username.charAt(0).toUpperCase() + username.slice(1);
};

const Header = ({ user, onLogout, unreadCount, onNotificationClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedUsername = formatUsername(user);
  
  return (
    <header className="dashboard-header">
      <div className="header-datetime">
        <span>{currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <span>{currentTime.toLocaleTimeString()}</span>
      </div>
      <div className="header-user-profile">
        <div className="notification-bell" onClick={onNotificationClick}>
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </div>
        <span>Welcome, <strong>{formattedUsername}</strong>!</span>
        <button onClick={onLogout} className="btn-logout">Logout</button>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  unreadCount: PropTypes.number.isRequired,
  onNotificationClick: PropTypes.func.isRequired,
};

export default Header;