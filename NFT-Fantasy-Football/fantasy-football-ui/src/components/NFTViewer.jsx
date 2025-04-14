import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS; // from .env

const NFTViewer = ({ walletAddress, isConnected }) => {
  const [players, setPlayers] = useState([]);
  const [contract, setContract] = useState(null);

  // const [deployer, setDeployer] = useState(null); // Deployer address
  const fetchNFTs = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Use local node
      const ffContract = new ethers.Contract(CONTRACT_ADDRESS, FantasyFootballABI.abi, provider);
      setContract(ffContract);

      // Debug 
      console.log("Frontend CONTRACT_ADDRESS:", CONTRACT_ADDRESS);
      console.log("Wallet Address:", walletAddress);
      

      // const deployerAddress = await ffContract.deployer(); // Grabbing the deployer address from the contract
      // console.log("Deployer from contract:", deployerAddress); // Debug
      // setDeployer(deployerAddress); // Setting the address

      const maxSupply = await ffContract.max_supply();
      console.log("Max supply:", maxSupply);
      const fetchedPlayers = [];

      for (let i = 0; i < maxSupply; i++) {
        try {
          const player = await ffContract.players(i);
          const owner = await ffContract.ownerOf(i);

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

          console.log("NFT fetch complete. Players:", fetchedPlayers);

          console.log(`Token ID: ${i}`);
          console.log("Player Data:", player);
          console.log("Owner Address:", owner);

        } catch (err) {
          // Token might not exist
        }
      }

      setPlayers(fetchedPlayers);
    } catch (err) {
      console.error("Error fetching NFTs:", err);
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