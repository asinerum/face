require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
const decimals = 6;
let token = process.argv[2];
token = token?token.toUpperCase():null;
if(!miner.asset.contracts[token]){
  console.log('');
  console.log('Usage:');
  console.log('');
  console.log('node tobid.js <TOKEN> --id <BID_ID> --volume <BID_VOLUME> --price <TOKEN_PRICE> [ARGUMENTS]');
  console.log('');
  console.log('The TOKEN must be "GEMT9" or "NEMT9"');
  console.log('');
  console.log('The mandatory parameters are:');
  console.log('');
  console.log('BID_ID (number): unique number ID of the TOKEN\'s bid');
  console.log('BID_VOLUME (number): total volume of the TOKEN\'s bid');
  console.log('TOKEN_PRICE (number): bid rate as amount of TOKENs per 1',miner.network.getSymb());
  console.log('');
  console.log('The optional ARGUMENTS are:');
  console.log('');
  console.log('--exp <date>: bypass this UTC_EXPIRATION_TIME if not strictly specified');
  console.log('--gas <number>: transaction GAS_LIMIT, default value is',miner.chain.maxgas);
  console.log('--wallet <string>: path to WALLET_JSON_FILE, where encrypted key is stored');
  console.log('');
  miner.exit.nocoin();
}
// Token bid ID/No
let refno = miner.app.cliArgument('--id','');
if(!refno.isNum())miner.exit.out('No valid bid ID specified (must be an unsigned integer number)');
// Token bid volume
let amount = miner.app.cliArgument('--volume','');
amount = miner.util.s2n(amount);
if(amount<=0)miner.exit.out('No valid bid volume specified (must be a positive number)');
// Token bid price (bid-rate)
let price = miner.app.cliArgument('--price','');
price = miner.util.s2n(price);
if(price<=0)miner.exit.out('No valid bid rate specified (must be a positive number)');
// Bid UTC expiration time
let time = miner.util.time(miner.app.cliArgument('--exp','?'));
if(time===0)console.log('No expiration time specified, using none');
// Gas limit per transaction
let gas = miner.app.cliArgument('--gas',miner.network.maxgas());
gas = miner.util.s2n(gas);
// Wallet JSON file path where Private Key is stored
// This argument is optional
let wallet = miner.app.cliArgument('--wallet','');
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
    let token_supply;
    let token_balance;
    let coin_deposit;
    let reference;
    console.log(`Starting working on ${miner.network.getSymb()} Chain`);
    miner.token.faceConnect(gas,token);
    (async()=>{
      await miner.token.call('symbol')
      .then(r=>{console.log('Token:',r);symbol=r;return(miner.token.call('totalSupply'))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Supply:',miner.util.wt2s(r),symbol);token_supply=r;return(miner.token.call('markets',refno))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Reference:',r.maker,'\n');reference=r.maker;return(miner.user.address())}).catch(e=>miner.die(e))
      .then(r=>{console.log('User Address:',r);return(miner.token.call('balanceOf',miner.user.address()))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Token Balance:',miner.util.wt2s(r),symbol);token_balance=r;return(miner.user.getCoin(miner.user.address()))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Native Coin Balance:',miner.util.w2s(r),miner.network.getSymb());coin_balance=r;return('')}).catch(e=>miner.die(e))
      .then(console.log);
      coin_deposit = (amount/price).fix(decimals);
      console.log('Bid ID:',refno);
      console.log('Bid Volume:',miner.util.n2s(amount,decimals),symbol);
      console.log('Bid Rate/Price:',miner.util.n2s(price,decimals),symbol,'per',miner.network.getSymb());
      console.log('Deposit Amount:',miner.util.n2s(coin_deposit,8),miner.network.getSymb());
      if(time>0){
        console.log('Bid Expiration Date:',miner.util.date(time));
      }
      console.log('');
      if(reference!=miner.ui.nillWallet){
        miner.exit.out('Input Error: unacceptable bid number');
      }
      if(time>0&&time<miner.util.now()){
        miner.exit.out('Input Error: unacceptable expiration date');
      }
      if(coin_balance.eq(0)){
        miner.exit.out('App Error: user wallet has no native coins to send transactions');
      }
      if(coin_balance.lt(miner.util.s2w(coin_deposit))){
        miner.exit.out('Input Error: buyer insufficient balance');
      }
      prompt.get(confirm,function(err,result){
        cfm = result.confirm;
        if(!cfm.as('Y'))miner.exit.cancel();
        miner.token.faceBid(refno,coin_deposit,price,console.log,time);
      });
    })();
  }catch(e){miner.die(e)}
});