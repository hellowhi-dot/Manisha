import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Wine, Music, Coffee } from 'lucide-react';

interface Mood {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  song: string;
  songUrl: string;
  message: string;
}

const moods: Mood[] = [
 {
  icon: <Heart className="w-8 h-8" />,
  title: "Romantic",
  description: "My Heart Will Go On",
  color: "text-neon-400",
  song: "My Heart Will Go On - Celine Dion",
  songUrl: "https://files.catbox.moe/ws6ga9.mp3",
  message: "Every love song makes me think of June 4th..."
}
,
  {
    icon: <Wine className="w-8 h-8" />,
    title: "Wild",
    description: "Ready for adventure",
    color: "text-electric-400",
    song: "Don't Stop Believin' - Journey",
    songUrl: "https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a",
    message: "Let's make the night unforgettable"
  },
  {
    icon: <Music className="w-8 h-8" />,
    title: "Dreamy",
    description: "Lost in thoughts of us",
    color: "text-purple-400",
    song: "Perfect - Ed Sheeran",
    songUrl: "https://files.catbox.moe/vmawqf.mp3",
    message: "Dancing with you under the stars..."
  },
 {
  icon: <Coffee className="w-8 h-8" />,
  title: "Cozy",
  description: "Thinking Out Loud",
  color: "text-amber-400",
  song: "Thinking Out Loud - Ed Sheeran",
  songUrl: "https://files.catbox.moe/9nxca2.mp3",
  message: "Just us, talking till sunrise"
}
];

const MoodBoard: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setAudioError(null);

    // Play selection sound
    const select = new Audio('https://commondatastorage.googleapis.com/codeskulptor-assets/week7-button.m4a');
    select.volume = 0.2;
    select.play().catch(e => console.log('Select sound failed:', e));

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = mood.songUrl;
      
      // Add a small delay to ensure the audio source is loaded
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              console.log('Audio started playing');
            })
            .catch(error => {
              console.error('Audio playback failed:', error);
              setAudioError('Failed to play audio. The audio file may not be available.');
              setIsPlaying(false);
            });
        }
      }, 100);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(null);
        })
        .catch(error => {
          console.error('Audio playback failed:', error);
          setAudioError('Failed to play audio. The audio file may not be available.');
          setIsPlaying(false);
        });
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioError = (e: any) => {
    console.error('Audio error:', e);
    setAudioError('Audio file could not be loaded.');
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', handleAudioEnded);
      audio.addEventListener('error', handleAudioError);
      
      return () => {
        audio.removeEventListener('ended', handleAudioEnded);
        audio.removeEventListener('error', handleAudioError);
        audio.pause();
      };
    }
  }, []);

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
              className={`glass p-6 cursor-pointer transition-all duration-300 ${
                selectedMood?.title === mood.title 
                  ? 'border-2 border-opacity-50 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              style={{
                borderColor: selectedMood?.title === mood.title 
                  ? mood.color.replace('text-', '').replace('-400', '')
                  : 'transparent'
              }}
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
                  <span className="text-neon-400 flex-1">{selectedMood.song}</span>
                  <button
                    className={`p-3 rounded-full transition-all duration-200 ${
                      isPlaying 
                        ? 'bg-neon-400 text-midnight-900 hover:bg-neon-300' 
                        : 'bg-midnight-800 text-cream-100 hover:bg-midnight-700'
                    }`}
                    onClick={handlePlayPause}
                    disabled={!!audioError}
                  >
                    {isPlaying ? "⏸️" : "▶️"}
                  </button>
                </div>
                
                {audioError && (
                  <div className="mt-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{audioError}</p>
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="text-xl font-script text-cream-100/90">{selectedMood.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persistent audio element */}
        <audio 
          ref={audioRef} 
          loop 
          preload="metadata"
          onLoadStart={() => console.log('Audio loading started')}
          onCanPlay={() => console.log('Audio can play')}
          onLoadedData={() => console.log('Audio loaded')}
        />
      </div>
    </div>
  );
};

export default MoodBoard;