"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home = require("../../api/home.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_wd_search2 = common_vendor.resolveComponent("wd-search");
  const _easycom_wd_sticky2 = common_vendor.resolveComponent("wd-sticky");
  const _easycom_wd_loading2 = common_vendor.resolveComponent("wd-loading");
  const _easycom_wd_tag2 = common_vendor.resolveComponent("wd-tag");
  const _easycom_wd_card2 = common_vendor.resolveComponent("wd-card");
  const _easycom_wd_loadmore2 = common_vendor.resolveComponent("wd-loadmore");
  (_easycom_wd_search2 + _easycom_wd_sticky2 + _easycom_wd_loading2 + _easycom_wd_tag2 + _easycom_wd_card2 + _easycom_wd_loadmore2)();
}
const _easycom_wd_search = () => "../../uni_modules/wot-design-uni/components/wd-search/wd-search.js";
const _easycom_wd_sticky = () => "../../uni_modules/wot-design-uni/components/wd-sticky/wd-sticky.js";
const _easycom_wd_loading = () => "../../uni_modules/wot-design-uni/components/wd-loading/wd-loading.js";
const _easycom_wd_tag = () => "../../uni_modules/wot-design-uni/components/wd-tag/wd-tag.js";
const _easycom_wd_card = () => "../../uni_modules/wot-design-uni/components/wd-card/wd-card.js";
const _easycom_wd_loadmore = () => "../../uni_modules/wot-design-uni/components/wd-loadmore/wd-loadmore.js";
if (!Math) {
  (_easycom_wd_search + _easycom_wd_sticky + _easycom_wd_loading + _easycom_wd_tag + _easycom_wd_card + _easycom_wd_loadmore)();
}
const _sfc_main = {
  __name: "driver",
  setup(__props) {
    const val = common_vendor.ref("");
    const list = common_vendor.ref([]);
    const total = common_vendor.ref(0);
    const queryParams = common_vendor.reactive({
      pageNum: 1,
      pageSize: 10,
      order: "asc",
      val: ""
    });
    const state = common_vendor.ref("loading");
    common_vendor.onReachBottom(() => {
      if (!list.value.length) {
        state.value = "error";
      } else if (list.value.length < total.value) {
        loadmore();
      } else if (list.value.length === total.value) {
        state.value = "finished";
      }
    });
    common_vendor.onLoad(() => {
      getData();
    });
    function loadmore() {
      queryParams.pageNum++;
      getData();
      state.value = "loading";
    }
    const getData = async () => {
      const res = await api_home.getDriverListApi(queryParams);
      list.value = [...list.value, ...res.rows];
      total.value = res.total;
    };
    const search = ({ value }) => {
      queryParams.val = value;
      queryParams.pageNum = 1;
      getData();
    };
    const clear = () => {
      val.value = "";
      queryParams.pageNum = 1;
      getData();
    };
    const cancel = () => {
      val.value = "";
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(search),
        b: common_vendor.o(clear),
        c: common_vendor.o(cancel),
        d: common_vendor.o(($event) => queryParams.val = $event),
        e: common_vendor.p({
          ["placeholder-left"]: true,
          maxlength: 10,
          modelValue: queryParams.val
        }),
        f: !list.value.length
      }, !list.value.length ? {
        g: common_vendor.p({
          type: "outline"
        })
      } : {
        h: common_vendor.f(list.value, (i, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(i.driverName),
            b: i.driverSexName
          }, i.driverSexName ? {
            c: common_vendor.t(i.driverSexName),
            d: "433ed93f-4-" + i0 + "," + ("433ed93f-3-" + i0),
            e: common_vendor.p({
              type: "primary"
            })
          } : {}, {
            f: common_vendor.t(i.mobile),
            g: common_vendor.t(i.deptName),
            h: "433ed93f-3-" + i0,
            i: i.driverId
          });
        }),
        i: common_vendor.o(loadmore),
        j: common_vendor.p({
          state: state.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-433ed93f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/driver.js.map
