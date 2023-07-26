pragma solidity ^0.4.24;

contract KEY {

  function b2i (bytes32 bstr) public pure returns (uint num) {
    for (uint index=0; index<bstr.length; index++) {
      num += uint(bstr[index])*(16**(index*2)+1);
    }
  }

  function keygen (uint nonce, uint key) public view returns (uint num) {
    num = b2i (keccak256 (abi.encodePacked (uint256(uint160(address(msg.sender))), key, nonce))); //V6
  } //REMT9

  function numgen (uint nonce, uint key) public view returns (uint num) {
    num = b2i (keccak256 (abi.encodePacked (key, nonce, block.number, blockhash(block.number-1), block.coinbase, msg.sender, gasleft(), now)));
  }
}