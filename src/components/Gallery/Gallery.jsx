import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1533837382332-15a3d48c4138?w=800',
    title: 'Castle Fortress',
    description: 'The great stronghold where legends were forged',
    category: 'Strongholds'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800',
    title: 'Battle Formation',
    description: 'Warriors standing as one against the darkness',
    category: 'Battles'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1565000852-a63c066a6c7b?w=800',
    title: 'Ancient Hall',
    description: 'Where the council of Belmonts convened',
    category: 'Heritage'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800',
    title: 'War Banner',
    description: 'The sacred banner carried through ages',
    category: 'Artifacts'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1551414743-7a5f0e9e1f3c?w=800',
    title: 'Great Council',
    description: 'Ancient deliberations of the Belmont lineage',
    category: 'Events'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?w=800',
    title: 'Knight\'s Armor',
    description: 'Forged in fire, tested in battle',
    category: 'Artifacts'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1578590715892-38e33cb1eedd?w=800',
    title: 'Mountain Outpost',
    description: 'Sentinel of the northern reaches',
    category: 'Strongholds'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=800',
    title: 'Victory Celebration',
    description: 'A triumph etched in history',
    category: 'Events'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=800',
    title: 'Sacred Scroll',
    description: 'Knowledge inscribed upon ancient parchment',
    category: 'Heritage'
  }
];

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isBookClosed, setIsBookClosed] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');
  const sectionRef = useRef();
  const codexRef = useRef();
  const bookCoverRef = useRef();
  const pagesRef = useRef([]);
  const categories = ['All', 'Strongholds', 'Battles', 'Heritage', 'Artifacts', 'Events'];

  const filteredImages = filter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  // Pages are pairs of images (left and right)
  const pages = [];
  for (let i = 0; i < filteredImages.length; i += 2) {
    pages.push({
      left: filteredImages[i],
      right: filteredImages[i + 1] || null
    });
  }

  // Open book animation on scroll
  useEffect(() => {
    if (!isBookClosed || !codexRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(codexRef.current, {
        scrollTrigger: {
          trigger: codexRef.current,
          start: 'top 60%',
          end: 'top 40%',
          scrub: 1,
          onEnter: () => {
            // When scrolling into view, open the book
            gsap.timeline().to(bookCoverRef.current, {
              rotationY: -180,
              duration: 1.2,
              ease: 'power2.inOut',
              onComplete: () => setIsBookClosed(false),
            });
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isBookClosed]);

  // Flip page animation
  const flipPage = (direction) => {
    if (isFlipping || (direction === 1 && currentPage >= pages.length - 1) || (direction === -1 && currentPage <= 0)) {
      return;
    }

    setIsFlipping(true);
    const currentPageEl = pagesRef.current[currentPage];

    gsap.timeline()
      .to(currentPageEl, {
        rotationY: direction === 1 ? -180 : 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 0)
      .to(currentPageEl.querySelector('.page-content'), {
        opacity: 0,
        duration: 0.3,
      }, 0)
      .to(currentPageEl.querySelector('.page-content'), {
        opacity: 1,
        duration: 0.3,
        delay: 0.4,
      })
      .call(() => {
        setCurrentPage(prev => prev + direction);
        setIsFlipping(false);
      }, null, 0.4);
  };

  // Reset animation when filter changes
  useEffect(() => {
    setCurrentPage(0);
    setSelectedImage(null);
    setIsBookClosed(true);
  }, [filter]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  // Entrance animation
  useEffect(() => {
    if (isBookClosed) return; // Don't run entrance animation while book is closed
    
    const ctx = gsap.context(() => {
      if (codexRef.current) {
        gsap.from(codexRef.current, {
          scrollTrigger: {
            trigger: codexRef.current,
            start: 'top 70%',
            end: 'top 50%',
            scrub: 1,
          },
          y: 80,
          opacity: 0,
          scale: 0.9,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isBookClosed]);

  return (
    <section id="gallery" className="gallery" ref={sectionRef}>
      
      <div className="gallery-container">
        <h2 className="section-title">
          <span className="title-accent">━━━</span>
          Chronicles of the Belmonts
          <span className="title-accent">━━━</span>
        </h2>

        <p className="gallery-intro">
          A codex of legend, bound in parchment and time
        </p>

        {/* Filter buttons */}
        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Codex Container */}
        <div className="codex-wrapper">
          <div className="codex" ref={codexRef} style={{ perspective: '1200px' }}>
            {/* Book Cover - Initially visible */}
            {isBookClosed && (
              <div className="book-cover" ref={bookCoverRef} style={{ transformStyle: 'preserve-3d' }}>
                <div className="cover-front">
                  <div className="cover-content">
                    <h1 className="cover-title">Chronicles of the Belmonts</h1>
                    <div className="cover-divider"></div>
                    <p className="cover-subtitle">A Codex of Legend</p>
                    <p className="cover-hint">Scroll to open</p>
                  </div>
                </div>
                <div className="cover-back"></div>
              </div>
            )}

            {/* Book Spine */}
            <div className="book-spine"></div>

            {/* Pages */}
            <div className="pages-container">
              {pages.map((page, index) => (
                <div
                  key={index}
                  ref={el => pagesRef.current[index] = el}
                  className={`page ${index === currentPage ? 'active' : ''}`}
                  style={{
                    display: index === currentPage ? 'flex' : 'none',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="page-inner">
                    {/* Page background (parchment) */}
                    <div className="page-bg"></div>

                    <div className="page-content">
                      {/* Left side */}
                      <div className="page-side left-page">
                        {page.left && (
                          <div className="page-entry">
                            <div
                              className="entry-image"
                              onClick={() => setSelectedImage(page.left)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(page.left)}
                            >
                              <img src={page.left.src} alt={page.left.title} />
                              <div className="entry-overlay">
                                <span className="view-label">View</span>
                              </div>
                            </div>
                            <div className="entry-text">
                              <h3 className="entry-title">{page.left.title}</h3>
                              <p className="entry-description">{page.left.description}</p>
                              <span className="entry-category">{page.left.category}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="page-divider"></div>

                      {/* Right side */}
                      <div className="page-side right-page">
                        {page.right && (
                          <div className="page-entry">
                            <div
                              className="entry-image"
                              onClick={() => setSelectedImage(page.right)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(page.right)}
                            >
                              <img src={page.right.src} alt={page.right.title} />
                              <div className="entry-overlay">
                                <span className="view-label">View</span>
                              </div>
                            </div>
                            <div className="entry-text">
                              <h3 className="entry-title">{page.right.title}</h3>
                              <p className="entry-description">{page.right.description}</p>
                              <span className="entry-category">{page.right.category}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Page number */}
                    <div className="page-number">
                      {index * 2 + 1} - {Math.min(index * 2 + 2, filteredImages.length)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="codex-controls">
          <button
            className={`flip-btn prev ${currentPage === 0 ? 'disabled' : ''}`}
            onClick={() => flipPage(-1)}
            disabled={currentPage === 0 || isFlipping}
            aria-label="Previous page"
          >
            <span>❮</span>
          </button>

          <div className="page-indicator">
            <span className="current-page">{currentPage + 1}</span>
            <span className="total-pages">/ {pages.length}</span>
          </div>

          <button
            className={`flip-btn next ${currentPage >= pages.length - 1 ? 'disabled' : ''}`}
            onClick={() => flipPage(1)}
            disabled={currentPage >= pages.length - 1 || isFlipping}
            aria-label="Next page"
          >
            <span>❯</span>
          </button>
        </div>
      </div>

      {/* Lightbox for detailed view */}
      {selectedImage && (
        <div className="codex-lightbox" onClick={() => setSelectedImage(null)}>
          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="lightbox-content"
            onClick={e => e.stopPropagation()}
          >
            <div className="lightbox-image-wrapper">
              <img src={selectedImage.src} alt={selectedImage.title} />
            </div>
            <div className="lightbox-text">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <span className="lightbox-category">{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
