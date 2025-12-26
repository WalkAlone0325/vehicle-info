"use strict";/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/var l={};l.lang={extend:function(o,r,e){if(!r||!o)throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");var a=function(){};if(a.prototype=r.prototype,o.prototype=new a,o.prototype.constructor=o,o.superclass=r.prototype,r.prototype.constructor==Object.prototype.constructor&&(r.prototype.constructor=r),e){var t;for(t in e)o.prototype[t]=e[t];var y=function(){},c=["toString","valueOf"];try{/MSIE/.test(navigator.userAgent)&&(y=function(f,O){for(t=0;t<c.length;t=t+1){var n=c[t],p=O[n];typeof p=="function"&&p!=Object.prototype[n]&&(f[n]=p)}})}catch{}y(o.prototype,e)}}};exports.YAHOO=l;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/jsrsasign/yahoo.js.map
