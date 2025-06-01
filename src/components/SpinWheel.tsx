import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { wheelSections } from '../data';
import { useInView } from 'react-intersection-observer';
import { RotateCcw } from 'lucide-react';

const SpinWheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setShowPrompt(false);
    
    // Play spin sound
    const spinSound = new Audio('https://cdn.freesound.org/previews/568/568717_12564196-lq.mp3');
    spinSound.volume = 0.3;
    spinSound.play();
    
    // Calculate random rotation (between 5 and 10 full rotations)
    const spinDegrees = 1800 + Math.floor(Math.random() * 1800);
    const newRotation = rotation + spinDegrees;
    setRotation(newRotation);
    
    // Calculate which section will be selected
    const numSections = wheelSections.length;
    const degreesPerSection = 360 / numSections;
    
    // After 5 seconds (matching the animation duration), reveal the result
    setTimeout(() => {
      // Calculate which section is at the top (0 degrees) after spinning
      const normalizedDegrees = newRotation % 360;
      const sectionIndex = Math.floor(((360 - normalizedDegrees) % 360) / degreesPerSection);
      setSelectedSection(wheelSections[sectionIndex].text);
      setShowPrompt(true);
      
      // Play result sound
      const resultSound = new Audio('https://cdn.freesound.org/previews/321/321936_5808565-lq.mp3');
      resultSound.volume = 0.3;
      resultSound.play();
      
      setSpinning(false);
    }, 5000);
  };
  
  return (
    <div ref={ref} className="relative min-h-screen py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900 z-0"></div>
      
      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Spin the Chill Wheel</h2>
        <p className="section-subtitle">Let fate decide our vibe</p>
      </motion.div>
      
      <motion.div
        className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="wheel-container w-full md:w-1/2 max-w-md flex items-center justify-center">
          <div className="relative">
            {/* Wheel */}
            <motion.div
              ref={wheelRef}
              className="wheel w-64 h-64 md:w-72 md:h-72 rounded-full relative overflow-hidden border-4 border-midnight-700 neon-glow"
              style={{ 
                transform: `rotate(${rotation}deg)` 
              }}
              transition={{ duration: 5, type: "spring", damping: 30 }}
            >
              {wheelSections.map((section, index) => {
                const angle = 360 / wheelSections.length;
                const rotate = angle * index;
                
                return (
                  <div
                    key={section.id}
                    className="absolute top-0 left-0 right-0 bottom-0 origin-bottom-center"
                    style={{ 
                      transform: `rotate(${rotate}deg) skewY(${90 - angle}deg)` 
                    }}
                  >
                    <div
                      className="absolute top-0 right-0 bottom-0 left-0 origin-bottom-center flex justify-center items-start pt-4"
                      style={{ 
                        transform: `skewY(${-(90 - angle)}deg) rotate(${angle / 2}deg)`,
                        background: section.color 
                      }}
                    >
                      <p className="text-xs font-medium text-midnight-950 max-w-[80px] text-center leading-tight">
                        {section.text}
                      </p>
                    </div>
                  </div>
                );
              })}
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-midnight-950 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-400 to-electric-400"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-6 h-6 bg-cream-50 rotate-45 transform origin-center"></div>
            </div>
            
            {/* Spin Button */}
            <motion.button
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-16 btn-primary"
              onClick={spinWheel}
              disabled={spinning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5" />
                Spin {spinning ? "ning..." : "!"}
              </span>
            </motion.button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 glass p-6 mt-20 md:mt-0">
          {showPrompt ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h3 className="text-2xl font-script text-neon-400 mb-4">Your destiny awaits...</h3>
              <div className="p-6 glass mb-4">
                <p className="text-xl font-medium text-cream-50">{selectedSection}</p>
              </div>
              <p className="text-cream-100/80">June 4th can't come soon enough...</p>
            </motion.div>
          ) : (
            <div className="text-center h-48 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-script text-neon-400 mb-4">What's our vibe?</h3>
              <p className="text-cream-100/80">Spin the wheel to see what fate has in store for us on June 4th...</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SpinWheel;