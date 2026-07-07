import { useAuth } from '../context/AuthContext.jsx';
import { clinicConfig } from '../data/config.js';

export default function DoctorDashboard({ appointments }) {
  const { user, logout } = useAuth();
  if (!user || user.role !== 'doctor') return null;

  // Get all patients booked with this doctor
  const myAppointments = [];

  // From mock patients
  clinicConfig.mockPatients.forEach(patient => {
    patient.appointments.forEach(apt => {
      if (apt.doctor === user.name) {
        myAppointments.push({
          ...apt,
          patientName: patient.name,
          patientEmail: patient.email,
          patientPhone: patient.phone,
        });
      }
    });
  });

  // From live appointments (booked via modal)
  if (appointments) {
    appointments.forEach(apt => {
      if (apt.doctor === user.name) {
        myAppointments.push(apt);
      }
    });
  }

  const todayAppts = myAppointments.filter(a => a.day === 'Today');
  const upcomingAppts = myAppointments.filter(a => a.day !== 'Today');

  // Get current time greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="doc-dash">
      {/* Header Bar */}
      <header className="doc-dash-header">
        <div className="wrap doc-dash-header-inner">
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
            <div className="doc-dash-avatar" style={{background: user.color}}>
              {user.name.split(' ').pop()[0]}
            </div>
            <div>
              <span className="doc-dash-user-name">{user.name}</span>
              <span className="doc-dash-user-role">{user.specialty}</span>
            </div>
            <button className="doc-dash-logout" onClick={logout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="doc-dash-main">
        <div className="wrap">
          {/* Welcome */}
          <div className="doc-dash-welcome">
            <h1>{greeting}, {user.name.split(' ')[1]}</h1>
            <p>Here's your schedule and patient overview for today.</p>
          </div>

          {/* Stats Row */}
          <div className="doc-dash-stats">
            <div className="doc-dash-stat-card">
              <span className="doc-dash-stat-num">{todayAppts.length}</span>
              <span className="doc-dash-stat-label">Patients today</span>
            </div>
            <div className="doc-dash-stat-card">
              <span className="doc-dash-stat-num">{upcomingAppts.length}</span>
              <span className="doc-dash-stat-label">Upcoming</span>
            </div>
            <div className="doc-dash-stat-card">
              <span className="doc-dash-stat-num">{myAppointments.length}</span>
              <span className="doc-dash-stat-label">Total booked</span>
            </div>
            <div className="doc-dash-stat-card">
              <span className="doc-dash-stat-num doc-dash-stat-next">
                {todayAppts.length > 0 ? todayAppts[0].time : '—'}
              </span>
              <span className="doc-dash-stat-label">Next patient</span>
            </div>
          </div>

          <div className="doc-dash-grid">
            {/* Left: Patient Queue */}
            <div className="doc-dash-section">
              <div className="doc-dash-section-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                <h2>Patient Queue</h2>
                <span className="doc-dash-badge">{myAppointments.length}</span>
              </div>

              {myAppointments.length === 0 ? (
                <div className="doc-dash-empty">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2"/><path d="M8 15s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <p>No appointments booked yet.</p>
                </div>
              ) : (
                <div className="doc-dash-patients">
                  {myAppointments.map((apt, i) => (
                    <div key={apt.id || i} className="doc-dash-patient-card">
                      <div className="doc-dash-patient-top">
                        <div className="doc-dash-patient-avatar">
                          {(apt.patientName || 'P')[0]}
                        </div>
                        <div className="doc-dash-patient-info">
                          <h3>{apt.patientName || 'Patient'}</h3>
                          <span className="doc-dash-patient-reason">{apt.reason || 'General visit'}</span>
                        </div>
                        <span className={`dashboard-status dashboard-status--${(apt.status || 'confirmed').toLowerCase()}`}>
                          {apt.status || 'Confirmed'}
                        </span>
                      </div>
                      <div className="doc-dash-patient-details">
                        <div className="doc-dash-patient-detail">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          {apt.day} at {apt.time}
                        </div>
                        {apt.patientPhone && (
                          <div className="doc-dash-patient-detail">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1.1L6.6 10.8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                            {apt.patientPhone}
                          </div>
                        )}
                        {apt.patientEmail && (
                          <div className="doc-dash-patient-detail">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            {apt.patientEmail}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Duty Schedule */}
            <div className="doc-dash-section">
              <div className="doc-dash-section-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                <h2>Duty Schedule</h2>
              </div>

              <div className="doc-dash-schedule">
                {user.slots && user.slots.map((slot, i) => (
                  <div key={i} className="doc-dash-schedule-day">
                    <div className="doc-dash-schedule-day-label">
                      <span className="doc-dash-day-dot"></span>
                      {slot.day}
                    </div>
                    <div className="doc-dash-schedule-times">
                      {slot.times.map((time, j) => (
                        <span key={j} className="doc-dash-time-chip">{time}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="doc-dash-hours">
                <h3 className="doc-dash-section-header" style={{marginTop: 28}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/></svg>
                  Clinic Hours
                </h3>
                <table className="doc-dash-hours-table">
                  <tbody>
                    {clinicConfig.hours.map((h, i) => (
                      <tr key={i} className={h.active ? 'today' : ''}>
                        <td>{h.day}</td>
                        <td>{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Quick Info */}
              <div className="doc-dash-info-card">
                <h4>Your Profile</h4>
                <div className="doc-dash-info-row">
                  <span className="doc-dash-info-label">Education</span>
                  <span>{user.education}</span>
                </div>
                <div className="doc-dash-info-row">
                  <span className="doc-dash-info-label">Languages</span>
                  <span>{user.languages?.join(', ')}</span>
                </div>
                <div className="doc-dash-info-row">
                  <span className="doc-dash-info-label">Specialty</span>
                  <span>{user.specialty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
