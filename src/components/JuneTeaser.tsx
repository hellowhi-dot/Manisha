import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Moon, ArrowRight } from 'lucide-react';

const JuneTeaser: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900 z-0"></div>
      
      {/* Particle effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cream-400/30"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, Math.random() * -100, null],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 4 + Math.random() * 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <motion.div
        className="relative z-10 w-full max-w-4xl"
        style={{ opacity }}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Moon Animation */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            style={{ y }}
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-48 h-48 rounded-full bg-gradient-to-br from-cream-400 to-cream-200 relative overflow-hidden"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(254, 240, 138, 0.5)",
                    "0 0 40px rgba(254, 240, 138, 0.7)",
                    "0 0 20px rgba(254, 240, 138, 0.5)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Lunar surface details */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-cream-300/40"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      width: `${10 + Math.random() * 20}px`,
                      height: `${10 + Math.random() * 20}px`,
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Ambient glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream-400/10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
          
          {/* Text Content */}
          <motion.div 
            className="w-full md:w-1/2 glass p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Moon className="w-6 h-6 text-cream-400" />
              <h2 className="text-3xl font-bold text-cream-50">This Night, This Magic</h2>
            </div>
            
            <p className="text-xl mb-6 leading-relaxed text-cream-100/90">
              On the night of 4th June, I don't want stars. I want the spark between us.
            </p>
            
            <p className="text-lg mb-8 text-cream-100/70">
              A night where time stops, where conversations flow like wine, and where every moment becomes a memory we'll hold close.
            </p>
            
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Animated curtain reveal
                const curtain = document.getElementById('curtain-reveal');
                if (curtain) {
                  curtain.classList.remove('opacity-0', 'pointer-events-none');
                  
                  // Close curtain after 5 seconds
                  setTimeout(() => {
                    curtain.classList.add('opacity-0', 'pointer-events-none');
                  }, 5000);
                }
              }}
            >
              <span className="flex items-center gap-2">
                Leave the World. Step In With Me
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Curtain Reveal (Hidden by default) */}
      <div 
        id="curtain-reveal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950/95 opacity-0 pointer-events-none transition-opacity duration-500"
      >
        <motion.div
          className="max-w-md text-center p-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative w-full h-48 mb-8 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-500/20 to-electric-500/20"></div>
            
            {/* Silhouettes */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-32 w-48">
              <div className="absolute bottom-0 left-0 w-16 h-32 bg-midnight-900 rounded-t-full"></div>
              <div className="absolute bottom-0 right-0 w-16 h-28 bg-midnight-900 rounded-t-full"></div>
            </div>
            
            {/* Neon Lights */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-8 bg-neon-400/30 rounded-full"
                style={{
                  top: `${Math.random() * 40}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  height: [`${8 + Math.random() * 8}px`, `${12 + Math.random() * 12}px`, `${8 + Math.random() * 8}px`]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
            
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-6 bg-electric-400/30 rounded-full"
                style={{
                  top: `${Math.random() * 40}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  height: [`${6 + Math.random() * 6}px`, `${10 + Math.random() * 10}px`, `${6 + Math.random() * 6}px`]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
          
          <h3 className="text-2xl font-script text-neon-400 mb-4">A glimpse of what awaits</h3>
          <p className="text-cream-100/90">
            Two souls, one night, endless possibilities.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default JuneTeaser;