import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";

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
      <h2 className="text-xl font-bold mb-4">Fantasy Football NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((p) => {
          // Create filename from player name, e.g., "Josh Allen" => "josh-allen.jpg"
          const imageName = p.name.toLowerCase().replace(/\s+/g, "-") + ".jpg";
          const imageUrl = `/images/${imageName}`;

          return (
            <div key={p.id} className="p-4 border rounded-lg shadow hover:shadow-xl transition">
              <img
                src={imageUrl}
                alt={`${p.name} NFT`}
                className="w-full h-auto rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p>{p.position} – {p.team}</p>
              <p>Fantasy Points: {p.fantasyPoints}</p>
              <p className="text-sm text-gray-500">Owner: {p.owner}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NFTViewer;