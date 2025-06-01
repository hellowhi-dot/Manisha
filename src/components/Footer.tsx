import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-midnight-950 z-0"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="glass p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-script text-neon-400 mb-6">June 4, 2025</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <p className="text-cream-100/90">The night we've been waiting for</p>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-6 h-6 text-neon-400 fill-neon-400" />
            </motion.div>
            <p className="text-cream-100/90">The memories we'll create</p>
          </div>
          
          <p className="text-lg text-cream-100/80">
            Until then, let this digital space be our secret playground.
          </p>
          
          <div className="mt-8 pt-8 border-t border-midnight-800">
            <p className="text-cream-100/60 text-sm">
              Created by Raj with anticipation for Manisha(❤️) <span className="text-neon-400">♥</span> See you on June 4th
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;