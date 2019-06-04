/*history
v1.0 create
v1.1 data-length map
v1.2 bugfix add remove wrote element
v1.3 callback
v1.4 input > keyup
v1.45 debounce def 70
v1.5 * wildcard
v1.6 data-head data-headline data-lines data-timestamp data-crcnew data-crcold data-text
v1.7 editableEx flg
v1.8 data-lines2 nihongo count line
v1.9 editableLex
*/
;(function(root){
 //'use strict'; 
 //debounce
 ;(function(root){
  if(root._) return;
  var _={}; 
/*original by underscore.js*/
//line 1457
  _.now = Date.now || function() {
    return new Date().getTime();
   };
//line 850
 _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
 //line 883
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  root._ =_;
})(this)
 ;
 let fn={}
fn.crcTable=(function(){
  var c,crcTable = [];
  for(var n =0; n < 256; n++){
    c = n;
    for(var k =0; k < 8; k++){
      c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    crcTable[n] = c;
  }
  return crcTable;
})();//early gen
fn.crc32 = function(str,hex=true) {
  var crcTable = fn.crcTable,pad=( (d,l)=>('000000000000000000'+d).slice(-1*l))
  ,crc = 0 ^ (-1)
  ;
  for (var i = 0; i < str.length; i++ ) crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF]
  ;
  crc = (crc ^ (-1)) >>> 0
  ;
  return (hex)?pad(crc.toString(16),8):crc
}
 
 let is={}
 is.function = function(obj){return toString.call(obj) === '[object Function]'}
 is.element=function(o){return !!(o && o.nodeType === 1)}
 ;
 
function _lmap(e){ 
 let el=is.element(e)?e:e.target
 ,text=el.textContent
 ,ary=text.split('\n')
 ,headline=ary.slice(0,1).pop()
 ,crcnew=fn.crc32(text)
 ,crcold=el.dataset.crcnew||crcnew
 el.dataset.head=text.charAt(0)
 el.dataset.headline=headline
 el.dataset.lines=ary.length
 el.dataset.lines2=ary.map(d=>Math.ceil((d.length+0.1)/44)).reduce((a,b)=>a+b,1)
 el.dataset.timestamp=Date.now()
 el.dataset.crcold=crcold 
 el.dataset.crcnew=crcnew
 el.dataset.text=text    
 el.dataset.length=el.textContent.length;
 }
  
 function entry(_target,_flg=false,time=70){
  if(!_target)return console.log('target empty')
  let target =_target.replace(/\./g,'').split(',')
  ,wild=(_target==='*')?true:false
  ,caller=is.function(_flg)?_.debounce(_flg,time):void 0
  ,hasClass=function(el){
    if(wild) return true;
    return !(target.filter(d=>el.classList.contains(d)).length===0)
  }
  ,lmap=_lmap
  ,remove=function(e){
   let el=e.target
   el.removeAttribute('contenteditable')
   el.removeEventListener('keyup'/*'input'*/,lmap)
   if(caller)el.removeEventListener('keyup'/*'input'*/,caller)
   el.dataset.editable=false
   el=void 0
  }  
  ,add=function(e){
   if(!hasClass(e.target))return
   let el=e.target
   el.setAttribute('contenteditable','plaintext-only')
   el.focus()
   //if(el.dataset.editable)return
   el.addEventListener('blur',remove,{once:true})
   el.addEventListener('keyup'/*'input'*/,lmap)
   if(caller)el.addEventListener('keyup'/*'input'*/,caller)
   el.dataset.editable=true
   el=void 0
   ;
  }
  ;
  document.documentElement.addEventListener('click',add)///
 }
 root.editableLex=_lmap; //editableLex({target:el}) 
 root.editableEx=entry;
 root.editable=entry;
 /*usage
 editable('.xyz,.eeee',true) //target,data-length write flg
 //
[data-editable]{
 white-space:pre-wrap;
 word-break:break-all;
} 
 */
})(this);
