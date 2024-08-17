require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
// Coin/Token recipient address
let recipient = miner.app.cliArgument('--to','');
if(!miner.util.isAddress(recipient)){
  console.log('');
  console.log('Usage:');
  console.log('');
  console.log('node send.js --to <RECIPIENT_ADDRESS> --amount <SENDING_AMOUNT> [ARGUMENTS]');
  console.log('');
  console.log('The RECIPIENT_ADDRESS:address and SENDING_AMOUNT:number are mandatory');
  console.log('');
  console.log('The optional ARGUMENTS are:');
  console.log('');
  console.log('--token <address>: bypass this TOKEN_ADDRESS on native coin sending');
  console.log('--gas <number>: transaction GAS_LIMIT, default value is',miner.chain.maxgas);
  console.log('--wallet <string>: path to WALLET_JSON_FILE, where encrypted key is stored');
  console.log('');
  miner.exit.out('No recipient specified');
}
// Coin/Token sending amount
let amount = miner.app.cliArgument('--amount','0');
if(!Number(amount))miner.exit.out('No sending amount specified');
// Token smart contract address
let token = miner.app.cliArgument('--token','');
if(token&&!miner.util.isAddress(token))miner.exit.out('No valid token specified');
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
let token_balance;
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
    if(miner.util.isAddress(token)){
      (async()=>{
        await miner.token.nonStdConnect(gas,token)
        .then(r=>{console.log('Token:',r.TOKEN);symbol=r.TOKEN;return(miner.token.call('totalSupply'))}).catch(e=>miner.die(e))
        .then(r=>{console.log('Supply:',miner.util.wt2s(r),symbol);console.log('');return(miner.user.address())}).catch(e=>miner.die(e))
        .then(r=>{console.log('Sender Address:',r);return(miner.token.call('balanceOf',miner.user.address()))}).catch(e=>miner.die(e))
        .then(r=>{console.log('Token Balance:',miner.util.wt2s(r),symbol);token_balance=r;return(miner.user.getCoin(miner.user.address()))}).catch(e=>miner.die(e))
        .then(r=>{console.log('Native Coin Balance:',miner.util.w2s(r),miner.network.getSymb());coin_balance=r;return('')}).catch(e=>miner.die(e))
        .then(console.log);
        console.log('Recipient Address:',recipient);
        console.log('Token Sending Amount:',miner.util.n2s(amount,8),symbol);
        console.log('');
        if(token_balance.lt(miner.util.s2wt(amount))){
          miner.exit.out('Input Error: token insufficient balance');
        }
        if(coin_balance.eq(0)){
          miner.exit.out('App Error: user wallet has no native coins to send transactions');
        }
        prompt.get(confirm,function(err,result){
          cfm = result.confirm;
          if(!cfm.as('Y'))miner.exit.cancel();
          console.log('Running..');
          miner.user.transferToken(recipient,amount)
          .then(miner.exit.out)
          .catch(e=>miner.die(e));
        });
      })();
    }else{
      (async()=>{
        await miner.user.getCoin(miner.user.address())
        .then(r=>{
          coin_balance = r;
          console.log('Sender:',miner.user.address());
          console.log('Balance:',miner.util.w2s(r),miner.network.getSymb());
        }).catch(e=>miner.die(e));
        console.log('');
        console.log('Recipient Address:',recipient);
        console.log('Sending Amount:',miner.util.n2s(amount,8),miner.network.getSymb());
        console.log('');
        if(coin_balance.eq(0)){
          miner.exit.out('App Error: user wallet has no native coins to send transactions');
        }
        if(coin_balance.lt(miner.util.s2w(amount))){
          miner.exit.out('Input Error: native coin insufficient balance');
        }
        prompt.get(confirm,function(err,result){
          cfm = result.confirm;
          if(!cfm.as('Y'))miner.exit.cancel();
          console.log('Running..');
          miner.user.transferEther(amount,recipient)
          .then(miner.exit.out)
          .catch(e=>miner.die(e));
        });
      })();
    }
  }catch(e){miner.die(e)}
});