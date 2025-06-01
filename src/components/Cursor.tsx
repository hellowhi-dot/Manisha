import { useState, useEffect } from 'react';
import { useMotionValue, motion } from 'framer-motion';

interface CursorProps {
  hoverActive: boolean;
}

const Cursor: React.FC<CursorProps> = ({ hoverActive }) => {
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const hideCursor = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseout', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseout', hideCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={`custom-cursor ${visible ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {hoverActive ? (
        <motion.div
          className="relative"
          initial={{ scale: 1 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 20l-5.447-9.683A1 1 0 0 1 4.465 9h14.07a1 1 0 0 1 .912 1.317L14 20"
              stroke="#f472b6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 20h6M7 13h10"
              stroke="#f472b6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute inset-0 animate-pulse-slow bg-neon-400 rounded-full opacity-30 scale-150"></div>
        </motion.div>
      ) : (
        <div className="w-3 h-3 bg-neon-400 rounded-full opacity-70 mix-blend-screen"></div>
      )}
    </motion.div>
  );
};

export default Cursor;