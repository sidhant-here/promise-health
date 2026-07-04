import { clinicConfig } from '../data/config.js';
import { useScrollReveal } from '../utils/hooks.js';

export default function HowItWorks() {
  return (
    <section className="flow" id="visit">
      <div className="wrap">
        <div className="section-head reveal" ref={useScrollReveal()}>
          <span className="eyebrow">How a visit works</span>
          <h2>From booking to your care plan, in four steps</h2>
        </div>
        <div className="flow-grid">
          {clinicConfig.steps.map((step, i) => (
            <div key={i} className="flow-step reveal" ref={useScrollReveal()} style={{transitionDelay: `${i * 0.08}s`}}>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}