import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';

const CreateAccount = ({ onLogin, onSwitchToLogin, onClose }) => {
  const [collegeQuery, setCollegeQuery] = useState('');
  const [colleges, setColleges] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    registration_number: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    branch: '',
    district: '',
    state: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropdownRef = useRef(null);
  const genderDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target)) {
        setShowGenderDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch colleges using CollegeDB API
  useEffect(() => {
    const fetchColleges = async () => {
      if (collegeQuery.trim().length < 2) {
        setColleges([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`https://api.collegedb.in/v1/colleges/search?q=${encodeURIComponent(collegeQuery)}`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_COLLEGEDB_KEY}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setColleges(data.results || []);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchColleges();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [collegeQuery]);

  const handleSelectCollege = (collegeName) => {
    setCollegeQuery(collegeName);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate DOB format (DD-MM-YYYY)
    const dobPattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!dobPattern.test(formData.dob)) {
      setError('DOB must be in DD-MM-YYYY format');
      return;
    }

    if (!collegeQuery) {
      setError('Please select a college');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        college: collegeQuery
      };

      const { data, error: supabaseError } = await supabase
        .from('users')
        .insert([payload])
        .select()
        .single();

      if (supabaseError) {
        if (supabaseError.message && supabaseError.message.includes('duplicate key value')) {
          setError('Registration number already exists.');
        } else {
          setError(supabaseError.message || 'Failed to create account');
        }
      } else if (data) {
        onLogin(data);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="custom-modal-container">
      <div className="custom-modal-card register-modal-card">
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <h2 className="custom-modal-title"><span>*</span> Register for Mahotsav <span>*</span></h2>

        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="custom-form-group">
            <label className="custom-label">FULL NAME</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="custom-input" placeholder="Enter full name" required />
          </div>

          <div className="custom-form-group">
            <label className="custom-label">EMAIL</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="custom-input" placeholder="Enter email address" required />
          </div>

          <div className="custom-form-group">
            <label className="custom-label">REGISTRATION NUMBER / REG NO</label>
            <input type="text" name="registration_number" value={formData.registration_number} onChange={handleInputChange} className="custom-input" placeholder="e.g. 221FA04001" required />
          </div>

          <div className="custom-form-row">
            <div className="custom-form-group">
              <label className="custom-label">DATE OF BIRTH</label>
              <input type="text" name="dob" value={formData.dob} onChange={handleInputChange} className="custom-input" placeholder="DD-MM-YYYY" pattern="\d{2}-\d{2}-\d{4}" title="Format: DD-MM-YYYY" required />
            </div>
            <div className="custom-form-group" style={{ position: 'relative' }} ref={genderDropdownRef}>
              <label className="custom-label">GENDER</label>
              <div
                className="custom-input form-select"
                style={{
                  cursor: 'pointer',
                  color: formData.gender ? '#fdf0d5' : '#a3a3a3',
                  padding: '0.5rem 0',
                  paddingLeft: '1rem'
                }}
                onClick={() => setShowGenderDropdown(!showGenderDropdown)}
              >
                {formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : 'Select Gender'}
              </div>
              {showGenderDropdown && (
                <div className="autocomplete-dropdown" style={{ zIndex: 20 }}>
                  <div className="autocomplete-item" onClick={() => { setFormData(prev => ({ ...prev, gender: 'male' })); setShowGenderDropdown(false); }}>Male</div>
                  <div className="autocomplete-item" onClick={() => { setFormData(prev => ({ ...prev, gender: 'female' })); setShowGenderDropdown(false); }}>Female</div>
                  <div className="autocomplete-item" onClick={() => { setFormData(prev => ({ ...prev, gender: 'other' })); setShowGenderDropdown(false); }}>Other</div>
                </div>
              )}
            </div>
          </div>

          <div className="custom-form-group" ref={dropdownRef}>
            <label className="custom-label">COLLEGE / INSTITUTION</label>
            <input
              type="text"
              className="custom-input"
              placeholder="Search college name..."
              required
              value={collegeQuery}
              onChange={(e) => {
                setCollegeQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && (collegeQuery.trim().length >= 2) && (
              <div className="autocomplete-dropdown">
                {loading ? (
                  <div className="autocomplete-item">Loading...</div>
                ) : colleges.length > 0 ? (
                  colleges.map((college) => (
                    <div
                      key={college.id}
                      className="autocomplete-item"
                      onClick={() => handleSelectCollege(college.name)}
                    >
                      {college.name}
                    </div>
                  ))
                ) : (
                  <div className="autocomplete-item">No colleges found</div>
                )}
              </div>
            )}
          </div>

          <div className="custom-form-row">
            <div className="custom-form-group">
              <label className="custom-label">DISTRICT</label>
              <input type="text" name="district" value={formData.district} onChange={handleInputChange} className="custom-input" />
            </div>
            <div className="custom-form-group">
              <label className="custom-label">STATE</label>
              <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="custom-input" />
            </div>
          </div>

          <div className="custom-form-row" style={{ marginBottom: '2rem' }}>
            <div className="custom-form-group">
              <label className="custom-label">BRANCH / DEPARTMENT</label>
              <input type="text" name="branch" value={formData.branch} onChange={handleInputChange} className="custom-input" placeholder="e.g. CSE, ECE" required />
            </div>
            <div className="custom-form-group">
              <label className="custom-label">PHONE NUMBER</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="custom-input" placeholder="10-digit number" required />
            </div>
          </div>

          <button type="submit" className="custom-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'REGISTERING' : 'REGISTER'}
          </button>
        </form>
        
        <div className="modal-footer-text">
          Already have an account? <span className="modal-link" onClick={onSwitchToLogin}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
