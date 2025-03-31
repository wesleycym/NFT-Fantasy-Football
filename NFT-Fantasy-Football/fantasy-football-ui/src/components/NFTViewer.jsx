import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import FantasyFootballABI from "../contracts/FantasyFootball.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

/* 
          Will only display NFTs after wallet is connected
*/

const NFTViewer = ({ walletAddress }) => {
  const [players, setPlayers] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!walletAddress) return; // only fetch if connected

      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await ethProvider.getSigner();
      const ffContract = new ethers.Contract(CONTRACT_ADDRESS, FantasyFootballABI.abi, signer);
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
    };

    fetchNFTs();
  }, [walletAddress]); // Run this only when walletAddress changes

  if (!walletAddress) return <p>Connect your wallet to view NFTs.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Fantasy Football NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((p) => (
          <div key={p.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p>{p.position} – {p.team}</p>
            <p>Fantasy Points: {p.fantasyPoints}</p>
            <p className="text-sm text-gray-500">Owner: {p.owner}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTViewer;