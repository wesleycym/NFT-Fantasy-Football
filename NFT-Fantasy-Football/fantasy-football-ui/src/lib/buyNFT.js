import { ethers } from "ethers"; // Import ethers
import FantasyFootballABI from "../contracts/FantasyFootball.json"; // Import contract ABI

export const buyNFT = async (tokenId, contractAddress) => {

    if(!window.ethereum) { // Check if MetaMask is connected
        alert("Please connect your MetaMask wallet."); // Raise alert
        return; // Leave function
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum); // Create provider
        const signer = await provider.getSigner(); // Get signer
        const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer); // Create contract
    
        const tx = await contract.buy(tokenId); // purchase with buy() function -> fantasyFootball.sol
        await tx.wait(); // wait for the transaction
        
        alert("🎉 NFT Purchased Successfully!"); // Purchase is successful

      } catch (err) { // If anything f'd up
        console.error("Buy failed:", err); // Log error
        alert("❌ Purchase failed"); // Alert user
      }

};