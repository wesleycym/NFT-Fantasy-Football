import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS; // from .env
const infuraKey = process.env.REACT_APP_INFURA_API_KEY; // from .env

const NFTViewer = ({ walletAddress, isConnected }) => {
  const [players, setPlayers] = useState([]);
  const [contract, setContract] = useState(null);

  // const [deployer, setDeployer] = useState(null); // Deployer address
  const fetchNFTs = async () => {
    try {
      //const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Use local node -> hardhat 
      const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraKey}`); // For sepolia
      const ffContract = new ethers.Contract(CONTRACT_ADDRESS, FantasyFootballABI.abi, provider);
      setContract(ffContract);

      // Debug 
      console.log("Frontend CONTRACT_ADDRESS:", CONTRACT_ADDRESS);
      console.log("Wallet Address:", walletAddress);
      

      // const deployerAddress = await ffContract.deployer(); // Grabbing the deployer address from the contract
      // console.log("Deployer from contract:", deployerAddress); // Debug
      // setDeployer(deployerAddress); // Setting the address

      //const maxSupply = await ffContract.max_supply();
      //console.log("Max supply:", maxSupply);
      const totalSupply = await ffContract.totalSupply();
      console.log("Total supply:", totalSupply);

      const fetchedPlayers = [];

      for (let i = 0; i < totalSupply; i++) {
        try {

          await new Promise(resolve => setTimeout(resolve, 350)); // Delay to stay withing rate limits
          const player = await ffContract.players(i);
          await new Promise(resolve => setTimeout(resolve, 350)); // Delay again
          const owner = await ffContract.ownerOf(i);

          if (!player.name || owner === ethers.ZeroAddress) {
            console.warn(`Token ID ${i} might not be minted or valid.`);
            continue;
          }

          fetchedPlayers.push({
            id: i,
            name: player.name,
            position: player.position,
            team: player.team,
            fantasyPoints: player.fantasyPoints.toString(),
            mintPrice: player.mintPrice.toString(),
            forSale: player.forSale,
            salePrice: player.salePrice.toString(),
            owner,
          });

          console.log(`Token ID ${i} fetched.`);

        } catch (err) {
          // Token might not exist
          console.warn(`Skipped token ID ${i}:`, err.message);
        }
      }

      setPlayers(fetchedPlayers);
      console.log("🎉 All players fetched:", fetchedPlayers);
    } catch (err) {
      console.error("💥 Error fetching NFTs:", err);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  const handleBuySuccess = fetchNFTs;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((p) => (
          <CardContainer key={p.id}>
            <CardBody 
              player={p} 
              walletAddress={walletAddress} 
              isOwned={walletAddress && p.owner.toLowerCase() === walletAddress.toLowerCase()} 
              isConnected={isConnected} 
              onBuySuccess={handleBuySuccess} 
              contractAddress={CONTRACT_ADDRESS}
              fetchNFTs={fetchNFTs}
            >
              <CardItem translateZ={50}>
                <img
                  src={`/images/${p.name.toLowerCase().replace(" ", "-")}.jpg`}
                  alt={p.name}
                  className="rounded-xl w-full h-auto"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default NFTViewer;