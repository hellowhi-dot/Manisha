import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Wine, Music, Coffee } from 'lucide-react';

interface Mood {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  song: string;
  message: string;
}

const moods: Mood[] = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Romantic",
    description: "When thoughts of you take over",
    color: "text-neon-400",
    song: "Can't Help Falling in Love - Elvis Presley",
    message: "Every love song makes me think of June 4th..."
  },
  {
    icon: <Wine className="w-8 h-8" />,
    title: "Wild",
    description: "Ready for adventure",
    color: "text-electric-400",
    song: "Don't Stop Believin' - Journey",
    message: "Let's make the night unforgettable"
  },
  {
    icon: <Music className="w-8 h-8" />,
    title: "Dreamy",
    description: "Lost in thoughts of us",
    color: "text-purple-400",
    song: "Perfect - Ed Sheeran",
    message: "Dancing with you under the stars..."
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    title: "Cozy",
    description: "Intimate conversations",
    color: "text-amber-400",
    song: "Say You Won't Let Go - James Arthur",
    message: "Just us, talking till sunrise"
  }
];

const MoodBoard: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    const select = new Audio('https://cdn.freesound.org/previews/147/147242_2614803-lq.mp3');
    select.volume = 0.2;
    select.play();
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
          <Sparkles className="w-6 h-6 text-neon-400" />
          <h2 className="section-title mb-0">Current Mood</h2>
        </div>
        <p className="section-subtitle">How you make me feel</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {moods.map((mood, index) => (
            <motion.div
              key={index}
              className={`glass p-6 cursor-pointer ${
                selectedMood?.title === mood.title ? 'border-2 border-' + mood.color.replace('text-', '') : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood)}
            >
              <motion.div
                className={`${mood.color} mb-4`}
                animate={
                  selectedMood?.title === mood.title
                    ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                {mood.icon}
              </motion.div>
              <h3 className="text-xl font-medium mb-2">{mood.title}</h3>
              <p className="text-cream-100/70 text-sm">{mood.description}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedMood && (
            <motion.div
              className="mt-12 glass p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`${selectedMood.color}`}>{selectedMood.icon}</div>
                <div>
                  <h4 className="text-xl font-medium mb-1">{selectedMood.title} Mood</h4>
                  <p className="text-cream-100/70">{selectedMood.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-lg mb-2">Current Song:</p>
                <div className="glass p-4 flex items-center justify-between">
                  <span className="text-neon-400">{selectedMood.song}</span>
                  <button
                    className={`p-2 rounded-full ${isPlaying ? 'bg-neon-400' : 'bg-midnight-800'}`}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? "▶" : "■"}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xl font-script text-cream-100/90">{selectedMood.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MoodBoard;