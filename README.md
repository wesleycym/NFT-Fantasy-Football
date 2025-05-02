# 🏈 NFT Fantasy Football   

## Table of Contents

- [Abstract](#Abstract)   
- [Key Features](#Key-Features) 
- [Technology Stack](#Technology-Stack)     
- [Future Additions](#Future-Additions)   
- [Instructions](#Instructions)   

---


## Abstract

**NFT Fantasy Football** is an online NFT marketplace that allows users to mint a selected number of NFL players as unique NFTs. Each minted NFT is assigned a calculated fantasy score based on randomly selected real stats from the 2024–2025 NFL season.

On the offensive side of the ball, there are **11 categories** that factor into each player's score. Each category has **17 weekly entires**, all mapping to their respective statline for that week.   

> NFT Fantasy football is based off the **NFL Season** (weeks 1-18), not the **Fantasy Football Season** (weeks 1-17).   

Freshly minted NFTs pull a random week from each of the 11 categories. Leading to ~ **34 trillion unique, weekly combinations per player**.   

NFT fantasy football bases its scoring off the standard PPR format. When points are calculated, each player is given a corresponding rank based on the resembled performance.   

>  FP >= 40 - 🏆 Hall of Fame  
>  FP >= 30 - 💪 All-Pro  
>  FP >= 15 - 🔒 Starter  
>  FP >= 8 - 🛠️ Bench  
>  FP >= 5  - 📦 Practice Squad  
>  FP < 5 - 🧢 Draft Bust  

<p align="center">
    <img src="https://files.catbox.moe/x56orl.gif" width="350"  />
</p>

This application uses a **hybrid on-chain/off-chain architecture**. All core NFT attributes (fantasy score, player info, rank) are stored fully **on-chain**, while dynamic stat generation and image hosting are handled **off-chain**. This design keeps the smart contract cost-efficient while preserving essential metadata for every uniquely minted NFT.

---

## Key Features

- **Dynamic NFT Minting**   
Users can mint unique NFL player NFTs based on real 2024–2025 season stats, with each NFT    assigned a randomized statline across 11 fantasy categories.   
- **Tiered Fantasy Rankings**   
NFTs are ranked automatically using fantasy point thresholds (e.g., 🏆 Hall of Fame, 💪 All-Pro, 🧢 Draft Bust), giving each mint a dopamine-inducing payoff.
- **ERC-20 YODA Token Integration**   
NFTs are minted using a custom ERC-20 token ("YODA"), enforcing spending via MetaMask with proper approval flows.   
- **In-App NFT Wallet**   
Sidebar wallet displays all NFTs owned by the user, complete with filters by rank (emoji icons) and dynamic sorting by fantasy points.   

<p align="center">
    <img src="https://files.catbox.moe/jg9ja7.gif" width="250"  />
</p>

- **MetaMask NFT Integration**   
All minted NFTs are fully ERC-721 compliant and display directly in MetaMask’s wallet interface, verifying ownership outside the dApp.   

<p align="center">
    <img src="https://files.catbox.moe/7o94zj.gif" width="250"  />
</p>

- **Animated Pack Reveal Experience**   
Minting triggers a 3D animated pack opening that displays your player's name, stats, and final fantasy score with flair.   
- **Hybrid On/Off-Chain Design**   
Core NFT data is stored on-chain; off-chain components like image hosting and stat generation keep the system lightweight and scalable.   
- **Responsive UI with Smooth Animations**   
Built with TailwindCSS + Framer Motion for a modern, fast, and fluid user experience across devices.

---

## Technology Stack   

### Frontend

- **React** - JavaScript library for building user interfaces.    
- **Tailwind CSS** - Utility-first styling.   
- **Framer Motion** - Smooth animations and transitions.     
- **React Toastify** - Custom alerts and notifications.   
- **Aceternity** - Modern component library.   

### Blockchain

- **Ethers.js** - Ethereum JavaScript SDK for contract interaction.     
- **Sepolia Testnet** - Ethereum test network used for deployment.     
- **Metamask** - Wallet connection and transaction signing.    
- **ERC-721** - Custom NFT implementation (Fantasy Player NFTs).   
- **ERC-20 (YODA)** - In-game currency required to mint NFTs.   


### Smart Contracts

- **Solidity** - Smart contract programming language
- **Hardhat** - Smart contract development & testing framework.   
- **Pinata** - Off-chain hosting for player images.   
- **.env** - Secure storage for contract and address configs.    

---

## Future Additions

- **Expand Wallet Functionality**   
Enhance the in-app wallet to show full stat breakdowns, fantasy point totals, and rankings on-click, replacing the need to rely on MetaMask’s limited NFT viewer.   
- **Leaderboards**   
Add a public leaderboard displaying the top-performing NFTs across all users, ranked by fantasy score or rarity tier.
- **Update Ranks**   
    1) Calculate ranks based on player position instead of global scores.    
    2) Introduce special rarity tags for perfect statline pulls (e.g., a Josh Allen card with all Week 1 stats).   
-  **NFT Trading or Marketplace**   
Implement a marketplace where users can list, trade, or purchase NFTs.   
- **Increase Player Pool**   
Expand the mintable roster to include more NFL players across different positions.   
- **Multi-NFT Pack Minting**   
    1) Let users mint a pack of 3-5 players at once.   
    2) Allow users to mint team specific packs.   
- **Add past, seasonal stats**   
Incorporate legacy players and past seasons to unlock new stat combinations and maximize fantasy score variety.     
    > e.g.,    
    > Mint a “rookie HOF Josh Allen” card with only his rookie stats,   
    > Mint a Derrick Henry card based on his first-ever NFL start.

---

## Instructions   

### Requirements

1) [Create](https://metamask.io/) a MetaMask account.   

2) Install the MetaMask browser extension: 
    - [Chrome](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)   
    - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/)  

3) Ensure MetaMask is set to the Sepolia testnet:   
    > MetaMask → Network Dropdown (Top Left) → Show Test Networks → Enable **Sepolia**

4) Users will be required to have ~**[0.00279 SepoliaETH](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)** to mint an NFT. You can get free Sepolia ETH from the faucet linked above.   


#### Online
1) **Visit the site**:  
[NFT Fantasy Football (GitHub Pages)](https://wesleycym.github.io/NFT-Fantasy-Football/)  
2) **Connect your Metamask wallet**:   
Click the "**Connect Wallet**" button in the app header.   
3) **Approve the connection prompt**:   
MetaMask will request permission to connect your wallet to the site — approve it.   
> Make sure you're connected to the Sepolia Test Network and have enough test ETH to cover gas fees.

#### Locally 

1) **Clone the repository**   
```bash 
git clone https://github.com/wesleycym/NFT-Fantasy-Football.git
```   
2) **Navigate to the frontend folder**   
```bash
cd NFT-Fantasy-Football/fantasy-football-ui
```
3) **Install dependencies**   
```bash
npm install
```
4) **Start the app**    
```bash
npm start
```   

**Note:**

>The ```.env``` file in the frontend contains all **public-facing** information and is included in the repository. **Editing** this file is not recommended, as changes may lead to unintended behavior.