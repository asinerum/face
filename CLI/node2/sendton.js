require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
const COIN = "TON";
const jettonAttach = "0.03";
const jettonForward = "0";
// Coin/Token recipient address
let recipient = miner.app.cliArgument('--to','');
if(!miner.toncoin.util.isAddress(recipient)){
  console.log('');
  console.log('Usage:');
  console.log('');
  console.log('node sendton.js --to <RECIPIENT_ADDRESS> --amount <SENDING_AMOUNT> [ARGUMENTS]');
  console.log('');
  console.log('The RECIPIENT_ADDRESS:address and SENDING_AMOUNT:number are mandatory');
  console.log('');
  console.log('The optional ARGUMENTS are:');
  console.log('');
  console.log('--tag <string>: small text message required by some recipients');
  console.log('--token <address>: bypass this TOKEN_ADDRESS on native coin sending');
  console.log(`--attach <number>: amount of ${COIN}s attached to the Jetton transfer message, should not less than ${jettonAttach}`);
  console.log(`--forward <number>: amount of ${COIN}s to invoke Jetton transfer notification, default value is ${jettonForward}`);
  console.log('--wallet <string>: path to WALLET_JSON_FILE, where encrypted key is stored');
  console.log('');
  miner.exit.out('No recipient specified');
}
// Coin/Token sending amount
let amount = miner.app.cliArgument('--amount','0');
if(!Number(amount))miner.exit.out('No sending amount specified');
// Token smart contract address
let token = miner.app.cliArgument('--token','');
if(token&&!miner.toncoin.util.isAddress(token))miner.exit.out('No valid jetton token specified');
// Jetton sending attached TON amount
let coins = miner.app.cliArgument('--attach',jettonAttach);
if(!Number(coins))miner.exit.out('No valid attached amount specified');
// Jetton sending forwarding TON amount
let fwdcoins = miner.app.cliArgument('--forward',jettonForward);
if(isNaN(fwdcoins))miner.exit.out('No valid forwarding amount specified');
// TON sending tag
let tag = miner.app.cliArgument('--tag','');
if(!tag)console.log(miner.ui.YELLOW,'WARNING! some recipients require transaction TAG which has not been provided',miner.ui.WHITE,'\n');
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
let recipient_balance;
let token_balance;
let token_supply;
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    pwd = result.password;
    let open;
    if(wallet){
      open = miner.toncoin.account.openWallet(pwd,wallet);
    }else{
      open = miner.toncoin.account.yourWallet(pwd,true);
    }
    if(!open)miner.exit.cancel();
    // Activate user wallet
    miner.toncoin.account.wallet();
    console.log(`Starting working on ${COIN} Chain`);
    if(miner.toncoin.util.isAddress(token)){
      (async()=>{
        await miner.toncoin.token.data(token)
        .then(r=>{console.log('Token:',r.metadata.symbol);symbol=r.metadata.symbol;decimals=r.metadata.decimals;token_supply=r.total_supply;return(token_supply)}).catch(e=>miner.die(e))
        .then(r=>{console.log('Supply:',miner.util.pen2s(r,decimals),symbol);console.log('');return(miner.user.address())}).catch(e=>miner.die(e))
        .then(r=>{console.log('Sender Address:',r);return(miner.toncoin.token.balance(token,miner.user.address(),'original'))}).catch(e=>miner.die(e))
        .then(r=>{console.log('Token Balance:',miner.util.pen2s(r,decimals),symbol);token_balance=r;return(miner.toncoin.user.getCoin(miner.user.address()))}).catch(e=>miner.die(e))
        .then(r=>{console.log('Native Coin Balance:',miner.toncoin.util.w2s(r),COIN);coin_balance=r;return('')}).catch(e=>miner.die(e))
        .then(console.log);
        console.log('Recipient Address:',recipient);
        console.log('Token Sending Amount:',miner.util.n2s(amount,8),symbol);
        console.log('Sending Attached Amount:',miner.util.n2s(coins,8),COIN);
        console.log('Sending Forward Amount:',miner.util.n2s(fwdcoins,8),COIN);
        console.log('Sending Tag:',miner.ui.GREEN,tag,miner.ui.WHITE);
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
          miner.toncoin.user.transferToken(token,recipient,amount,coins,fwdcoins,tag)
          .then(miner.exit.out)
          .catch(e=>miner.die(e));
        });
      })();
    }else{
      (async()=>{
        await miner.toncoin.user.getCoin(miner.user.address())
        .then(r=>{
          coin_balance = r;
          console.log('Sender:',miner.user.address());
          console.log('Balance:',miner.toncoin.util.w2s(r),COIN);
        }).catch(e=>miner.die(e));
        console.log('');
        console.log('Recipient Address:',recipient);
        console.log('Sending Amount:',miner.util.n2s(amount,8),COIN);
        console.log('Sending Tag:',miner.ui.GREEN,tag,miner.ui.WHITE);
        console.log('');
        if(String(coin_balance).eq(0)){
          miner.exit.out('App Error: user wallet has no native coins to send transactions');
        }
        if(String(coin_balance).lt(miner.toncoin.util.s2w(amount))){
          miner.exit.out('Input Error: native coin insufficient balance');
        }
        prompt.get(confirm,function(err,result){
          cfm = result.confirm;
          if(!cfm.as('Y'))miner.exit.cancel();
          console.log('Running..');
          miner.toncoin.user.transferTon(amount,recipient,tag)
          .then(miner.exit.out)
          .catch(e=>miner.die(e));
        });
      })();
    }
  }catch(e){miner.die(e)}
});