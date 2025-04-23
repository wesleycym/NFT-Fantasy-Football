import React from "react";

const InfoModal = ({ player, onClose }) => (
  <div className="absolute top-6 left-4 right-4 bottom-6 z-20 bg-black/80 text-white flex flex-col justify-center items-center p-4 rounded-xl [transform:translateZ(70px)]">
    <div className="w-full max-w-full text-center break-words overflow-hidden">
      <h2 className="text-xl font-bold mb-2">{player.name}</h2>
      <p>{player.position} - {player.team}</p>
      <p>Mint Price: {player.mintPrice} YODA</p>
      <p className="mt-4 text-sm font-semibold underline">Rank Tiers</p>
      <ul className="text-xs leading-5">
        <li>🏆 Hall of Fame: 40+</li>
        <li>💪 All-Pro: 30–39</li>
        <li>🔒 Starter: 15–29</li>
        <li>🛠️ Bench: 8–14</li>
        <li>📦 Practice Squad: 5–7</li>
        <li>🧢 Draft Bust: &lt; 5</li>
      </ul>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-1 bg-white text-black rounded"
      >
        Close
      </button>
    </div>
  </div>
);

export default InfoModal;