import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import { generateRandomFantasyStats } from "./calculateStats";
import { toast } from "react-toastify"; // For alerts
import { approveYodaSpend } from "./yoda"; // Import yoda helper
import YODA from "../contracts/YODA.json"; // Import yoda contract

export async function handleMint(player, contractAddress, setIsBuying) {
  try {
    setIsBuying(true);

    const mintPrice = 5000n; // Hardcoding mintprice for now 

    const { fantasyPoints, breakdown, rank } = generateRandomFantasyStats(player.name); // Generate random fantasy stats
    const provider = new ethers.BrowserProvider(window.ethereum); // Get provider
    const signer = await provider.getSigner(); // Get signer
    const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer); //create contract
    const yoda = new ethers.Contract(process.env.REACT_APP_YODA_ADDRESS, YODA.abi, signer); // Connecet to yoda

    const allowance = await yoda.allowance(await signer.getAddress(), contractAddress); // Check YODA allowance

    // Checking if allowance is already approved, 1 less step if already approved
    if (allowance < mintPrice) { // If allowance is less than mint price
      console.log("Allowance too low, approving...");
      await approveYodaSpend(contractAddress, mintPrice); // Approve YODA spend
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

    // Create payload for mint
    const tx = await contract.mint(
      await signer.getAddress(),
      player.name,
      player.position,
      player.team,
      fantasyPoints,
      description,
      rank
    );

    await tx.wait();
    console.log("✅ NFT minted successfully!");

    return{
      player,
      fantasyPoints,
      rank,
      breakdown
    };

  } catch (err) {
    console.error("❌ Mint failed:", err);
    toast.error("Mint failed. Please try again.");
  } finally {
    setIsBuying(false);
  }
}