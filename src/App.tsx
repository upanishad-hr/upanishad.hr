import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, LayoutGroup, MotionConfig } from 'framer-motion';
import CosmicJungle from './components/CosmicJungle';
import SecureContact from './components/SecureContact';
import ShamanSection from './components/ShamanSection';
import DeveloperSection from './components/DeveloperSection';

type ActiveSection = 'hero' | 'shaman' | 'developer';

const MagneticButton: React.FC<{ children: React.ReactNode; onClick: () => void; className?: string }> = ({ children, onClick, className }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });

  return (
    <motion.button
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left - rect.width / 2) / 10);
        my.set((e.clientY - rect.top - rect.height / 2) / 10);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ x: sx, y: sy }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-full transition-all duration-300 ${className}`}
    >
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_60%)] pointer-events-none" />
      {children}
    </motion.button>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('hero');

  const word = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } } };

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="absolute inset-0 z-0" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <CosmicJungle activeSection={activeSection} />
      </div>
      
      {/* Scrollable Content Container */}
      <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden">
        <LayoutGroup>
        <MotionConfig transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <div className="min-h-full flex flex-col items-center justify-center p-6 md:p-12 pb-32">
          <AnimatePresence mode="wait">
            {activeSection === 'hero' && (
              <motion.div
                layoutId="card"
                key="hero"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                className="flex flex-col items-center justify-center text-center max-w-6xl w-full"
              >
                <div className="glass-panel p-10 md:p-20 rounded-3xl w-full">
                    <motion.h1 
                      layoutId="title"
                      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                      initial="hidden"
                      animate="show"
                      className="responsive-title font-bold mb-6 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                    >
                      {"Welcome to my Universe".split(" ").map((w, i) => (
                        <motion.span key={i} className="inline-block mr-3" variants={word}>{w}</motion.span>
                      ))}
                    </motion.h1>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                      className="text-2xl md:text-4xl mt-8 text-gray-200 font-light tracking-wide"
                    >
                      My name is <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-semibold drop-shadow-md">Matej</span>
                    </motion.div>
                    
                    <motion.p 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                      className="text-xl md:text-2xl mt-4 text-gray-400 uppercase tracking-[0.3em] font-light"
                    >
                      Developer Shaman
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                      className="flex flex-col md:flex-row gap-8 mt-16 justify-center"
                    >
                    <MagneticButton
                        onClick={() => setActiveSection('developer')}
                        className="px-10 py-5 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-400/30 text-blue-100 hover:text-white hover:border-blue-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    >
                        <span className="relative text-xl font-medium tracking-wide z-10">Explore Development</span>
                    </MagneticButton>
                    
                    <MagneticButton
                        onClick={() => setActiveSection('shaman')}
                        className="px-10 py-5 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-400/30 text-green-100 hover:text-white hover:border-green-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    >
                        <span className="relative text-xl font-medium tracking-wide z-10">Explore Shamanism</span>
                    </MagneticButton>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                        <SecureContact email="matej@upanishad.hr" phone="+385-977-36-7486" />
                    </motion.div>
                </div>
              </motion.div>
            )}

            {activeSection === 'developer' && (
              <motion.div
                layoutId="card"
                key="developer"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                className="flex flex-col items-center justify-center text-center max-w-5xl w-full"
              >
                <DeveloperSection />
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                     <SecureContact email="matej@upanishad.hr" phone="+385-977-36-7486" />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('hero')}
                  className="mt-8 px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-lg font-semibold tracking-widest uppercase transition-all backdrop-blur-md"
                >
                  Return to Universe
                </motion.button>
              </motion.div>
            )}

            {activeSection === 'shaman' && (
              <motion.div
                layoutId="card"
                key="shaman"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                className="flex flex-col items-center justify-center text-center max-w-5xl w-full" 
              >
                <ShamanSection />
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                     <SecureContact email="matej@upanishad.hr" phone="+385-977-36-7486" />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('hero')}
                  className="mt-8 px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-lg font-semibold tracking-widest uppercase transition-all backdrop-blur-md"
                >
                  Return to Universe
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </MotionConfig>
        </LayoutGroup>
      </div>

    </div>
  );
}

export default App;
