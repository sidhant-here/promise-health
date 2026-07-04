import { clinicConfig } from '../data/config.js';
import { useScrollReveal } from '../utils/hooks.js';

export default function CareTeam({ onSelectDoctor }) {
  return (
    <section id="team" style={{background:'var(--paper)', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
      <div className="wrap">
        <div className="section-head reveal" ref={useScrollReveal()}>
          <span className="eyebrow">Care team</span>
          <h2>Meet the doctors you'll actually see</h2>
          <p>{clinicConfig.name} is small on purpose — a short roster means you see a familiar face at every visit.</p>
        </div>
        <div className="team-grid">
          {clinicConfig.team.map((d, i) => (
            <div 
              key={i} 
              className="schedule-card doctor-card reveal" 
              ref={useScrollReveal()} 
              style={{transitionDelay: `${i * 0.08}s`, cursor: 'pointer'}}
              onClick={() => onSelectDoctor(d)}
            >
              <div className="avatar" style={{background: d.color}}>{d.name.split(' ')[1][0]}</div>
              <h3>{d.name}</h3>
              <p className="doctor-specialty">{d.specialty}</p>
              <span className="doctor-next"><span className="live-dot"></span>{d.next}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}