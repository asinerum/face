pragma solidity ^0.4.24;

contract IERC20 {

  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public totalSupply;
  mapping (address => uint256) public balanceOf;
  mapping (address => mapping (address => uint256)) public allowance;

  uint256 internal PPT;
  string public author;
  address public creator;

  event Transfer (address indexed fromAddress, address indexed toAddress, uint256 txPenny);
  event Approval (address indexed ownerAddress, address indexed spenderAddress, uint256 txPenny);

  constructor () public {
    decimals = 18;
    PPT = 10**uint256(decimals);
    author = "ASINERUM INTERNATIONAL";
    creator = msg.sender;
  }

  function move (address from, address to, uint256 value)
  internal {
    require (value <= balanceOf[from]);
    require (balanceOf[to]+value > balanceOf[to]);
    uint256 sum = balanceOf[from] + balanceOf[to];
    balanceOf[from] -= value;
    balanceOf[to] += value;
    assert (balanceOf[from]+balanceOf[to] == sum);
    emit Transfer (from, to, value);
  }

  function transfer (address to, uint256 value) public returns (bool success) {
    move (msg.sender, to, value);
    return true;
  }

  function transferFrom (address from, address to, uint256 value) public returns (bool success) {
    require (value <= allowance[from][msg.sender]);
    allowance[from][msg.sender] -= value;
    move (from, to, value);
    return true;
  } //V2

  function approve (address spender, uint256 value) public returns (bool success) {
    allowance[msg.sender][spender] = value;
    emit Approval (msg.sender, spender, value);
    return true;
  } //V2
}