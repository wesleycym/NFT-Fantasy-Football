import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import { generateRandomFantasyStats } from "./calculateStats";
import { toast } from "react-toastify"; // For alerts
import { approveYodaSpend } from "./yoda"; // Import yoda helper
import YODAABI from "../contracts/YODA.json"; // Import yoda contract


export async function handleMint(player, contractAddress, setIsBuying) {
  let mintToastId; // Set toast state
  try {
    setIsBuying(true);

    const mintPrice = 5000n; // Hardcoding mintprice for now 

    const { fantasyPoints, breakdown, rank } = generateRandomFantasyStats(player.name); // Generate random fantasy stats
    const provider = new ethers.BrowserProvider(window.ethereum); // Get provider
    const signer = await provider.getSigner(); // Get signer
    const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer); //create contract
    const yoda = new ethers.Contract(process.env.REACT_APP_YODA_ADDRESS, YODAABI.abi, signer); // Connecet to yoda

    const addressPromise = signer.getAddress(); // Get address -> not awaiting yet
    const [address, allowance] = await Promise.all ([
      addressPromise, // The awaited address
      addressPromise.then(addr => yoda.allowance(addr, contractAddress)) // Allowance after address resolves
    ])

    // Checking if allowance is already approved, 1 less step if already approved
    if (allowance < mintPrice) { // If allowance is less than mint price
      console.log("Allowance too low, approving...");

      // Notify user
      toast.info("🔄 Approving YODA spend...", {
        position: "top-left",
        autoClose: 3000,
        theme: "dark",
      });

      await approveYodaSpend(yoda, contractAddress, mintPrice); // Approve YODA spend

      // Notify user up on success
      toast.success("✅ YODA spend approved", {
        position: "top-left",
        autoClose: 3000,
        theme: "dark",
      });

    } else {
      console.log("Allowance already approved");
    }

    const breakdownString = breakdown.map(item => `- ${item}`).join("\\n"); // Each breakdown item on a new line

    // Pre formatting description
    const description = [
        `${player.name} - ${player.position} for ${player.team}`,
        `Fantasy Points: ${fantasyPoints}`,
        `Rank: ${rank}`,
        `Breakdown:\\n${breakdownString}`
      ].join("\\n");

    // Notify user that NFT is minting
    mintToastId = toast.loading("⏳ Minting your NFT...", {
      position: "top-left",
      theme: "dark",
    });

    // Create payload for mint
    const tx = await contract.mint(
      address,
      player.name,
      player.position,
      player.team,
      fantasyPoints,
      description,
      rank
    );

    await tx.wait();
    console.log("✅ NFT minted successfully!");

    toast.update(mintToastId, {
      render: "🎉 NFT minted successfully!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
      theme: "dark",
    });

    return{
      player,
      fantasyPoints,
      rank,
      breakdown
    };

  } catch (err) {
    console.error("Mint failed:", err);

    if (mintToastId) {
      toast.update(mintToastId, {
        render: "❌ NFT mint failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "dark",
      });
    } else {
      toast.error("❌ Mint failed. Please try again.", {
        position: "top-left",
        autoClose: 3000,
        theme: "dark",
      });
    }
  } finally {
    setIsBuying(false);
  }
}