import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import { generateRandomFantasyStats } from "./calculateStats";

export async function handleMint(player, contractAddress, setIsBuying) {
  try {
    setIsBuying(true);

    const { fantasyPoints, breakdown, rank } = generateRandomFantasyStats(player.name);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer);

    const mintPrice = ethers.parseUnits(player.mintPrice.toString(), 18);
    const breakdownString = breakdown.join(" | ");

    const tx = await contract.mint(
      await signer.getAddress(),
      player.name,
      player.position,
      player.team,
      fantasyPoints,
      mintPrice,
      false,
      0,
      breakdownString,
      rank
    );

    await tx.wait();
    console.log("✅ NFT minted successfully!");
  } catch (err) {
    console.error("❌ Mint failed:", err);
  } finally {
    setIsBuying(false);
  }
}