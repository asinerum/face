require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
const COIN = "BTC";
// Crypto asset must be set first
let asset = miner.app.cliArgument('--asset',COIN);
// Coin recipient address
let recipient = miner.app.cliArgument('--to','');
if(!miner.bitcoin.util.isAddress(recipient)){
  console.log('');
  console.log('Usage:');
  console.log('');
  console.log('node sendbit.js --to <RECIPIENT_ADDRESS> --amount <SENDING_AMOUNT> [ARGUMENTS]');
  console.log('');
  console.log('The RECIPIENT_ADDRESS:address and SENDING_AMOUNT:number are mandatory');
  console.log('');
  console.log('The optional ARGUMENTS are:');
  console.log('');
  console.log('--asset <string>: working CRYPTO_SYMBOL, default value is',COIN);
  console.log('--wallet <string>: path to WALLET_JSON_FILE, where encrypted key is stored');
  console.log('');
  miner.exit.out('No recipient specified');
}
// Coin sending amount
let amount = miner.app.cliArgument('--amount','0');
if(!Number(amount))miner.exit.out('No sending amount specified');
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
let coin_balance;
let recipient_balance;
asset = asset.toUpperCase();
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    // Apply cryptocurrency asset
    miner.bitcoin.network.setSymb(asset);
    pwd = result.password;
    (async()=>{
      let open;
      if(wallet){
        open = await miner.bitcoin.account.openWallet(pwd,wallet);
      }else{
        open = await miner.bitcoin.account.yourWallet(pwd,true);
      }
      if(!open)miner.exit.cancel();
      // Activate user wallet
      miner.bitcoin.account.wallet();
      console.log(`Starting working on ${asset} Chain`);
      await miner.bitcoin.user.getCoin(miner.user.address())
      .then(r=>{
        coin_balance = r;
        console.log('Sender:',miner.user.address());
        console.log('Balance:',miner.bitcoin.util.w2s(r),asset);
      }).catch(e=>miner.die(e));
      console.log('');
      console.log('Recipient Address:',recipient);
      console.log('Sending Amount:',miner.util.n2s(amount,8),asset);
      console.log('');
      if(String(coin_balance).eq(0)){
        miner.exit.out('App Error: user wallet has no native coins to send transactions');
      }
      if(String(coin_balance).lt(miner.bitcoin.util.s2w(amount))){
        miner.exit.out('Input Error: native coin insufficient balance');
      }
      prompt.get(confirm,function(err,result){
        cfm = result.confirm;
        if(!cfm.as('Y'))miner.exit.cancel();
        console.log('Running..');
        miner.bitcoin.user.transfer(amount,recipient)
        .then(miner.exit.out)
        .catch(e=>miner.die(e));
      });
    })();
  }catch(e){miner.die(e)}
});