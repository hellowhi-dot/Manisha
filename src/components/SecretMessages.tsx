import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Lock, Heart } from 'lucide-react';

const messages = [
  "Your laugh is my favorite chaos",
  "The way you talk about your dreams...",
  "That 3 AM conversation changed everything",
  "Your boldness is intoxicating",
  "Every notification from you makes time stop",
  "The way you balance ambition and adventure...",
  "Your mind is the most beautiful puzzle",
  "You make chaos look like art",
  "Your strength in pursuing CA while living fully...",
  "The night feels incomplete without our talks"
];

const SecretMessages: React.FC = () => {
  const [unlockedMessages, setUnlockedMessages] = useState<number[]>([]);
  const [currentMessage, setCurrentMessage] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const unlockMessage = (index: number) => {
    if (!unlockedMessages.includes(index)) {
      const unlock = new Audio('https://cdn.freesound.org/previews/415/415510_5121236-lq.mp3');
      unlock.volume = 0.2;
      unlock.play();
      
      setUnlockedMessages([...unlockedMessages, index]);
      setCurrentMessage(index);

      // Save to localStorage
      localStorage.setItem('unlockedMessages', JSON.stringify([...unlockedMessages, index]));
    } else {
      setCurrentMessage(index);
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900 z-0"></div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageCircle className="w-6 h-6 text-neon-400" />
          <h2 className="section-title mb-0">Hidden Thoughts</h2>
        </div>
        <p className="section-subtitle">Unlock what words can't say</p>
      </motion.div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={`aspect-square glass p-4 flex items-center justify-center cursor-pointer relative overflow-hidden
              ${unlockedMessages.includes(index) ? 'border-neon-400' : 'border-midnight-700'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => unlockMessage(index)}
          >
            <AnimatePresence>
              {!unlockedMessages.includes(index) ? (
                <motion.div
                  className="absolute inset-0 bg-midnight-900/80 backdrop-blur-sm flex items-center justify-center"
                  exit={{ opacity: 0 }}
                >
                  <Lock className="w-8 h-8 text-cream-100/50" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <Heart className="w-6 h-6 text-neon-400 mx-auto mb-2" />
                  <p className="text-sm text-cream-100/80">Unlocked</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {currentMessage !== null && (
          <motion.div
            className="fixed inset-0 bg-midnight-950/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrentMessage(null)}
          >
            <motion.div
              className="max-w-lg glass p-8 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <p className="text-2xl font-script text-neon-400 mb-6">{messages[currentMessage]}</p>
              <p className="text-cream-100/60 text-sm">Click anywhere to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHint && unlockedMessages.length === 0 && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 glass px-6 py-3 text-cream-100/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            Click the locks to reveal hidden messages...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretMessages;