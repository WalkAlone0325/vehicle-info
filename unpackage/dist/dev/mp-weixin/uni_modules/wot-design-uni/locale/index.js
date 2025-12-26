"use strict";const i=require("../../../common/vendor.js"),t=require("./lang/zh-CN.js"),c=require("../components/common/util.js"),o=i.ref("zh-CN"),n=i.reactive({"zh-CN":t.zhCN}),u={messages(){return n[o.value]},use(e,s){o.value=e,s&&this.add({[e]:s})},add(e={}){c.deepAssign(n,e)}};exports.Locale=u;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/wot-design-uni/locale/index.js.map
