// PeerlistIcon.jsx
import React from 'react';

const PeerlistIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Peerlist logo with the distinctive P shape */}
    <path
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5a8.5 8.5 0 110 17 8.5 8.5 0 010-17z"
      fill="currentColor"
    />
    <path
      d="M10.5 7.5h3a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-3v-9zm1.5 6v1.5h1.5V13.5H12zm0-1.5h1.5V10.5H12v1.5zm0-1.5h1.5V9H12v1.5z"
      fill="currentColor"
    />
  </svg>
);

export default PeerlistIcon;