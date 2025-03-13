const RetroButton = () => {
    return (
      <>
<button
  className="cyber-glitch-button px-6 py-2 font-medium rounded-full shadow-lg shadow-red-800/20 relative group"
>
  <div className="cyber-glitch-bg absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-red-700"></div>
  <div className="cyber-glitch-scanline absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover:opacity-100 bg-red-400/20"></div>
  <div className="cyber-glitch-text relative z-20 flex items-center text-white">
Resume  </div>
</button>
      </>
    );
  };
  
  export default RetroButton;