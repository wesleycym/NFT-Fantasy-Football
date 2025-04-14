// NFT will be here to mint
const hre = require("hardhat");

async function main() {

    const [deployer] = await hre.ethers.getSigners();

    const FantasyFootball = await hre.ethers.getContractFactory("FantasyFootball"); 

    const contract = await FantasyFootball.deploy(
        "0x0000000000000000000000000000000000000000", // Dummy yoda address -> Also commented out the require yoda in the mint function of the contract
        "FantasyFootball",
        "FFNFT",
        1000,
        10
    );

    console.log("FantasyFootball NFT contract deployed to:", contract.target);

    // Minting an nft
    const tx = await contract.mint(
        deployer.address,
        "Josh Allen", // Name
        "QB", // Position
        "Buffalo Bills", // Team
        0, // Fantasy points
        100, // Mint price
        true, // For sale
        100 // Resale price
    );

    await tx.wait();
    console.log("Minted JA17 NFT");

    const tx2 = await contract.mint(
        deployer.address,
        "Patrick Mahomes",
        "QB",
        "Kansas City Chiefs",
        0,
        100, // Mint price
        true,
        100
    );

    await tx2.wait();
    console.log("Minted Mahomes NFT");

    const tx3 = await contract.mint(
        deployer.address,
        "Justin Jefferson",
        "WR",
        "Minnesota Vikings",
        0,
        100, // Mint price
        true,
        100
    );

    await tx3.wait();
    console.log("Minted Jefferson NFT");

    const tx4 = await contract.mint(
        deployer.address,
        "Malik Nabers",
        "WR",
        "New York Giants",
        0,
        100, // Mint price
        true,
        100
    );

    await tx4.wait();
    console.log("Minted Nabers NFT");

    const tx5 = await contract.mint(
        deployer.address,
        "Saquan Barkley",
        "RB",
        "Philadelphia Eagles",
        0,
        100, // Mint price
        true,
        100
    );

    await tx5.wait();
    console.log("Minted Barkley NFT");

    const tx6 = await contract.mint(
        deployer.address,
        "Derrick Henry",
        "RB",
        "Baltimore Ravens",
        0,
        100, // Mint price
        true,
        100
    );

    await tx6.wait();
    console.log("Minted Henry NFT");

    const tx7 = await contract.mint(
        deployer.address,
        "Brock Bowers",
        "TE",
        "Las Vegas Raiders",
        0,
        100, // Mint price
        true,
        100
    );

    await tx7.wait();
    console.log("Minted Bowers NFT");

    const tx8 = await contract.mint(
        deployer.address,
        "Sam LaPorta",
        "TE",
        "Detroit Lions",
        0,
        100, // Mint price
        true,
        100
    );

    await tx8.wait();
    console.log("Minted LaPorta NFT");

    // Debug
    console.log("Deployer address:", deployer.address);
    console.log("Owner of token 0:", await contract.ownerOf(0));

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});