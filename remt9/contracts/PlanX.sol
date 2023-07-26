pragma solidity ^0.4.24;

import "./MARKET.sol";

contract PlanX is MARKET {

  mapping (uint => Program) public programs;
  struct Program {
    bool eth;
    address maker;
    uint256 value;
    uint petri;
    uint open; }

  mapping (uint => mapping (address => Invest)) public invests;
  struct Invest {
    uint256 amount;
    uint start; }

  uint public constant MAXPETRI = 10**9; //REMT9

  event Programing (uint refno, address indexed maker, uint indexed petri, uint indexed open); //REMT9
  event Investing (uint indexed refno, address indexed taker, uint256 value); //REMT9

  event Close (uint refno, address indexed closer, uint256 value); //REMT9
  event Withdraw (uint refno, address indexed drawer, uint256 value); //REMT9

  function program (uint refno, uint petri, uint256 value)
  checkBalanceOf public payable returns (bool success) {
    requireBalance (value);
    require (programs[refno].maker==0x0, "#refno");
    require (petri>0&&petri<MAXPETRI, "#rate"); //REMT9
    Program memory pi;
    pi.eth = ethered (value);
    pi.maker = msg.sender;
    pi.value = msg.value + value;
    pi.petri = petri;
    pi.open = now;
    programs[refno] = pi;
    if (!pi.eth) move (msg.sender, address(this), value);
    emit Programing (refno, pi.maker, pi.petri, pi.open);
    addNo ("program", refno);
    return true;
  } //REMT9

  function close (uint refno)
  checkTxGasPrice checkBalanceOf public returns (bool success) {
    Program storage pi = programs[refno];
    require (pi.value>0, "#data");
    require (pi.maker==msg.sender, "#user");
    uint256 draw = pi.value/2; //REMT9
    if (pi.eth) pi.maker.transfer (draw);
    else move (address(this), pi.maker, draw);
    pi.value -= draw;
    emit Close (refno, msg.sender, draw);
    return true;
  } //REMT9

  function invest (uint refno, uint256 value)
  checkTxGasPrice public payable returns (bool success) {
    require (invests[refno][msg.sender].start==0, "#invest");
    Program storage pi = programs[refno];
    Invest memory ii;
    bool eth = ethered (value);
    require (pi.value>0, "#data");
    require (pi.eth==eth, "#request");
    ii.start = now;
    ii.amount = msg.value + value;
    invests[refno][msg.sender] = ii;
    if (!pi.eth) move (msg.sender, address(this), value);
    pi.value += ii.amount;
    emit Investing (refno, msg.sender, ii.amount);
    addNo ("invest", refno);
    return true;
  }

  function withdraw (uint refno)
  checkTxGasPrice public returns (bool success) {
    Program storage pi = programs[refno];
    Invest storage ii = invests[refno][msg.sender];
    uint256 cap = ii.amount+(ii.amount*pi.petri/10**9)*(now-ii.start); //REMT9
    require (cap>0&&cap<pi.value, "#fund");
    if (pi.eth) msg.sender.transfer (cap);
    else move (address(this), msg.sender, cap);
    pi.value -= cap;
    ii.amount = 0;
    ii.start = 0;
    emit Withdraw (refno, msg.sender, cap);
    return true;
  }
}