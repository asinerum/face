require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
let file = miner.app.cliArgument('--file','wallet.json');
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
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    let account = miner.account.openWallet(result.password,file);
    if(!account)return(console.log(miner.ui.FAILED));
    console.log(miner.ui.DONE,miner.ui.NEWLINE,account.address);
  }catch(err){return(console.log(err.toString()))}
});