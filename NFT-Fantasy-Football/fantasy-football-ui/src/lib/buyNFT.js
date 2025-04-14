import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import { toast } from "react-toastify";

export const buyNFT = async (tokenId, contractAddress, onBuySuccess) => {
  if (!window.ethereum) {
    toast.error("Please connect your MetaMask wallet.", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      icon: "⚠️",
    });
    return;
  }

  let pendingToast;

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer);

    // Fetch price for transparency (in case needed later for payment)
    const player = await contract.players(tokenId);
    const salePrice = player.salePrice;

    // Show price in ETH if needed (ethers.formatEther(salePrice))
    console.log(`Buying token ${tokenId} for ${salePrice} (raw)`);

    pendingToast = toast.loading("Processing transaction...", {
      position: "top-left",
      theme: "dark",
    });

    // Yoda Token Payment Placeholder (for future use)
    // const yodaToken = new ethers.Contract(YODA_TOKEN_ADDRESS, YodaABI.abi, signer);
    // await yodaToken.approve(contractAddress, salePrice);
    // const tx = await contract.buy(tokenId); // Buy after approval

    const tx = await contract.buy(tokenId); // current logic
    console.log("Transaction hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);

    const updatedOwner = await contract.ownerOf(tokenId);
    console.log("New owner:", updatedOwner);

    toast.update(pendingToast, {
      render: "🎉 NFT purchased successfully!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });

    if (onBuySuccess) {
      onBuySuccess(tokenId, updatedOwner);
    }

  } catch (err) {
    console.error("Buy failed:", err);

    const message = err?.reason || err?.message || "Purchase failed. Please try again.";

    if (pendingToast) {
      toast.update(pendingToast, {
        render: `💥 ${message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      toast.error(`💥 ${message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  }
};