import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { mintablePlayers } from "../lib/AvailablePlayers";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS; // from .env
const infuraKey = process.env.REACT_APP_INFURA_API_KEY; // from .env

const NFTViewer = ({ walletAddress, isConnected }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const loadAvailablePlayers = () => {
      const formatted = mintablePlayers.map((p, i) => ({
        ...p,
        id: i,
      }));
      setPlayers(formatted);
    };
  
    loadAvailablePlayers();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((p) => (
          <CardContainer key={p.id}>
            <CardBody 
              player={p} 
              walletAddress={walletAddress} 
              isConnected={isConnected} 
              contractAddress={CONTRACT_ADDRESS}
              infuraKey={infuraKey} // Sending key incase it will be needed
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