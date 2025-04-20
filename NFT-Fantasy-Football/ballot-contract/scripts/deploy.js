// NFT will be here to mint
const hre = require("hardhat");

async function main() {

    const [deployer] = await hre.ethers.getSigners(); // Pulls avaiblable accounts

    const FantasyFootball = await hre.ethers.getContractFactory("FantasyFootball"); // Preparing the contract

    const contract = await FantasyFootball.deploy(
        "0x0000000000000000000000000000000000000000", // Dummy yoda address -> Also commented out the require yoda in the mint function of the contract
        "FantasyFootball", // Name of collection
        "FFNFT", // Symbol of collection
        0, // Global mint price -> 0 for now (testing)
        10 // Max supply 
    );

    await contract.waitForDeployment(); // Wait for the contract to be deployed

    console.log("FantasyFootball NFT contract deployed to:", contract.target); // Debug

    // Debug
    console.log("Deployer address:", deployer.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});