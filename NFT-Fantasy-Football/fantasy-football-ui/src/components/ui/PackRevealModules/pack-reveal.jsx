import AnimatedTestimonials from "./animated-reveal"; 
import { useState } from "react";
import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "./pack-3d-card";

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
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            <motion.img
              src={playerImageMap[player.name]}
              alt={player.name}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "tween",
                stiffness: 120,
                damping: 10,
                duration: 0.6,
              }}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            />
          </div>
        ),
      },
      {
        content: (
          <div className="h-full w-full flex flex-col justify-center items-center px-6 py-4 text-center space-y-3">
            <h2 className="text-4xl font-bold">{player.name}</h2>
            <p className="text-2xl">{player.position} - {player.team}</p>
            <p className="text-2xl font-semibold text-yellow-300 drop-shadow-sm">🏈 {fantasyPoints} Fantasy Points</p>
            <motion.p
              className="text-6xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <span className="drop-shadow-lg">{rank}</span>
            </motion.p>
        </div>
        ),
      },
      {
        content: (
          <div className="flex flex-col h-full w-full px-6 py-4 overflow-y-auto text-sm text-left text-white">
            <h3 className="text-lg font-semibold mb-3 text-center">📊 Breakdown</h3>
            <ul className="list-disc pl-5 space-y-2 flex-1 overflow-y-auto">
              {breakdown.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ),
      },
    ];
  
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <CardContainer className="w-[500px] h-[500px]">
          <CardBody>
            <CardItem translateZ={50}>
              <AnimatedTestimonials testimonials={revealSlides} />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    );
  };
  
  export default PackReveal;