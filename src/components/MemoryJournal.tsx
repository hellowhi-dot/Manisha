import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Star, Heart } from 'lucide-react';

interface Memory {
  id: number;
  date: string;
  title: string;
  content: string;
  mood: string;
}

const memories: Memory[] = [
  {
    id: 1,
    date: "January 12",
    title: "The Birthday I Missed",
    content: "I imagined being there, watching you celebrate, making you laugh...",
    mood: "🥺"
  },
  {
    id: 2,
    date: "February 14",
    title: "Valentine's from Afar",
    content: "Distance makes the heart grow fonder, but June 4th makes it race faster.",
    mood: "💝"
  },
  {
    id: 3,
    date: "March 21",
    title: "Late Night Confessions",
    content: "Your voice at 3 AM is my favorite sound in the world.",
    mood: "✨"
  },
  {
    id: 4,
    date: "April 15",
    title: "Study Break Thoughts",
    content: "Even when you're deep in CA prep, you make time to light up my day.",
    mood: "📚"
  }
];

const MemoryJournal: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
    const pageFlip = new Audio('https://cdn.freesound.org/previews/240/240776_4107740-lq.mp3');
    pageFlip.volume = 0.2;
    pageFlip.play();
  };

  return (
    <div className="relative min-h-screen py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-900 z-0"></div>

      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Book className="w-6 h-6 text-neon-400" />
          <h2 className="section-title mb-0">Memory Journal</h2>
        </div>
        <p className="section-subtitle">Pages of Us</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {memories.map((memory) => (
            <motion.div
              key={memory.id}
              className="glass p-6 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleMemoryClick(memory)}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-neon-400 font-script text-xl">{memory.date}</span>
                <span className="text-2xl">{memory.mood}</span>
              </div>
              <h3 className="text-xl font-medium mb-2">{memory.title}</h3>
              <p className="text-cream-100/70 line-clamp-2">{memory.content}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              className="fixed inset-0 bg-midnight-950/95 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                className="max-w-lg glass p-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-neon-400 font-script text-2xl">{selectedMemory.date}</span>
                  <span className="text-3xl">{selectedMemory.mood}</span>
                </div>
                
                <h3 className="text-2xl font-medium mb-4">{selectedMemory.title}</h3>
                <p className="text-cream-100/90 text-lg mb-6">{selectedMemory.content}</p>
                
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-electric-400" />
                  <Heart className="w-5 h-5 text-neon-400" />
                  <Star className="w-5 h-5 text-electric-400" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showHint && (
            <motion.div
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 glass px-6 py-3 text-cream-100/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              Click on a memory to read more...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryJournal;