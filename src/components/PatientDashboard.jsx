import { useAuth } from '../context/AuthContext.jsx';
import { clinicConfig } from '../data/config.js';
import { useState } from 'react';

export default function PatientDashboard({ liveAppointments, onCancel }) {
  const { user, logout } = useAuth();
  if (!user || user.role !== 'patient') return null;

  // Merge mock appointments with any live-booked ones
  const mockAppts = user.appointments || [];
  const live = (liveAppointments || []).filter(a => a.patientEmail === user.email || a.patientName === user.name);
  const allAppointments = [...mockAppts, ...live];

  const [cancelled, setCancelled] = useState([]);

  const handleCancel = (id) => {
    setCancelled(prev => [...prev, id]);
    if (onCancel) onCancel(id);
  };

  const activeAppts = allAppointments.filter(a => !cancelled.includes(a.id));
  const cancelledAppts = allAppointments.filter(a => cancelled.includes(a.id));

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="pat-dash">
      {/* Header */}
      <header className="pat-dash-header">
        <div className="wrap pat-dash-header-inner">
          <div className="doc-dash-brand">
            <div className="login-brand-mark" style={{width: 32, height: 32, borderRadius: 8}}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:16,height:16}}>
                <path d="M12 3L4 7v6c0 5 3.5 7.5 8 8 4.5-0.5 8-3 8-8V7l-8-4z" stroke="#F3F6F5" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M9 12.5l2 2 4-4.2" stroke="#F3F6F5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:16}}>{clinicConfig.name}</span>
          </div>

          <div className="doc-dash-user">
            <div className="pat-dash-avatar">
              {user.name[0]}
            </div>
            <div>
              <span className="doc-dash-user-name">{user.name}</span>
              <span className="doc-dash-user-role">Patient</span>
            </div>
            <button className="doc-dash-logout" onClick={logout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="pat-dash-main">
        <div className="wrap">
          {/* Welcome */}
          <div className="doc-dash-welcome">
            <h1>{greeting}, {user.name.split(' ')[0]}</h1>
            <p>Manage your appointments and health schedule here.</p>
          </div>

          {/* Stats */}
          <div className="pat-dash-stats">
            <div className="doc-dash-stat-card">
              <span className="doc-dash-stat-num">{activeAppts.length}</span>
              <span className="doc-dash-stat-label">Active appointments</span>
            </div>
            <div className="doc-dash-stat-card">
              <span className="doc-dash-stat-num">{cancelledAppts.length}</span>
              <span className="doc-dash-stat-label">Cancelled</span>
            </div>
            <div className="doc-dash-stat-card">
              <span className="doc-dash-stat-num doc-dash-stat-next">
                {activeAppts.length > 0 ? activeAppts[0].time : '—'}
              </span>
              <span className="doc-dash-stat-label">Next visit</span>
            </div>
          </div>

          {/* Appointment Cards */}
          <div className="pat-dash-section">
            <div className="doc-dash-section-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              <h2>Your Appointments</h2>
              <span className="doc-dash-badge">{activeAppts.length}</span>
            </div>

            {activeAppts.length === 0 && cancelledAppts.length === 0 ? (
              <div className="doc-dash-empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                <p>No appointments yet. Book one from the main page!</p>
              </div>
            ) : (
              <div className="dashboard-grid">
                {activeAppts.map((apt) => (
                  <div key={apt.id} className="dashboard-card">
                    <div className="dashboard-card-header">
                      <div className="dashboard-avatar" style={{ background: apt.color }}>
                        {apt.doctor.split(' ').pop()[0]}
                      </div>
                      <div>
                        <h3 className="dashboard-doctor">{apt.doctor}</h3>
                        <p className="dashboard-specialty">{apt.specialty}</p>
                      </div>
                      <span className="dashboard-status dashboard-status--confirmed">
                        Confirmed
                      </span>
                    </div>

                    <div className="dashboard-card-body">
                      <div className="dashboard-detail">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                        <span>{apt.day} at {apt.time}</span>
                      </div>
                      {apt.reason && (
                        <div className="dashboard-detail">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                          <span>{apt.reason}</span>
                        </div>
                      )}
                      <div className="dashboard-detail">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/></svg>
                        <span>Booked {apt.bookedAt}</span>
                      </div>
                    </div>

                    <button className="dashboard-cancel-btn" onClick={() => handleCancel(apt.id)}>
                      Cancel appointment
                    </button>
                  </div>
                ))}

                {cancelledAppts.map((apt) => (
                  <div key={apt.id} className="dashboard-card" style={{opacity: 0.55}}>
                    <div className="dashboard-card-header">
                      <div className="dashboard-avatar" style={{ background: '#aaa' }}>
                        {apt.doctor.split(' ').pop()[0]}
                      </div>
                      <div>
                        <h3 className="dashboard-doctor">{apt.doctor}</h3>
                        <p className="dashboard-specialty">{apt.specialty}</p>
                      </div>
                      <span className="dashboard-status dashboard-status--cancelled">
                        Cancelled
                      </span>
                    </div>
                    <div className="dashboard-card-body">
                      <div className="dashboard-detail">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                        <span>{apt.day} at {apt.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clinic Info */}
          <div className="pat-dash-clinic-info">
            <div className="doc-dash-info-card">
              <h4>Need Help?</h4>
              <div className="doc-dash-info-row">
                <span className="doc-dash-info-label">Phone</span>
                <span>{clinicConfig.phone}</span>
              </div>
              <div className="doc-dash-info-row">
                <span className="doc-dash-info-label">Email</span>
                <span>{clinicConfig.email}</span>
              </div>
              <div className="doc-dash-info-row">
                <span className="doc-dash-info-label">Address</span>
                <span>{clinicConfig.address.split('\n')[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
