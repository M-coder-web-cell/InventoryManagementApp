import React, { useEffect, useRef } from 'react';
import '../styles/Home.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Ravi S.",
    role: "Textile Wholesaler, Surat",
    quote: "From chaos to control — Arft powers your inventory. We liquidated dead stock in days, not months.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya G.",
    role: "Retailer, Mumbai",
    quote: "Turn unsold stock into capital, not clutter. Arft’s network is a game changer for Bharat’s wholesale backbone.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Amit K.",
    role: "Garment Distributor, Delhi",
    quote: "Your warehouse, optimized. Arft is fast, reliable, and so easy to use.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  }
];

export default function Home() {
  const heroRef = useRef(null);
  const featureRefs = useRef([]);
  const testimonialRefs = useRef([]);
  const ctaRef = useRef(null);

  // Clear refs on each render to avoid stale references
  featureRefs.current = [];
  testimonialRefs.current = [];

  useEffect(() => {
    // HERO animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out'
        }
      );
    }

    // FEATURES animation
    featureRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    });

    // TESTIMONIALS animation
    testimonialRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true
            }
          }
        );
      }
    });

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            once: true
          }
        }
      );
    }
  }, []);

  return (
    <div className="home-root">
      {/* HERO SECTION */}
      <section className="home-hero" ref={heroRef}>
        <div className="hero-content">
          <h1>
            <span className="brand-gradient">From chaos to control —</span> <br />
            Arft powers your inventory.
          </h1>
          <p className="hero-subtitle">
            Built for Bharat’s wholesale backbone.<br />
            <span style={{ color: "#43e97b", fontWeight: 600 }}>Reduce dead stock instantly.</span> Your warehouse, optimized.
          </p>
          <div className="hero-cta-row">
            <a href="/signup" className="hero-cta primary-cta">Try Free</a>
            <a href="/inventory" className="hero-cta secondary-cta">Live Demo</a>
          </div>
          <div style={{ marginTop: 12, fontWeight: 500, color: "#1e90ff", fontSize: "1.05rem" }}>
            <span style={{ color: "#43e97b" }}>✓</span> Trusted by 1000+ businesses
          </div>
        </div>
        <div className="hero-image">
          <img
            className="dashboard-mockup"
            src="https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/10276154/og_image/optimized/0823-DashboardDesign-Dan-Social-e319a5a8a7ceb75b9e5010740700d409.png"
            alt="Inventory Dashboard Illustration"
            loading="lazy"
          />
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <span>🔒 Secure</span>
        <span>⚡ Fast</span>
        <span>🇮🇳 Made in India</span>
        <span>💳 No Credit Card Needed</span>
      </div>

      {/* FEATURE GRID */}
      <section className="home-features">
        <h2>Why Arft?</h2>
        <div className="features-grid">
          {[
            {
              icon: (
                <svg width="36" height="36" fill="none" stroke="#1e90ff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              ),
              title: 'Track Inventory',
              desc: 'Every unit, every time. Real-time stock tracking for total control.'
            },
            {
              icon: (
                <svg width="36" height="36" fill="none" stroke="#43e97b" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9 9h6v6H9z"/></svg>
              ),
              title: 'Liquidate Fast',
              desc: 'Reduce dead stock instantly. Connect with trusted buyers and sellers.'
            },
            {
              icon: (
                <svg width="36" height="36" fill="none" stroke="#1e90ff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6"/><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
              ),
              title: 'Trusted Network',
              desc: 'Built for Bharat’s wholesale backbone. Grow with confidence.'
            }
          ].map((f, i) => (
            <div
              className="feature-card"
              key={f.title}
              ref={el => featureRefs.current[i] = el}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div
              className="testimonial-card"
              key={t.name}
              ref={el => testimonialRefs.current[i] = el}
            >
              <img className="testimonial-avatar" src={t.avatar} alt={t.name} />
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
              <div className="testimonial-quote">“{t.quote}”</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band" ref={ctaRef}>
        <div className="cta-band-content">
          <h2>Start Managing Smarter – Try Arft Free</h2>
          <p>Join 1000+ Indian wholesalers and retailers already using Arft to simplify inventory and boost profits.</p>
          <a href="/signup" className="cta-band-btn">Get Started Free</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div>
          &copy; {new Date().getFullYear()} Arft Inventory. All rights reserved.
        </div>
        <div className="footer-links">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4.01c-.81.36-1.68.6-2.6.71a4.48 4.48 0 0 0 1.97-2.48c-.87.52-1.83.9-2.85 1.1A4.48 4.48 0 0 0 11 8.48c0 .35.04.7.11 1.03C7.72 9.36 4.1 7.6 1.67 4.93c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65-.72-.02-1.4-.22-1.99-.55v.06c0 2.13 1.52 3.9 3.53 4.3-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.02 9.02 0 0 1 0 19.54a12.77 12.77 0 0 0 6.92 2.03c8.3 0 12.85-6.87 12.85-12.83 0-.2 0-.41-.01-.61A9.18 9.18 0 0 0 22 4.01z"/></svg>
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M11 .3a11 11 0 0 0-3.48 21.45c.55.1.75-.24.75-.53v-2.1c-3.08.67-3.73-1.48-3.73-1.48-.5-1.27-1.22-1.6-1.22-1.6-.99-.67.08-.66.08-.66 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.69-1.48-2.46-.28-5.05-1.23-5.05-5.47 0-1.21.43-2.2 1.13-2.98-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.01 1.13a10.5 10.5 0 0 1 5.48 0c2.09-1.43 3.01-1.13 3.01-1.13.6 1.52.22 2.64.11 2.92.7.78 1.13 1.77 1.13 2.98 0 4.25-2.6 5.19-5.07 5.47.39.34.74 1.01.74 2.04v3.03c0 .29.2.63.76.53A11 11 0 0 0 11 .3z"/></svg>
          </a>
          <a href="/privacy" className="footer-link">Privacy</a>
          <a href="/terms" className="footer-link">Terms</a>
        </div>
      </footer>
    </div>
  );
}