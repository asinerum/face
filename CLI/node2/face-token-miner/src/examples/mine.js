require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
let token = process.argv[2];
token = token?token.toUpperCase():null;
if(!miner.asset.contracts[token]){
  console.log('');
  console.log('Usage:');
  console.log('');
  console.log('node mine.js <TOKEN> [ARGUMENTS]');
  console.log('');
  console.log('The TOKEN must be "GEMT9" or "NEMT9"');
  console.log('');
  console.log('The optional ARGUMENTS are:');
  console.log('');
  console.log('--idle <number>: idle time (in minutes) between one mining transaction and the next');
  console.log('--loop <number>: planned number of mining transactions to be executed');
  console.log('--pass <number>: least time (in minutes) between the latest successful mining and the current one');
  console.log('--gwei <number>: transaction GAS_PRICE in Gwein, default value is',miner.chain.txgwei);
  console.log('--gas <number>: transaction GAS_LIMIT, default value is',miner.chain.maxgas);
  console.log('--wallet <string>: path to WALLET_JSON_FILE, where encrypted key is stored');
  console.log('');
  miner.exit.nocoin();
}
// Mining logs (not used so far)
let log = miner.app.cliFlagArgv('-l');
let out = miner.app.cliArgument('--out','log.txt');
// Idle time (in minutes) between mining transactions
let pause = miner.app.cliArgument('--idle','10');
// Total planned number of mining transactions
let times = miner.app.cliArgument('--loop','1000');
// Least time (in minutes) since the latest mining transaction
let mskip = miner.app.cliArgument('--pass','3');
// Gas limit per mining transaction
let gas = miner.app.cliArgument('--gas',miner.chain.maxgas);
// Gas price (in Gwei)
let gwei = miner.app.cliArgument('--gwei',miner.chain.txgwei);
// Wallet JSON file path where Private Key is stored
// This argument is optional
let wallet = miner.app.cliArgument('--wallet','');
//
pause = miner.util.s2n(pause);
times = miner.util.s2n(times);
mskip = miner.util.s2n(mskip);
gas = miner.util.s2n(gas);
gwei = miner.util.s2n(gwei);
miner.network.setGwei(gwei);
//
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
const confirm =
[
  {
    name: "confirm",
    description: miner.msg.hi_msg_comeon,
    required: true,
  },
];
let pwd;
let cfm;
let symbol;
let coin_balance;
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    pwd = result.password;
    let open;
    if(wallet){
      open = miner.account.openWallet(pwd,wallet);
    }else{
      open = miner.account.yourWallet(pwd,true);
    }
    if(!open)miner.exit.cancel();
    console.log(`Starting working on ${miner.network.getSymb()} Chain`);
    miner.token.faceConnect(gas,token);
    (async()=>{
      await miner.token.call('symbol')
      .then(r=>{console.log('Token:',r);symbol=r;return(miner.token.call('totalSupply'))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Supply:',miner.util.wt2s(r),symbol);return(miner.token.call('basicRate'))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Mine Depth:',miner.util.num(r));console.log('');return(miner.user.address())}).catch(e=>miner.die(e))
      .then(r=>{console.log('Address:',r);return(miner.token.call('balanceOf',miner.user.address()))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Token Balance:',miner.util.wt2s(r),symbol);return(miner.user.getCoin(miner.user.address()))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Native Coin Balance:',miner.util.w2s(r),miner.network.getSymb());coin_balance=r;return('')}).catch(e=>miner.die(e))
      .then(console.log);
      if(coin_balance.eq(0)){
        miner.exit.out('App Error: user wallet has no native coins to send transactions');
      }
      prompt.get(confirm,function(err,result){
        cfm = result.confirm;
        if(!cfm.as('Y'))miner.exit.cancel();
        miner.token.faceAutoMine(pause,times,mskip);
      });
    })();
  }catch(e){miner.die(e)}
});