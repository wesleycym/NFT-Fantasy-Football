
const JoshAllenStats = require("./testJA17");
// const PatrickMahomesStats = require("./playerStats/PatrickMahomes");
// const JustinJeffersonStats = require("./playerStats/JustinJefferson");
// const MalikNabersStats = require("./playerStats/MalikNabers");
// const SaquanBarkleyStats = require("./playerStats/SaquanBarkley");
// const DerrickHenryStats = require("./playerStats/DerrickHenry");
// const BrockBowersStats = require("./playerStats/BrockBowers");
// const SamLaPortaStats = require("./playerStats/SamLaPorta");

// Mapping players name to their designated stats
const playerStatMap = 
{
    "Josh Allen": JoshAllenStats,
    // "Patrick Mahomes": PatrickMahomesStats,
    // "Justin Jefferson": JustinJeffersonStats,
    // "Malik Nabers": MalikNabersStats,
    // "Saquan Barkley": SaquanBarkleyStats,
    // "Derrick Henry": DerrickHenryStats,
    // "Brock Bowers": BrockBowersStats,
    // "Sam LaPorta": SamLaPortaStats,
}

let DEBUG = false;

function getRank(points) {
    if (points >= 40) return "🏆 Hall of Fame";
    if (points >= 30) return "💪 All-Pro";
    if (points >= 15) return "🔒 Starter";
    if (points >= 8) return "🛠️ Bench";
    if (points >= 5)  return "📦 Practice Squad";
    return "🧢 Draft Bust";
  }

function generateRandomFantasyStats(playerName) 
{
    const stats = playerStatMap[playerName]; // Map player name to their stats

    if (DEBUG) console.log(stats);

    if (!stats) throw new Error("Unknown player name: " + playerName); // Throw error if player name is not found

    let fantasyPoints = 0; // Initialize fantasy points
    let breakdown = []; // Initialize breakdown array -> will be displayed in the decription of the NFT

    // Choose random week from each category
    const pick = (map) => {
        const weeks = Object.keys(map); // Get all weeks
        const randWeek = weeks[Math.floor(Math.random() * weeks.length)]; // Choose random week
        return { week: randWeek, value: map[randWeek] }; // Return week and value
      };

    // Generate breakdown + calculations
    const categories = [
        { key: "PassingYards", pointsPer: 25, label: "Passing Yards" }, // 1 point per 25 yards
        { key: "PassingTouchdowns", pointsPer: 1, label: "Passing TDs", multiplier: 4 }, // 4 points per
        { key: "PassingInterceptions", pointsPer: 1, label: "Interceptions", multiplier: -2 }, // -2 points per
        { key: "RushingYards", pointsPer: 10, label: "Rushing Yards" }, // 1 point per 10 yards
        { key: "RushingTouchdowns", pointsPer: 1, label: "Rushing TDs", multiplier: 6 }, // 6 points per
        { key: "Receptions", pointsPer: 1, label: "Receptions" }, // 1 point per reception
        { key: "ReceivingYards", pointsPer: 10, label: "Receiving Yards" }, // 1 point per 10 yards
        { key: "ReceivingTouchdowns", pointsPer: 1, label: "Receiving TDs", multiplier: 6 }, // 6 points per
        { key: "TwoPointConversions", pointsPer: 1, label: "2PT Conversions", multiplier: 2 }, // 2 points per
        { key: "FumblesLost", pointsPer: 1, label: "Fumbles Lost", multiplier: -2 }, // -2 points per
        { key: "FumbleRecoveredForaTouchdown", pointsPer: 1, label: "Fumble Recovered for TD", multiplier: 6 }, // 6 points per
      ];


      for (const { key, pointsPer, label, multiplier = 1 } of categories) {
        const statMap = stats[key];
        if (!statMap || Object.keys(statMap).length === 0) continue;
    
        const { week, value } = pick(statMap);
        const statPoints = Math.floor(Number(value) / pointsPer) * multiplier;
    
        fantasyPoints += statPoints;
        breakdown.push(`${label}: ${value} (Week ${week})`);
      }

      let rank = getRank(fantasyPoints);
      
      // Return points and breakdown -> (Passing yards: 232 (Week 1))
      return {
        fantasyPoints, breakdown, rank
      };
}

module.exports = {
    generateRandomFantasyStats,
    getRank
  };