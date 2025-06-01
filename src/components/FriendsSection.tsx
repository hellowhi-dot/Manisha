import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { friends } from '../data';
import { useInView } from 'react-intersection-observer';
import { Users } from 'lucide-react';

const FriendsSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const handleMouseEnter = (id: number) => {
    setActiveId(id);
    playSound();
  };
  
  const handleMouseLeave = () => {
    setActiveId(null);
  };
  
  const playSound = () => {
    const sounds = [
      'https://cdn.freesound.org/previews/614/614866_1648170-lq.mp3',  // Glass clink
      'https://cdn.freesound.org/previews/436/436563_6142149-lq.mp3',  // Laugh
      'https://cdn.freesound.org/previews/339/339828_5121236-lq.mp3',  // Pop
    ];
    
    const sound = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
    sound.volume = 0.2;
    sound.play();
  };
  
  const getRandomColor = (id: number) => {
    const colors = [
      'bg-neon-400/80',
      'bg-electric-400/80',
      'bg-midnight-400/80',
      'bg-cream-400/80',
    ];
    return colors[id % colors.length];
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
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="w-6 h-6 text-neon-400" />
          <h2 className="section-title mb-0">Obsession Mode: Friends Unfiltered</h2>
        </div>
        <p className="section-subtitle">The universe she created</p>
      </motion.div>
      
      <motion.div
        className="relative max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              className="glass h-40 md:h-48 rounded-lg overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              onMouseEnter={() => handleMouseEnter(friend.id)}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.05 }}
            >
              {/* Blurred silhouette */}
              <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-${getRandomColor(friend.id).replace('bg-', '')} opacity-40`}></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className={`w-20 h-20 rounded-full ${getRandomColor(friend.id)} opacity-30`}
                  animate={activeId === friend.id ? { 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  } : {}}
                  transition={{ duration: 1.5, repeat: activeId === friend.id ? Infinity : 0 }}
                ></motion.div>
                
                <motion.div 
                  className="w-16 h-16 rounded-full bg-midnight-800 flex items-center justify-center"
                  animate={activeId === friend.id ? { scale: 1.1 } : { scale: 1 }}
                >
                  <span className="text-2xl">👤</span>
                </motion.div>
              </div>
              
              <AnimatePresence>
                {activeId === friend.id && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-midnight-900/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={`text-xl font-medium ${getRandomColor(friend.id).replace('bg-', 'text-').replace('/80', '')}`}>
                      {friend.label}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="text-center mt-12 max-w-xl mx-auto glass p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-xl font-script text-cream-100/90">
            She doesn't just have friends. She runs a damn universe.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FriendsSection;