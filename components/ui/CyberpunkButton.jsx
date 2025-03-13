const CyberpunkButton = () => {
  return (
    <>
      <button
        className="cyber-glitch-button relative group"
        style={{
          padding: '0.5rem 1.5rem',
          fontWeight: 500,
          borderRadius: '9999px',
          boxShadow: '0 10px 15px -3px rgba(255, 0, 255, 0.2)',
          position: 'relative',
        }}
      >
        <div
          className="cyber-glitch-bg"
          style={{
            background: 'linear-gradient(135deg, #0d0d0d, #1a1a3d)',
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
            background: 'linear-gradient(to bottom, transparent, #ff00ff, #00b7ff, transparent)',
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
            background: 'linear-gradient(90deg, #ff00ff, #00b7ff)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
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
        .cyber-glitch-button:hover .cyber-glitch-text {
          animation: glitch-shake 0.5s infinite;
        }
        .cyber-glitch-scanline {
          animation: scanline-move 0.8s infinite linear;
        }
        @keyframes glitch-shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }
        @keyframes scanline-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </>
  );
};

export default CyberpunkButton;