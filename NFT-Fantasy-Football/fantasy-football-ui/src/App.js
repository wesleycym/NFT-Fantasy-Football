import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFTViewer from "./components/NFTViewer.jsx";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Manually trigger wallet connect
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (err) {
        console.error("User rejected wallet connection:", err);
      }
    } else {
      alert("MetaMask not found. Please install it to use this app.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white flex flex-col items-center justify-start py-6 font-sans ">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center drop-shadow-lg">
        NFT Fantasy Football
      </h1>
      <div className="mt-10">
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-200"
          >
            Connect Wallet
          </button>
        ) : (
          <p className="bg-green-700 bg-opacity-80 px-5 py-2 rounded-full text-sm text-white shadow-md">
            ✅ Connected as: <span className="font-mono">{walletAddress}</span>
          </p>
        )}
      </div>

        <div>
          <NFTViewer walletAddress={walletAddress} isConnected={isConnected}/>
        </div>

    </div>
  );
}

export default App;