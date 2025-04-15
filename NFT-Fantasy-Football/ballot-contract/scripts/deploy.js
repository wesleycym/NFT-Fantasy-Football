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

    // Minting NFTs
    const players = [
        ["Josh Allen", "QB", "Buffalo Bills"],
        ["Patrick Mahomes", "QB", "Kansas City Chiefs"],
        ["Justin Jefferson", "WR", "Minnesota Vikings"],
        ["Malik Nabers", "WR", "New York Giants"],
        ["Saquan Barkley", "RB", "Philadelphia Eagles"],
        ["Derrick Henry", "RB", "Baltimore Ravens"],
        ["Brock Bowers", "TE", "Las Vegas Raiders"],
        ["Sam LaPorta", "TE", "Detroit Lions"]
    ];

    for (const [name, position, team] of players) {
    const tx = await contract.mint(
        deployer.address,
        name,
        position,
        team,
        0,     // Fantasy points
        0,   // Mint price -> Free for the time being
        true,  // For sale
        0    // Sale price -> Free for the time being
    );
    await tx.wait(); // Wait for the transaction to be mined
    console.log(`Minted ${name} NFT`); // Debug
    }

    // Debug
    console.log("Deployer address:", deployer.address);
    console.log("Owner of token 0:", await contract.ownerOf(0));

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});