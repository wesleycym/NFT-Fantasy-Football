const { generateRandomFantasyStats } = require("./testCaclulateStats.js");

const { fantasyPoints, breakdown, rank } = generateRandomFantasyStats("Josh Allen");

console.log("Fantasy Points:", fantasyPoints);
console.log("Breakdown:", breakdown);
console.log("Rank:", rank);