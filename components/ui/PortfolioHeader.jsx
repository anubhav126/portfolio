import React from 'react';

const PortfolioHeader = ({ headerText = "Welcome to my Portfolio" }) => {
  return (
    <div className="max-w-5xl mx-auto text-center pt-4 md:pt-12 mb-8 md:mb-16 relative">
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight relative">
        {headerText}
        
        {/* Animated gradient overlay */}
        <span 
          className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          style={{
            backgroundSize: '300% 100%',
            animation: 'gradientFlow 8s ease infinite'
          }}
        >
          {headerText}
        </span>
      </h1>
      
      <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full" />
      
      {/* Embedded CSS for the animation */}
      <style jsx>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioHeader;