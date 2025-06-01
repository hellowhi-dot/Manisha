import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { confessions } from '../data';
import { MessageSquare } from 'lucide-react';

const ConfessionWall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen py-16 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900 z-0"></div>
      
      {/* Candlelight effect */}
      <div className="absolute inset-0 z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-neon-400/20"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              filter: 'blur(60px)',
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <motion.div
        className="relative z-10 text-center mb-12"
        style={{ opacity }}
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageSquare className="w-6 h-6 text-neon-400" />
          <h2 className="section-title mb-0">Unfiltered Talks</h2>
        </div>
        <p className="section-subtitle">Scrollable Confession Wall</p>
      </motion.div>
      
      <motion.div 
        className="relative max-w-4xl mx-auto overflow-hidden glass p-8"
        style={{ opacity }}
      >
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {confessions.map((confession, index) => (
              <motion.div
                key={confession.id}
                className="w-80 glass p-6 shrink-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start mb-4">
                  <div className="p-2 rounded-full bg-midnight-800">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill={index % 2 === 0 ? "#f472b6" : "#60a5fa"}
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                  <p className="font-script text-2xl ml-3 text-cream-50">Confession #{confession.id}</p>
                </div>
                
                <p className="text-lg text-cream-100/90 font-medium mb-4">"{confession.text}"</p>
                
                <motion.button
                  className="text-sm flex items-center gap-2 text-cream-100/60 hover:text-neon-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    const audio = new Audio('https://cdn.freesound.org/previews/436/436563_6142149-lq.mp3');
                    audio.volume = 0.2;
                    audio.play();
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Listen to whisper</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-midnight-950/90 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-midnight-950/90 to-transparent pointer-events-none"></div>
      </motion.div>
      
      <motion.p
        className="relative z-10 text-center mt-8 text-lg font-script text-neon-300 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        Every word whispered, every moment shared... just a preview of our June night.
      </motion.p>
    </div>
  );
};

export default ConfessionWall;