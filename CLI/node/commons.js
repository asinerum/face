String.prototype.buffer = function(frm='hex'){return(Buffer.from(this.toString(),frm))};
String.prototype.encB64 = function(){return(this.buffer(null).toString('base64'))};
String.prototype.decB64 = function(){return(this.buffer('base64').toString())};
String.prototype.encHex = function(h,i,s){s='';for(i=0;i<this.length;i++){h=this.charCodeAt(i).toString(16);s+=('000'+h).slice(-4)}return(s)};
String.prototype.decHex = function(h,i,s){s='';h=this.match(/.{1,4}/g)||[];for(i=0;i<h.length;i++){s+=String.fromCharCode(parseInt(h[i],16))}return(s)};
(function(){
 this.cliArgument=function(arg,def,i,v){i=process.argv.indexOf(arg);if(i>-1){v=process.argv[i+1]};return(v||def)};//[--arg]
 this.cliFlagArgv=function(arg){return(process.argv.indexOf(arg)>-1?true:false)};//[-arg]
})();