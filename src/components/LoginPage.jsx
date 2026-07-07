import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { clinicConfig } from '../data/config.js';

export default function LoginPage({ onBack }) {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('patient');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Patient fields
  const [patientEmail, setPatientEmail] = useState('');

  // Doctor fields
  const [doctorName, setDoctorName] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      let result;
      if (activeTab === 'patient') {
        result = login('patient', { email: patientEmail });
      } else {
        result = login('doctor', { name: doctorName, password: doctorPassword });
      }

      if (!result.success) {
        setError(result.error);
      }
      setLoading(false);
    }, 600); // brief delay for UX
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-bg-grid" aria-hidden="true"></div>

      <button className="login-close-btn" onClick={onBack}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to homepage
      </button>

      <div className="login-card">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L4 7v6c0 5 3.5 7.5 8 8 4.5-0.5 8-3 8-8V7l-8-4z" stroke="#F3F6F5" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M9 12.5l2 2 4-4.2" stroke="#F3F6F5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="login-brand-name">{clinicConfig.name}</span>
        </div>

        <h2 className="login-title">Welcome to your portal</h2>
        <p className="login-subtitle">Sign in to manage appointments, view schedules, and more.</p>

        {/* Tab Switcher */}
        <div className="login-tabs">
          <button
            className={`login-tab ${activeTab === 'patient' ? 'is-active' : ''}`}
            onClick={() => switchTab('patient')}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/></svg>
            Patient
          </button>
          <button
            className={`login-tab ${activeTab === 'doctor' ? 'is-active' : ''}`}
            onClick={() => switchTab('doctor')}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 11v4m0-8h.01M4.93 4.93l14.14 14.14M12 3a9 9 0 110 18 9 9 0 010-18z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            Doctor
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {activeTab === 'patient' ? (
            <div className="login-fields" key="patient">
              <div className="login-field">
                <label htmlFor="loginEmail">Email address</label>
                <input
                  type="email"
                  id="loginEmail"
                  placeholder="e.g. meera@example.com"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                Demo accounts: meera@example.com, ravi@example.com, sara@example.com
              </div>
            </div>
          ) : (
            <div className="login-fields" key="doctor">
              <div className="login-field">
                <label htmlFor="loginDoctor">Select your name</label>
                <select
                  id="loginDoctor"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                >
                  <option value="">Choose doctor…</option>
                  {clinicConfig.team.map((d, i) => (
                    <option key={i} value={d.name}>{d.name} — {d.specialty.split('·')[0].trim()}</option>
                  ))}
                </select>
              </div>
              <div className="login-field">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  placeholder="Enter password"
                  value={doctorPassword}
                  onChange={(e) => setDoctorPassword(e.target.value)}
                  required
                />
              </div>
              <div className="login-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                Demo password: promise2026
              </div>
            </div>
          )}

          {error && (
            <div className="login-error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M10.3 3.9L2.5 17a1.5 1.5 0 001.3 2.2h16.4a1.5 1.5 0 001.3-2.2L13.7 3.9a1.5 1.5 0 00-2.6 0z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn--primary btn--block login-submit" disabled={loading}>
            {loading ? (
              <span className="login-spinner"></span>
            ) : (
              <>Sign in as {activeTab === 'patient' ? 'Patient' : 'Doctor'}</>
            )}
          </button>
        </form>

        <p className="login-footer-note">
          This is a demo portal. No real data is stored or transmitted.
        </p>
      </div>
    </div>
  );
}
