import React from 'react';
import './Footer.css';
import footerLogo from '../assets/footer logo.png';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        
        {/* Left Section */}
        <div className="footer-section footer-left">
          <img src={footerLogo} alt="Mahotsav - The Arc of Becoming" className="footer-main-logo" />
          <div className="follow-us-container">
            <h4 className="footer-heading footer-title">FOLLOW US ON :</h4>
            <div className="social-icons">
               <a href="https://www.instagram.com/vignan_mahotsav/" target="_blank" rel="noreferrer" className="social-icon">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
               </a>
               <a href="https://www.whatsapp.com/channel/0029Vars0ZXJ3jutqK5hfj3r" target="_blank" rel="noreferrer" className="social-icon">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
               </a>
               <a href="https://www.linkedin.com/company/vignan-mahotsav" target="_blank" rel="noreferrer" className="social-icon">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
               </a>
            </div>
          </div>
        </div>
        
        {/* Middle Section */}
        <div className="footer-section footer-middle">
          <h4 className="footer-heading footer-title">CONTACT US :</h4>
          <div className="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <a href="mailto:mahotsav@vignan.ac.in" className="mail-link">mahotsav@vignan.ac.in</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-section footer-right">
          <h4 className="footer-heading footer-title">LOCATION :</h4>
          <div className="contact-item location-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <a href="https://maps.app.goo.gl/LWoHLkGsrbf7uiWy7" target="_blank" rel="noreferrer" className="location-link">
              VIGNAN'S FOUNDATION FOR SCIENCE,<br/>TECHNOLOGY & RESEARCH (DEEMED TO BE<br/>UNIVERSITY), VADLAMUDI, GUNTUR, A.P - 522213
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
