pragma solidity ^0.4.24;

import "./IERC20.sol";

contract EXTEND is IERC20 {

  mapping (address => mapping (bytes32 => uint[])) public refnosOf; //V9
  mapping (address => address) public refAccounts; //REMT9

  uint public constant MIN = 100; //REMT9
  uint public constant ANNSEC = 31536000;

  event Ref (address indexed referrer, address referee); //REMT9

  constructor () public {
    refAccounts[msg.sender] = creator; //REMT9
  }

  modifier checkRefAccount {
    require (refAccounts[msg.sender] != 0x0);
    _;
  } //REMT9

  modifier checkBalanceOf {
    require (balanceOf[msg.sender] >= MIN*PPT);
    _;
  } //REMT9

  modifier checkTxGasPrice {
    require (tx.gasprice <= getGasPrice());
    _;
  } //REMT9

  function requireBalance (uint256 value)
  internal view { // Comes after [checkBalanceOf]
    require (balanceOf[msg.sender]-MIN*PPT >= value);
  } //REMT9

  function ethered (uint256 value)
  internal view returns (bool) {
    require (msg.value*value==0 && msg.value+value>0, "#eth:values");
    require (value<=totalSupply, "#eth:value");
    return msg.value>0?true:false;
  }

  function addNo (string key, uint refno)
  internal {
    require (refno > 0);
    bytes32 pid = keccak256 (abi.encodePacked(key,msg.value>0?"E":"T"));
    refnosOf[msg.sender][pid].push (refno);
    refnosOf[0x0][pid].push (refno);
  } //V8>REMT9

  // PUBLIC VIEW

  function getGasPrice () public view returns (uint256) {
    uint256 gasPrice;
    assembly {
      gasPrice := gasprice()
    }
    return gasPrice;
  } //REMT9

  function refnos (address ua, string key, string form, uint skip, uint limit) public view returns (uint size, uint[] memory nos) {
    uint[] memory therefno = refnosOf[ua][keccak256(abi.encodePacked(key,form))];
    size = therefno.length;
    if (size <= skip) return;
    uint start = size - skip;
    uint count = start>limit ? limit : start;
    uint[] memory lst = new uint[](count);
    for (uint i=0; i<count; i++) { lst[i] = therefno[i+skip]; }
    nos = lst;
  } //V8>REMT9

  // PUBLIC ACCESS

  function ref (address referee)
  checkRefAccount checkBalanceOf public returns (bool success) {
    refAccounts[referee] = msg.sender;
    emit Ref (msg.sender, referee);
    return true;
  } //REMT9

  function transferToMany (address[] tos, uint256[] values, string note) public returns (bool success) {
    require (tos.length == values.length);
    note = ""; uint256 total; uint i;
    for (i=0; i<tos.length; i++) { total += values[i]; }
    require (total>0 && balanceOf[msg.sender]>=total);
    for (i=0; i<tos.length; i++) {
      move (msg.sender, tos[i], values[i]);
    }
    return true;
  } //REMT9
}