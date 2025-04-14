import { ethers } from "ethers"; // Import ethers
import FantasyFootballABI from "../contracts/FantasyFootball.json"; // Import contract ABI

import { toast } from "react-toastify"; // For alerts

export const buyNFT = async (tokenId, contractAddress, onBuySuccess) => {

    if(!window.ethereum) { // Check if MetaMask is connected
      toast.error("Please connect your MetaMask wallet.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        icon: "⚠️",
      });
      return;
    }

    let pendingToast; // Create pending toast -> fix scope issue in catch block

    try {
        const provider = new ethers.BrowserProvider(window.ethereum); // Create provider
        const signer = await provider.getSigner(); // Get signer
        const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer); // Create contract

        pendingToast = toast.loading("Processing transaction...", {
          position: "top-left",
          theme: "dark",
        });
    
        const tx = await contract.buy(tokenId); // purchase with buy() function -> fantasyFootball.sol
        await tx.wait(); // wait for the transaction

        const newOwner = await signer.getAddress(); // Get new owner

        toast.update(pendingToast, {
          render: `NFT purchased!`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          icon: "🎉",
        });

        if (onBuySuccess) {
          onBuySuccess(tokenId, newOwner);
        }

      } catch (err) { // If anything f'd up
        console.error("Buy failed:", err); // Log error
        
        // Check if there is a pending toast
        if (pendingToast) {
          // If loading is still happening
          toast.update(pendingToast, {
            render: "Purchase failed. Please try again.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            icon: "💥",
          });

        } else {
          // If error happens before loading
          toast.error("Purchase failed. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            icon: "💥",
          });
        }
      }
};