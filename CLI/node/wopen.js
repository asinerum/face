/*

ETHEREUM WALLET CHECKER
@ASINERUM PROJECT TEAM

*Usage:

node wopen.js –-file <JSON_FILE>

*Examples:

node wopen.js
node wopen.js –-file mywallet.json

*Arguments:

JSON_FILE: JSON file in which a user stores his encrypted wallet (default “wallet.json”);

**/

require("./base.js");
const prompt = require("prompt");
let file = cliArgument('--file','wallet.json');
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
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    let account = openWallet(result.password,file);
    if(!account)return(console.log(FAILED));
    console.log(DONE,NEWLINE,account.address);
  }catch(err){return(console.log(err.toString()))}
});