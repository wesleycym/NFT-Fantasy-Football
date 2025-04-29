import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFTViewer from "./components/NFTViewer.jsx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WithdrawYodaButton from "./components/withdrawYodaButton.jsx";
import MyWallet from "./components/MyWallet.jsx";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.REACT_APP_OWNER_ADDRESS;

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false); // Use state for wallet
  
  // Wallet connection
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
  
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          toast.success("💰 Wallet connected", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        }
      } catch (err) {
        console.error("User rejected wallet connection:", err);
      }
    } else {
      alert("MetaMask not found. Please install it to use this app.");
    }
  };

  // Wallet disconnect
  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
    toast.success("🔌 Wallet disconnected", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  // Handle account changes inside MetaMask -> will auto switch the connected account
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setWalletAddress(null);
          setIsConnected(false);
        }
      };
  
      window.ethereum.on("accountsChanged", handleAccountsChanged);
  
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  useEffect(() => {
    if (walletOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [walletOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white flex flex-col items-center justify-start py-6 font-sans">
      <ToastContainer />
      
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center drop-shadow-lg">
        NFT Fantasy Football
      </h1>

      {isConnected && (
        <button
          onClick={() => setWalletOpen(true)}
          className="absolute top-6 right-6 bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg text-white shadow-md"
        >
          My Wallet
        </button>
      )}

      <div className="mt-10 flex flex-col items-center space-y-2">
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-200"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <p className="bg-green-700 bg-opacity-80 px-5 py-2 rounded-full text-sm text-white shadow-md">
              ✅ Connected as: <span className="font-mono">{walletAddress}</span>
            </p>
            <button
              onClick={disconnectWallet}
              className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1 rounded-full shadow-md transition-all duration-200"
            >
              Logout
            </button>

            {walletAddress.toLowerCase() === OWNER_ADDRESS.toLowerCase() && (
              <div className="mt-6">
                <WithdrawYodaButton contractAddress={CONTRACT_ADDRESS} walletAddress={walletAddress} ownerAddress={OWNER_ADDRESS} />
              </div>
            )}

          </>
        )}
      </div>

      <div className="mt-2">
        <NFTViewer walletAddress={walletAddress} isConnected={isConnected} />
      </div>

      <MyWallet
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
        walletAddress={walletAddress}
        contractAddress={process.env.REACT_APP_CONTRACT_ADDRESS}
      />

    </div>
  );
}

export default App;