import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showOverlay, setShowOverlay] = useState(false);
  
  const targetDate = new Date('June 4, 2025 00:00:00').getTime();
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
      
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);
  
  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
    
    // Play heartbeat sound when overlay opens
    if (!showOverlay) {
      const heartbeat = new Audio('https://cdn.freesound.org/previews/518/518115_10333837-lq.mp3');
      heartbeat.volume = 0.3;
      heartbeat.play();
    }
  };
  
  return (
    <section id="countdown" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950 z-0"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-electric-400"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{ 
              y: [null, Math.random() * -100, null],
              opacity: [null, Math.random() * 0.8 + 0.2, null]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="relative z-10 w-full max-w-2xl text-center glass p-8 md:p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-neon-400" />
          <h2 className="section-title mb-0">June 4: The Night We Write</h2>
        </div>
        
        <p className="text-lg mb-8 text-cream-100/80">The countdown to our moment begins now...</p>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col glass p-4 electric-glow">
            <span className="text-3xl md:text-4xl font-bold text-electric-400">{timeLeft.days}</span>
            <span className="text-sm text-cream-100/70">Days</span>
          </div>
          
          <div className="flex flex-col glass p-4 electric-glow">
            <span className="text-3xl md:text-4xl font-bold text-electric-400">{timeLeft.hours}</span>
            <span className="text-sm text-cream-100/70">Hours</span>
          </div>
          
          <div className="flex flex-col glass p-4 electric-glow">
            <span className="text-3xl md:text-4xl font-bold text-electric-400">{timeLeft.minutes}</span>
            <span className="text-sm text-cream-100/70">Minutes</span>
          </div>
          
          <div className="flex flex-col glass p-4 electric-glow">
            <span className="text-3xl md:text-4xl font-bold text-electric-400">{timeLeft.seconds}</span>
            <span className="text-sm text-cream-100/70">Seconds</span>
          </div>
        </div>
        
        <button 
          onClick={toggleOverlay}
          className="btn-primary flex items-center justify-center gap-2 mx-auto"
        >
          <Clock className="w-5 h-5" />
          <span>Feel The Anticipation</span>
        </button>
      </motion.div>
      
      {/* Overlay */}
      {showOverlay && (
        <motion.div 
          className="fixed inset-0 bg-midnight-950/90 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleOverlay}
        >
          <motion.div 
            className="text-center p-8 max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              type: "spring"
            }}
          >
            <motion.div 
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-neon-500/20 relative"
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0 0 rgba(244, 114, 182, 0.7)",
                  "0 0 0 20px rgba(244, 114, 182, 0)",
                  "0 0 0 0 rgba(244, 114, 182, 0.7)"
                ]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-neon-400 text-2xl">♥</span>
              </div>
            </motion.div>
            
            <h3 className="text-3xl font-script text-neon-400 mb-4">One night. No timelines. Just us.</h3>
            <p className="text-cream-100/80">Every second brings us closer to the night where time stops and magic begins.</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default CountdownTimer;