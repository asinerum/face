require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
const symbol = 'BTC';
const wallet = 'bitwallet.json';
console.log('');
console.log('Usage:');
console.log('');
console.log('node wopenbit.js --asset [CRYPTO_SYMBOL] --file [WALLET_JSON_FILE]');
console.log('');
console.log(`The CRYPTO_SYMBOL default value is "${symbol}"`);
console.log(`The WALLET_JSON_FILE default value is "${wallet}"`);
console.log('');
let asset = miner.app.cliArgument('--asset',symbol);
let file = miner.app.cliArgument('--file',wallet);
const password =
[
  {
    name: "password",
    description: miner.msg.hi_msg_oldpwd,
    required: true,
    hidden: true,
    replace: "*",
  },
];
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    miner.network.setSymb(asset);
    miner.bitcoin.account.openWallet(result.password,file)
    .then(account=>{
      if(!account)miner.die(miner.ui.FAILED);
      console.log(miner.ui.DONE,miner.ui.NEWLINE,account.address);
    });
  }catch(e){miner.die(e)}
});