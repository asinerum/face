pragma solidity ^0.4.24;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import "./RootPlan.sol";

contract Base is RootPlan {
  uint public basicRate;
  uint public rewardStamp;
  uint public timerewStep;
  uint256 public blockReward;

  constructor () public {
    basicRate = 600;
    rewardStamp = now;
    timerewStep = 600;
    blockReward = 60*PPT;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

contract Gemt is Base {
  uint public START;
  uint public STAGE;
  uint256 public MX;

  uint public randomKey;
  uint public lastProof;

  mapping (uint => uint256) public blockPayouts;
  mapping (uint => uint256) public stampRewards;

  uint constant MXPACK = 10*10**6;
  uint constant ANNSEC = 365*24*60*60;

  constructor () public {
    START = now;
    STAGE = now;
    randomKey = 16**32;
    lastProof = now+60;
    balanceOf[address(0)] = 10**9*PPT;
    author = "ASINERUM INTERNATIONAL";
    name = "ETHEREUM MINEABLE TOKEN WITH NO GOVERNANCE V9";
    symbol = "GEMT9";
  }

  function numgen (uint nonce)
  internal view returns (uint num) {
    return numgen (nonce, randomKey);
  }

  function keygen (uint nonce)
  internal view returns (uint num) {
    return keygen (nonce, randomKey);
  }

  function keymod (uint nonce)
  internal view returns (uint num) {
    num = keygen (nonce) % basicRate;
  }

  function VP2 (uint sec)
  internal view returns (uint) {
    uint tar = totalSupply**2*now;
    uint max = (2*ANNSEC*PPT)**2*START;
    return (tar>max?max:tar)/(max/sec)+60;
  }

  function rise (address to, uint256 value)
  internal {
    move (address(0), to, value);
    totalSupply += value;
  }

  function mine (uint nonce) public returns (bool success) {
    if (now-STAGE>ANNSEC/3||totalSupply-MX>MXPACK*PPT/3) {
      basicRate = basicRate*3;
      blockReward = blockReward/3;
      timerewStep = timerewStep*3;
      MX = totalSupply;
      STAGE = now;
    }
    if (rewardStamp<now && stampRewards[rewardStamp]==0) {
      stampRewards[rewardStamp] = blockReward*8/10;
      rise (block.coinbase, blockReward/2);
      rise (address(this), blockReward/5);
      rise (msg.sender, blockReward/10);
      rewardStamp = now+timerewStep;
    }
    uint256 reward;
    if (blockPayouts[block.number]==0) {
      if (keymod(nonce)==randomKey%basicRate) {
        uint tpart = VP2 (3600);
        uint timepast = now-lastProof;
        reward = blockReward*timepast/tpart;
        blockPayouts[block.number] = reward;
        randomKey = numgen (nonce);
        lastProof = now;
      }
    }
    if (reward>0) rise (msg.sender, reward);
    return true;
  }
}