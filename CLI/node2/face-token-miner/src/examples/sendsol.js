require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
const COIN = "SOL";
// Coin/Token recipient address
let recipient = miner.app.cliArgument('--to','');
if(!miner.solana.util.isAddress(recipient)){
  console.log('');
  console.log('Usage:');
  console.log('');
  console.log('node sendsol.js --to <RECIPIENT_ADDRESS> --amount <SENDING_AMOUNT> [ARGUMENTS]');
  console.log('');
  console.log('The RECIPIENT_ADDRESS:address and SENDING_AMOUNT:number are mandatory');
  console.log('');
  console.log('The optional ARGUMENTS are:');
  console.log('');
  console.log('--token <address>: bypass this TOKEN_ADDRESS on native coin sending');
  console.log('--wallet <string>: path to WALLET_JSON_FILE, where encrypted key is stored');
  console.log('');
  miner.exit.out('No recipient specified');
}
// Coin/Token sending amount
let amount = miner.app.cliArgument('--amount','0');
if(!Number(amount))miner.exit.out('No sending amount specified');
// Token smart contract address
let token = miner.app.cliArgument('--token','');
if(token&&!miner.solana.util.isAddress(token))miner.exit.out('No valid token specified');
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
let decimals;
let coin_balance;
let token_balance;
let token_supply;
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    pwd = result.password;
    let open;
    if(wallet){
      open = miner.solana.account.openWallet(pwd,wallet);
    }else{
      open = miner.solana.account.yourWallet(pwd,true);
    }
    if(!open)miner.exit.cancel();
    // Activate user wallet
    miner.solana.account.wallet();
    console.log(`Starting working on ${COIN} Chain`);
    if(miner.solana.util.isAddress(token)){
      (async()=>{
        await miner.solana.token.data(token)
        .then(r=>{console.log('Token:',r.symbol);symbol=r.symbol;decimals=r.decimals;token_supply=r.supply;return(token_supply)}).catch(e=>miner.die(e))
        .then(r=>{console.log('Supply:',miner.util.pen2s(r,decimals),symbol);console.log('');return(miner.user.address())}).catch(e=>miner.die(e))
        .then(r=>{console.log('Sender Address:',r);return(miner.solana.token.balance(token,miner.user.address(),'amount'))}).catch(e=>miner.die(e))
        .then(r=>{console.log('Token Balance:',miner.util.pen2s(r,decimals),symbol);token_balance=r;return(miner.solana.user.getCoin(miner.user.address()))}).catch(e=>miner.die(e))
        .then(r=>{console.log('Native Coin Balance:',miner.solana.util.w2s(r),COIN);coin_balance=r;return('')}).catch(e=>miner.die(e))
        .then(console.log);
        console.log('Recipient Address:',recipient);
        console.log('Token Sending Amount:',miner.util.n2s(amount,8),symbol);
        console.log('');
        if(String(token_balance).lt(miner.util.s2pen(amount,decimals))){
          miner.exit.out('Input Error: token insufficient balance');
        }
        if(String(coin_balance).eq(0)){
          miner.exit.out('App Error: user wallet has no native coins to send transactions');
        }
        prompt.get(confirm,function(err,result){
          cfm = result.confirm;
          if(!cfm.as('Y'))miner.exit.cancel();
          console.log('Running..');
          miner.solana.user.transferToken(token,recipient,amount)
          .then(miner.exit.out)
          .catch(e=>miner.die(e));
        });
      })();
    }else{
      (async()=>{
        await miner.solana.user.getCoin(miner.user.address())
        .then(r=>{
          coin_balance = r;
          console.log('Sender:',miner.user.address());
          console.log('Balance:',miner.solana.util.w2s(r),COIN);
        }).catch(e=>miner.die(e));
        console.log('');
        console.log('Recipient Address:',recipient);
        console.log('Sending Amount:',miner.util.n2s(amount,8),COIN);
        console.log('');
        if(String(coin_balance).eq(0)){
          miner.exit.out('App Error: user wallet has no native coins to send transactions');
        }
        if(String(coin_balance).lt(miner.solana.util.s2w(amount))){
          miner.exit.out('Input Error: native coin insufficient balance');
        }
        prompt.get(confirm,function(err,result){
          cfm = result.confirm;
          if(!cfm.as('Y'))miner.exit.cancel();
          console.log('Running..');
          miner.solana.user.transferSol(amount,recipient)
          .then(miner.exit.out)
          .catch(e=>miner.die(e));
        });
      })();
    }
  }catch(e){miner.die(e)}
});