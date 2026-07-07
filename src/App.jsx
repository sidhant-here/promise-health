import { useState, useEffect, useRef } from 'react';
import { clinicConfig } from './data/config.js';
import './index.css';
import { useAuth } from './context/AuthContext.jsx';
import CareTeam from './components/CareTeam';
import HowItWorks from './components/HowItWorks';
import DoctorModal from './components/DoctorModal';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import LoginPage from './components/LoginPage';

// Intersection Observer Hook for Scroll Reveals
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// === HOMEPAGE COMPONENT (isolated so hooks are stable) ===
function HomePage({ onShowLogin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [modalDoctor, setModalDoctor] = useState(null);

  const handleDoctorClick = (doctor) => {
    setModalDoctor(doctor);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setModalDoctor(null);
    document.body.style.overflow = '';
  };

  // Scroll header effect
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = (fd.get('fullName') || '').toString().trim().split(' ')[0] || 'there';
    const date = fd.get('preferredDate');
    let dateLabel = 'date to be confirmed';
    if (date) {
      const d = new Date(date + 'T00:00:00');
      dateLabel = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    }
    setConfirmData({
      name,
      phone: fd.get('phone'),
      detail: `${fd.get('reason') || 'Visit'} · ${dateLabel}`
    });
    setFormSubmitted(true);
  };

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      {/* HEADER */}
      <header id="siteHeader" className={isScrolled ? 'is-scrolled' : ''}>
        <div className="wrap nav">
          <a href="#top" className="brand">
            <span className="brand-mark">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L4 7v6c0 5 3.5 7.5 8 8 4.5-0.5 8-3 8-8V7l-8-4z" stroke="#F3F6F5" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M9 12.5l2 2 4-4.2" stroke="#F3F6F5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span>
              <span className="brand-name" style={{display:'block'}}>{clinicConfig.name.split(' ')[0]}</span>
              <span className="brand-sub">{clinicConfig.name.split(' ').slice(1).join(' ')}</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#team">Care team</a>
            <a href="#visit">How it works</a>
            <a href="#location">Hours &amp; location</a>
          </nav>

          <div className="nav-cta">
            <a href={`tel:+1${clinicConfig.phone.replace(/[^0-9]/g, '')}`} className="nav-phone">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1.1L6.6 10.8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              {clinicConfig.phone}
            </a>
            <button className="btn btn--outline btn--small nav-portal-btn" onClick={onShowLogin}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/></svg>
              Login / Portal
            </button>
            <a href="#appointment" className="btn btn--primary btn--small">Book a visit</a>
            <button className="nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Open menu" aria-expanded={mobileMenuOpen}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <div className={`mobile-panel ${mobileMenuOpen ? 'is-open' : ''}`}>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#team" onClick={() => setMobileMenuOpen(false)}>Care team</a>
          <a href="#visit" onClick={() => setMobileMenuOpen(false)}>How it works</a>
          <a href="#location" onClick={() => setMobileMenuOpen(false)}>Hours &amp; location</a>
          <a href="#appointment" onClick={() => setMobileMenuOpen(false)}>Book a visit</a>
          <button className="mobile-login-btn" onClick={() => { setMobileMenuOpen(false); onShowLogin(); }}>Login / Portal</button>
          <a href={`tel:+1${clinicConfig.phone.replace(/[^0-9]/g, '')}`}>Call {clinicConfig.phone}</a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top" style={{paddingTop:'76px'}}>
          <div className="wrap hero-grid">
            <div>
              <span className="hero-eyebrow load-anim" style={{animationDelay:'.05s'}}>A note from our founder</span>
              <h1 className="load-anim" style={{animationDelay:'.16s'}}>"{clinicConfig.founder.quote.split('doctor who remembers them')[0]}<em>doctor who remembers them</em>"</h1>
              <p className="hero-sub load-anim" style={{animationDelay:'.3s'}}>{clinicConfig.founder.subquote}</p>
              
              <div className="founder-credentials load-anim" style={{animationDelay:'.42s'}}>
                <span>Board Certified, Family Medicine</span>
                <span className="dot-sep">•</span>
                <span>Founder, {clinicConfig.name}</span>
              </div>

              <div className="hero-actions load-anim" style={{animationDelay:'.54s'}}>
                <a href="#appointment" className="btn btn--primary">Book an appointment</a>
                <a href={`tel:+1${clinicConfig.phone.replace(/[^0-9]/g, '')}`} className="btn btn--outline">Call the clinic</a>
              </div>

              <div className="stat-row load-anim" style={{animationDelay:'.68s'}}>
                {clinicConfig.founder.stats.map((s, i) => (
                  <div key={i} className="stat">
                    <span className="stat-num">{s.num}{s.suffix}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="founder-portrait-wrap load-anim" style={{animationDelay:'.22s'}}>
              <div className="portrait-glow" aria-hidden="true"></div>
              <div className="portrait-frame portrait-frame--lg">
                <img
                  src="/images/founder.jpg"
                  alt={`Portrait of ${clinicConfig.founder.name}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: 'inherit',
                    display: 'block'
                  }}
                />
              </div>
              <span className="founder-badge">Founder &amp; Lead Physician</span>

              <div className="schedule-card hero-mini-card">
                <div className="live-row">
                  <span className="live-dot" aria-hidden="true"></span>
                  <span className="live-label">Next opening with {clinicConfig.founder.name.split(' ')[1]}</span>
                </div>
                <div className="schedule-card__meta" style={{marginTop:'8px'}}>
                  <span>TODAY · 2:40 PM</span>
                  <span className="tag">30 MIN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <div className="trust">
          <div className="wrap trust-list">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/></svg>
              Same-day visits available
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none"><path d="M4 12h16M4 6h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              Walk-ins welcome, weekdays
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
              Most major insurance accepted
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              Se habla español
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <section id="services">
          <div className="wrap">
            <div className="section-head reveal" ref={useScrollReveal()}>
              <span className="eyebrow">Services</span>
              <h2>One clinic, most of what your family needs</h2>
              <p>Every visit type below is bookable online, with typical durations shown so you know what to expect before you arrive.</p>
            </div>
            <div className="services-grid">
              {clinicConfig.services.map((svc, i) => {
                const ref = useScrollReveal();
                return (
                  <div key={i} className="schedule-card service-card reveal" ref={ref} style={{transitionDelay: `${i * 0.07}s`}}>
                    <div className="schedule-card__meta"><span className="tag">{svc.tag}</span><span>{svc.time}</span></div>
                    <h3>{svc.title}</h3>
                    <p>{svc.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <CareTeam onSelectDoctor={handleDoctorClick} />
        <HowItWorks />

        {/* APPOINTMENT FORM */}
        <section className="appointment" id="appointment">
          <div className="wrap">
            <div className="appointment-shell">
              <div className="appointment-info">
                <span className="eyebrow">Request an appointment</span>
                <h2 style={{marginTop:'12px'}}>Tell us what's going on</h2>
                <p>Fill this out and our care team will call to confirm your exact time — usually within one business day. For anything urgent today, please call the clinic directly.</p>
                <div className="appointment-note">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M10.3 3.9L2.5 17a1.5 1.5 0 001.3 2.2h16.4a1.5 1.5 0 001.3-2.2L13.7 3.9a1.5 1.5 0 00-2.6 0z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  This form isn't for medical emergencies. If this is an emergency, call 911.
                </div>
              </div>

              <div>
                {!formSubmitted ? (
                  <form id="appointmentForm" onSubmit={handleFormSubmit}>
                    <div className="form-grid">
                      <div className="field"><label htmlFor="fullName">Full name</label><input type="text" id="fullName" name="fullName" required /></div>
                      <div className="field"><label htmlFor="phone">Phone number</label><input type="tel" id="phone" name="phone" required /></div>
                      <div className="field"><label htmlFor="email">Email</label><input type="email" id="email" name="email" required /></div>
                      <div className="field">
                        <label htmlFor="doctor">Preferred doctor</label>
                        <select id="doctor" name="doctor" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
                          <option value="">No preference</option>
                          {clinicConfig.team.map((d, i) => <option key={i}>{d.name} — {d.specialty.split('·')[0].trim()}</option>)}
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor="reason">Reason for visit</label>
                        <select id="reason" name="reason" required>
                          <option value="">Select one</option>
                          {clinicConfig.services.map((s, i) => <option key={i}>{s.title}</option>)}
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="field"><label htmlFor="preferredDate">Preferred date</label><input type="date" id="preferredDate" name="preferredDate" required /></div>
                      <div className="field full"><label htmlFor="notes">Anything we should know? (optional)</label><textarea id="notes" name="notes" placeholder="Symptoms, timing constraints, or questions for the doctor"></textarea></div>
                    </div>
                    <div className="form-foot">
                      <span className="form-disclaimer">By submitting, you agree to be contacted by phone or email to confirm your visit.</span>
                      <button type="submit" className="btn btn--primary">Request appointment</button>
                    </div>
                  </form>
                ) : (
                  <div className="confirmation is-visible">
                    <div className="confirmation-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <h3>Request received</h3>
                    <p>Thanks, <span>{confirmData.name}</span> — our care team will call <span>{confirmData.phone}</span> within one business day to confirm your visit.</p>
                    <div className="detail">{confirmData.detail}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{background:'var(--ink)', color:'rgba(243,246,245,0.85)', padding:'64px 0 28px'}}>
        <div className="wrap">
          <div className="footer-bottom">
            <span>© {clinicConfig.year} {clinicConfig.name}. All rights reserved.</span>
            <span className="footer-emergency" style={{color:'var(--amber)', fontWeight:600}}>Medical emergency? Call 911.</span>
          </div>
        </div>
      </footer>

      {modalDoctor && (
        <DoctorModal
          doctor={modalDoctor}
          onClose={handleModalClose}
          onBook={() => {}}
        />
      )}
    </>
  );
}

// === MAIN APP (no hooks in JSX — safe conditional rendering) ===
export default function App() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleCancelAppointment = (id) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  // Login page
  if (showLogin && !user) {
    return <LoginPage onBack={() => setShowLogin(false)} />;
  }

  // Patient dashboard
  if (user && user.role === 'patient') {
    return <PatientDashboard liveAppointments={appointments} onCancel={handleCancelAppointment} />;
  }

  // Doctor dashboard
  if (user && user.role === 'doctor') {
    return <DoctorDashboard appointments={appointments} />;
  }

  // Default: homepage
  return <HomePage onShowLogin={() => setShowLogin(true)} />;
}
