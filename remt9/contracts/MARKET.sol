pragma solidity ^0.4.24;

import "./EXTEND.sol";

contract MARKET is EXTEND {

  mapping (uint => Market) public markets;
  struct Market { //V1>REMT9
    bool buytoken;
    address maker;
    uint256 value;
    uint256 ppe; }

  event Post (uint refno, bool indexed buy, address indexed maker, uint256 indexed ppe); //REMT9
  event Acquire (uint indexed refno, address indexed taker, uint256 value); //REMT9

  function post (uint refno, uint256 value, uint256 ppe) //REMT9
  checkBalanceOf public payable returns (bool success) {
    requireBalance (value);
    require (markets[refno].maker==0x0, "#refno");
    require (ppe>0&&ppe<totalSupply, "#rate");
    Market memory mi;
    mi.buytoken = ethered (value);
    mi.value = msg.value + value;
    mi.maker = msg.sender;
    mi.ppe = ppe;
    markets[refno] = mi;
    if (!mi.buytoken) move (msg.sender, address(this), value);
    emit Post (refno, mi.buytoken, mi.maker, mi.ppe);
    addNo ("post", refno); //V8
    return true;
  }

  function acquire (uint refno, uint256 value)
  checkTxGasPrice public payable returns (bool success) {
    bool buytoken = ethered (value);
    Market storage mi = markets[refno];
    require (mi.maker!=0x0, "#refno");
    require (mi.value>0&&mi.ppe>0, "#data");
    require (mi.buytoken==(!buytoken), "#request");
    uint256 pre = mi.value;
    uint256 remit;
    if (buytoken) {
      remit = msg.value*mi.ppe/PPT;
      require (remit>0&&remit<=mi.value, "#volume");
      move (address(this), msg.sender, remit);
      mi.maker.transfer (msg.value);
    } else {
      remit = value*PPT/mi.ppe;
      require (remit>0&&remit<=mi.value, "#volume");
      move (msg.sender, mi.maker, value);
      msg.sender.transfer (remit);
    }
    mi.value -= remit;
    assert (mi.value+remit == pre);
    emit Acquire (refno, msg.sender, remit);
    addNo ("acquire", refno); //V8
    return true;
  }
}