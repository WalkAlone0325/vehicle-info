"use strict";class s{constructor(t){this._reject=null,this.promise=new Promise((e,r)=>{t(e,r),this._reject=r})}abort(t){this._reject&&this._reject(t)}then(t,e){return this.promise.then(t,e)}catch(t){return this.promise.catch(t)}}exports.AbortablePromise=s;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/common/AbortablePromise.js.map
