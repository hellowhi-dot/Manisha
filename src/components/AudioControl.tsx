import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';

const AudioControl: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    // Create Howl instance
    const backgroundMusic = new Howl({
      src: ['https://cdn.freesound.org/previews/616/616224_6711134-lq.mp3'], // Using a lofi beat from freesound
      loop: true,
      volume: 0.4,
      autoplay: false,
    });

    setSound(backgroundMusic);

    return () => {
      backgroundMusic.stop();
    };
  }, []);

  const toggleMute = () => {
    if (!sound) return;

    if (isMuted) {
      sound.play();
    } else {
      sound.pause();
    }
    
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass hover:bg-midnight-800/50 transition-all duration-300"
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6 text-neon-400" />
      ) : (
        <Volume2 className="w-6 h-6 text-neon-400" />
      )}
    </button>
  );
};

export default AudioControl;