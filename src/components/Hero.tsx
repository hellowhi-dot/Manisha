import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Wine, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  // Create random shooting stars
  const [shootingStars, setShootingStars] = useState<{id: number, top: string, left: string, delay: number}[]>([]);
  
  useEffect(() => {
    // Start typing animation after a delay
    const typingTimeout = setTimeout(() => {
      setIsTyping(true);
    }, 1000);
    
    // Create random shooting stars
    const stars = [];
    for (let i = 0; i < 10; i++) {
      stars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 10
      });
    }
    setShootingStars(stars);
    
    // Shooting star interval
    const starInterval = setInterval(() => {
      const newStars = [];
      for (let i = 0; i < 10; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 10
        });
      }
      setShootingStars(newStars);
    }, 10000);
    
    return () => {
      clearTimeout(typingTimeout);
      clearInterval(starInterval);
    };
  }, []);
  
  const scrollToCountdown = () => {
    const countdownSection = document.getElementById('countdown');
    if (countdownSection) {
      countdownSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4"
      style={{ opacity, y, scale }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-midnight-950 opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-kolkata-skyline bg-cover bg-center"></div>
      </div>
      
      {/* Shooting stars */}
      {shootingStars.map(star => (
        <div 
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: `${star.delay}s`
          }}
        ></div>
      ))}
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-2 text-cream-50 glow-text">
            A Vibe Named <span className="text-neon-400 font-script">M</span>
          </h1>
          <p className="text-lg md:text-xl text-cream-100/80">Midnight conversations, timeless moments</p>
        </motion.div>
        
        <motion.div
          className="my-12 glass p-6 md:p-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {isTyping ? (
            <p className="typewriter text-xl md:text-2xl text-cream-50">
              To the girl who owns her chaos, charms her nights, and wears the moon like lipstick.
            </p>
          ) : (
            <div className="h-8"></div>
          )}
        </motion.div>
        
        {/* Animated wine glass */}
        <motion.div
          className="my-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Wine className="w-16 h-16 text-neon-400 opacity-80" />
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                boxShadow: ["0 0 10px rgba(244, 114, 182, 0.5)", "0 0 30px rgba(244, 114, 182, 0.8)", "0 0 10px rgba(244, 114, 182, 0.5)"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>
        </motion.div>
        
        <motion.button
          className="btn-primary mt-4 flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          onClick={scrollToCountdown}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Dive Into The Night</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Hero;