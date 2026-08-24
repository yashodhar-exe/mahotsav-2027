import React, { useState } from 'react';
import './App.css';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Profile from './components/Profile';

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
      <nav className="navbar">
        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>HOME</a>
        
        {currentUser ? (
          <>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('profile'); }}>PROFILE</a>
            <a href="#" className="nav-link" onClick={handleLogout}>LOGOUT</a>
          </>
        ) : (
          <>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('login'); }}>LOGIN</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('create_account'); }}>CREATE ACCOUNT</a>
          </>
        )}
      </nav>
      
      {currentPage === 'home' && (
        <main className="main-content">
          <h1 className="title">MAHOTSAV</h1>
          <h2 className="subtitle">2027</h2>
        </main>
      )}

      {currentPage === 'create_account' && (
        <CreateAccount onLogin={handleLogin} />
      )}

      {currentPage === 'login' && (
        <Login onLogin={handleLogin} />
      )}

      {currentPage === 'profile' && (
        <Profile user={currentUser} />
      )}
    </div>
  );
}

export default App;
