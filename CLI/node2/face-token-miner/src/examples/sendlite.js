require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
const symbol = 'BTC';
const mainnet = 'bitcoin';
// Crypto network must be set first
let network = miner.app.cliArgument('--network',mainnet).toLowerCase();
// Coin recipient address
let recipient = miner.app.cliArgument('--to','');
if(!miner.bitcoin.util.isAddress(recipient)){
  console.log('');
  console.log('Usage:');
  console.log('');
  console.log('node sendlite.js --to <RECIPIENT_ADDRESS> --amount <SENDING_AMOUNT> --fee <TRANSACTION_FEE> [ARGUMENTS]');
  console.log('');
  console.log('The RECIPIENT_ADDRESS:address, SENDING_AMOUNT:number, TRANSACTION_FEE:number, all are mandatory');
  console.log('');
  console.log('The optional ARGUMENTS are:');
  console.log('');
  console.log(`--network <string>: working CRYPTO_NETWORK, default value is <${mainnet}>`);
  console.log(`--wallet <string>: path to WALLET_JSON_FILE, where encrypted key is stored`);
  console.log('');
  miner.exit.out('No recipient specified');
}
// Coin sending amount and tx fee
let amount = miner.app.cliArgument('--amount','0');
if(!Number(amount))miner.exit.out('No sending amount specified');
let fee = miner.app.cliArgument('--fee','0');
if(!Number(fee))miner.exit.out('No transaction fee specified');
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
let COIN;
let coin_balance;
let recipient_balance;
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    // Start default crypto environment
    miner.bitcoin.network.setSymb('BTC');
    pwd = result.password;
    let open;
    if(wallet){
      open = miner.bitcoin.account.openWallet2(pwd,wallet,network);
    }else{
      open = miner.bitcoin.account.yourWallet2(pwd,network,process.env.YOUR_BTC_KEYSTORE_V3);
    }
    if(!open)miner.exit.cancel();
    COIN = miner.bitcoin.util.goClient().networks[network].coin.toUpperCase();
    console.log(`Starting working on ${COIN} Chain`);
    miner.bitcoin.user.coins(miner.user.address(),network,String,
    function(r){
      if(isNaN(r))miner.exit.out(r);
      coin_balance = r; // Native coins
      console.log('Sender:',miner.user.address());
      console.log('Balance:',miner.util.n2s(coin_balance,8),COIN);
      console.log('');
      console.log('Recipient Address:',recipient);
      console.log('Sending Amount:',miner.util.n2s(amount,8),COIN);
      console.log('Transaction Fee:',miner.util.n2s(fee,8),COIN);
      console.log('');
      if(coin_balance.lt(amount)){
        miner.exit.out('Input Error: native coin insufficient balance');
      }
      prompt.get(confirm,function(err,result){
        cfm = result.confirm;
        if(!cfm.as('Y'))miner.exit.cancel();
        console.log('Running..');
        miner.bitcoin.user.transfer2(amount,recipient,fee,network,
        function(e,r){
          if(e)miner.exit.out(e);
          console.log('');
          console.log(r);
        });
      });
    });
  }catch(e){miner.die(e)}
});