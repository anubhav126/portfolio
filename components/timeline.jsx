// "use client"
// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const Timeline = () => {
//   const [activeItem, setActiveItem] = useState(0);
//   const carouselRef = useRef();

//   const TimeLineData = [
//     { year: 2019, text: 'Started my journey as a CS Student' },
//     { year: 2020, text: 'Worked on various  projects' },
//     { year: 2021, text: 'Founded JavaScript Mastery' },
//     { year: 2022, text: 'Shared my projects with the world' },
//     { year: 2023, text: 'Started my own platform' }
//   ];

//   const scroll = (node, left) => {
//     if (node) {
//       node.scrollTo({ left, behavior: 'smooth' });
//     }
//   };

//   const handleScroll = () => {
//     if (carouselRef.current) {
//       const index = Math.round((carouselRef.current.scrollLeft / (carouselRef.current.scrollWidth * 0.7)) * TimeLineData.length);
//       setActiveItem(index);
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       scroll(carouselRef.current, 0);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <section className="py-16 relative">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Section Header */}
//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-12"
//         >
//           About Me
//         </motion.h2>

//         {/* Timeline Container */}
//         <div className="relative">
//           {/* Timeline Line */}
//           <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20" />

//           {/* Timeline Items */}
//           <div 
//             ref={carouselRef}
//             onScroll={handleScroll}
//             className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
//           >
//             {TimeLineData.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2 }}
//                 className={`flex-none w-[300px] snap-center ${
//                   activeItem === index ? 'scale-100' : 'scale-95 opacity-70'
//                 } transition-all duration-300`}
//               >
//                 <div 
//                   className={`relative p-6 rounded-2xl backdrop-blur-sm border border-white/10 
//                     ${activeItem === index ? 'bg-white/10' : 'bg-white/5'} 
//                     hover:bg-white/15 transition-all duration-300 cursor-pointer group`}
//                   onClick={() => setActiveItem(index)}
//                 >
//                   {/* Year */}
//                   <div className="flex items-center gap-4 mb-4">
//                     <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
//                       {item.year}
//                     </span>
//                     <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent" />
//                   </div>

//                   {/* Content */}
//                   <p className="text-gray-300 text-lg leading-relaxed">
//                     {item.text}
//                   </p>

//                   {/* Dot Indicator */}
//                   <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 
//                     ${activeItem === index 
//                       ? 'border-cyan-400 bg-blue-400' 
//                       : 'border-white/20 bg-white/10'} 
//                     transition-all duration-300`} 
//                   />
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           <button 
//             onClick={() => {
//               const newIndex = Math.max(0, activeItem - 1);
//               setActiveItem(newIndex);
//               if (carouselRef.current) {
//                 const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (newIndex / TimeLineData.length));
//                 scroll(carouselRef.current, scrollLeft);
//               }
//             }}
//             className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white transition-all duration-300"
//           >
//             ←
//           </button>
//           <button 
//             onClick={() => {
//               const newIndex = Math.min(TimeLineData.length - 1, activeItem + 1);
//               setActiveItem(newIndex);
//               if (carouselRef.current) {
//                 const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (newIndex / TimeLineData.length));
//                 scroll(carouselRef.current, scrollLeft);
//               }
//             }}
//             className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white transition-all duration-300"
//           >
//             →
//           </button>
//         </div>

//         {/* Timeline Navigation Dots */}
//         <div className="flex justify-center gap-3 mt-8">
//           {TimeLineData.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setActiveItem(index);
//                 if (carouselRef.current) {
//                   const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (index / TimeLineData.length));
//                   scroll(carouselRef.current, scrollLeft);
//                 }
//               }}
//               className={`w-3 h-3 rounded-full transition-all duration-300 
//                 ${activeItem === index 
//                   ? 'bg-cyan-400 w-6' 
//                   : 'bg-white/20 hover:bg-white/40'}`}
//             />
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Timeline;