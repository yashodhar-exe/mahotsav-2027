import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';

const CreateAccount = ({ onLogin }) => {
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
    branch: ''
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
            'Authorization': 'Bearer cdb_4d703ddf3e9228da7491f10ccc848dbc7b02853a0063563e'
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
        setError(supabaseError.message || 'Failed to create account');
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
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Create Account</h2>
        <p className="form-subtitle">Fill in the details below to create your account.</p>
        
        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          
          <div className="form-row">
            <div className="form-group">
              <input type="text" name="registration_number" value={formData.registration_number} onChange={handleInputChange} className="form-input" placeholder="Registration number*" required />
            </div>
            <div className="form-group">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Name*" required />
            </div>
          </div>

          <div className="form-group">
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="Email*" required />
          </div>

          <div className="form-group">
            <input type="text" name="dob" value={formData.dob} onChange={handleInputChange} className="form-input" placeholder="DOB (DD-MM-YYYY)*" pattern="\d{2}-\d{2}-\d{4}" title="Format: DD-MM-YYYY" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" placeholder="Phone Number*" required />
            </div>
            <div className="form-group" style={{ position: 'relative' }} ref={genderDropdownRef}>
              <div 
                className="form-input form-select"
                style={{ 
                  cursor: 'pointer', 
                  color: formData.gender ? '#333' : '#555',
                  padding: '0.5rem 0' 
                }}
                onClick={() => setShowGenderDropdown(!showGenderDropdown)}
              >
                {formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : 'Gender*'}
              </div>
              {showGenderDropdown && (
                <div className="autocomplete-dropdown" style={{ zIndex: 20 }}>
                  <div className="autocomplete-item" onClick={() => { setFormData(prev => ({...prev, gender: 'male'})); setShowGenderDropdown(false); }}>Male</div>
                  <div className="autocomplete-item" onClick={() => { setFormData(prev => ({...prev, gender: 'female'})); setShowGenderDropdown(false); }}>Female</div>
                  <div className="autocomplete-item" onClick={() => { setFormData(prev => ({...prev, gender: 'other'})); setShowGenderDropdown(false); }}>Other</div>
                </div>
              )}
            </div>
          </div>

          <div className="form-group" ref={dropdownRef}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="College*" 
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

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <input type="text" name="branch" value={formData.branch} onChange={handleInputChange} className="form-input" placeholder="Branch*" required />
          </div>

          <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
