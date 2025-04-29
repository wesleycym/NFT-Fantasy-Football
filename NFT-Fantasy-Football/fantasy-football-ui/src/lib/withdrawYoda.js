import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";

export async function withdrawYoda(contractAddress) {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, FantasyFootballABI.abi, signer);

    const tx = await contract.withdrawYoda();
    await tx.wait();

    console.log("YODA withdrawn to contract owner");
  } catch (err) {
    console.error("Withdrawal failed:", err);
    throw err;
  }
}