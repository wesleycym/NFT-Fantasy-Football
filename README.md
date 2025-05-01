# 🏈 NFT Fantasy Football   

NFT Fantasy Football is an online NFT marketplace that allows users to mint a selected number of NFL players as their own NFTs. Each minted NFT is given an accurate, calculated fantasy score based on randomly selected stats of the 2024-2025 NFL season in accordance to the player.   


>  FP >= 40 - 🏆 Hall of Fame  
>  FP >= 30 - 💪 All-Pro  
>  FP >= 15 - 🔒 Starter  
>  FP >= 8 - 🛠️ Bench  
>  FP >= 5  - 📦 Practice Squad  
>  FP < 5 - 🧢 Draft Bust  


# Instructions   

## Requirements
[Create](https://metamask.io/) a MetaMask account.   
[Install](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) the MetaMask browser plugin (**Chrome**).   
[Install](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/) the MetaMask browser plugin (**Firefox**).   

### Online
[NFT Fantasy Football](https://wesleycym.github.io/NFT-Fantasy-Football/)  

### Locally 


Average mint price ~~ 0.00279 SepoliaETH   

Deploy cost ~~ .15 SepoliaETH     

Even though the contract owner's address is public (as it must be for proper UI logic), all critical functions are protected on-chain with msg.sender checks. This ensures only the true owner (with the private key) can execute them, regardless of any frontend manipulation.   

“Each NFT is uniquely generated from real NFL stat data, using 11 performance categories and 17 weeks of potential values — resulting in over 3.4 quintillion unique combinations per player.”   