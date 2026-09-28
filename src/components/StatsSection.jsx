import React, { useState, useEffect, useRef } from 'react';
import './StatsSection.css';
import shurikenImage from '../assets/shuriken.avif';

const statsData = [
  { label: 'CASH PRIZES', target: 15, suffix: 'L' },
  { label: 'EVENTS', target: 80, suffix: '+' },
  { label: 'PARTICIPANTS', target: 25, suffix: 'K' },
  { label: 'COLLEGES', target: 183, suffix: '' }
];

const StatCard = ({ label, target, suffix, inView }) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!inView) {
      setDisplayValue('0');
      return;
    }

    let iterations = 0;
    const maxIterations = 30; // 30 frames of randomization
    const timer = setInterval(() => {
      if (iterations >= maxIterations) {
        setDisplayValue(target.toString());
        clearInterval(timer);
      } else {
        // Randomize the numbers
        const targetStr = target.toString();
        let randomStr = '';
        for (let i = 0; i < targetStr.length; i++) {
          randomStr += Math.floor(Math.random() * 10).toString();
        }
        setDisplayValue(randomStr);
        iterations++;
      }
    }, 50); // every 50ms

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        {displayValue}{suffix && <span className="stat-suffix">{suffix}</span>}
      </div>
    </div>
  );
};

// Shuriken icon simulating the stars in the design
const Shuriken = () => (
  <img src={shurikenImage} alt="Shuriken" className="shuriken-svg" />
);

const StatsSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false); // Reset when scrolled out so it animates again
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        {statsData.map((stat, idx) => (
          <StatCard key={idx} {...stat} inView={inView} />
        ))}
      </div>
      <div className="stats-footer">
        <Shuriken />
        <span className="stats-slogan">BEGIN. EVOLVE. BECOME.</span>
        <Shuriken />
      </div>
    </section>
  );
};

export default StatsSection;
