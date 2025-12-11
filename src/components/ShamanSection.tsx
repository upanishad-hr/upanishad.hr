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

      <div className="max-h-[60vh] overflow-y-auto pr-4 shaman-scroll">
        <div className="space-y-8 text-xl md:text-2xl text-gray-50 font-normal leading-relaxed drop-shadow-md">
          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            My journey with consciousness exploration started naively—learning about different cultures from around the world
            and how they approach human consciousness and existence through <span className="text-green-300 font-medium">religion, spiritual practices,
            local shamans, and healers</span>.
          </motion.p>

          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            As I expanded my models, trying to engulf all these different practices, it became apparent that there is a
            certain <span className="text-emerald-200">disconnection between the mind's ability to create the correct model</span> and reality itself.
            The models are usually just used as story parallels, but most people act from an entirely different place.
          </motion.p>

          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            Then I came to realize that there is <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">something beyond the mind</span>.
            There is intellect—inherent to mind and limited. And then there is intelligence—which exists even without a mind.
          </motion.p>

          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            This is how I was drawn to the plants and <span className="text-green-300 font-medium">South American shamans and their technology</span>.
            On the surface, they seem like very simple people, but they carry deep intelligence—one that doesn't have
            many applications in what we would conventionally consider uses of intelligence.
          </motion.p>

          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            Their ability to <span className="text-emerald-200">escape the patterns</span> that we as humans have learned, and to create systems
            through which they travel and navigate with the same intelligence that works on abstract, paradoxical levels
            when we try to see it—this is what drew me in.
          </motion.p>

          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
            This is why all different inheritances of spiritual knowledge—all different religions, all different traditions—are
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400"> dead the moment you try to capture them through the mind's intellect</span>.
            You can only capture the instructions on how to get there yourself.
          </motion.p>

          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
            But the Western mind tries to use that knowledge, those experiences, to create more models,
            bigger patterns that engulf everything—searching for a <span className="text-emerald-200">theory of everything</span>.
            But it's not possible. It is always a finite model trying to capture infinity.
          </motion.p>

          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
            className="border-t border-white/10 pt-8 mt-10 text-green-200/80 italic text-lg">
            If you are here to explore these topics or need a guide in the subtle realms, feel free to contact me.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ShamanSection;
