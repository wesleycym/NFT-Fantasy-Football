import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";


const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS; // from .env

const NFTViewer = () => {
  const [players, setPlayers] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Use local node
        const ffContract = new ethers.Contract(CONTRACT_ADDRESS, FantasyFootballABI.abi, provider);
        setContract(ffContract);

        const maxSupply = await ffContract.max_supply();
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
              owner,
            });
          } catch (err) {
            // Token might not exist
          }
        }

        setPlayers(fetchedPlayers);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((p) => (
          <CardContainer key={p.id}>
            <CardBody player={p}>
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