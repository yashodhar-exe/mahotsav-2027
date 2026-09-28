import React, { useState, Suspense, lazy } from 'react';
import './App.css';
import Footer from './components/Footer';
import StatsSection from './components/StatsSection';

const CreateAccount = lazy(() => import('./components/CreateAccount'));
const Login = lazy(() => import('./components/Login'));
const Profile = lazy(() => import('./components/Profile'));
import Loader from './components/Loader';

import vignanLogo from './assets/vignan.avif';
import mahotsavLogo from './assets/mahotsav.avif';
import twentiethEdition from './assets/20th edition.avif';
import arcOfBecoming from './assets/the arc of becoming.avif';
import bgImage from './assets/2.avif';
import menuIcon from './assets/menu.avif';
import cloud1 from './clouds/IMG_2177.avif';
import cloud2 from './clouds/IMG_2178.avif';
import cloud3 from './clouds/IMG_2179.avif';
import cloud4 from './clouds/IMG_2187.avif';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);
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

  const handleImageLoad = () => {
    setLoading(false);
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) initialLoader.remove();
  };

  return (
    <div className="container">
      <Loader isLoading={loading} />
      <img 
        src={bgImage} 
        alt="background" 
        className="full-bg-image" 
        onLoad={handleImageLoad} 
      />
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
              <Suspense fallback={<Loader isLoading={true} />}>
                <CreateAccount
                  onLogin={handleLogin}
                  onSwitchToLogin={() => setCurrentPage('login')}
                  onClose={() => setCurrentPage('home')}
                />
              </Suspense>
            </div>
          </div>
        )}

        {currentPage === 'login' && (
          <div className="modal-overlay" onClick={() => setCurrentPage('home')}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <Suspense fallback={<Loader isLoading={true} />}>
                <Login
                  onLogin={handleLogin}
                  onSwitchToRegister={() => setCurrentPage('create_account')}
                  onClose={() => setCurrentPage('home')}
                />
              </Suspense>
            </div>
          </div>
        )}

        {currentPage === 'profile' && (
          <Suspense fallback={<Loader isLoading={true} />}>
            <Profile user={currentUser} />
          </Suspense>
        )}

      </div>
      <Footer />
    </div>
  );
}

export default App;
