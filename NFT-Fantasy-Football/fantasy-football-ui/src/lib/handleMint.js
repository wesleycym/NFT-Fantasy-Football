import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import { generateRandomFantasyStats } from "./calculateStats";
import { toast } from "react-toastify"; // For alerts
import { approveYodaSpend } from "./yoda"; // Import yoda helper

export async function handleMint(player, contractAddress, setIsBuying) {
  try {
    setIsBuying(true);

    const { fantasyPoints, breakdown, rank } = generateRandomFantasyStats(player.name);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer);

    await approveYodaSpend(contractAddress, 5000); // Approve YODA spend

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