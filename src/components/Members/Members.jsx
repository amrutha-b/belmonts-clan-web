import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import boyImage from '../../assets/boy.png';
import girlImage from '../../assets/girl.png';
import './Members.css';

gsap.registerPlugin(ScrollTrigger);

const clanMembers = [
  {
    id: 1,
    name: 'Phillip Dafoe',
    country: 'United Kingdom',
    title: 'The Swordmaster',
    role: 'Warrior',
    description: 'Master of the blade, sworn protector of the Belmont legacy.',
    image: boyImage,
    gender: 'male',
  },
  {
    id: 2,
    name: 'Lady Seraphine',
    country: 'United Kingdom',
    title: 'The Enchantress',
    role: 'Mage',
    description: 'Wielder of ancient magic, keeper of mystical secrets.',
    image: girlImage,
    gender: 'female',
  },
  {
    id: 3,
    name: 'Rafe Whitmore',
    country: 'United Kingdom',
    title: 'The Shadow',
    role: 'Assassin',
    description: 'Silent as death, swift as shadow, loyal to the end.',
    image: boyImage,
    gender: 'male',
  },
  {
    id: 4,
    name: 'Lady Morgaine',
    country: 'United Kingdom',
    title: 'The Tempest',
    role: 'Ranger',
    description: 'Fury of nature, protector of the wild lands.',
    image: girlImage,
    gender: 'female',
  },
  {
    id: 5,
    name: 'Lord Aldric',
    country: 'Kingdom of Belmonts',
    title: 'The Strategist',
    role: 'General',
    description: 'Architect of victory, mind sharper than any blade.',
    image: boyImage,
    gender: 'male',
  },
  {
    id: 6,
    name: 'Sir Gareth',
    country: 'Kingdom of Belmonts',
    title: 'The Vanguard',
    role: 'Knight',
    description: 'First into battle, last to retreat, honor unshakeable.',
    image: boyImage,
    gender: 'male',
  },
  {
    id: 7,
    name: 'Lady Elara',
    country: 'Kingdom of Belmonts',
    title: 'The Sage',
    role: 'Healer',
    description: 'Wisdom of ages flows through her healing touch.',
    image: girlImage,
    gender: 'female',
  },
  {
    id: 8,
    name: 'Theron',
    country: 'Kingdom of Belmonts',
    title: 'The Hawkeye',
    role: 'Scout',
    description: 'Eyes that pierce through darkness, never misses a mark.',
    image: boyImage,
    gender: 'male',
  }
];

export default function Members() {
  const sectionRef = useRef();
  const cardsRef = useRef([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            },
            y: 100,
            opacity: 0,
            rotateX: 45,
          });
        }
      });
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section id="members" className="members" ref={sectionRef}>
      <div className="members-container">
        <h2 className="section-title">
          <span className="title-accent">━━━</span>
          Our Fellowship
          <span className="title-accent">━━━</span>
        </h2>
        
        <p className="members-intro">
          Each warrior brings unique strength to our brotherhood. 
          United by honor, driven by purpose.
        </p>
        
        <div className="members-grid">
          {clanMembers.map((member, index) => (
            <div 
              key={member.id}
              className="member-card"
              ref={el => cardsRef.current[index] = el}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-image-wrapper">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="member-image"
                    />
                    <div className="image-overlay"></div>
                  </div>
                  
                  <div className="card-header">
                    <div className="member-role-badge">{member.role}</div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-title">{member.title}</p>
                    <p className="member-country">{member.country}</p>
                  </div>
                  
                  <div className="card-ornament">
                    <span className="ornament-left">◈</span>
                    <span className="ornament-center">━━━</span>
                    <span className="ornament-right">◈</span>
                  </div>
                </div>
                
                <div className="card-back">
                  <p className="member-description">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
