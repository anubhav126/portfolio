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

// In your Insights component:

const Insights = () => (
  <section className={`${styles.paddings} relative z-10`}>
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
        textStyles="text-center bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 
                  bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]" 
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
      <div className="mt-10 flex justify-center gap-4">
            <CyberGlitchMotionButton text="Read more blogs on hashnode" color="yellow" link='https://anubhav1206.hashnode.dev/'/>
      </div>  
    </motion.div>
  </section>
);

export default Insights;
