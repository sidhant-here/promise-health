import { useState } from 'react';

export default function DoctorModal({ doctor, onClose, onBook }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [booked, setBooked] = useState(false);

  if (!doctor) return null;

  const handleBook = (e) => {
    e.preventDefault();
    if (!selectedSlot || !patientName.trim() || !patientPhone.trim()) return;
    const appointment = {
      id: Date.now(),
      doctor: doctor.name,
      specialty: doctor.specialty,
      color: doctor.color,
      day: selectedSlot.day,
      time: selectedSlot.time,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      status: 'Confirmed',
      bookedAt: new Date().toLocaleString()
    };
    onBook(appointment);
    setBooked(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {!booked ? (
          <>
            {/* Doctor Info Header */}
            <div className="modal-header">
              <div className="modal-avatar" style={{ background: doctor.color }}>
                {doctor.name.split(' ').pop()[0]}
              </div>
              <div className="modal-doctor-info">
                <h2 className="modal-doctor-name">{doctor.name}</h2>
                <p className="modal-doctor-specialty">{doctor.specialty}</p>
                <p className="modal-doctor-edu">{doctor.education}</p>
              </div>
            </div>

            <div className="modal-body">
              {/* Bio */}
              <p className="modal-bio">{doctor.bio}</p>

              {/* Languages */}
              <div className="modal-meta-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M2 12h20M12 3c2 2.5 3 5 3 9s-1 6.5-3 9c-2-2.5-3-5-3-9s1-6.5 3-9z" stroke="currentColor" strokeWidth="1.6"/></svg>
                <span>{doctor.languages.join(', ')}</span>
              </div>

              {/* Available Slots */}
              <div className="modal-slots-section">
                <h3 className="modal-section-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  Available slots
                </h3>
                <div className="modal-slot-groups">
                  {doctor.slots.map((group, gi) => (
                    <div key={gi} className="modal-slot-day">
                      <span className="modal-slot-day-label">{group.day}</span>
                      <div className="modal-slot-times">
                        {group.times.map((time, ti) => {
                          const isSelected = selectedSlot?.day === group.day && selectedSlot?.time === time;
                          return (
                            <button
                              key={ti}
                              className={`modal-slot-btn ${isSelected ? 'is-selected' : ''}`}
                              onClick={() => setSelectedSlot({ day: group.day, time })}
                              type="button"
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Book Form */}
              {selectedSlot && (
                <form className="modal-book-form" onSubmit={handleBook}>
                  <div className="modal-selected-slot">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {selectedSlot.day} at {selectedSlot.time}
                  </div>
                  <div className="modal-form-row">
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn--primary modal-book-btn">
                    Book appointment
                  </button>
                </form>
              )}
            </div>
          </>
        ) : (
          <div className="modal-success">
            <div className="modal-success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Appointment booked!</h2>
            <p>Your visit with <strong>{doctor.name}</strong> is confirmed for <strong>{selectedSlot.day}</strong> at <strong>{selectedSlot.time}</strong>.</p>
            <p className="modal-success-sub">Check your dashboard below to manage your appointments.</p>
            <button className="btn btn--primary" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
