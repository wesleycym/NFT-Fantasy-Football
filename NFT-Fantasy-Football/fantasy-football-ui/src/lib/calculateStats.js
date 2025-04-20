import * as JoshAllenStats from "./playerStats/JoshAllen"; // Josh Allens 2024-2025 season stats
import * as PatrickMahomesStats from "./playerStats/PatrickMahomes"; // Patrick Mahomes 2024-2025 season stats
import * as JustinJeffersonStats from "./playerStats/JustinJefferson"; // Justin Jefferson 2024-2025 season stats
import * as MalikNabersStats from "./playerStats/MalikNabers"; // Malik Nabers 2024-2025 season stats
import * as SaquanBarkleyStats from "./playerStats/SaquanBarkley"; // Saquan Barkley 2024-2025 season stats
import * as DerrickHenryStats from "./playerStats/DerrickHenry"; // Derrick Henry 2024-2025 season stats
import * as BrockBowersStats from "./playerStats/BrockBowers"; // Brock Bowers 2024-2025 season stats
import * as SamLaPortaStats from "./playerStats/SamLaPorta"; // Sam LaPorta 2024-2025 season stats

// Mapping players name to their designated stats
playerStatMap = 
{
    "Josh Allen": JoshAllenStats,
    "Patrick Mahomes": PatrickMahomesStats,
    "Justin Jefferson": JustinJeffersonStats,
    "Malik Nabers": MalikNabersStats,
    "Saquan Barkley": SaquanBarkleyStats,
    "Derrick Henry": DerrickHenryStats,
    "Brock Bowers": BrockBowersStats,
    "Sam LaPorta": SamLaPortaStats
}

export function generateRandomFantasyStats(playerName) 
{
    const stats = playerStatMap[playerName]; // Map player name to their stats
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
      
      // Return points and breakdown -> (Passing yards: 232 (Week 1))
      return {
        fantasyPoints, breakdown
      };
}
