// NFT will be here to mint
const hre = require("hardhat");
async function main() {
    const Demo = await hre.ethers.getContractFactory("storage");
    const demo = await Demo.deploy("Hello, Hardhat!");
    await demo.deployed();
    console.log(`Contract deployed to: ${demo.address}`);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});