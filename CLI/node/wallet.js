/*

ETHEREUM WALLET GENERATOR
@ASINERUM PROJECT TEAM

*Usage:

node wallet.js --out <JSON_FILE>

*Examples:

node wallet.js
node wallet.js --out mywallet.json

*Arguments:

JSON_FILE: JSON file to put the newly created wallet in (default “wallet.json”).

**/

require("./base.js");
const prompt = require("prompt");
let out = cliArgument('--out','wallet.json');
const password =
[
  {
    name: "password",
    description: hi_msg_newpwd,
    message: hi_prompt_chk,
    pattern: loRegex,
    required: true,
    hidden: true,
    replace: "*",
  },
];
const repeat =
[
  {
    name: "repeat",
    description: hi_msg_repeat,
    required: true,
    hidden: true,
    replace: "*",
  },
];
let pwd;
let pwd2;
prompt.start();
prompt.get(password,function(err,result){
  if(err){return(console.log(err.toString()))}
  try{
    pwd = result.password;
    prompt.get(repeat,function(err,result){
      if(err){return(console.log(err.toString()))}
      pwd2 = result.repeat;
      if(pwd2!==pwd)return(console.log(FAILED));
      if(newAccSave(pwd,false,out))console.log(`${hi_msg_dsaved}${SPACE}[${out}]`);
    });
  }catch(err){return(console.log(err.toString()))}
});