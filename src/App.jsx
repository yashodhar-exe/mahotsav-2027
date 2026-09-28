import React, { useState } from 'react';
import './App.css';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Profile from './components/Profile';
import Footer from './components/Footer';
import StatsSection from './components/StatsSection';

import vignanLogo from './assets/vignan.avif';
import mahotsavLogo from './assets/mahotsav.avif';
import twentiethEdition from './assets/20th edition.avif';
import arcOfBecoming from './assets/the arc of becoming.png';
import bgImage from './assets/2.png';
import menuIcon from './assets/menu.png';
import cloud1 from './clouds/IMG_2177.PNG';
import cloud2 from './clouds/IMG_2178.PNG';
import cloud3 from './clouds/IMG_2179.PNG';
import cloud4 from './clouds/IMG_2187.PNG';

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
      <img src={bgImage} alt="background" className="full-bg-image" />
      <div className="overlay-content">
        <div className="clouds-container">
          <div className="cloud-drop cloud-pos-1"><img src={cloud1} className="cloud-float" alt="cloud" /></div>
          <div className="cloud-drop cloud-pos-2"><img src={cloud2} className="cloud-float" alt="cloud" /></div>
          <div className="cloud-drop cloud-pos-3"><img src={cloud3} className="cloud-float" alt="cloud" /></div>
          <div className="cloud-drop cloud-pos-4"><img src={cloud4} className="cloud-float" alt="cloud" /></div>
        </div>
        <header className="header">
          <div className="header-left">
            <img src={menuIcon} alt="Menu" className="logo menu-logo" />
            <img src={mahotsavLogo} alt="Mahotsav Logo" className="logo mahotsav-logo" />
            <img src={twentiethEdition} alt="20th Edition" className="logo edition-logo" />
          </div>
          <div className="header-right">
            <img src={vignanLogo} alt="Vignan Logo" className="logo vignan-logo" />
          </div>
        </header>



        {['home', 'login', 'create_account'].includes(currentPage) && (
          <>
            <main className="main-content">
              <img src={arcOfBecoming} alt="The Arc of Becoming" className="arc-of-becoming" />
              <button
                className="register-login-btn"
                onClick={() => setCurrentPage('login')}
              >
                REGISTER/LOGIN
              </button>
            </main>

            <section className="about-section">
              <h2 className="about-title">About the ARC OF BECOMING</h2>
              <div className="about-text">
                <p>MAHOTSAV is the National Youth Festival of Vignan's Foundation for Science, Technology and Research (VFSTR), bringing together young minds from across the country to celebrate talent, creativity, culture, innovation, and competition. With a diverse spectrum of technical, cultural, literary, artistic, and entertainment events, MAHOTSAV creates a vibrant platform where students discover their abilities, challenge themselves, and connect with others.</p>
                <p>The theme "The Arc of Becoming" represents the journey of transformation. It captures how every individual evolves through experience, challenges, choices, failures, and achievements to become something greater than they were before. The arc begins with potential, rises through exploration and struggle, and moves toward growth, identity, and purpose.</p>
                <p>MAHOTSAV is therefore not merely a festival of performances and competitions. It is a celebration of becoming: becoming more confident, more creative, more capable, and more courageous. Every participant brings a story, takes a step forward, and adds another curve to their own arc.</p>
              </div>
            </section>
            <StatsSection />
          </>
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

      </div>
      <Footer />
    </div>
  );
}

export default App;
