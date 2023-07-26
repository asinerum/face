pragma solidity ^0.4.24;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import "./RootPort.sol";

contract Base is RootPort {
  uint public basicRate;
  uint256 internal blockReward;

  constructor () public {
    basicRate = 600;
    blockReward = 60*PPT;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

contract Nemt is Base {
  uint internal START;
  uint internal STAGE;
  uint256 internal MX;

  uint public randomKey;
  uint internal lastProof;

  mapping (uint => uint256) internal blockPayouts;

  uint constant MXPACK = 10*10**6;
  uint constant ANNSEC = 365*24*60*60;

  constructor () public {
    START = now;
    STAGE = now;
    randomKey = 16**32;
    lastProof = now+60;
    balanceOf[address(0)] = 10**9*PPT;
    author = "ASINERUM INTERNATIONAL";
    name = "ETHEREUM MINEABLE TOKEN WITH NO GOVERNANCE @NAKED V9";
    symbol = "NEMT9";
  }

  function numgen (uint nonce)
  internal view returns (uint num) {
    return numgen (nonce, randomKey);
  }

  function keygen (uint nonce)
  internal view returns (uint num) {
    return keygen (nonce, randomKey);
  }

  function VP2 (uint sec)
  internal view returns (uint) {
    uint tar = totalSupply**2*now;
    uint max = (ANNSEC*PPT)**2*START;
    return (tar>max?max:tar)/(max/sec)+60;
  }

  function nonced (uint nonce)
  internal returns (bool checked) {
    checked = keygen(nonce)%basicRate==randomKey%basicRate;
    if (checked) randomKey = numgen (nonce);
  }

  function rise (address to, uint256 value)
  internal {
    move (address(0), to, value);
    totalSupply += value;
  }

  function mine (uint nonce) public returns (bool success) {
    if (now-STAGE>ANNSEC/2||totalSupply-MX>MXPACK*PPT/2) {
      blockReward = blockReward/2;
      basicRate = basicRate*2;
      MX = totalSupply;
      STAGE = now;
    }
    uint256 reward;
    if (blockPayouts[block.number]==0) {
      if (nonced(nonce)) {
        uint tpart = VP2 (3600);
        uint timepast = now-lastProof;
        reward = blockReward*timepast/tpart;
        blockPayouts[block.number] = reward;
        lastProof = now;
      }
    }
    if (reward>0) rise (msg.sender, reward);
    return true;
  }
}