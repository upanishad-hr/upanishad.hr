import React from 'react';
import { motion } from 'framer-motion';

const ShamanSection: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.01, rotateX: 1, rotateY: -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-panel p-8 md:p-12 rounded-2xl max-w-4xl mx-auto text-left relative overflow-hidden group perspective-1000"
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-green-500/20 transition-all duration-700"></div>

      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300"
      >
        The Shaman's Path
      </motion.h2>
      
      <div className="space-y-8 text-2xl md:text-3xl text-gray-100 font-light leading-relaxed">
        <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          For the last 20 years, I have been actively searching for and investigating the consciousness field. 
          What I found works best for me is <span className="text-green-300 font-medium">South American technology from the jungle</span>, 
          spending extensive time in isolation studying from specific plants.
        </motion.p>
        
        <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Following that path, I dedicated myself to researching plants from both <span className="text-emerald-200">Europe and South America</span>. 
          I work closely with renowned allies such as <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">Ayahuasca and Mapacho</span>.
        </motion.p>
        
        <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="border-t border-white/10 pt-8 mt-10 text-green-200/80 italic text-xl md:text-2xl">
          If you are here to explore these topics or need a guide in the subtle realms, feel free to contact me.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ShamanSection;
