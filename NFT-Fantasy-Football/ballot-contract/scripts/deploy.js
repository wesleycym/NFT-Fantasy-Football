// NFT will be here to mint
const hre = require("hardhat");

async function main() {

    const [deployer] = await hre.ethers.getSigners(); // Get the deployer account

    const FantasyFootball = await hre.ethers.getContractFactory("FantasyFootball"); // Preparing the contract

    const contract = await FantasyFootball.deploy(
        "0xe1d6e2F8F036179656bEb0E2BDb8E326b0E6b094", // YODA token address
        "FantasyFootball", // Name of collection
        "FFNFT", // Symbol of collection
        1 // Global mint price in YODA (set to 1 to test transfers)
    );

    //await contract.waitForDeployment(); // Wait for the contract to be deployed
    await contract.deploymentTransaction().wait(); // Forcefully waits for the transaction to confirm

    console.log("FantasyFootball NFT contract deployed to:", contract.target); // Debug

    // Debug
    console.log("Deployer address:", deployer.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});