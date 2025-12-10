import React from 'react';
import { motion } from 'framer-motion';

const DeveloperSection: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.01, rotateX: 1, rotateY: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-panel p-8 md:p-12 rounded-2xl max-w-4xl mx-auto text-left relative overflow-hidden group perspective-1000"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/20 transition-all duration-700"></div>
      
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300"
      >
        The Developer's Craft
      </motion.h2>
      
      <div className="space-y-8 text-xl md:text-2xl text-gray-50 font-normal leading-relaxed drop-shadow-md">
        <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Throughout my career, I've worked across numerous technologies, consistently pushing the boundaries and
          staying at the cutting edge. I've operated at an <span className="text-blue-300 font-medium">architect level</span>, 
          designing and implementing frameworks in virtually every major language.
        </motion.p>
        
        <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          My recent focus has been on <span className="text-purple-300 italic">integrating people into frameworks</span>, 
          rather than forcing people to fit the framework. This involves creating environments and structures that optimize for the 
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> "energy minimum"</span>,
          considering not just technical parameters, but also the emotional, behavioral, and psychological aspects of teams.
        </motion.p>
        
        <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          I often take on <span className="text-red-300 font-medium">"hitman"</span> type roles—intense, short-term projects (3-6 months) 
          where I can rapidly digest complex topics, leverage extensive experience, and infer the quickest path to a 
          Proof-of-Concept (POC) or Minimum Viable Product (MVP).
        </motion.p>
        
        <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="border-t border-white/10 pt-8 mt-10 text-blue-200/80 italic text-lg">
          If you are here to explore innovative architectural solutions and human-centric development, feel free to contact me.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default DeveloperSection;
