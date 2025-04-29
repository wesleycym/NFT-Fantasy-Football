# 🏈 NFT Fantasy Football
NFT Fantasy Football is a decentralized web application that combines NFT owernship with the dynamic nature of fantasy football through the use of fantasy points. Each NFT represents a real-world player, and includes attributes such as name, team, position, and most importantly, fantasy points. Users can connect their MetaMask wallet, and purchase player NFTs using custom ERC-20 Yoda tokens.   
___
Upon deployment, the deployer becomes the **inital owner of all NFTs**, and has them automatically listed for sale. **Only 1 NFT is minted per NFL athlete**, ensuring uniqueness, and enforcing the structure of a fantasy football league. Once purchased at the base price, NFTs are transferred to the buyer and removed from circulation. The new owner is then given the option to list the NFT for sale again, with their own asking price.    
___
Fantasy point updates are reflected live on the frontend of the application. Each NFT dynamically encodes its metadata using the **tokenURI()** function. If a player's points are updated, and the NFT is resold, the new owner will see the **updated stats** reflected automatically in their wallet.   
___
Although players do not mint the cards themselves, purchasing an NFT with high fantasy points can capture a legacy defining game; like owning a piece of history. The on-chain **fantasyPoints field** locks in a snapshot of the players greatness.   
___
## Demo Checklist 
**1) Good tile and abstract of 100 words:** ✅   
**2) Smart contract for NFT deployed on hardhat or Sepolia:** ✅ Deployed on sepolia.   
**3) Working front-end for the NFT for users to interact:** ✅   
**4) Display of NFT’s price in Yodas and Transfer of Yoda for the price of an NFT:** ⚠️ Prices to display, but all NFTs are free as of testing.   
**5) User able to mint NFT with base characteristics specified; multiple users do the same:** ⚠️ Reflected on nature of fantasy football. Availability of single player is limited, however the availability of mulitple players is abundant.   
**6) Dynamic nature of the NFT:** ⚠️ Ensuring the integrity of fantasy football, users cannot change the values of players, the power to do so is left to the commissioner (deployer). However, I could change the logic to allow multiple NFTs of the same player to be minted, all with different fantasy point values.   
**7) Users able to display NFT on their wallet:** ✅   
**8) What are the offchain data for the NFT?** Where is the offchain data stored? How is it accessed? How is it
represented on the smart contract for NFT?: ✅ NFT images are hosted on Pinata. As for data itself (name, FP, etc.), it is encoded on the fly using **tokenURI**.   

```solidity   
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf[tokenId] != address(0), "Token does not exist");

        Player memory p = players[tokenId];
        string memory image = playerImageMap[p.name];

        // JSON metadata with full details in description
        string memory json = string(abi.encodePacked(
            '{',
                '"name": "', p.name, '",',
                '"description": "', 
                    p.position, '\\n',
                    p.team, '\\n',
                    Strings.toString(p.fantasyPoints), ' Fantasy Points",',
                '"image": "', image, '"',
            '}'
        ));

        string memory encoded = Base64.encode(bytes(json));
        return string(abi.encodePacked("data:application/json;base64,", encoded));
    }
```   
**9) Compute based on NFT properties:** ❌ While it is possible to include all on the field variables to determine a players performance, there was a concern with high gas usage if implemented. Statically uploading a JSON file of all stats (passing yards, tds, etc) will turn the application into a static NFT platform, unless its manually updated. However, it is entirely possible to sort all players on the front end by points earned.   

Average mint price ~~ 0.00279 SepoliaETH   

Deploy cost ~~ .15 SepoliaETH     