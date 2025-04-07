import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import About from './components/About';
import Skills from './components/Skills';
import PortfolioAssistant from './components/AI/PortfolioAssistant';
import PortfolioScene from './components/3D/PortfolioScene';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { portfolioData } from './constants/portfolioData';
import './styles/App.css';

function App() {
  const [show3D, setShow3D] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    clients: 0
  });

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/eliebotuna',
      icon: 'github'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/eliebotuna',
      icon: 'linkedin'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/eliebotuna',
      icon: 'twitter'
    }
  ];

  return (
    <div className="app">
      <Header />
      <main>
        <section id="home" className="hero-section">
          <div className="hero-container">
            <Hero socialLinks={socialLinks} />
          </div>
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="stats">
          <Stats stats={stats} setStats={setStats} />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills skills={portfolioData.skills} />
        </section>
        <section id="portfolio">
          {show3D ? (
            <PortfolioScene onClose={() => setShow3D(false)} />
          ) : (
            <Portfolio />
          )}
        </section>
        <section id="contact">
          <Contact socialLinks={socialLinks} />
        </section>
      </main>
      <Footer socialLinks={socialLinks} />

      <div className="buttons-container">
        <button className="toggle-3d-btn" onClick={() => setShow3D(!show3D)}>
          {show3D ? "Fermer la vue 3D" : "Voir en 3D"}
        </button>
        <PortfolioAssistant onToggle3D={() => setShow3D(!show3D)} />
      </div>

      {show3D && (
        <div className="portfolio-scene-container">
          <PortfolioScene onClose={() => setShow3D(false)} />
        </div>
      )}
    </div>
  );
}

export default App;