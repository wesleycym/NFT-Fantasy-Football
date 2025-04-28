import { ethers } from "ethers";
import YODA from "../contracts/YODA.json";

const YODA_ADDRESS = process.env.REACT_APP_YODA_ADDRESS;

export const approveYodaSpend = async (yoda, spender, amount) => {
  const tx = await yoda.approve(spender, amount);
  await tx.wait();

  console.log("✅ YODA approved for spending");
};