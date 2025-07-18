"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const api_common = require("../../api/common.js");
if (!Array) {
  const _easycom_wd_img2 = common_vendor.resolveComponent("wd-img");
  const _easycom_wd_grid_item2 = common_vendor.resolveComponent("wd-grid-item");
  const _easycom_wd_grid2 = common_vendor.resolveComponent("wd-grid");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  (_easycom_wd_img2 + _easycom_wd_grid_item2 + _easycom_wd_grid2 + _easycom_wd_button2)();
}
const _easycom_wd_img = () => "../../uni_modules/wot-design-uni/components/wd-img/wd-img.js";
const _easycom_wd_grid_item = () => "../../uni_modules/wot-design-uni/components/wd-grid-item/wd-grid-item.js";
const _easycom_wd_grid = () => "../../uni_modules/wot-design-uni/components/wd-grid/wd-grid.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
if (!Math) {
  (_easycom_wd_img + _easycom_wd_grid_item + _easycom_wd_grid + _easycom_wd_button)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const user = common_vendor.ref({});
    const token = common_vendor.ref("");
    common_vendor.onShow(() => {
      user.value = common_vendor.index.getStorageSync("user");
      token.value = common_vendor.index.getStorageSync("token");
    });
    const clickEditInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/info"
      });
    };
    const clickToNotice = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/notice"
      });
    };
    const clickToEditPassword = () => {
      if (!user.value.userName) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/mine/edit-password"
      });
    };
    const clickToLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定退出登录吗？",
        success: async (res) => {
          if (res.confirm) {
            const res2 = await api_common.logoutApi();
            if (res2.code === 200) {
              common_vendor.index.showToast({
                title: "退出登录成功",
                icon: "success"
              });
              common_vendor.index.removeStorageSync("token");
              common_vendor.index.removeStorageSync("user");
              common_vendor.index.reLaunch({
                // url: '/pages/index/index'
                url: "/pages/login/login"
              });
            }
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/mine/mine.vue:66", err, "err");
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !user.value.userName
      }, !user.value.userName ? {
        b: common_vendor.o(clickToLogin)
      } : {
        c: common_vendor.p({
          width: 80,
          height: 80,
          round: true,
          src: user.value.avatar
        }),
        d: common_vendor.t(user.value.userName),
        e: common_vendor.o(clickEditInfo)
      }, {
        f: common_vendor.o(clickToNotice),
        g: common_vendor.p({
          icon: "notification",
          text: "系统通知",
          ["is-dot"]: true
        }),
        h: common_vendor.o(clickToEditPassword),
        i: common_vendor.p({
          icon: "lock-on",
          text: "修改密码"
        }),
        j: common_vendor.p({
          border: true,
          clickable: true,
          ["hover-class"]: " "
        }),
        k: token.value
      }, token.value ? {
        l: common_vendor.o(logout),
        m: common_vendor.p({
          type: "error",
          block: true
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
