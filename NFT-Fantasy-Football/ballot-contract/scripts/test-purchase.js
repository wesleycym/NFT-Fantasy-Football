const hre = require("hardhat");

async function main() {
    const [deployer, buyer] = await hre.ethers.getSigners();

    const contractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"; // From deploy.js output
    const FantasyFootball = await hre.ethers.getContractFactory("FantasyFootball");
    const contract = FantasyFootball.attach(contractAddress);

    // Check initial owner
    const owner0 = await contract.ownerOf(0);
    console.log("Owner of NFT 0:", owner0);

    // Approve buyer for NFT 0
    const approvalTx = await contract.connect(deployer).approve(buyer.address, 0);
    await approvalTx.wait();
    console.log("Approved buyer to purchase NFT 0");

    // Buyer transfers NFT 0 to self (simulate purchase)
    const purchaseTx = await contract.connect(buyer).transferFrom(deployer.address, buyer.address, 0);
    await purchaseTx.wait();
    console.log("Buyer purchased NFT 0");

    // Confirm new owner
    const newOwner = await contract.ownerOf(0);
    console.log("New owner of NFT 0:", newOwner);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});