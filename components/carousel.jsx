'use client';

import React from 'react';

const CarouselContainer = ({ children, onScroll, refProp }) => (
  <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide" ref={refProp} onScroll={onScroll}>
    {children}
  </div>
);

const CarouselItem = ({ children, onClick }) => (
  <div className="flex-none snap-start w-[300px] p-5 bg-gray-200 rounded-lg shadow-md mx-3 cursor-pointer transition-transform duration-300 hover:scale-105" onClick={onClick}>
    {children}
  </div>
);

const CarouselMobileScrollNode = ({ children }) => (
  <div className="flex">{children}</div>
);

const CarouselItemTitle = ({ children }) => (
  <h3 className="text-xl font-semibold text-gray-800">{children}</h3>
);

const CarouselItemImg = (props) => (
  <svg className="mt-2 w-full h-auto" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.5 5.5C3.88071 5.5 5 4.38071 5 3V3.5L208 3.50002V2.50002L5 2.5V3C5 1.61929 3.88071 0.5 2.5 0.5C1.11929 0.5 0 1.61929 0 3C0 4.38071 1.11929 5.5 2.5 5.5Z"
      fill="url(#paint0_linear)"
      fillOpacity="0.33"
    />
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0.5" x2="208" y2="0.500295" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="0.79478" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const CarouselItemText = ({ children }) => (
  <p className="text-gray-600 text-base mt-2">{children}</p>
);

const CarouselButtons = ({ children }) => (
  <div className="flex justify-center mt-5">{children}</div>
);

const CarouselButton = ({ onClick, active }) => (
  <button className={`w-4 h-4 rounded-full mx-1 transition-all ${active ? 'bg-gray-800' : 'bg-gray-300'}`} onClick={onClick} />
);

const CarouselButtonDot = ({ active }) => (
  <div className={`w-full h-full rounded-full ${active ? 'bg-white' : 'bg-transparent'}`} />
);

export {
  CarouselContainer,
  CarouselItem,
  CarouselMobileScrollNode,
  CarouselItemTitle,
  CarouselItemImg,
  CarouselItemText,
  CarouselButtons,
  CarouselButton,
  CarouselButtonDot,
};
