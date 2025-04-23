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