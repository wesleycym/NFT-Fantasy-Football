import { useEffect, useState } from "react";
import { ethers } from "ethers";

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
    <div className="App">
      <h1>Fantasy Football NFT Viewer</h1>

      {!isConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>✅ Connected as: {walletAddress}</p>
      )}

      {/* You can add the rest of your interface below */}
    </div>
  );
}

export default App;