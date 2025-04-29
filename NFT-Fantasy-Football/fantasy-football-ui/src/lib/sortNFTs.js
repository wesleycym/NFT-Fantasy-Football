import { getRank } from "./calculateStats";

// Extract fantasy points from description
const extractFantasyPoints = (description) => {
    const match = description.match(/Fantasy Points: (\d+)/); // Find fantasy points in description
    return match ? parseInt(match[1], 10) : 0; 
  };

// Sort by highest fantasy points
const sortByFantasyPoints = (nfts) => {
    return [...nfts].sort((a, b) => {
      const pointsA = extractFantasyPoints(a.description); // Extract fantasy points
      const pointsB = extractFantasyPoints(b.description); // Extract fantasy points
      return pointsB - pointsA; 
    });
  };
  
  // Filter by rank based on points
const filterByRank = (nfts, rankType) => {
    return nfts.filter((nft) => {
      const points = extractFantasyPoints(nft.description); // Pull fantasy points
      const rank = getRank(points); // Get rank based on points
      return rank.includes(rankType); // Return true if rank includes rankType
    });
  };

  // Export functions
  export {
    extractFantasyPoints,
    sortByFantasyPoints,
    filterByRank,
  };