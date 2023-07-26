pragma solidity ^0.4.24;

import "./Root.sol";

contract RootPlan is Root {
  mapping (uint => Case) public deposits;
  struct Case {
    bool eth;
    address maker;
    address taker;
    uint256 value; }

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

  event Bank (uint refno, bool indexed ETH, address indexed maker, address indexed taker, uint256 value);
  event Pay (bytes32 ref, bool indexed ETH, address indexed maker, address indexed taker, uint256 value);
  event Plan (uint refno, address indexed maker, uint indexed petri, uint indexed open);
  event Put (uint indexed refno, address indexed taker, uint256 value);

  function pay (bytes32 ref, address to, uint256 value, string note) public payable returns (bool success) {
    note = "";
    bool eth = ethered (value);
    if (eth) to.transfer (msg.value);
    else move (msg.sender, to, value);
    emit Pay (ref, eth, msg.sender, to, msg.value+value);
    return true;
  }

  function deposit (uint refno, address to, uint256 value) public payable returns (bool success) {
    require (deposits[refno].maker==0x0, "#refno");
    Case memory ci;
    ci.eth = ethered (value);
    ci.maker = msg.sender;
    ci.taker = to;
    ci.value = msg.value+value;
    deposits[refno] = ci;
    if (!ci.eth) move (msg.sender, address(this), value);
    emit Bank (refno, ci.eth, ci.maker, ci.taker, ci.value);
    addNo ("deposit", refno); //V8
    return true;
  }

  function release (uint refno, bool cancel) public returns (bool success) {
    Case storage ci = deposits[refno];
    require (ci.value>0, "#data");
    address to;
    if (!cancel && msg.sender==ci.maker) {
      to = ci.taker;
    } else if (cancel && msg.sender==ci.taker) {
      to = ci.maker;
    } else {
      revert("#user");
    }
    if (ci.eth) to.transfer (ci.value);
    else move (address(this), to, ci.value);
    ci.value = 0;
    return true;
  }

  function program (uint refno, uint petri, uint256 value) public payable returns (bool success) {
    require (programs[refno].maker==0x0, "#refno");
    require (petri>0&&petri<100000, "#rate"); //V8
    Program memory pi;
    pi.eth = ethered (value);
    pi.maker = msg.sender;
    pi.value = msg.value+value;
    pi.petri = petri;
    pi.open = now;
    programs[refno] = pi;
    if (!pi.eth) move (msg.sender, address(this), value);
    emit Plan (refno, pi.maker, pi.petri, pi.open);
    addNo ("program", refno); //V8
    return true;
  }

  function close (uint refno, bool half) public returns (bool success) {
    Program storage pi = programs[refno];
    require (pi.value>0, "#data");
    require (pi.maker==msg.sender, "#user");
    uint256 draw = half?pi.value/2:pi.value;
    if (pi.eth) pi.maker.transfer (draw);
    else move (address(this), pi.maker, draw);
    pi.value -= draw;
    return true;
  }

  function invest (uint refno, uint256 value) public payable returns (bool success) {
    require (invests[refno][msg.sender].start==0, "#invest");
    Program storage pi = programs[refno];
    Invest memory ii;
    bool eth = ethered (value);
    require (pi.value>0, "#data");
    require (pi.eth==eth, "#request");
    ii.start = now;
    ii.amount = msg.value+value;
    invests[refno][msg.sender] = ii;
    if (!pi.eth) move (msg.sender, address(this), value);
    pi.value += ii.amount;
    emit Put (refno, msg.sender, ii.amount);
    addNo ("invest", refno); //V8
    return true;
  }

  function withdraw (uint refno) public returns (bool success) {
    Program storage pi = programs[refno];
    Invest storage ii = invests[refno][msg.sender];
    uint256 cap = ii.amount+(ii.amount*pi.petri/10**9)*(now-ii.start);
    require (cap>0&&cap<pi.value, "#fund");
    if (pi.eth) msg.sender.transfer (cap);
    else move (address(this), msg.sender, cap);
    pi.value -= cap;
    ii.amount = 0;
    ii.start = 0;
    return true;
  }
}