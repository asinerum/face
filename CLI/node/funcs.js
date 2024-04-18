(function(){
 this.setInput = function(obj){return(JSON.stringify({obj:obj}))};
 this.getInput = function(tx,cbf=console.log){if(!hvalid(tx))return(cbf(ERROR,null));web3.eth.getTransaction(tx,function(err,result){if(err||!result||!result.input)return(cbf(err,null));cbf(null,hexObj(result.input).obj)})};
 this.errCode = function(e){if(e!=null){e=e.toString();if(e.indexOf(']')>0)return(hi_alert_data);if(e.indexOf(OxOO)>0)return(hi_prompt_err);if(e.indexOf(RECEIPT)>0)return(hi_prompt_rct);e=(e.substring(e.lastIndexOf(HASH)));if(e){return(e);}else{return(0);}}return(null)};
 this.axiosCallback = function(url,cbf=console.log,failcode=null){axios.get(url).then(r=>cbf(r.data)).catch(e=>cbf({status:failcode,message:e.toString(),result:null}))};/***/
 this.getJSON = function(url,cbf=console.log){axiosCallback(url,cbf)};
 this.keyEncrypt = function(key,pw){return(web3.eth.accounts.encrypt(key,pw))};/***/
 this.keyDecrypt = function(keystore,pw){return(web3.eth.accounts.decrypt(keystore,pw))};/***/
 this.yourWallet = function(pw,use=true,alert=console.log,t){try{t=keyDecrypt(your_keystore_v3,pw);if(t&&t.address&&t.privateKey){if(use){arouseKey(t.privateKey);return(sender)}else{return(DONE)}}}catch(e){return(alert(e.toString()))}};/***/
 this.newAccSave = function(pw,use=false,out='wallet.json',alert=console.log,t,k){t=newAccount(pw,alert);if(!t||!t.ACCOUNT)return(alert(ERROR));t=t.ACCOUNT;k=String(t.privateKey);if(saveWallet(t,out,alert)){if(use){arouseKey(k)};return(DONE)}else{return(alert(ERROR))}};/***/
 this.newAccount = function(pw,alert=console.log,t,k){if(!loRegex.test(pw))return(alert(hi_prompt_chk));t=web3.eth.accounts.create(web3.utils.randomHex(32));try{k=keyEncrypt(t.privateKey,pw)}catch(err){return(alert(hi_alert_data))};return({ACCOUNT:{address:t.address,privateKey:t.privateKey,keyStore:k}})};/***/
 this.saveWallet = function(account,out='wallet.json',alert=console.log,f){if(!account.address||!account.keyStore)return(alert(hi_alert_data));delete(account.privateKey);delete(account.password);f=require('fs');try{f.writeFileSync(out,JSON.stringify(account));return(DONE)}catch(e){return(alert(e.toString()))}};/***/
 this.openWallet = function(pw,file='wallet.json',alert=console.log,f,t){if(!loRegex.test(pw))return(alert(hi_alert_data));f=require('fs');try{t=JSON.parse(f.readFileSync(file));t=keyDecrypt(t.keyStore,pw);return({address:t.address,privateKey:t.privateKey})}catch(e){return(alert(e.toString()))}};/***/
 this.key2wallet = function(key){return(keyAccount(key).address)};
 this.keyAccount = function(key){if(key.indexOf(HEXINIT)===0)key=key.slice(2);return(web3.eth.accounts.privateKeyToAccount(HEXINIT+key))};
 this.arouseKey = function(key,save=true,s){key=key.slice(key.indexOf(HEXINIT)===0?2:0);s=key2wallet(key);if(save){sender=s,senderPte=key};return([s,key])};
 this.faceNonce = function(pops=10,pf='basicRate',kf='randomKey',cbf=console.log,b,k,i){ercFuncCall(pf).then(r=>{b=r;return(ercFuncCall(kf))}).then(r=>{k=r;i=Nonce(sender,num(b),num(k),1,b*pops);if(i!=0){cbf(null,i)}else{cbf(UNCHECKED,null)}})};/***nonce()***/
 this.femtNonce = function(pops=10,cbf=console.log){faceNonce(pops,'basicRate','randomKey',cbf)};/***/
 this.startXutengFemt = function(gas=maxgas,token=TOKEN,t){t=contracts[token];if(!t)return(null);TOKEN=token;SCABI=abis[TOKEN];CONTRACT=t;maxgas=gas;contractAddress=CONTRACT[network].addr;xutengFemt=(new web3.eth.Contract(SCABI,contractAddress));return(xutengFemt)};/***/
 this.ercFunc = function(funcName,sc=xutengFemt,...args){return(sc.methods[funcName](...args))};
 this.ercFabi = function(funcName,sc=xutengFemt,...args){return(sc.methods[funcName](...args).encodeABI())};
 this.ercFgas = function(funcName,sc=xutengFemt,...args){return(sc.methods[funcName](...args).estimateGas())};/*promise*/
 this.ercFuncCall = function(funcName,sc=xutengFemt,...args){return(ercFunc(funcName,sc,...args).call());};/*promise*/
 this.rawtx = function(abi,nonce,eth=0,to=null,d){d={data:abi,nonce:HEXINIT+nonce,value:s2wHex(eth),gasPrice:g2wHex(txgwei),gasLimit:toHex(maxgas),from:sender,chainId:CONTRACT[network].ncid};if(to)d.to=to;d=_Transaction(d);d.sign(_Buffer(senderPte));return(HEXINIT+d.serialize().toString(HEX))};
 this.txraw = function(abi,nonce,eth,to,d,p,t,r){d={nonce:HEXINIT+nonce,value:s2wHex(eth),gasPrice:g2wHex(txgwei),gasLimit:toHex(maxgas),from:sender,to:(to?to:contractAddress),chainId:CONTRACT[network].ncid};if(abi!=OxOO)d.data=abi;p=_Buffer(senderPte,HEX);t=_Transaction(d);t.sign(p);r=HEXINIT+t.serialize().toString(HEX);return(r)};
 this.txGas = function(){return(sendingFunc.estimateGas({from:sender,value:s2wHex(sendingEth)}))};/*promise*/
 this.txRaw = function(nonce){return(txraw(sendingAbi,nonce,sendingEth,0))};
 this.txCount = function(ua=sender){return(web3.eth.getTransactionCount(ua))};/*promise*/
 this.txSSend = function(tx){return(web3.eth.sendSignedTransaction(tx))};/*promise*/
 this.txSend = function(wrn=console.warn){return(txGas().then(gas=>{estgas=gas;gasfee=fromGwei(estgas*txgwei);wrn('GAS',estgas,'FEE',gasfee);return(txCount())}).then(nonce=>{nonce=nonce.toString(16);wrn('NONCE',nonce);return(txSSend(txRaw(nonce)))}))};/***promise***/
 this.ercRaws = function(sc=xutengFemt,method,args=[],eth=0){sendingFunc=sc.methods[method].apply(this,args);sendingAbi=sendingFunc.encodeABI();sendingEth=eth?eth:0;return(txSend());};/***promise***/
 this.ercFuncRaws = function(funcName,sc=xutengFemt,eth=0,options=null,...args){return(ercRaws(sc,funcName,args,eth))};/*promise[options:pseudo]*/
 this.faceSendRaw = function(funcName,eth=0,...args){return(ercFuncRaws(funcName,xutengFemt,eth,null,...args))};/***promise***/
 this.nsBlock = function(){return(web3.eth.getBlockNumber())};/*promise*/
 this.txGet = function(txh){return(web3.eth.getTransaction(txh))};/*promise*/
 this.rset = function(func,data,cbf,...args){cbf(`[${func}]`,...args,NEWLINE+NEWLINE,data)};
 this.ethers = function(addr=sender,cbf=console.log){web3.eth.getBalance(addr).then(r=>rset('coinBalance',w2s(r),cbf,addr))};
 this.tokens = function(addr=sender,cbf=console.log,fn='balanceOf'){ercFuncCall(fn,xutengFemt,addr).then(r=>rset(fn,w2s(r),cbf,addr))};
 this.Ethers = function(addr=sender,cbf=console.log){web3.eth.getBalance(addr).then(r=>cbf(w2s(r)))};
 this.Tokens = function(addr=sender,cbf=console.log,fn='balanceOf'){ercFuncCall(fn,xutengFemt,addr).then(r=>cbf(w2s(r)))};
 this.verify = function(addr=sender,cbf=console.log){ercFuncCall('name',xutengFemt).then(r=>{cbf('[TOKEN]',r);return(ercFuncCall('totalSupply',xutengFemt))}).then(r=>{cbf('[SUPPLY]',w2s(r));return(ercFuncCall('balanceOf',xutengFemt,addr))}).then(r=>{cbf('[USER]',addr);cbf('[BALANCE]',w2s(r))})};
 this.dig = function(cbf=console.log,pops=20){console.log(hi_msg_trying);femtNonce(pops,function(err,data){if(err||data<=0)return(cbf(err,null));console.log('Nonce:',data);console.log(hi_msg_txmake,NEWLINE);faceSendRaw('mine',0,data).then(r=>cbf(null,DONE)).catch(err=>cbf(err.toString(),null))})};/***/
 this.sap = function(pops=20){dig(function(err,data){if(err)return(console.log(err,NEWLINE));console.log(data,NEWLINE)},pops)};/***/
 this.tsap = function(dur=10,tun='M'){console.log(hi_msg_idling);setTimeout(sap,long(dur,tun))};
 this.isap = function(dur=10,tun='M'){console.log(hi_msg_idling);mineInterval=setInterval(sap,long(dur,tun))};/***/
 this.wsap = function(dur=10,loads=1000,mig=3,cb=console.log){console.log(hi_msg_idling);mineInterval=setInterval(function(){if(loads<1){clearInterval(mineInterval);return(cb(END))};cb(`${HASH}${loads}`);getLastMined(function(e,r){loads--;if(e){if(e==UNCHECKED){cb(hi_msg_nomine)}else{return(cb(e.toString()))}};if(s2n(mindif(r))<mig){return(cb(IGNORE))};sap()})},long(dur))};/***/
 this.Func = function(func,sc=xutengFemt){return(sc.methods[func])};/***/
 this.getLastMined = function(cbf=console.log,LP='lastProof',RS='rewardStamp'){if(Func(LP))ercFuncCall(LP).then(r=>{return(cbf(null,r))}).catch(e=>{return(cbf(e.toString(),null))});else{if(Func(RS))ercFuncCall(RS).then(r=>{return(cbf(null,r))}).catch(e=>{return(cbf(e.toString(),null))});else{return(cbf(UNCHECKED,null))}}};/***/
 this.faceAutoMine = function(pause=10,times=1000,lengthen=3){wsap(pause,times,lengthen,function(msg){console.log(msg)})};/***/
 this.faceIdleMine = function(pause=10){tsap(pause,'M')};/***/
 this.faceMuteMine = function(pause=10){isap(pause,'M')};/***/
})();