//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function sendMeFunds() external returns (bool);
    function authorizeFirstTransfer(address _address) external;
}

contract YODA is IERC20 {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    address public owner;
    
    mapping(address => uint256) public balanceOf; // Balance of your tokens
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public authorizedFirstTransfer;

    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        decimals = 2;
        totalSupply = _initialSupply * 10 ** 2;
        owner = msg.sender;
        balanceOf[msg.sender] = totalSupply;
        
    }

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // Transfer tokens to an address
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        require(_to != address(0), "Invalid address");
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_spender != address(0), "Invalid address");
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value, "Insufficient balance");
        require(_to != address(0), "Invalid address");
        require(allowance[_from][msg.sender] >= _value, "Allowance exceeded");
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        
        emit Transfer(_from, _to, _value);
        return true;
    }

    function sendMeFunds() public returns (bool success) {
        require(authorizedFirstTransfer[msg.sender] == true, "Tokens already recieved or Unauthorized");
        require(balanceOf[owner] >= 10000 * 10 ** 2, "Insufficient owner balance");

        balanceOf[owner] -= 10000 * 10 ** 2;
        balanceOf[msg.sender] += 10000 * 10 ** 2;
        authorizedFirstTransfer[msg.sender] = false;

        emit Transfer(owner, msg.sender, 10000 * 10 ** 2);
        return true;
    }
    
    function authorizeFirstTransfer(address _address) public {
        require(msg.sender == owner, "Only owner can authorize first transfer");
        authorizedFirstTransfer[_address] = true;
    }
}
