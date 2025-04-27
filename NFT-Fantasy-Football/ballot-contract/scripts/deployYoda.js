const hre = require("hardhat");

// Deploy script for local hardhat testing

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const YODA = await hre.ethers.getContractFactory("YODA");
  const yoda = await YODA.deploy("Yoda Token", "YODA", 1000000); // 1 million supply
  await yoda.deploymentTransaction().wait();

  console.log("✅ YODA deployed to:", yoda.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});