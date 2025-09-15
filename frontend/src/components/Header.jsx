import React from 'react';

const Header = ({ user, onLogout }) => {
  const username = user.includes('@') ? user.split('@')[0] : user;
  
  return (
    <header className="dashboard-header">
      <div className="header-insights">
        <h2>Insights</h2>
      </div>
      <div className="header-user-profile">
        <span>Welcome, <strong>{username}</strong>!</span>
        <button onClick={onLogout} className="btn-logout">Logout</button>
      </div>
    </header>
  );
};

export default Header;