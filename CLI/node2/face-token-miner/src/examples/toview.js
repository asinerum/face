require("dotenv").config();
const miner = require("face-token-miner");
const decimals = 6;
let token = process.argv[2];
token = token?token.toUpperCase():null;
if(!miner.asset.contracts[token]){
  console.log('');
  console.log('Usage:');
  console.log('');
  console.log('node toview.js <TOKEN> --id <DOC_ID>');
  console.log('');
  console.log('The TOKEN must be "GEMT9" or "NEMT9"');
  console.log('The DOC_ID must be an existing ask/bid ID number');
  console.log('');
  miner.exit.nocoin();
}
// Document ID/No
let refno = miner.app.cliArgument('--id','');
if(!refno.isNum())miner.exit.out('No valid document ID specified (must be an unsigned integer number)');
//
let symbol;
let buytoken;
try{
  console.log('');
  console.log(`Starting working on ${miner.network.getSymb()} Chain`);
  miner.token.start(token);
  (async()=>{
    await miner.token.call('symbol')
    .then(r=>{console.log('Token:',r);symbol=r;return(miner.token.call('totalSupply'))}).catch(e=>miner.die(e))
    .then(r=>{console.log('Supply:',miner.util.wt2s(r),symbol);return(miner.token.call('markets',refno))}).catch(e=>miner.die(e))
    .then(r=>{
      console.log('');
      if(r.maker==miner.ui.nillWallet)miner.exit.out(`Document with ID ${refno} does not exist on ${symbol} open market`);
      buytoken = r.buytoken;
      console.log('Document Type:',buytoken?`Bid (to buy ${symbol})`:`Ask (to sell ${symbol})`);
      console.log('Trader Address:',r.maker);
      console.log('Available Balance:',buytoken?miner.util.w2s(r.value):miner.util.wt2s(r.value),buytoken?miner.network.getSymb():symbol);
      console.log('Exchange Rate/Price:',miner.util.w2s(r.ppe),symbol,'per',miner.network.getSymb());
      console.log('Expiration Time:',r.time.gt(0)?miner.util.date(r.time):'NA');
    }).catch(e=>miner.die(e));
    console.log('');
  })();
}catch(e){miner.die(e)}