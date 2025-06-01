import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';

const AnimatedMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const pathProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900 z-0"></div>
      
      <motion.div
        className="relative z-10 w-full max-w-4xl text-center mb-12"
        style={{ opacity }}
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Kolkata Nights x Jamshedpur Soul</h2>
        <p className="section-subtitle">Two cities, one heart</p>
      </motion.div>
      
      <motion.div 
        className="relative w-full max-w-4xl h-[400px] glass p-8"
        style={{ opacity }}
      >
        {/* Map Background */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-jamshedpur-skyline bg-cover bg-center"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-kolkata-skyline bg-cover bg-center"></div>
        </div>
        
        {/* Map Elements */}
        <div className="relative w-full h-full">
          {/* Jamshedpur Location */}
          <motion.div 
            className="absolute top-[30%] left-[25%]"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <MapPin className="w-8 h-8 text-electric-400" />
              <motion.div 
                className="absolute inset-0"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-8 h-8 text-electric-400" />
              </motion.div>
            </div>
            
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
              <p className="text-sm font-medium bg-midnight-800/80 px-2 py-1 rounded text-electric-300">Jamshedpur</p>
            </div>
          </motion.div>
          
          {/* Kolkata Location */}
          <motion.div 
            className="absolute top-[45%] right-[20%]"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <MapPin className="w-8 h-8 text-neon-400" />
              <motion.div 
                className="absolute inset-0"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <MapPin className="w-8 h-8 text-neon-400" />
              </motion.div>
            </div>
            
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
              <p className="text-sm font-medium bg-midnight-800/80 px-2 py-1 rounded text-neon-300">Kolkata</p>
            </div>
          </motion.div>
          
         {/* June 4 Meeting Point */}
<motion.div 
  className="absolute bottom-[35%] left-[30%]"
  initial={{ scale: 0, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.6, delay: 1 }}
  viewport={{ once: true }}
>
  <motion.div 
    className="w-6 h-6 rounded-full bg-gradient-to-r from-electric-400 to-neon-400"
    animate={{ 
      boxShadow: [
        "0 0 0 0 rgba(244, 114, 182, 0.7)",
        "0 0 0 10px rgba(244, 114, 182, 0)",
        "0 0 0 0 rgba(244, 114, 182, 0.7)"
      ]
    }}
    transition={{ duration: 2, repeat: Infinity }}
  ></motion.div>
  
  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
    <p className="text-sm font-medium bg-midnight-800/80 px-2 py-1 rounded text-cream-50">
      June 4: Meet-Up <span className="text-neon-400">♥</span>
    </p>
  </div>
</motion.div>

          
          {/* Connecting Line */}
          <svg 
            width="100%" 
            height="100%" 
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <motion.path
              d="M 25% 30% Q 40% 60%, 70% 45% T 70% 75%"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray="0 1"
              strokeDashoffset="0"
              style={{
                pathLength: pathProgress,
                opacity: pathProgress
              }}
            />
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </svg>
        </div>
      </motion.div>
      
      <motion.div 
        className="relative z-10 glass p-6 max-w-xl mx-auto mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-xl">
          <span className="text-electric-400">Where chaos meets comfort.</span>
          <br />
          <span className="text-neon-400">And wine meets stories.</span>
        </p>
      </motion.div>
    </div>
  );
};

export default AnimatedMap;