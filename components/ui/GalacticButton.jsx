const GalacticButton = () => {
    return (
      <>
        <button
          className="cyber-glitch-button relative group"
          style={{
            padding: '0.5rem 1.5rem',
            fontWeight: 500,
            borderRadius: '9999px',
            boxShadow: '0 10px 15px -3px rgba(128, 0, 128, 0.2)',
            position: 'relative',
          }}
        >
          <div
            className="cyber-glitch-bg"
            style={{
              background: 'linear-gradient(120deg, #1e0d2b, #0d2b2b)',
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)',
              backgroundSize: '4px 4px',
              borderRadius: '9999px',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></div>
          <div
            className="cyber-glitch-scanline"
            style={{
              background: 'linear-gradient(to bottom, transparent, #00ced1, transparent)',
              borderRadius: '9999px',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden',
              opacity: 0,
              transition: 'opacity 0.3s',
            }}
          ></div>
          <div
            className="cyber-glitch-text"
            style={{
              color: '#e0bfff',
              position: 'relative',
              zIndex: 20,
            }}
          >
            Resume
          </div>
        </button>
  
        <style jsx>{`
          .cyber-glitch-button:hover .cyber-glitch-scanline {
            opacity: 1;
          }
          .cyber-glitch-scanline {
            animation: scanline-move 1.2s infinite linear;
          }
          .cyber-glitch-button:hover .cyber-glitch-bg::before {
            content: '';
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ffffff;
            border-radius: 50%;
            top: 20%;
            left: 30%;
            animation: sparkle 1s infinite;
          }
          .cyber-glitch-button:hover .cyber-glitch-bg::after {
            content: '';
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ffffff;
            border-radius: 50%;
            top: 60%;
            left: 70%;
            animation: sparkle 1.5s infinite;
          }
          @keyframes scanline-move {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          @keyframes sparkle {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}</style>
      </>
    );
  };
  
  export default GalacticButton;