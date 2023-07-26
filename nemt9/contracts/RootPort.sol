pragma solidity ^0.4.24;

import "./Root.sol";

contract RootPort is Root {
  mapping (uint => Offer) public offers;
  struct Offer {
    bool eth;
    bool bid;
    uint open;
    uint close;
    uint stock;
    address maker;
    address taker;
    uint256 price;
    uint256 value; //<fund>
    string name; }

  mapping (uint => Play) public games;
  struct Play {
    bool eth;
    uint close;
    address maker;
    uint256 value; //<fund>
    uint[3] pcts;
    uint result;
    string name; }

  mapping (uint => Safe) public saves;
  struct Safe {
    bool eth;
    uint open;
    address maker;
    address taker;
    uint256 value; }

  event Sell (uint refno, bool ETH, address indexed maker, uint indexed close, uint256 price, string name);
  event Game (uint refno, bool ETH, address indexed maker, uint indexed close, string name);
  event Save (uint refno, bool ETH, address indexed maker, address indexed taker);
  event Buy (uint indexed refno, address indexed taker, uint256 value); //<Sell>
  event Bid (uint indexed refno, address indexed taker, uint256 value); //<Sell>
  event Win (uint indexed refno, address indexed taker, uint256 value); //<Sell>
  event Bet (uint indexed refno, address indexed taker, uint256 value, uint indexed bet);
  event Re (bytes32 indexed hash, bool ETH, address indexed maker, address taker, uint256 value);

  function re (bytes32 hash, address to, uint256 value) public payable returns (bool success) {
    bool eth = ethered (value);
    if (eth) to.transfer (msg.value);
    else move (msg.sender, to, value);
    emit Re (hash, eth, msg.sender, to, msg.value+value);
    return true;
  }

  function offer (uint refno, bool bid, uint open, uint close, uint stock, uint256 price, uint256 value, string name, string note) public payable returns (bool success) {
    if (open<now) open=now+3600;
    if (close<open) close=open+86400;
    require (offers[refno].maker==0x0, "#refno");
    note = "";
    Offer memory oi;
    oi.eth = ethered (value);
    oi.bid = bid;
    oi.open = open;
    oi.close = close;
    oi.stock = stock;
    oi.price = price;
    oi.maker = msg.sender;
    oi.value = msg.value+value;
    oi.name = name;
    offers[refno] = oi;
    if (!oi.eth) move (msg.sender, address(this), value);
    emit Sell (refno, oi.eth, oi.maker, oi.close, oi.price, oi.name);
    addNo ("offer", refno); //V8
    return true;
  }

  function reoffer (uint refno, uint restock) public returns (bool success) {
    Offer storage oi = offers[refno];
    require (oi.value>0, "#data");
    require (oi.close>now, "#time");
    require (oi.maker==msg.sender, "#user");
    require (!oi.bid, "#request");
    oi.stock = restock;
    return true;
  }

  function unoffer (uint refno) public returns (bool success) {
    Offer storage oi = offers[refno];
    require (oi.value>0, "#data");
    require (oi.open>now||oi.close+3*86400<now, "#time");
    require (oi.maker==msg.sender, "#user");
    if (oi.eth) oi.maker.transfer (oi.value);
    else move (address(this), oi.maker, oi.value);
    oi.value = 0;
    return true;
  }

  function order (uint refno, uint256 value, string note) public payable returns (bool success) {
    bool eth = ethered (value);
    uint256 amount = msg.value+value;
    Offer storage oi = offers[refno];
    require (oi.eth==eth, "#request");
    require (!oi.bid, "#offer");
    require (oi.value>0, "#data");
    require (oi.open<now&&oi.close>now, "#time");
    require (oi.price>0&&oi.price<=amount, "#price");
    uint qty = amount/oi.price;
    require (oi.stock>=qty, "#stock");
    uint256 changes = amount-qty*oi.price;
    oi.stock -= qty;
    note = "";
    if (eth) {
      oi.maker.transfer (msg.value-changes);
      if (changes>0) msg.sender.transfer (changes);
    } else move (msg.sender, oi.maker, value-changes);
    emit Buy (refno, msg.sender, amount-changes);
    addNo ("order", refno); //V8
    return true;
  }

  function bid (uint refno, uint256 value) public payable returns (bool success) {
    bool eth = ethered (value);
    uint256 amount = msg.value+value;
    Offer storage oi = offers[refno];
    require (oi.bid, "#offer");
    require (oi.value>0, "#data");
    require (oi.price<=amount, "#price");
    if (oi.price<amount) {
      require (oi.open<now&&oi.close>now, "#time");
      oi.taker = msg.sender;
      oi.price = amount;
      emit Bid (refno, msg.sender, amount);
    } else {
      require (oi.close<now, "#status");
      require (oi.eth==eth, "#request");
      require (oi.taker==msg.sender, "#winner");
      if (oi.eth) {
        oi.maker.transfer (oi.value+msg.value);
      } else {
        move (address(this), oi.maker, oi.value);
        move (msg.sender, oi.maker, value);
      }
      oi.value = 0;
      emit Win (refno, msg.sender, amount);
    }
    addNo ("bid", refno); //V8
    return true;
  }

  function game (uint refno, uint close, uint256 value, uint[3] pcts, string name, string note) public payable returns (bool success) {
    if (close<now) close=now+86400;
    require (games[refno].maker==0x0, "#refno");
    note = "";
    Play memory pi;
    pi.eth = ethered (value);
    pi.close = close;
    pi.maker = msg.sender;
    pi.value = msg.value+value;
    pi.pcts = pcts;
    pi.name = name;
    games[refno] = pi;
    if (!pi.eth) move (msg.sender, address(this), value);
    emit Game (refno, pi.eth, pi.maker, pi.close, pi.name);
    addNo ("game", refno); //V8
    return true;
  }

  function GAME (uint refno) public view returns (uint[3] pcts) {
    return games[refno].pcts;
  }

  function regame (uint refno, uint[3] pcts) public returns (bool success) {
    Play storage pi = games[refno];
    require (pi.value>0, "#data");
    require (pi.close>now, "#time");
    require (pi.maker==msg.sender, "#user");
    pi.pcts = pcts;
    return true;
  }

  function ungame (uint refno, uint result) public returns (bool success) {
    require (result<3, "#option");
    Play storage pi = games[refno];
    require (pi.close<now, "#time");
    require (pi.maker==msg.sender, "#user");
    pi.result = result;
    if (pi.value>0) {
      if (pi.eth) pi.maker.transfer (pi.value);
      else move (address(this), pi.maker, pi.value);
      pi.value = 0;
    }
    return true;
  }

  function play (uint refno, uint bet, uint256 value) public payable returns (bool success) {
    require (bet<3, "#option");
    bool eth = ethered (value);
    uint256 amount = msg.value+value;
    Play storage pi = games[refno];
    require (pi.eth==eth, "#request");
    require (pi.value>0, "#data");
    require (pi.close>now, "#time");
    if (!pi.eth) move (msg.sender, address(this), value);
    pi.value += amount;
    emit Bet (refno, msg.sender, amount, bet);
    addNo ("play", refno); //V8
    return true;
  }

  function save (uint refno, uint open, address taker, uint256 value, string note) public payable returns (bool success) {
    if (open<now) open=now+30*86400;
    require (saves[refno].maker==0x0, "#refno");
    note = "";
    Safe memory si;
    si.eth = ethered (value);
    si.open = open;
    si.maker = msg.sender;
    si.taker = taker;
    si.value = msg.value+value;
    saves[refno] = si;
    if (!si.eth) move (msg.sender, address(this), value);
    emit Save (refno, si.eth, si.maker, si.taker);
    addNo ("save", refno); //V8
    return true;
  }

  function unsave (uint refno, uint256 value) public returns (bool success) {
    Safe storage si = saves[refno];
    if (value==0) value = si.value;
    require (si.value>=value&&value>0, "#amount");
    require (si.taker==msg.sender, "#user");
    require (si.open<now, "#time");
    if (si.eth) si.taker.transfer (value);
    else move (address(this), si.taker, value);
    si.value -= value;
    return true;
  }
}