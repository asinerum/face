require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
const symbol = 'BTC';
const mainnet = 'bitcoin';
const wallet = 'litewallet.json';
console.log('');
console.log('Usage:');
console.log('');
console.log('node wopenlite.js --network [CRYPTO_NETWORK] --file [WALLET_JSON_FILE]');
console.log('');
console.log(`The CRYPTO_NETWORK default value is "${mainnet}"`);
console.log(`The WALLET_JSON_FILE default value is "${wallet}"`);
console.log('');
let network = miner.app.cliArgument('--network',mainnet).toLowerCase();
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
    miner.network.setSymb(symbol);
    var data = miner.bitcoin.account.openWallet2(result.password,file,network);
    if(!data)miner.die(miner.ui.FAILED);
    console.log(miner.ui.DONE,miner.ui.NEWLINE,data);
  }catch(e){miner.die(e)}
});