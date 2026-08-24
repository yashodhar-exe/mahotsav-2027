import React, { useState } from 'react';

const Profile = ({ user }) => {
  const [copied, setCopied] = useState(false);

  if (!user) {
    return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Please log in to view your profile.</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(user.mahotsav_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="form-container">
      <div className="form-card" style={{ maxWidth: '600px' }}>
        <h2 className="form-title">Your Profile</h2>
        <p className="form-subtitle">Welcome back, {user.name}!</p>
        
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Mahotsav ID</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000', marginTop: '0.2rem' }}>{user.mahotsav_id}</div>
            </div>
            <button 
              onClick={handleCopy}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: copied ? '#4caf50' : '#666',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                padding: '0.5rem',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="Copy ID"
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              )}
            </button>
          </div>

          <div className="form-row">
            <div style={{ flex: 1, padding: '1rem', borderBottom: '1px solid #ddd' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Registration Number</span>
              <div style={{ fontSize: '1rem', color: '#000', marginTop: '0.2rem' }}>{user.registration_number}</div>
            </div>
            <div style={{ flex: 1, padding: '1rem', borderBottom: '1px solid #ddd' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Email</span>
              <div style={{ fontSize: '1rem', color: '#000', marginTop: '0.2rem' }}>{user.email}</div>
            </div>
          </div>

          <div className="form-row">
            <div style={{ flex: 1, padding: '1rem', borderBottom: '1px solid #ddd' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Phone</span>
              <div style={{ fontSize: '1rem', color: '#000', marginTop: '0.2rem' }}>{user.phone}</div>
            </div>
            <div style={{ flex: 1, padding: '1rem', borderBottom: '1px solid #ddd' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>DOB</span>
              <div style={{ fontSize: '1rem', color: '#000', marginTop: '0.2rem' }}>{user.dob}</div>
            </div>
          </div>

          <div className="form-row">
            <div style={{ flex: 1, padding: '1rem', borderBottom: '1px solid #ddd' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Gender</span>
              <div style={{ fontSize: '1rem', color: '#000', marginTop: '0.2rem', textTransform: 'capitalize' }}>{user.gender}</div>
            </div>
            <div style={{ flex: 1, padding: '1rem', borderBottom: '1px solid #ddd' }}>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Branch</span>
              <div style={{ fontSize: '1rem', color: '#000', marginTop: '0.2rem' }}>{user.branch}</div>
            </div>
          </div>

          <div style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
            <span style={{ fontSize: '0.8rem', color: '#666' }}>College</span>
            <div style={{ fontSize: '1rem', color: '#000', marginTop: '0.2rem' }}>{user.college}</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
