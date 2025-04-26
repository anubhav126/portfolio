'use client';
import { motion } from 'framer-motion';
import styles from '../styles';
import '../styles/button.css';
import { insights } from '../constants';
import GlitchButton from '../components/ui/glitch-button';
import '../components/ui/RetroButton'
import '../components/ui/CyberpunkButton'
import '../components/ui/GalacticButton'
import { staggerContainer } from '../utils/motion';
import { InsightCard, TitleText, TypingText } from '../components';
import RetroButton from '../components/ui/RetroButton';
import CyberpunkButton from '../components/ui/CyberpunkButton';
import CyberGlitchMotionButton from '../components/ui/CyberGlitchMotionButton';

const Insights = () => (
  <section className={`${styles.paddings} relative z-10`}>
    {/* Grid overlay to match with other sections */}
    <div className="absolute inset-0 opacity-20 -z-0 bg-[url('/grid-pattern.svg')] bg-repeat bg-center" />
    
    {/* Background gradients */}
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none"
        animate={{
          y: [0, -20, 0],
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none"
        animate={{
          y: [0, 20, 0],
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
    
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| Insight" textStyles="text-center" />
      <TitleText 
        title={<>Find some of my latest blogs</>} 
        textStyles="text-center bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 
                  bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]" 
      />
      <motion.div 
        className="mt-[50px] flex flex-col gap-[30px]"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.3,
            }
          }
        }}
      >
        {insights.map((item, index) => (
          <InsightCard
            key={`insight-${index}`}
            {...item}
            index={index}
            link={item.url}
          />
        ))}
      </motion.div>   
      <motion.div 
        className="mt-10 flex justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.a
          href="https://anubhav1206.hashnode.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="cyber-glitch-button px-6 py-3 font-medium rounded-full shadow-lg shadow-neon-purple/20 relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
          <div className="cyber-glitch-text relative z-20 flex items-center text-white">
            Read more blogs on hashnode
          </div>
        </motion.a>
      </motion.div>  
    </motion.div>
  </section>
);
export default Insights;
