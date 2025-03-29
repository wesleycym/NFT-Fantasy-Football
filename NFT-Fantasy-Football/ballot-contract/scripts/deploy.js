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
        100
    );

    await tx.wait();
    console.log("Minted JA17 NFT");


    // View the player NFT metadata (tokenId = 0 for the first mint)
    const player = await contract.players(0);
    console.log("Player before update:", player);
  
    // Update the fantasy points
    const updateTx = await contract.updateFantasyPoints(0, 152);
    await updateTx.wait();
    console.log("Updated fantasy points to 152");
  
    // View the updated data
    const updatedPlayer = await contract.players(0);
    console.log("Player after update:", updatedPlayer);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});