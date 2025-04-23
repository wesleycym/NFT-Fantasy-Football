import AnimatedTestimonials from "./AnimatedTestimonials"; 
import { useState } from "react";

const playerImageMap = 
{
    "Josh Allen": "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/josh-allen.jpg",
    "Patrick Mahomes": "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/patrick-mahomes.jpg",
    "Justin Jefferson": "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/justin-jefferson.jpg",
    "Malik Nabers": "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/malik-nabers.jpg",
    "Saquan Barkley": "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/saquan-barkley.jpg",
    "Derrick Henry": "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/derrick-henry.jpg",
    "Brock Bowers": "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/brock-bowers.jpg",
    "Sam LaPorta": "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/sam-laporta.jpg"
};

const PackReveal = ({ player, fantasyPoints, rank, breakdown }) => {
    const revealSlides = [
      {
        content: (
          <img
            src={playerImageMap[player.name]}
            alt={player.name}
            className="h-full w-full rounded-3xl object-cover object-center"
          />
        ),
      },
      {
        content: (
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold">{player.name}</h2>
            <p>{player.position} - {player.team}</p>
            <p>🏈 {fantasyPoints} Fantasy Points</p>
            <p>{rank}</p>
          </div>
        ),
      },
      {
        content: (
          <div className="text-left px-4 text-sm max-h-60 overflow-y-auto">
            <h3 className="font-semibold mb-2">📊 Breakdown</h3>
            <ul className="list-disc space-y-1">
              {breakdown.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ),
      },
    ];
  
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <AnimatedTestimonials testimonials={revealSlides} />
      </div>
    );
  };
  
  export default PackReveal;