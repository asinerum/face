pragma solidity ^0.4.24;

contract Root {
  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public totalSupply;
  mapping (address => uint256) public balanceOf;
  mapping (address => mapping (address => uint256)) public allowance; //V2

  string public author;
  uint256 internal PPT;

  mapping (address => mapping (bytes32 => uint[])) public refnosOf; //V9

  mapping (uint => Market) public markets;
  struct Market {
    bool buytoken;
    address maker;
    uint256 value;
    uint256 ppe;
    uint time; }

  uint constant NOS = 25; //V9

  event Transfer (address indexed fromAddress, address indexed toAddress, uint256 txPenny);
  event Approval (address indexed ownerAddress, address indexed spenderAddress, uint256 txPenny); //V2
  event Sale (uint refno, bool indexed buy, address indexed maker, uint256 indexed ppe, uint time);
  event Get (uint indexed refno, address indexed taker, uint256 value); //<Sale>

  constructor () public {
    decimals = 18;
    PPT = 10**uint256(decimals);
  }

  function ethered (uint256 value)
  internal view returns (bool) {
    require (msg.value*value==0&&msg.value+value>0, "#values");
    require (value<=totalSupply, "#value");
    return msg.value>0?true:false;
  }

  function addNo (string key, uint refno)
  internal {
    require (refno>0);
    bytes32 pid = keccak256(abi.encodePacked(key,msg.value>0?"E":"T"));
    refnosOf[msg.sender][pid].push(refno);
    refnosOf[0x0][pid].push(refno);
  } //V8&9

  function move (address from, address to, uint256 value)
  internal {
    require (value<=balanceOf[from]);
    require (balanceOf[to]+value>balanceOf[to]);
    uint256 sum = balanceOf[from]+balanceOf[to];
    balanceOf[from] -= value;
    balanceOf[to] += value;
    assert (balanceOf[from]+balanceOf[to]==sum);
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

  function post (uint refno, uint256 value, uint256 ppe, uint time) public payable returns (bool success) {
    require (markets[refno].maker==0x0, "#refno");
    require (ppe>0&&ppe<totalSupply, "#rate");
    require (time==0||time>now, "#time");
    Market memory mi;
    mi.buytoken = ethered (value);
    mi.value = msg.value+value;
    mi.maker = msg.sender;
    mi.time = time;
    mi.ppe = ppe;
    markets[refno] = mi;
    if (!mi.buytoken) move (msg.sender, address(this), value);
    emit Sale (refno, mi.buytoken, mi.maker, mi.ppe, mi.time);
    addNo ("post", refno); //V8
    return true;
  }

  function unpost (uint refno) public returns (bool success) {
    Market storage mi = markets[refno];
    require (mi.value>0, "#data");
    require (mi.maker==msg.sender, "#user");
    require (mi.time==0||mi.time<now, "#time");
    if (mi.buytoken) mi.maker.transfer (mi.value);
    else move (address(this), mi.maker, mi.value);
    mi.value = 0;
    return true;
  }

  function acquire (uint refno, uint256 value) public payable returns (bool success) {
    bool buytoken = ethered (value);
    Market storage mi = markets[refno];
    require (mi.maker!=0x0, "#refno");
    require (mi.value>0&&mi.ppe>0, "#data");
    require (mi.time==0||mi.time>=now, "#time");
    require (mi.buytoken==!buytoken, "#request");
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
    assert (mi.value+remit==pre);
    emit Get (refno, msg.sender, remit);
    addNo ("acquire", refno); //V8
    return true;
  }

  function b2i (bytes32 bstr)
  internal pure returns (uint num) {
    for (uint index=0; index<bstr.length; index++) {
      num += uint(bstr[index])*(16**(index*2)+1);
    }
  }

  function keygen (uint nonce, uint key, uint256 uai) public pure returns (uint num) {
    num = b2i (keccak256 (abi.encodePacked (uai, key, nonce))); //V6
  }

  function keygen (uint nonce, uint key)
  internal view returns (uint num) {
    num = keygen (nonce, key, uint256(uint160 (address (msg.sender)))); //V6
  }

  function numgen (uint nonce, uint key)
  internal view returns (uint num) {
    num = b2i (keccak256 (abi.encodePacked (key, nonce, block.number, blockhash(block.number-1), block.coinbase, msg.sender, gasleft(), now)));
  }

  function refnos (address ua, string key, string form, uint skip) public view returns (uint size, uint[NOS] nos) {
    uint[] memory therefno = refnosOf[ua][keccak256(abi.encodePacked(key,form))];
    size = therefno.length;
    if (size<=skip) return;
    uint start = size-skip;
    start = start>NOS ? start-NOS : 0;
    for (uint i=0; i<NOS && start+i<size-skip; i++) {
      nos[i] = therefno[start+i];
    }
  } //V8&9
}