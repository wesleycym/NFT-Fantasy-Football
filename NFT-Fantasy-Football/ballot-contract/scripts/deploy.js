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
        "Josh Allen",
        "QB",
        "Buffalo Bills",
        0
    );

    await tx.wait();
    console.log("Minted JA17 NFT");

    const tx2 = await contract.mint(
        deployer.address,
        "Patrick Mahomes",
        "QB",
        "Kansas City Chiefs",
        0
    );

    await tx2.wait();
    console.log("Minted Mahomes NFT");

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});