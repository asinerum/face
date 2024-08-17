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
  console.log('node tosell.js <TOKEN> --id <BID_ID> --tokens <TOKEN_AMOUNT> [ARGUMENTS]');
  console.log('');
  console.log('The TOKEN must be "GEMT9" or "NEMT9"');
  console.log('');
  console.log('The mandatory parameters are:');
  console.log('');
  console.log('BID_ID (number): ID of the TOKEN buyer\'s bid');
  console.log('TOKEN_AMOUNT (number): amount of TOKENs to sell');
  console.log('');
  console.log('The optional ARGUMENTS are:');
  console.log('');
  console.log('--gas <number>: transaction GAS_LIMIT, default value is',miner.chain.maxgas);
  console.log('--wallet <string>: path to WALLET_JSON_FILE, where encrypted key is stored');
  console.log('');
  miner.exit.nocoin();
}
// Token bid ID/No
let refno = miner.app.cliArgument('--id','');
if(!refno.isNum())miner.exit.out('Input Error: no valid bid ID specified (as an unsigned integer number)');
// Token amount
let amount = miner.app.cliArgument('--tokens','');
amount = miner.util.s2n(amount);
if(amount<=0)miner.exit.out('Input Error: no valid token amount specified (as a positive number)');
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
    let coin_to_get;
    let buytoken;
    let trader;
    let trade_balance;
    let price;
    let time;
    console.log(`Starting working on ${miner.network.getSymb()} Chain`);
    miner.token.faceConnect(gas,token);
    (async()=>{
      await miner.token.call('symbol')
      .then(r=>{console.log('Token:',r);symbol=r;return(miner.token.call('totalSupply'))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Supply:',miner.util.wt2s(r),symbol);token_supply=r;return(miner.token.call('markets',refno))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Buyer/Trader Reference:',r.maker,'\n');
        buytoken = r.buytoken;
        trader = r.maker;
        trade_balance = r.value;
        price = r.ppe;
        time = r.time;
        if(trader==miner.ui.nillWallet){
          miner.exit.out('App Error: trade item does not exist');
        }
        if(!buytoken){
          miner.exit.out('App Error: trade item is not a bid');
        }
        coin_to_get = (amount/miner.util.w2n(price)).fix(18);
        return(miner.user.address())}).catch(e=>miner.die(e))
      .then(r=>{console.log('User Address:',r);return(miner.token.call('balanceOf',miner.user.address()))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Token Balance:',miner.util.wt2s(r),symbol);token_balance=r;return(miner.user.getCoin(miner.user.address()))}).catch(e=>miner.die(e))
      .then(r=>{console.log('Native Coin Balance:',miner.util.w2s(r),miner.network.getSymb());coin_balance=r;return('')}).catch(e=>miner.die(e))
      .then(console.log);
      console.log('Bid ID:',refno);
      console.log('Bid Balance:',miner.util.w2s(trade_balance,decimals),miner.network.getSymb());
      console.log('Bid Rate/Price:',miner.util.w2s(price,decimals),symbol,'per',miner.network.getSymb());
      console.log('Token Amount To Sell:',miner.util.n2s(amount,8),symbol);
      console.log('Native Coin To Receive:',miner.util.n2s(coin_to_get,decimals),miner.network.getSymb());
      console.log('Expiration Time:',time.gt(0)?miner.util.date(time):'NA');
      console.log('');
      if(time>0&&time<miner.util.now()){
        miner.exit.out('App Error: bid expired');
      }
      if(token_balance.lt(miner.util.s2wt(amount))){
        miner.exit.out('App Error: user token balance not enough');
      }
      if(trade_balance.lt(miner.util.s2w(coin_to_get))){
        miner.exit.out('App Error: bid balance not enough');
      }
      if(coin_balance.eq(0)){
        miner.exit.out('App Error: user wallet has no native coins to send transactions');
      }
      prompt.get(confirm,function(err,result){
        cfm = result.confirm;
        if(!cfm.as('Y'))miner.exit.cancel();
        miner.token.send('acquire',0,refno,miner.util.s2wt(amount))
        .then(console.log)
        .catch(e=>miner.die(e));
      });
    })();
  }catch(e){miner.die(e)}
});