require("dotenv").config();
const miner = require("face-token-miner");
const prompt = require("prompt");
let out = miner.app.cliArgument('--out','wallet.json');
const password =
[
  {
    name: "password",
    description: miner.msg.hi_msg_newpwd,
    message: miner.msg.hi_prompt_chk,
    pattern: miner.ui.loRegex,
    required: true,
    hidden: true,
    replace: "*",
  },
];
const repeat =
[
  {
    name: "repeat",
    description: miner.msg.hi_msg_repeat,
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
      if(pwd2!==pwd)return(console.log(miner.ui.FAILED));
      if(miner.account.newAccSave(pwd,false,out))console.log(`${miner.msg.hi_msg_dsaved}${miner.ui.SPACE}[${out}]`);
    });
  }catch(err){return(console.log(err.toString()))}
});