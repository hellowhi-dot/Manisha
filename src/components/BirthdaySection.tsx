import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cake } from 'lucide-react';

const BirthdaySection: React.FC = () => {
  const [showCake, setShowCake] = useState(false);
  
  const toggleCake = () => {
    setShowCake(!showCake);
    
    if (!showCake) {
      // Play glass clink sound
      const clink = new Audio('https://cdn.freesound.org/previews/75/75343_26936-lq.mp3');
      clink.volume = 0.3;
      clink.play();
    }
  };
  
  return (
    <div className="relative min-h-screen py-16 px-4 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900 z-0"></div>
      
      {/* Y2K glitch effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-neon-400/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 400}px`,
              height: `${2 + Math.random() * 4}px`,
              filter: 'blur(4px)',
            }}
            animate={{ 
              opacity: [0, 0.5, 0],
              width: ['100%', '0%', '100%'],
              left: ['0%', '100%', '0%'],
            }}
            transition={{ 
              duration: 3 + Math.random() * 7, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
        
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-electric-400/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              height: `${50 + Math.random() * 200}px`,
              width: `${2 + Math.random() * 4}px`,
              filter: 'blur(4px)',
            }}
            animate={{ 
              opacity: [0, 0.5, 0],
              height: ['100%', '0%', '100%'],
              top: ['0%', '100%', '0%'],
            }}
            transition={{ 
              duration: 4 + Math.random() * 6, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <motion.div
          className="mb-12 glass p-8 w-full max-w-md relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-neon-400" />
              <h2 className="text-3xl font-bold text-cream-50">Birthday Glitch</h2>
            </div>
            
            <p className="text-xl text-center mb-8 text-cream-100/90">
              Celebrating the day a queen was born.
            </p>
          </div>
          
          {/* Glitch background effect */}
          <div className="absolute inset-0 z-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-neon-400/5"
                style={{
                  height: '100%',
                  width: `${2 + Math.random() * 10}px`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3, 
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
        
        <motion.button
          className="relative glass px-8 py-4 rounded-full mb-12 group overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          onClick={toggleCake}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative z-10 flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <span className="text-2xl font-script text-neon-400">12th Jan Royalty</span>
            <span className="text-2xl">✨</span>
          </div>
          
          {/* Button sparkle effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-electric-400/0 via-electric-400/30 to-electric-400/0"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.button>
        
        <AnimatePresence>
          {showCake && (
            <motion.div
              className="glass p-8 w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-8">
                <motion.div
                  className="relative"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Cake className="w-24 h-24 text-cream-400" />
                  
                  {/* Candle flames */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-4 bg-neon-400 rounded-full blur-sm"
                      style={{
                        top: '-8px',
                        left: `${30 + i * 20}%`,
                      }}
                      animate={{
                        height: ['16px', '20px', '16px'],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 1 + Math.random() * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                  
                  {/* Confetti */}
                  {showCake && [...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="confetti absolute"
                      style={{
                        left: `${Math.random() * 100}%`,
                        backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
                        animationDelay: `${Math.random() * 1}s`,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-2xl font-script text-neon-400 mb-4">Happy Birthday, M!</h3>
                <p className="text-cream-100/90 mb-4">
                  I wasn't there this Jan... But I'll make up for it every day after.
                </p>
                <p className="text-cream-100/70 text-sm">
                  The next birthday we celebrate will be together, with real cake and real champagne.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BirthdaySection;