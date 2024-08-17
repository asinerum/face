require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
const wallet = 'tonwallet.json';
console.log('');
console.log('Usage:');
console.log('');
console.log('node wopenton.js --file [WALLET_JSON_FILE]');
console.log('');
console.log(`The WALLET_JSON_FILE default value is "${wallet}"`);
console.log('');
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
    let account = miner.toncoin.account.openWallet(result.password,file);
    if(!account)return(console.log(miner.ui.FAILED));
    console.log(miner.ui.DONE,miner.ui.NEWLINE,account.address);
  }catch(e){miner.die(e)}
});