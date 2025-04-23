import React from "react";

const BuyButton = ({ isConnected, isBuying, player, onBuy }) => {
  if (!isConnected) {
    return (
      <button
        disabled
        className="px-3 py-1 bg-gray-500 text-white rounded shadow border border-black opacity-50 cursor-not-allowed"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <button
      onClick={onBuy}
      disabled={isBuying}
      className={`px-3 py-1 rounded shadow border border-black ${
        isBuying
          ? "bg-gray-500 cursor-not-allowed text-white opacity-50"
          : "bg-green-600 hover:bg-green-700 text-white"
      }`}
    >
      {isBuying ? "Processing..." : `Buy for (${player.mintPrice}) YODA`}
    </button>
  );
};

export default BuyButton;