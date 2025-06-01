import React, { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import AudioControl from './components/AudioControl';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CountdownTimer from './components/CountdownTimer';
import DualLifeSection from './components/DualLifeSection';
import AnimatedMap from './components/AnimatedMap';
import ClosetCarousel from './components/ClosetCarousel';
import FriendsSection from './components/FriendsSection';
import SpinWheel from './components/SpinWheel';
import SecretMessages from './components/SecretMessages';
import MoodBoard from './components/MoodBoard';
import MemoryJournal from './components/MemoryJournal';
import ConfessionWall from './components/ConfessionWall';
import JuneTeaser from './components/JuneTeaser';
import BirthdaySection from './components/BirthdaySection';
import Footer from './components/Footer';

function App() {
  const [hoverActive, setHoverActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const handleMouseOver = () => {
      setHoverActive(true);
    };
    
    const handleMouseOut = () => {
      setHoverActive(false);
    };
    
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    
    buttons.forEach(button => {
      button.addEventListener('mouseover', handleMouseOver);
      button.addEventListener('mouseout', handleMouseOut);
    });
    
    links.forEach(link => {
      link.addEventListener('mouseover', handleMouseOver);
      link.addEventListener('mouseout', handleMouseOut);
    });
    
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseover', handleMouseOver);
        button.removeEventListener('mouseout', handleMouseOut);
      });
      
      links.forEach(link => {
        link.removeEventListener('mouseover', handleMouseOver);
        link.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-midnight-950 z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-midnight-800 flex items-center justify-center">
                <span className="text-5xl font-script text-neon-400">M</span>
              </div>
              
              <div className="absolute inset-0">
                <div className="w-24 h-24 rounded-full border-2 border-t-neon-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              </div>
            </div>
          </div>
          
          <p className="text-neon-400 font-script text-2xl animate-pulse">
            Loading our world...
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <Cursor hoverActive={hoverActive} />
      <AudioControl />
      <Navbar />
      
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="countdown">
          <CountdownTimer />
        </section>
        <section id="dual-life">
          <DualLifeSection />
        </section>
        <section id="map">
          <AnimatedMap />
        </section>
        <section id="closet">
          <ClosetCarousel />
        </section>
        <section id="friends">
          <FriendsSection />
        </section>
        <section id="wheel">
          <SpinWheel />
        </section>
        <section id="secrets">
          <SecretMessages />
        </section>
        <section id="mood">
          <MoodBoard />
        </section>
        <section id="memories">
          <MemoryJournal />
        </section>
        <section id="confessions">
          <ConfessionWall />
        </section>
        <section id="teaser">
          <JuneTeaser />
        </section>
        <section id="birthday">
          <BirthdaySection />
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default App;