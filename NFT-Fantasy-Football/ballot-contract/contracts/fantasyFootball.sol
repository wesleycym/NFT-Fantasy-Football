// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol"; // Library for converting uint to string
import "base64-sol/base64.sol"; // For converting JSON metadata to base64 encoded string

// ERC-20 interface -> sends / receives tokens
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256); // Returns the amount of tokens held by an address -> will be used to check contract balance
    function transfer(address recipient, uint256 amount) external returns (bool);
}

interface IERC165 {
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}

interface IERC721 is IERC165 {
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(
        address from, 
        address to, 
        uint256 tokenId, 
        bytes calldata data
    ) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}

interface IERC721Receiver {
    function onERC721Received(
        address operator,
        address from, 
        uint256 tokenId, 
        bytes calldata data
    ) external returns (bytes4);
}

contract FantasyFootball {
    IERC20 public yodaToken; // ERC20 contract
    string public name; // FantasyFootball
    string public symbol; // FFNFT
    uint256 public mint_price; // Global mint price

    address public contractOwner; // Mark the owner

    uint256 private _nextTokenId; // Maybe remove?
    uint256 public totalSupply; // Maybe remove?

    // Player metadata 
    struct Player {
        string name; 
        string position;
        string team;
        uint256 fantasyPoints; 
        bool forSale; 
        uint256 salePrice;

        // New Information -> extra metadata (specific stats + rank (could be removed for gas reasons))
        string description;
        string rank;
    }

    mapping(uint256 => Player) public players;
    mapping(string => string) public playerImageMap; // Mapping from player name to player image
    mapping(uint256 => address) internal _ownerOf; // Mapping owner address to token count
    mapping(address => uint256[]) private tokenOwnerstoIds;
    mapping(address => uint256) internal _balanceOf; // Mapping from token ID to approved address
    mapping(uint256 => address) internal _approvals; // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) public isApprovedForAll;

    constructor(

        address _yodaTokenAddress, // Accepted ERC20 contract
        string memory _name, 
        string memory _symbol, 
        uint256 MINT_PRICE
    ) {
        yodaToken = IERC20(_yodaTokenAddress); // Accepted ERC20 contract

        contractOwner = msg.sender;

        // NEW IMAGES  -> 1200x1200px
        playerImageMap["Josh Allen"] = "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/josh-allen.jpg";
        playerImageMap["Patrick Mahomes"] = "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/patrick-mahomes.jpg";
        playerImageMap["Justin Jefferson"] = "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/justin-jefferson.jpg";
        playerImageMap["Malik Nabers"] = "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/malik-nabers.jpg";
        playerImageMap["Saquan Barkley"] = "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/saquan-barkley.jpg";
        playerImageMap["Derrick Henry"] = "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/derrick-henry.jpg";
        playerImageMap["Brock Bowers"] = "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/brock-bowers.jpg";
        playerImageMap["Sam LaPorta"] = "https://white-quick-guan-314.mypinata.cloud/ipfs/bafybeid2idtzmht5newprc7wh3hi57c4fulh7lucx7epp6zprna7npcgfe/sam-laporta.jpg";

        name = _name;
        symbol = _symbol;
        mint_price = MINT_PRICE;
    }

    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 indexed id
    );
    event Approval(
        address indexed owner, 
        address indexed spender, 
        uint256 indexed id
    );
    event ApprovalForAll(
        address indexed owner, 
        address indexed operator, 
        bool approved
    );

    function _mint(address to, uint256 id) internal {
        require(to != address(0), "mint to zero address");
        require(_ownerOf[id] == address(0), "already minted");
        _balanceOf[to]++;
        _ownerOf[id] = to;
        emit Transfer(address(0), to, id);
    }

    function mint
    (
        address to, 
        string memory _name, 
        string memory _position, 
        string memory _team, 
        uint256 _fantasyPoints, 
        string memory _description,
        string memory _rank
        ) 
        public payable {

        require(yodaToken.transferFrom(msg.sender, address(this), mint_price), "YODA payment failed"); // Transfer YODA

        uint256 tokenId = _nextTokenId++; // Increment token ID
        _mint(to, tokenId); // Mint token

        totalSupply += 1; // Increment total supply

        // Store player data
        players[tokenId] = Player({
            name: _name, 
            position: _position, 
            team: _team, 
            fantasyPoints: _fantasyPoints,
            forSale: false,
            salePrice: 0,
            description: _description,
            rank: _rank
        });

        tokenOwnerstoIds[to].push(tokenId); // Add token ID to token owner's array
    }

    function _isApprovedOrOwner(
        address owner, 
        address spender, 
        uint256 id
    ) internal view returns (bool) {
        return (
            spender == owner || 
            isApprovedForAll[owner][spender] || 
            spender == _approvals[id]
        );
    }

    function transferFrom(
        address from, 
        address to, 
        uint256 id
    ) public {
        require(from == _ownerOf[id], "from != owner");
        require(to != address(0), "transfer to zero address");
        require(_isApprovedOrOwner(from, msg.sender, id), "not authorized");
        
        _balanceOf[from]--;
        _balanceOf[to]++;
        _ownerOf[id] = to;
        delete _approvals[id];
        emit Transfer(from, to, id);
    }

    function ownerOf(uint256 id) external view returns (address owner) {
        owner = _ownerOf[id];
        require(owner != address(0), "token doesn't exist");
    }

    function balanceOf(address owner) external view returns (uint256) {
        require(owner != address(0), "owner = zero address");
        return _balanceOf[owner];
    }

    function setApprovalForAll(address operator, bool approved) external {
        isApprovedForAll[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function approve(address spender, uint256 id) external {
        address owner = _ownerOf[id];
        require(
            msg.sender == owner || 
            isApprovedForAll[owner][msg.sender], 
            "not authorized"
        );
        _approvals[id] = spender;
        emit Approval(owner, spender, id);
    }

    // Set NFT for sale function
    function setForSale(uint256 tokenId, bool status, uint256 price) public {
        require(_ownerOf[tokenId] == msg.sender, "Not the token owner"); // Check if you own the token
        players[tokenId].forSale = status; // Set for sale
        players[tokenId].salePrice = price; // Set sale price
    }

    // Custom transfer function since we are buying (old but works)
    // transferFrom -> for trading 
    function _transfer(address from, address to, uint256 id) internal {
        require(from == _ownerOf[id], "from != owner");
        require(to != address(0), "transfer to zero address");

        _balanceOf[from]--;
        _balanceOf[to]++;
        _ownerOf[id] = to;

        delete _approvals[id];
        emit Transfer(from, to, id);
    }

    // Custom buy function for marketplace (if added)
    function buy(uint256 tokenId) public {
        require(_ownerOf[tokenId] != address(0), "Token does not exist"); // Check if token exists
        require(_ownerOf[tokenId] != msg.sender, "You already own this NFT"); // Check if you own the token

        Player storage player = players[tokenId];
        require(player.forSale, "NFT not for sale");

        require(yodaToken.transferFrom(msg.sender, _ownerOf[tokenId], player.salePrice), "YODA payment failed"); // Transfer YODA

        //address seller = _ownerOf[tokenId]; // Won't need until yoda is implemented
        player.forSale = false;
        player.salePrice = 0;

         _transfer(_ownerOf[tokenId], msg.sender, tokenId);
    }


    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf[tokenId] != address(0), "Token does not exist"); // Check if token exists

        Player memory p = players[tokenId]; // Get player
        string memory image = playerImageMap[p.name]; // Get player image from map

        // Extracting only first character (the emoji)
        bytes memory rankBytes = bytes(p.rank);
        string memory emojiOnly = string(abi.encodePacked(rankBytes[0], rankBytes[1], rankBytes[2], rankBytes[3]));

        string memory displayName = string(abi.encodePacked( // Should only display name along with rank emoji
            emojiOnly, " ", p.name 
        ));

        string memory description = p.description; // From pre formatted description in the frontend

        // JSON metadata with full details in description
        string memory json = string(abi.encodePacked(
            '{',
                '"name": "', displayName, '",',
                '"description": "', description, '",',
                '"image": "', image, '"',
            '}'
        ));

        string memory encoded = Base64.encode(bytes(json));
        return string(abi.encodePacked("data:application/json;base64,", encoded));
    }

    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return interfaceId == 0x80ac58cd; // ERC-721 interface ID
    }

    // Custom modifier -> Verify if the sender is the owner
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Not the owner");
        _;
    }

    // Function to allow owner to withdraw YODA from the contract
    function withdrawYoda() external onlyOwner {
        uint256 balance = yodaToken.balanceOf(address(this));
        require(balance > 0, "No Yoda to withdraw");
        yodaToken.transfer(contractOwner, balance);
    }

}