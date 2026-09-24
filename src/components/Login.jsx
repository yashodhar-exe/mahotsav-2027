import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Login = ({ onLogin, onSwitchToRegister, onClose }) => {
  const [formData, setFormData] = useState({
    mahotsav_id: '',
    dob: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const dobPattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!dobPattern.test(formData.dob)) {
      setError('DOB must be in DD-MM-YYYY format');
      return;
    }

    setIsSubmitting(true);

    try {
      // Ensure Supabase environment variables are set
      if (!import.meta.env.VITE_SUPABASE_URL) {
        setError('Supabase connection missing. Check .env file.');
        setIsSubmitting(false);
        return;
      }

      const { data, error: supabaseError } = await supabase
        .from('users')
        .select('*')
        .eq('mahotsav_id', formData.mahotsav_id)
        .eq('dob', formData.dob)
        .single();

      if (supabaseError) {
        setError('Invalid Mahotsav ID or Date of Birth');
      } else if (data) {
        onLogin(data);
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="custom-modal-container">
      <div className="custom-modal-card">
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <h2 className="custom-modal-title"><span>*</span> Welcome Back <span>*</span></h2>

        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="custom-form-group">
            <label className="custom-label">MAHOTSAV ID</label>
            <input
              type="text"
              name="mahotsav_id"
              value={formData.mahotsav_id}
              onChange={handleInputChange}
              className="custom-input"
              placeholder="e.g. MH27000001"
              required
            />
          </div>

          <div className="custom-form-group" style={{ marginBottom: '2rem' }}>
            <label className="custom-label">DATE OF BIRTH</label>
            <input
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="custom-input"
              placeholder="dd-mm-yyyy"
              pattern="\d{2}-\d{2}-\d{4}"
              title="Format: DD-MM-YYYY"
              required
            />
          </div>

          <button type="submit" className="custom-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'LOGGING IN' : 'LOGIN'}
          </button>
        </form>
        
        <div className="modal-footer-text">
          Not yet registered? <span className="modal-link" onClick={onSwitchToRegister}>Register</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
