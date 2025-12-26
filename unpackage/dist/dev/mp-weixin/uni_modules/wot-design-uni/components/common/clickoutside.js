"use strict";let o=[];function r(e){o.push(e)}function i(e){o=o.filter(u=>u.$.uid!==e.$.uid)}function s(e){o.forEach(u=>{u.$.uid!==e.$.uid&&u.$.exposed.close()})}exports.closeOther=s;exports.pushToQueue=r;exports.removeFromQueue=i;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/components/common/clickoutside.js.map
