(function(){
 this._Array = function(size){return(new Array(size))};
 this._Set = function(val){return(new Set(val))};
 this._Date = function(val){if(val)return(new Date(val));return(new Date())};
 this._Time = function(){return(new Date().getTime())};
 this._Error = function(err){throw(new Error(err))};
 this._Regex = function(pat){return(new RegExp(pat))};
 this._Uint8 = function(val){return(new Uint8Array(val))};
 this._Instance = function(arg,obj){return(arg instanceof obj)};
 this._Promise = function(res,rej){return(new Promise(res,rej))};
 this._Encoder = function(code='utf-8'){return(new TextEncoder(code))};
 this._Decoder = function(code='utf-8'){return(new TextDecoder(code))};
 this._Exit = function(msg,code){console.log(msg);process.exit(code)};/***/
 this._Buffer = function(val,code='hex',...args){if('number'==typeof(val)){if('string'==typeof(code))_Error('BadEncoding');return(Buffer.allocUnsafe(val))}return(Buffer.from(val,code,...args))};/***/
})();