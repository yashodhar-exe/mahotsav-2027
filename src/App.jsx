import React, { useState } from 'react';
import './App.css';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Profile from './components/Profile';
import Footer from './components/Footer';

import vignanLogo from './assets/vignan.avif';
import mahotsavLogo from './assets/mahotsav.avif';
import twentiethEdition from './assets/20th edition.avif';
import arcOfBecoming from './assets/the arc of becoming.png';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentPage('home');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-left">
          <img src={mahotsavLogo} alt="Mahotsav Logo" className="logo mahotsav-logo" />
          <img src={twentiethEdition} alt="20th Edition" className="logo edition-logo" />
        </div>
        <div className="header-right">
          <img src={vignanLogo} alt="Vignan Logo" className="logo vignan-logo" />
        </div>
      </header>



      {['home', 'login', 'create_account'].includes(currentPage) && (
        <main className="main-content">
          <img src={arcOfBecoming} alt="The Arc of Becoming" className="arc-of-becoming" />
          <button
            className="register-login-btn"
            onClick={() => setCurrentPage('login')}
          >
            REGISTER/LOGIN
          </button>
        </main>
      )}

      {currentPage === 'create_account' && (
        <div className="modal-overlay" onClick={() => setCurrentPage('home')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <CreateAccount 
              onLogin={handleLogin} 
              onSwitchToLogin={() => setCurrentPage('login')} 
              onClose={() => setCurrentPage('home')}
            />
          </div>
        </div>
      )}

      {currentPage === 'login' && (
        <div className="modal-overlay" onClick={() => setCurrentPage('home')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Login 
              onLogin={handleLogin} 
              onSwitchToRegister={() => setCurrentPage('create_account')} 
              onClose={() => setCurrentPage('home')}
            />
          </div>
        </div>
      )}

      {currentPage === 'profile' && (
        <Profile user={currentUser} />
      )}

      <Footer />
    </div>
  );
}

export default App;
