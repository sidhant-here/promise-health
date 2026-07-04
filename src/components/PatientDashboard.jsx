export default function PatientDashboard({ appointments, onCancel }) {
  if (!appointments || appointments.length === 0) return null;

  return (
    <section className="dashboard" id="dashboard">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Your appointments</span>
          <h2>Patient dashboard</h2>
          <p>All your upcoming appointments in one place. You can cancel or reschedule at any time.</p>
        </div>

        <div className="dashboard-grid">
          {appointments.map((apt) => (
            <div key={apt.id} className="dashboard-card">
              <div className="dashboard-card-header">
                <div className="dashboard-avatar" style={{ background: apt.color }}>
                  {apt.doctor.split(' ').pop()[0]}
                </div>
                <div>
                  <h3 className="dashboard-doctor">{apt.doctor}</h3>
                  <p className="dashboard-specialty">{apt.specialty}</p>
                </div>
                <span className={`dashboard-status dashboard-status--${apt.status.toLowerCase()}`}>
                  {apt.status}
                </span>
              </div>

              <div className="dashboard-card-body">
                <div className="dashboard-detail">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  <span>{apt.day} at {apt.time}</span>
                </div>
                <div className="dashboard-detail">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/></svg>
                  <span>{apt.patientName}</span>
                </div>
                <div className="dashboard-detail">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/></svg>
                  <span>Booked {apt.bookedAt}</span>
                </div>
              </div>

              <button className="dashboard-cancel-btn" onClick={() => onCancel(apt.id)}>
                Cancel appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
