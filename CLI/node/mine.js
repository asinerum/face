/*

FACEs TOKEN AUTO MINER
@ASINERUM PROJECT TEAM

*Usage:

node mine.js <TOKEN_SYMBOL> --gas <GAS_LIMIT> --idle <TX_INTERVAL> --loop <TX_TIMES> --pass <SKIP_TIME>

*Examples:

node mine.js nemt9
node mine.js gemt9 --gas 400000 --idle 15 --loop 2 --pass 5

*Arguments:

TOKEN_SYMBOL: mandatory argument, currently must be “gemt9” or “nemt9”.
GAS_LIMIT: transaction gas limit (default “300000”, should be “400000” or a bit higher).
TX_INTERVAL: idle time (in minutes) between one mining transaction and the next (default “10”).
TX_TIMES: planned number of mining transactions to be executed (default “1000”).
SKIP_TIME (not adapted for NEMT9): least time (in minutes) between the latest successful mining and the current one (default “5”).

**/

require("./base.js");
const prompt = require("prompt");
let token = process.argv[2];
token = token?token.toUpperCase():null;
if(!contracts[token])_Exit(hi_msg_nocoin);
// Mining logs (not used)
let log = cliFlagArgv('-l');
let out = cliArgument('--out','log.txt');
// Idle time (in minutes) between mining transactions
let pause = cliArgument('--idle','10');
// Total planned number of mining transactions
let times = cliArgument('--loop','1000');
// Least time (in minutes) since the latest mining transaction
let mskip = cliArgument('--pass','3');
// Gas limit per mining transaction
let gas = cliArgument('--gas',maxgas);
// Gas price (in Gwei)
let gwei = cliArgument('--gwei',txgwei);
//
pause = s2n(pause);
times = s2n(times);
mskip = s2n(mskip);
gas = s2n(gas);
gwei = s2n(gwei);
txgwei = gwei;
//
const password =
[
  {
    name: "password",
    description: hi_msg_oldpwd,
    required: true,
    hidden: true,
    replace: "*",
  },
];
const confirm =
[
  {
    name: "confirm",
    description: hi_msg_comeon,
    required: true,
  },
];
let pwd;
let cfm;
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    pwd = result.password;
    let open = yourWallet(pwd,true);
    if(!open)_Exit(CANCELED);
    startXutengFemt(gas,token);
    (async()=>{
      await ercFuncCall('symbol')
      .then(r=>{console.log('Token:',r);return(ercFuncCall('totalSupply'))})
      .then(r=>{console.log('Supply:',w2s(r));return(ercFuncCall('basicRate'))})
      .then(r=>{console.log('Mine Depth:',num(r));console.log(NEWLINE);return(sender)})
      .then(r=>{console.log('Address:',r);return(ercFuncCall('balanceOf',xutengFemt,sender))})
      .then(r=>{console.log(`${token} Balance:`,w2s(r));return(web3.eth.getBalance(sender))})
      .then(r=>{console.log(`${COIN} Balance:`,w2s(r));return(NEWLINE)})
      .then(console.log);
      prompt.get(confirm,function(err,result){
        cfm = result.confirm;
        if(!cfm.as('Y'))_Exit(CANCELED);
        faceAutoMine(pause,times,mskip);
      });
    })();
  }catch(err){return(console.log(err.toString()))}
});