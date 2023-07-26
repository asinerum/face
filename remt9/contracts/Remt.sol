pragma solidity ^0.4.24;

import "./KEY.sol";
import "./PlanX.sol";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

contract RemtBase is PlanX, KEY {

  uint public STAGE;
  uint public basicRate;
  uint public randomKey;

  uint public rewardStamp; //REMT9
  uint public rewardInterval; //REMT9
  uint256 public timeReward; //REMT9

  uint256 public lottoVal; //REMT9
  uint public lottoMod; //REMT9

  mapping (uint => uint256) public blockPayouts;

  constructor () public {
    STAGE = now;
    basicRate = 2400;
    randomKey = 16**32;
    timeReward = 1*PPT;
    rewardStamp = now; //REMT9
    rewardInterval = 60*20; //REMT9
    lottoVal = 2048*PPT; //REMT9
    lottoMod = 10**6; //REMT9
    balanceOf[address(0)] = (10**9)*PPT;
    rise (msg.sender, lottoVal); //REMT9
  }

  function rise (address to, uint256 value)
  internal {
    move (address(0), to, value);
    totalSupply += value;
  }

  function nonced (uint nonce, uint mod)
  internal returns (bool checked) {
    checked = keygen (nonce, randomKey) % mod == randomKey % mod;
    if (checked) randomKey = numgen (nonce, randomKey);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

contract Remt is RemtBase {

  constructor () public {
    name = "ULTRA RARE MINEABLE TOKEN WITH NO GOVERNANCE V9";
    symbol = "REMT9";
  }

  function mine (uint nonce)
  checkTxGasPrice checkBalanceOf public returns (bool success) {
    if (now-STAGE > ANNSEC/2) {
      timeReward /= 2;
      STAGE = now;
    }
    if (blockPayouts[block.number] == 0) {
      if (nonced(nonce,basicRate)) {
        uint interval = now - rewardStamp;
        uint256 reward = timeReward * interval;
        blockPayouts[block.number] += reward;
        if (interval < rewardInterval) {
          rewardInterval *= 2;
          basicRate *= 10;
        }
        rewardStamp = now;
        rise (msg.sender, reward);
      }
      if (nonced(nonce,lottoMod)) {
        blockPayouts[block.number] += lottoVal;
        lottoMod *= 10;
        rise (msg.sender, lottoVal);
      }
    }
    return true;
  } //REMT9
}