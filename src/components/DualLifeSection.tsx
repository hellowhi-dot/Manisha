import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Wine } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const DualLifeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftRef, leftInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  const [rightRef, rightInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const leftY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rightY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900"></div>
      
      <div className="relative z-10 pt-24 pb-12">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            CA by Day. Chaos by Heart.
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Her world, her rhythm
          </motion.p>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Left panel - CA life */}
          <motion.div
            ref={leftRef}
            className="w-full md:w-1/2 min-h-[400px] p-6 relative overflow-hidden"
            style={{ y: leftY }}
          >
            <motion.div
              className="glass p-6 h-full flex flex-col items-center justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 bg-midnight-800/50 p-4 rounded-full">
                <GraduationCap className="w-12 h-12 text-electric-400" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-cream-50">CA by Day</h3>
              
              <motion.div
                className="space-y-4 text-center max-w-md"
                initial={{ opacity: 0 }}
                animate={leftInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-cream-100/80">Numbers, balance sheets, and tax codes fill her days.</p>
                
                <div className="flex justify-center gap-4 my-6">
                  {/* Animated study elements */}
                  <motion.div
                    className="w-12 h-16 bg-midnight-800 rounded-sm shadow-md"
                    animate={{ 
                      rotate: [0, 2, 0, -2, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                  
                  <motion.div
                    className="w-12 h-16 bg-midnight-700 rounded-sm shadow-md"
                    animate={{ 
                      rotate: [0, -2, 0, 2, 0],
                      y: [0, -3, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  ></motion.div>
                  
                  <motion.div
                    className="w-12 h-16 bg-midnight-600 rounded-sm shadow-md"
                    animate={{ 
                      rotate: [0, 3, 0, -3, 0],
                      y: [0, -4, 0]
                    }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  ></motion.div>
                </div>
                
                <p className="text-lg font-medium text-electric-300">Ambition in her eyes, determination in her heart.</p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Right panel - Chaos life */}
          <motion.div
            ref={rightRef}
            className="w-full md:w-1/2 min-h-[400px] p-6 relative overflow-hidden"
            style={{ y: rightY }}
          >
            <motion.div
              className="glass p-6 h-full flex flex-col items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={rightInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 bg-midnight-800/50 p-4 rounded-full">
                <Wine className="w-12 h-12 text-neon-400" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-cream-50">Chaos by Heart</h3>
              
              <motion.div
                className="space-y-4 text-center max-w-md"
                initial={{ opacity: 0 }}
                animate={rightInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-cream-100/80">Nights filled with laughter, wine, and adventures with friends.</p>
                
                <div className="flex justify-center gap-4 my-6">
                  {/* Animated party elements */}
                  <motion.div
                    className="w-6 h-12 bg-neon-900/80 rounded-full shadow-md"
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                      y: [0, -8, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div 
                      className="w-full h-1/3 bg-neon-500/50 rounded-t-full"
                      animate={{ height: ["33%", "25%", "33%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.div>
                  </motion.div>
                  
                  <motion.div
                    className="w-8 h-8 bg-neon-400/30 rounded-full shadow-md"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(244, 114, 182, 0.4)",
                        "0 0 0 10px rgba(244, 114, 182, 0)",
                        "0 0 0 0 rgba(244, 114, 182, 0.4)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                  
                  <motion.div
                    className="w-4 h-14 bg-neon-800/80 rounded-full shadow-md"
                    animate={{ 
                      rotate: [0, -8, 0, 8, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <motion.div 
                      className="w-full h-1/4 bg-neon-500/50 rounded-t-full"
                      animate={{ height: ["25%", "40%", "25%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.div>
                  </motion.div>
                </div>
                
                <p className="text-lg font-medium text-neon-300">She studies numbers but lives like poetry.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-16 max-w-xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xl font-script text-cream-100/90">
            In her contradictions, she finds herself. In her balance, she finds magic.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DualLifeSection;