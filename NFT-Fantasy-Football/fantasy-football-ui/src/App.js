import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import FantasyFootballABI from "./contracts/FantasyFootball.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function App() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      // Ask MetaMask to connect
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create browser provider
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Connect to the contract
      const contract = new Contract(contractAddress, FantasyFootballABI.abi, signer);

      try {
        const playerData = await contract.players(0); // tokenId 0
        setPlayer(playerData);
      } catch (err) {
        console.error("Error fetching player:", err);
      }
    };

    fetchPlayer();
  }, []);

  return (
    <div>
      <h1>Fantasy Football NFT Viewer</h1>
      {player ? (
        <div>
          <p><strong>Name:</strong> {player[0]}</p>
          <p><strong>Position:</strong> {player[1]}</p>
          <p><strong>Team:</strong> {player[2]}</p>
          <p><strong>Fantasy Points:</strong> {player[3].toString()}</p>
        </div>
      ) : (
        <p>Loading player data...</p>
      )}
    </div>
  );
}

export default App;