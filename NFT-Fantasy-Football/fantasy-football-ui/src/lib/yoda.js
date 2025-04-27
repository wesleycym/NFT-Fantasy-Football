import { ethers } from "ethers";
import YODA from "../contracts/YODA.json";

const YODA_ADDRESS = process.env.REACT_APP_YODA_ADDRESS;

export const approveYodaSpend = async (spender, amount) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const yoda = new ethers.Contract(YODA_ADDRESS, YODA.abi, signer);

  const tx = await yoda.approve(spender, amount);
  await tx.wait();

  console.log("✅ YODA approved for spending");
};