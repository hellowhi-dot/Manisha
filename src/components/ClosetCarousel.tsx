import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { outfits } from '../data';
import { useInView } from 'react-intersection-observer';
import { Shirt } from 'lucide-react';

const ClosetCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragEndX, setDragEndX] = useState(0);
  const [rating, setRating] = useState<string | null>(null);
  const [showRating, setShowRating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if ('touches' in e) {
      setDragStartX(e.touches[0].clientX);
    } else {
      setDragStartX(e.clientX);
    }
  };
  
  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if ('changedTouches' in e) {
      setDragEndX(e.changedTouches[0].clientX);
    } else {
      setDragEndX(e.clientX);
    }
    
    const dragThreshold = 50;
    const dragDistance = dragEndX - dragStartX;
    
    if (dragDistance > dragThreshold && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      showRatingAnimation();
    } else if (dragDistance < -dragThreshold && activeIndex < outfits.length - 1) {
      setActiveIndex(activeIndex + 1);
      showRatingAnimation();
    }
  };
  
  const showRatingAnimation = () => {
    const ratings = ["🔥", "💃", "👑", "Damn!"];
    setRating(ratings[Math.floor(Math.random() * ratings.length)]);
    setShowRating(true);
    
    setTimeout(() => {
      setShowRating(false);
    }, 1000);
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
          <Shirt className="w-6 h-6 text-neon-400" />
          <h2 className="section-title mb-0">Closet Carousel</h2>
        </div>
        <p className="section-subtitle">Try it on, Queen</p>
      </motion.div>
      
      <motion.div
        className="relative w-full max-w-4xl mx-auto h-[500px] overflow-hidden glass"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-cream-100/60 text-sm">← Drag to explore →</p>
        </div>
        
        <motion.div 
          className="flex h-full"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", damping: 20 }}
        >
          {outfits.map((outfit, index) => (
            <motion.div 
              key={outfit.id}
              className="min-w-full h-full flex flex-col items-center justify-center p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="relative w-full max-w-md h-[300px] mb-6 overflow-hidden rounded-lg">
                <img 
                  src={outfit.image} 
                  alt={outfit.caption}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-midnight-950 to-transparent p-4">
                  <p className="font-script text-2xl text-neon-300">{outfit.caption}</p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg text-cream-100/80">
                  {index === 0 ? "First impression? Always stunning." : 
                   index === 1 ? "Perfect for our rendezvous." :
                   index === 2 ? "You'll turn heads. Mine especially." :
                   index === 3 ? "Rules were made for you to break." :
                   "Every night becomes magical."}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {outfits.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex ? "bg-neon-400 scale-125" : "bg-cream-100/30"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Rating Animation */}
        {showRating && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl">{rating}</div>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ClosetCarousel;