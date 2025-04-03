import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFTViewer from "./components/NFTViewer.jsx";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

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
    <div className="App">
      <h1>Fantasy Football NFT Viewer</h1>

      {!isConnected ? (
        <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>✅ Connected as: {walletAddress}</p>
      )}

      <div className="p-6">
        <NFTViewer walletAddress={walletAddress} />
      </div>
    </div>
  );
}

export default App;