import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import { generateRandomFantasyStats } from "./calculateStats";
import { toast } from "react-toastify"; // For alerts

export async function handleMint(player, contractAddress, setIsBuying) {
  try {
    setIsBuying(true);

    const { fantasyPoints, breakdown, rank } = generateRandomFantasyStats(player.name);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer);

    const mintPrice = ethers.parseUnits(player.mintPrice.toString(), 18);
    // const breakdownString = breakdown.join(" | ");

    const breakdownString = breakdown.map(item => `- ${item}`).join("\\n"); // Each breakdown item on a new line

    // Pre formatting description
    const description = [
        `${player.name} - ${player.position} for ${player.team}`,
        `Fantasy Points: ${fantasyPoints}`,
        `Rank: ${rank}`,
        `Breakdown:\\n${breakdownString}`
      ].join("\\n");

    const tx = await contract.mint(
      await signer.getAddress(),
      player.name,
      player.position,
      player.team,
      fantasyPoints,
      mintPrice,
      false,
      0,
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
  } finally {
    setIsBuying(false);
  }
}