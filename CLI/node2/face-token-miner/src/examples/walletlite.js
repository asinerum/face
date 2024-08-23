require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
const symbol = 'BTC';
const mainnet = 'bitcoin';
const wallet = 'litewallet.json';
console.log('');
console.log('Usage:');
console.log('');
console.log('node walletlite.js --network [CRYPTO_NETWORK] --out [WALLET_JSON_FILE]');
console.log('');
console.log(`The CRYPTO_NETWORK default value is "${mainnet}"`);
console.log(`The WALLET_JSON_FILE default value is "${wallet}"`);
console.log('');
let network = miner.app.cliArgument('--network',mainnet).toLowerCase();
let out = miner.app.cliArgument('--out',wallet);
const password =
[
  {
    name: "password",
    description: miner.msg.hi_msg_newpwd,
    message: miner.msg.hi_prompt_chk,
    pattern: miner.ui.loRegex,
    required: true,
    hidden: true,
    replace: "*",
  },
];
const repeat =
[
  {
    name: "repeat",
    description: miner.msg.hi_msg_repeat,
    required: true,
    hidden: true,
    replace: "*",
  },
];
let pwd;
let pwd2;
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    pwd = result.password;
    prompt.get(repeat,function(err,result){
      if(err){return(console.log(err.toString()))}
      pwd2 = result.repeat;
      if(pwd2!==pwd)return(console.log(miner.ui.FAILED));
      miner.network.setSymb(symbol);
      miner.bitcoin.account.newAccSave2(pwd,out,network,
      function(data){
        if(data){
          console.log(data);
          console.log();
          console.log(`${miner.msg.hi_msg_dsaved}${miner.ui.SPACE}[${out}]`)
        }
      });
    });
  }catch(e){miner.die(e)}
});