import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Moon, Music2, Calendar, Gift } from 'lucide-react';

const navItems = [
  { name: 'Countdown', icon: <Calendar className="w-5 h-5" /> },
  { name: 'Dual Life', icon: <Moon className="w-5 h-5" /> },
  { name: 'Memories', icon: <Heart className="w-5 h-5" /> },
  { name: 'Music', icon: <Music2 className="w-5 h-5" /> },
  { name: 'Birthday', icon: <Gift className="w-5 h-5" /> },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });

      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionName: string) => {
    const section = document.getElementById(sectionName.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          hasScrolled ? 'bg-midnight-950/80 backdrop-blur-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-2xl font-script text-neon-400">M</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors
                    ${activeSection === item.name.toLowerCase()
                      ? 'text-neon-400'
                      : 'text-cream-100/70 hover:text-neon-400'
                    }`}
                  onClick={() => scrollToSection(item.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>

            <div className="md:hidden">
              <motion.button
                className="text-cream-100/70 hover:text-neon-400"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed inset-0 bg-midnight-950/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex min-h-screen items-center justify-center p-4">
                <motion.div
                  className="w-full max-w-sm rounded-lg glass p-6"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {navItems.map((item) => (
                    <motion.button
                      key={item.name}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-left text-lg font-medium rounded-lg
                        ${activeSection === item.name.toLowerCase()
                          ? 'text-neon-400 bg-midnight-900/50'
                          : 'text-cream-100/70 hover:text-neon-400 hover:bg-midnight-900/30'
                        }`}
                      onClick={() => scrollToSection(item.name)}
                      whileHover={{ x: 10 }}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;