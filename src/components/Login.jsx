import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Login = ({ onLogin }) => {
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
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Login with your Mahotsav ID and DOB.</p>
        
        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <input 
              type="text" 
              name="mahotsav_id" 
              value={formData.mahotsav_id} 
              onChange={handleInputChange} 
              className="form-input" 
              placeholder="Mahotsav ID*" 
              required 
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <input 
              type="text" 
              name="dob" 
              value={formData.dob} 
              onChange={handleInputChange} 
              className="form-input" 
              placeholder="DOB (DD-MM-YYYY)*" 
              pattern="\d{2}-\d{2}-\d{4}" 
              title="Format: DD-MM-YYYY" 
              required 
            />
          </div>

          <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
