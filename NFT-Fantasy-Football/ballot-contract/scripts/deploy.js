// NFT will be here to mint
const hre = require("hardhat");

const LOCAL_TESTING = true; // constant should be uppercase but assigned properly

async function main() {
    const [deployer] = await hre.ethers.getSigners(); // Get the deployer account

    let yodaAddress; // Declare yoda address

    if (LOCAL_TESTING) {
        console.log("Local Testing");

        const YODA = await hre.ethers.getContractFactory("YODA");
        const yoda = await YODA.deploy("Yoda Token", "YODA", 1000000); // 1 million supply
        await yoda.deploymentTransaction().wait();
        
        yodaAddress = yoda.target;

        console.log("YODA deployed to:", yodaAddress);

    } else {
        console.log("Sepolia deployment");

        yodaAddress = "0xe1d6e2F8F036179656bEb0E2BDb8E326b0E6b094"; // Given yoda address
    }

    console.log("Deploying FantasyFootball contract");

    const FantasyFootball = await hre.ethers.getContractFactory("FantasyFootball");

    const fantasyFootball = await FantasyFootball.deploy(
        yodaAddress, // YODA address
        "FantasyFootball", // NFT name
        "FFNFT", // NFT symbol
        5000 // Global mint price (2 decimal, 5000 -> 50.00 YODA)
    );

    await fantasyFootball.deploymentTransaction().wait();

    console.log("FantasyFootball contract deployed to:", fantasyFootball.target);

    console.log("Deployer address:", deployer.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});