import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    id: 1,
    year: '1147',
    title: 'The Founding',
    description: 'Lord Aldric united the scattered warriors under one banner, forging the Belmonts clan in the fires of brotherhood.',
    icon: '🏰',
    position: { x: 15, y: 30 }
  },
  {
    id: 2,
    year: '1203',
    title: 'Battle of Shadow\'s Peak',
    description: 'Against impossible odds, the Belmonts held the mountain pass for seven days, earning legendary status.',
    icon: '⚔',
    position: { x: 45, y: 20 }
  },
  {
    id: 3,
    year: '1289',
    title: 'The Great Alliance',
    description: 'Formed alliances with three neighboring kingdoms, expanding influence across the northern territories.',
    icon: '🤝',
    position: { x: 75, y: 35 }
  },
  {
    id: 4,
    year: '1356',
    title: 'Library of Lore',
    description: 'Established the grand library, preserving ancient knowledge and magical texts for future generations.',
    icon: '📚',
    position: { x: 25, y: 60 }
  },
  {
    id: 5,
    year: '1442',
    title: 'Tournament of Champions',
    description: 'Hosted the legendary tournament where warriors from across the realm competed for honor and glory.',
    icon: '🏆',
    position: { x: 65, y: 55 }
  },
  {
    id: 6,
    year: '1598',
    title: 'The Dragon Treaty',
    description: 'Negotiated peace with the ancient dragons, securing the skies and establishing mutual respect.',
    icon: '🐉',
    position: { x: 50, y: 75 }
  },
  {
    id: 7,
    year: '1723',
    title: 'Expansion Era',
    description: 'Extended clan influence to coastal regions, establishing new strongholds and trade routes.',
    icon: '⛵',
    position: { x: 80, y: 65 }
  },
  {
    id: 8,
    year: 'Present',
    title: 'The New Chapter',
    description: 'The Belmonts continue to thrive, adapting ancient wisdom to modern challenges while preserving sacred traditions.',
    icon: '✨',
    position: { x: 50, y: 85 }
  }
];

export default function Timeline() {
  const sectionRef = useRef();
  const mapRef = useRef();
  const itemsRef = useRef([]);
  const svgRef = useRef();
  const [focusedId, setFocusedId] = useState(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate map entrance
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 70%',
            end: 'top 50%',
            scrub: 1,
          },
          opacity: 0,
          scale: 0.95,
        });
      }

      // Animate constellation points
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            },
            opacity: 0,
            scale: 0,
            delay: index * 0.1,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Draw connecting lines between stars
  useEffect(() => {
    if (!svgRef.current || !mapRef.current) return;

    const svg = svgRef.current;
    const container = mapRef.current;
    
    // Clear previous lines
    const existingLines = svg.querySelectorAll('.constellation-line');
    existingLines.forEach(line => line.remove());

    // Create SVG paths between consecutive points
    for (let i = 0; i < achievements.length - 1; i++) {
      const current = achievements[i];
      const next = achievements[i + 1];

      const x1 = (current.position.x / 100) * container.offsetWidth;
      const y1 = (current.position.y / 100) * container.offsetHeight;
      const x2 = (next.position.x / 100) * container.offsetWidth;
      const y2 = (next.position.y / 100) * container.offsetHeight;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      line.setAttribute('class', 'constellation-line');
      line.setAttribute('d', `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 + 30} ${x2} ${y2}`);
      line.setAttribute('stroke', '#8b7355');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('fill', 'none');
      line.setAttribute('opacity', '0.6');
      line.setAttribute('stroke-dasharray', '5,5');

      svg.appendChild(line);
    }
  }, []);

  return (
    <section id="timeline" className="timeline" ref={sectionRef}>
      <div className="timeline-container">
        <h2 className="section-title">
          <span className="title-accent">━━━</span>
          Constellation of History
          <span className="title-accent">━━━</span>
        </h2>

        <p className="timeline-intro">
          A celestial map of glory written in the stars, marking moments of legend and triumph across the ages
        </p>

        {/* Constellation Map */}
        <div className="constellation-map" ref={mapRef}>
          {/* SVG for hand-drawn lines */}
          <svg
            ref={svgRef}
            className="constellation-lines"
            width="100%"
            height="100%"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
          ></svg>

          {/* Constellation stars/points */}
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`constellation-point ${focusedId === achievement.id ? 'focused' : ''}`}
              ref={el => itemsRef.current[index] = el}
              style={{
                left: `${achievement.position.x}%`,
                top: `${achievement.position.y}%`,
              }}
              onMouseEnter={() => setFocusedId(achievement.id)}
              onMouseLeave={() => setFocusedId(null)}
            >
              {/* Wax pin */}
              <div className="wax-pin">
                <div className="pin-head">
                  <span className="pin-icon">{achievement.icon}</span>
                </div>
                <div className="pin-seal"></div>
              </div>

              {/* Event popup */}
              <div className="event-popup">
                <div className="popup-year">{achievement.year}</div>
                <h3 className="popup-title">{achievement.title}</h3>
                <p className="popup-description">{achievement.description}</p>
                <div className="popup-ornament">◈ ━ ◈</div>
              </div>
            </div>
          ))}

          {/* Compass rose decoration */}
          <div className="compass-rose">
            {/* Outer ring */}
            <div className="compass-outer-ring"></div>
            
            {/* Cardinal directions */}
            <div className="compass-direction north">N</div>
            <div className="compass-direction east">E</div>
            <div className="compass-direction south">S</div>
            <div className="compass-direction west">W</div>
            
            {/* Inner star */}
            <div className="compass-inner">
              <div className="compass-star">✦</div>
            </div>
            
            {/* Decorative lines to edges */}
            <div className="compass-line north-line"></div>
            <div className="compass-line east-line"></div>
            <div className="compass-line south-line"></div>
            <div className="compass-line west-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
