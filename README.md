# 🏈 NFT Fantasy Football   

## Table of Contents

- [Abstract](#Abstract)   
- [Technology Stack](#Technology-Stack)   
- [Key Features](#Key-Features)   
- [Future Additions](#Future-Additions)   
- [Instructions](#Instructions)   

---


## Abstract

**NFT Fantasy Football** is an online NFT marketplace that allows users to mint a selected number of NFL players as unique NFTs. Each minted NFT is assigned a calculated fantasy score based on randomly selected real stats from the 2024–2025 NFL season.

On the offensive side of the ball, there are **11 categories** that factor into each player's score. Each category has **17 weekly entires**, all mapping to their respective statline for that week.   

> NFT Fantasy football is based off the **NFL Season** (weeks 1-18), not the **Fantasy Football Season** (weeks 1-17).   

Freshly minted NFTs pull a random week, from each of the 11 categories. Leading to ~ **34 trillion unique, weekly combinations per player**.   

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

This application uses a **hybrid on-chain/off-chain architecture**. All core NFT attributes (fantasy score, player info, rank) are stored fully **on-chain**, while dynamic stat generation and image hosting are handled **off-chain**. This design keeps the smart contract cost-efficient while preserving essential metadaya for every uniquely minted NFT.

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

## Key Features

## Future Additions

- Allow users to view stat breakdown from the apps wallet.

## Instructions   

### Requirements
[Create](https://metamask.io/) a MetaMask account.   
+ [Install](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) the MetaMask browser plugin (**Chrome**).   
+ [Install](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/) the MetaMask browser plugin (**Firefox**).   

#### Online
[NFT Fantasy Football](https://wesleycym.github.io/NFT-Fantasy-Football/)  

#### Locally 



Average mint price ~~ 0.00279 SepoliaETH   

Deploy cost ~~ .15 SepoliaETH     

Even though the contract owner's address is public (as it must be for proper UI logic), all critical functions are protected on-chain with msg.sender checks. This ensures only the true owner (with the private key) can execute them, regardless of any frontend manipulation.   
