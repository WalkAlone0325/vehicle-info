if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const dataList = vue.ref([
        { label: "当日出行", val: 1 },
        { label: "当月出行", val: 3 },
        { label: "当年出行", val: 6 },
        { label: "总出行次数", val: 10 }
      ]);
      const baseList = vue.ref([
        { label: "姓名", value: "荆树" },
        { label: "性别", value: "男" },
        { label: "单位", value: "单位名称" },
        { label: "状态", value: "状态" }
      ]);
      const carList = vue.ref([
        { label: "车牌", value: "晋A·A8888" },
        { label: "车辆类型", value: "比亚迪" },
        { label: "车辆状态", value: "良好" }
      ]);
      const __returned__ = { dataList, baseList, carList };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "index-page" }, [
      vue.createElementVNode("view", { class: "title-con" }, [
        vue.createElementVNode("view", { class: "title" }, "司机信息")
      ]),
      vue.createElementVNode("view", { class: "info-con" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.baseList, (i) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "info-item",
              key: i.label
            }, [
              vue.createElementVNode(
                "view",
                { class: "label" },
                vue.toDisplayString(i.label) + "：",
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "val" },
                vue.toDisplayString(i.value),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "title-con" }, [
        vue.createElementVNode("view", { class: "title" }, "车辆信息")
      ]),
      vue.createElementVNode("view", { class: "info-con" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.carList, (i) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "info-item",
              key: i.label
            }, [
              vue.createElementVNode(
                "view",
                { class: "label" },
                vue.toDisplayString(i.label) + "：",
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "val" },
                vue.toDisplayString(i.value),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "title-con" }, [
        vue.createElementVNode("view", { class: "title" }, "出行统计")
      ]),
      vue.createElementVNode("view", { class: "info-con" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.dataList, (i) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "info-item",
              key: i.label
            }, [
              vue.createElementVNode(
                "view",
                { class: "label" },
                vue.toDisplayString(i.label) + "：",
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "val" },
                vue.toDisplayString(i.val),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/jing/Code/mini/vehicle-info/pages/index/index.vue"]]);
  const _sfc_main$n = {};
  function _sfc_render$m(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-container" });
  }
  const PagesOrderOrder = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__file", "/Users/jing/Code/mini/vehicle-info/pages/order/order.vue"]]);
  const _sfc_main$m = {};
  function _sfc_render$l(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-container" });
  }
  const PagesTraceTrace = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__file", "/Users/jing/Code/mini/vehicle-info/pages/trace/trace.vue"]]);
  class AbortablePromise {
    constructor(executor) {
      this._reject = null;
      this.promise = new Promise((resolve, reject) => {
        executor(resolve, reject);
        this._reject = reject;
      });
    }
    // 提供abort方法来中止Promise
    abort(error) {
      if (this._reject) {
        this._reject(error);
      }
    }
    then(onfulfilled, onrejected) {
      return this.promise.then(onfulfilled, onrejected);
    }
    catch(onrejected) {
      return this.promise.catch(onrejected);
    }
  }
  function addUnit(num) {
    return Number.isNaN(Number(num)) ? `${num}` : `${num}px`;
  }
  function isObj(value) {
    return Object.prototype.toString.call(value) === "[object Object]" || typeof value === "object";
  }
  function getType(target) {
    const typeStr = Object.prototype.toString.call(target);
    const match = typeStr.match(/\[object (\w+)\]/);
    const type = match && match.length ? match[1].toLowerCase() : "";
    return type;
  }
  const isDef = (value) => value !== void 0 && value !== null;
  function rgbToHex(r, g, b) {
    const hex = (r << 16 | g << 8 | b).toString(16);
    const paddedHex = "#" + "0".repeat(Math.max(0, 6 - hex.length)) + hex;
    return paddedHex;
  }
  function hexToRgb(hex) {
    const rgb = [];
    for (let i = 1; i < 7; i += 2) {
      rgb.push(parseInt("0x" + hex.slice(i, i + 2), 16));
    }
    return rgb;
  }
  const gradient = (startColor, endColor, step = 2) => {
    const sColor = hexToRgb(startColor);
    const eColor = hexToRgb(endColor);
    const rStep = (eColor[0] - sColor[0]) / step;
    const gStep = (eColor[1] - sColor[1]) / step;
    const bStep = (eColor[2] - sColor[2]) / step;
    const gradientColorArr = [];
    for (let i = 0; i < step; i++) {
      gradientColorArr.push(
        rgbToHex(parseInt(String(rStep * i + sColor[0])), parseInt(String(gStep * i + sColor[1])), parseInt(String(bStep * i + sColor[2])))
      );
    }
    return gradientColorArr;
  };
  const isEqual = (value1, value2) => {
    if (value1 === value2) {
      return true;
    }
    if (!Array.isArray(value1) || !Array.isArray(value2)) {
      return false;
    }
    if (value1.length !== value2.length) {
      return false;
    }
    for (let i = 0; i < value1.length; ++i) {
      if (value1[i] !== value2[i]) {
        return false;
      }
    }
    return true;
  };
  const context = {
    id: 1e3
  };
  function kebabCase(word) {
    const newWord = word.replace(/[A-Z]/g, function(match) {
      return "-" + match;
    }).toLowerCase();
    return newWord;
  }
  function camelCase(word) {
    return word.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  }
  function isArray(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    }
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function isFunction(value) {
    return getType(value) === "function" || getType(value) === "asyncfunction";
  }
  function isString(value) {
    return getType(value) === "string";
  }
  function isNumber(value) {
    return getType(value) === "number";
  }
  function isPromise(value) {
    if (isObj(value) && isDef(value)) {
      return isFunction(value.then) && isFunction(value.catch);
    }
    return false;
  }
  function isUndefined(value) {
    return typeof value === "undefined";
  }
  function objToStyle(styles) {
    if (isArray(styles)) {
      const result = styles.filter(function(item) {
        return item != null && item !== "";
      }).map(function(item) {
        return objToStyle(item);
      }).join(";");
      return result ? result.endsWith(";") ? result : result + ";" : "";
    }
    if (isString(styles)) {
      return styles ? styles.endsWith(";") ? styles : styles + ";" : "";
    }
    if (isObj(styles)) {
      const result = Object.keys(styles).filter(function(key) {
        return styles[key] != null && styles[key] !== "";
      }).map(function(key) {
        return [kebabCase(key), styles[key]].join(":");
      }).join(";");
      return result ? result.endsWith(";") ? result : result + ";" : "";
    }
    return "";
  }
  const pause = (ms = 1e3 / 30) => {
    return new AbortablePromise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve(true);
      }, ms);
    });
  };
  function deepClone(obj, cache = /* @__PURE__ */ new Map()) {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    if (isDate(obj)) {
      return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
      return new RegExp(obj.source, obj.flags);
    }
    if (obj instanceof Error) {
      const errorCopy = new Error(obj.message);
      errorCopy.stack = obj.stack;
      return errorCopy;
    }
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const copy = Array.isArray(obj) ? [] : {};
    cache.set(obj, copy);
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepClone(obj[key], cache);
      }
    }
    return copy;
  }
  function deepMerge(target, source) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object") {
      throw new Error("Both target and source must be objects.");
    }
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      target[prop] = source[prop];
    }
    return target;
  }
  function deepAssign(target, source) {
    Object.keys(source).forEach((key) => {
      const targetValue = target[key];
      const newObjValue = source[key];
      if (isObj(targetValue) && isObj(newObjValue)) {
        deepAssign(targetValue, newObjValue);
      } else {
        target[key] = newObjValue;
      }
    });
    return target;
  }
  function debounce(func, wait, options = {}) {
    let timeoutId = null;
    let lastArgs;
    let lastThis;
    let result;
    const leading = isDef(options.leading) ? options.leading : false;
    const trailing = isDef(options.trailing) ? options.trailing : true;
    function invokeFunc() {
      if (lastArgs !== void 0) {
        result = func.apply(lastThis, lastArgs);
        lastArgs = void 0;
      }
    }
    function startTimer() {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (trailing) {
          invokeFunc();
        }
      }, wait);
    }
    function cancelTimer() {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }
    function debounced(...args) {
      lastArgs = args;
      lastThis = this;
      if (timeoutId === null) {
        if (leading) {
          invokeFunc();
        }
        startTimer();
      } else if (trailing) {
        cancelTimer();
        startTimer();
      }
      return result;
    }
    return debounced;
  }
  const getPropByPath = (obj, path) => {
    const keys = path.split(".");
    try {
      return keys.reduce((acc, key) => acc !== void 0 && acc !== null ? acc[key] : void 0, obj);
    } catch (error) {
      return void 0;
    }
  };
  const isDate = (val) => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN(val.getTime());
  function isVideoUrl(url) {
    const videoRegex = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|video)/i;
    return videoRegex.test(url);
  }
  function isImageUrl(url) {
    const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|image)/i;
    return imageRegex.test(url);
  }
  function omitBy(obj, predicate) {
    const newObj = deepClone(obj);
    Object.keys(newObj).forEach((key) => predicate(newObj[key], key) && delete newObj[key]);
    return newObj;
  }
  const numericProp = [Number, String];
  const makeRequiredProp = (type) => ({
    type,
    required: true
  });
  const makeArrayProp = () => ({
    type: Array,
    default: () => []
  });
  const makeBooleanProp = (defaultVal) => ({
    type: Boolean,
    default: defaultVal
  });
  const makeNumberProp = (defaultVal) => ({
    type: Number,
    default: defaultVal
  });
  const makeNumericProp = (defaultVal) => ({
    type: numericProp,
    default: defaultVal
  });
  const makeStringProp = (defaultVal) => ({
    type: String,
    default: defaultVal
  });
  const baseProps = {
    /**
     * 自定义根节点样式
     */
    customStyle: makeStringProp(""),
    /**
     * 自定义根节点样式类
     */
    customClass: makeStringProp("")
  };
  const imgProps = {
    ...baseProps,
    customImage: makeStringProp(""),
    /**
     * 图片链接
     */
    src: String,
    /**
     * 预览图片链接
     */
    previewSrc: String,
    /**
     * 是否显示为圆形
     */
    round: makeBooleanProp(false),
    /**
     * 填充模式：'top left' / 'top right' / 'bottom left' / 'bottom right' / 'right' / 'left' / 'center' / 'bottom' / 'top' / 'heightFix' / 'widthFix' / 'aspectFill' / 'aspectFit' / 'scaleToFill'
     */
    mode: makeStringProp("scaleToFill"),
    /**
     * 是否懒加载
     */
    lazyLoad: makeBooleanProp(false),
    /**
     * 宽度，默认单位为px
     */
    width: numericProp,
    /**
     * 高度，默认单位为px
     */
    height: numericProp,
    /**
     * 圆角大小，默认单位为px
     */
    radius: numericProp,
    /**
     * 是否允许预览
     */
    enablePreview: makeBooleanProp(false),
    /**
     * 开启长按图片显示识别小程序码菜单，仅在微信小程序平台有效
     */
    showMenuByLongpress: makeBooleanProp(false)
  };
  const __default__$h = {
    name: "wd-img",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
    ...__default__$h,
    props: imgProps,
    emits: ["error", "click", "load"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const rootStyle = vue.computed(() => {
        const style = {};
        if (isDef(props.height)) {
          style["height"] = addUnit(props.height);
        }
        if (isDef(props.width)) {
          style["width"] = addUnit(props.width);
        }
        if (isDef(props.radius)) {
          style["border-radius"] = addUnit(props.radius);
          style["overflow"] = "hidden";
        }
        return `${objToStyle(style)}${props.customStyle}`;
      });
      const rootClass = vue.computed(() => {
        return `wd-img  ${props.round ? "is-round" : ""} ${props.customClass}`;
      });
      const status = vue.ref("loading");
      function handleError(event) {
        status.value = "error";
        emit("error", event);
      }
      function handleClick(event) {
        if (props.enablePreview && props.src && status.value == "success") {
          uni.previewImage({
            urls: [props.previewSrc || props.src]
          });
        }
        emit("click", event);
      }
      function handleLoad(event) {
        status.value = "success";
        emit("load", event);
      }
      const __returned__ = { props, emit, rootStyle, rootClass, status, handleError, handleClick, handleLoad };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass($setup.rootClass),
        onClick: $setup.handleClick,
        style: vue.normalizeStyle($setup.rootStyle)
      },
      [
        vue.createElementVNode("image", {
          class: vue.normalizeClass(`wd-img__image ${_ctx.customImage}`),
          style: vue.normalizeStyle($setup.status !== "success" ? "width: 0;height: 0;" : ""),
          src: _ctx.src,
          mode: _ctx.mode,
          "show-menu-by-longpress": _ctx.showMenuByLongpress,
          "lazy-load": _ctx.lazyLoad,
          onLoad: $setup.handleLoad,
          onError: $setup.handleError
        }, null, 46, ["src", "mode", "show-menu-by-longpress", "lazy-load"]),
        $setup.status === "loading" ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : vue.createCommentVNode("v-if", true),
        $setup.status === "error" ? vue.renderSlot(_ctx.$slots, "error", { key: 1 }, void 0, true) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-cb0c5dbc"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-img/wd-img.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const iconProps = {
    ...baseProps,
    /**
     * 使用的图标名字，可以使用链接图片
     */
    name: makeRequiredProp(String),
    /**
     * 图标的颜色
     */
    color: String,
    /**
     * 图标的字体大小
     */
    size: numericProp,
    /**
     * 类名前缀，用于使用自定义图标
     */
    classPrefix: makeStringProp("wd-icon")
  };
  const __default__$g = {
    name: "wd-icon",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
    ...__default__$g,
    props: iconProps,
    emits: ["click", "touch"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const isImage = vue.computed(() => {
        return isDef(props.name) && props.name.includes("/");
      });
      const rootClass = vue.computed(() => {
        const prefix = props.classPrefix;
        return `${prefix} ${props.customClass} ${isImage.value ? "wd-icon--image" : prefix + "-" + props.name}`;
      });
      const rootStyle = vue.computed(() => {
        const style = {};
        if (props.color) {
          style["color"] = props.color;
        }
        if (props.size) {
          style["font-size"] = addUnit(props.size);
        }
        return `${objToStyle(style)} ${props.customStyle}`;
      });
      function handleClick(event) {
        emit("click", event);
      }
      const __returned__ = { props, emit, isImage, rootClass, rootStyle, handleClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        onClick: $setup.handleClick,
        class: vue.normalizeClass($setup.rootClass),
        style: vue.normalizeStyle($setup.rootStyle)
      },
      [
        $setup.isImage ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "wd-icon__image",
          src: _ctx.name
        }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const wdIcon = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-24906af6"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue"]]);
  const badgeProps = {
    ...baseProps,
    /**
     * 显示值
     */
    modelValue: numericProp,
    /** 当数值为 0 时，是否展示徽标 */
    showZero: makeBooleanProp(false),
    bgColor: String,
    /**
     * 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型
     */
    max: Number,
    /**
     * 是否为红色点状标注
     */
    isDot: Boolean,
    /**
     * 是否隐藏 badge
     */
    hidden: Boolean,
    /**
     * badge类型，可选值primary / success / warning / danger / info
     */
    type: makeStringProp(void 0),
    /**
     * 为正时，角标向下偏移对应的像素
     */
    top: numericProp,
    /**
     * 为正时，角标向左偏移对应的像素
     */
    right: numericProp
  };
  const __default__$f = {
    name: "wd-badge",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    ...__default__$f,
    props: badgeProps,
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const content = vue.computed(() => {
        const { modelValue, max, isDot } = props;
        if (isDot)
          return "";
        let value = modelValue;
        if (value && max && isNumber(value) && !Number.isNaN(value) && !Number.isNaN(max)) {
          value = max < value ? `${max}+` : value;
        }
        return value;
      });
      const contentStyle = vue.computed(() => {
        const style = {};
        if (isDef(props.bgColor)) {
          style.backgroundColor = props.bgColor;
        }
        if (isDef(props.top)) {
          style.top = addUnit(props.top);
        }
        if (isDef(props.right)) {
          style.right = addUnit(props.right);
        }
        return objToStyle(style);
      });
      const shouldShowBadge = vue.computed(() => !props.hidden && (content.value || content.value === 0 && props.showZero || props.isDot));
      const __returned__ = { props, content, contentStyle, shouldShowBadge };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["wd-badge", _ctx.customClass]),
        style: vue.normalizeStyle(_ctx.customStyle)
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
        $setup.shouldShowBadge ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["wd-badge__content", "is-fixed", _ctx.type ? "wd-badge__content--" + _ctx.type : "", _ctx.isDot ? "is-dot" : ""]),
            style: vue.normalizeStyle($setup.contentStyle)
          },
          vue.toDisplayString($setup.content),
          7
          /* TEXT, CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const wdBadge = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-6ea9b0eb"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-badge/wd-badge.vue"]]);
  function useParent(key) {
    const parent = vue.inject(key, null);
    if (parent) {
      const instance = vue.getCurrentInstance();
      const { link, unlink, internalChildren } = parent;
      link(instance);
      vue.onUnmounted(() => unlink(instance));
      const index = vue.computed(() => internalChildren.indexOf(instance));
      return {
        parent,
        index
      };
    }
    return {
      parent: null,
      index: vue.ref(-1)
    };
  }
  const GRID_KEY = Symbol("wd-grid");
  const gridProps = {
    ...baseProps,
    /**
     * 是否开启格子点击反馈
     */
    clickable: makeBooleanProp(false),
    /**
     * 是否将格子固定为正方形
     */
    square: makeBooleanProp(false),
    /**
     * 列数
     */
    column: Number,
    /**
     * 是否显示边框
     */
    border: makeBooleanProp(false),
    /**
     * 背景颜色
     */
    bgColor: makeStringProp(""),
    /**
     * 格子之间的间距，默认单位为px
     */
    gutter: Number,
    /**
     * 自定义内容区域hover-class
     */
    hoverClass: String
  };
  const gridItemProps = {
    ...baseProps,
    /**
     * GridItem 下方文字样式
     */
    customText: makeStringProp(""),
    /**
     * GridItem 上方 icon 样式
     */
    customIcon: makeStringProp(""),
    /**
     * 图标名称，可选值见 wd-icon 组件
     */
    icon: makeStringProp(""),
    /**
     * 图标大小
     */
    iconSize: makeStringProp("26px"),
    /**
     * 文字
     */
    text: String,
    /**
     * 点击后跳转的链接地址
     */
    url: String,
    /**
     * 页面跳转方式, 参考微信小程序路由文档，可选值：navigateTo / switchTab / reLaunch
     */
    linkType: makeStringProp("navigateTo"),
    /**
     * 是否开启 GridItem 内容插槽
     */
    useSlot: makeBooleanProp(false),
    /**
     * 是否开启 GridItem icon 插槽
     */
    useIconSlot: makeBooleanProp(false),
    /**
     * 是否开启 GridItem text 内容插槽
     */
    useTextSlot: makeBooleanProp(false),
    /**
     * 是否显示图标右上角小红点
     */
    isDot: {
      type: Boolean,
      default: void 0
    },
    /**
     * 图标右上角显示的 badge 类型，可选值：primary / success / warning / danger / info
     */
    type: String,
    /**
     * 图标右上角 badge 显示值
     */
    value: numericProp,
    /**
     * 图标右上角 badge 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型
     */
    max: Number,
    /**
     * 徽标属性，透传给 Badge 组件
     */
    badgeProps: Object
  };
  const __default__$e = {
    name: "wd-grid-item",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    ...__default__$e,
    props: gridItemProps,
    emits: ["itemclick"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const style = vue.ref("");
      const gutterContentStyle = vue.ref("");
      const itemClass = vue.ref("");
      const gutter = vue.ref(0);
      const square = vue.ref(false);
      const border = vue.ref(true);
      const { parent: grid } = useParent(GRID_KEY);
      const childCount = vue.computed(() => {
        if (isDef(grid) && isDef(grid.children)) {
          return grid.children.length;
        } else {
          return 0;
        }
      });
      const customBadgeProps = vue.computed(() => {
        const badgeProps2 = deepAssign(
          isDef(props.badgeProps) ? omitBy(props.badgeProps, isUndefined) : {},
          omitBy(
            {
              max: props.max,
              isDot: props.isDot,
              modelValue: props.value,
              type: props.type
            },
            isUndefined
          )
        );
        return badgeProps2;
      });
      vue.watch(
        () => childCount.value,
        () => {
          if (!grid)
            return;
          const width = grid.props.column ? 100 / grid.props.column + "%" : 100 / (childCount.value || 1) + "%";
          const gutterStyle = grid.props.gutter ? `padding:${grid.props.gutter}px ${grid.props.gutter}px 0 0; background-color: transparent;` : "";
          const squareStyle = grid.props.square ? `background-color:transparent; padding-bottom: 0; padding-top:${width}` : "";
          style.value = `width: ${width}; ${squareStyle || gutterStyle}`;
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.onMounted(() => {
        init();
      });
      function init() {
        if (!grid)
          return;
        const children = grid.children;
        const width = grid.props.column ? 100 / grid.props.column + "%" : 100 / children.length + "%";
        const gutterStyle = grid.props.gutter ? `padding:${grid.props.gutter}px ${grid.props.gutter}px 0 0; background-color: transparent;` : "";
        const squareStyle = grid.props.square ? `background-color:transparent; padding-bottom: 0; padding-top:${width}` : "";
        gutterContentStyle.value = grid.props.gutter && grid.props.square ? `right: ${grid.props.gutter}px; bottom:${grid.props.gutter}px;height: auto; background-color: ${grid.props.bgColor}` : `background-color: ${grid.props.bgColor}`;
        border.value = Boolean(grid.props.border);
        square.value = Boolean(grid.props.square);
        gutter.value = Number(grid.props.gutter);
        style.value = `width: ${width}; ${squareStyle || gutterStyle}`;
      }
      function click() {
        if (grid && !grid.props.clickable)
          return;
        const { url, linkType } = props;
        emit("itemclick");
        if (url) {
          switch (linkType) {
            case "navigateTo":
              uni.navigateTo({
                url
              });
              break;
            case "reLaunch":
              uni.reLaunch({
                url
              });
              break;
            case "redirectTo":
              uni.redirectTo({
                url
              });
              break;
            case "switchTab":
              uni.switchTab({
                url
              });
              break;
            default:
              formatAppLog("error", "at uni_modules/wot-design-uni/components/wd-grid-item/wd-grid-item.vue:148", `[wot-design] warning(wd-grid-item): linkType can not be ${linkType}`);
              break;
          }
        }
      }
      function setiIemClass(classes) {
        itemClass.value = classes;
      }
      const hoverClass = vue.computed(() => {
        if (grid == null ? void 0 : grid.props.clickable) {
          return grid.props.hoverClass ? grid.props.hoverClass : "wd-grid-item__content--hover";
        }
        return "none";
      });
      __expose({
        setiIemClass,
        itemClass,
        init
      });
      const __returned__ = { props, emit, style, gutterContentStyle, itemClass, gutter, square, border, grid, childCount, customBadgeProps, init, click, setiIemClass, hoverClass, wdIcon, wdBadge };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(`wd-grid-item ${$setup.border && !$setup.gutter ? $setup.itemClass : ""} ${_ctx.customClass}`),
        onClick: $setup.click,
        style: vue.normalizeStyle(`${$setup.style};${_ctx.customStyle}`)
      },
      [
        vue.createElementVNode("view", {
          class: vue.normalizeClass(`wd-grid-item__content ${$setup.square ? "is-square" : ""} ${$setup.border && $setup.gutter > 0 ? "is-round" : ""}`),
          style: vue.normalizeStyle($setup.gutterContentStyle),
          "hover-class": $setup.hoverClass
        }, [
          _ctx.useSlot ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.createElementVNode(
                "view",
                {
                  style: vue.normalizeStyle("width:" + _ctx.iconSize + "; height: " + _ctx.iconSize),
                  class: "wd-grid-item__wrapper"
                },
                [
                  vue.createVNode(
                    $setup["wdBadge"],
                    vue.mergeProps({ "custom-class": "badge" }, $setup.customBadgeProps),
                    {
                      default: vue.withCtx(() => [
                        _ctx.useIconSlot ? vue.renderSlot(_ctx.$slots, "icon", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
                          key: 1,
                          name: _ctx.icon,
                          size: _ctx.iconSize,
                          "custom-class": _ctx.customIcon
                        }, null, 8, ["name", "size", "custom-class"]))
                      ]),
                      _: 3
                      /* FORWARDED */
                    },
                    16
                    /* FULL_PROPS */
                  )
                ],
                4
                /* STYLE */
              ),
              _ctx.useTextSlot ? vue.renderSlot(_ctx.$slots, "text", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  class: "wd-grid-item__text custom-text"
                },
                vue.toDisplayString(_ctx.text),
                1
                /* TEXT */
              ))
            ],
            64
            /* STABLE_FRAGMENT */
          ))
        ], 14, ["hover-class"])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-8ad0f7d6"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-grid-item/wd-grid-item.vue"]]);
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function flattenVNodes(children) {
    const result = [];
    const traverse = (children2) => {
      if (Array.isArray(children2)) {
        children2.forEach((child) => {
          var _a;
          if (isVNode(child)) {
            result.push(child);
            if ((_a = child.component) == null ? void 0 : _a.subTree) {
              result.push(child.component.subTree);
              traverse(child.component.subTree.children);
            }
            if (child.children) {
              traverse(child.children);
            }
          }
        });
      }
    };
    traverse(children);
    return result;
  }
  const findVNodeIndex = (vnodes, vnode) => {
    const index = vnodes.indexOf(vnode);
    if (index === -1) {
      return vnodes.findIndex((item) => vnode.key !== void 0 && vnode.key !== null && item.type === vnode.type && item.key === vnode.key);
    }
    return index;
  };
  function sortChildren(parent, publicChildren, internalChildren) {
    const vnodes = parent && parent.subTree && parent.subTree.children ? flattenVNodes(parent.subTree.children) : [];
    internalChildren.sort((a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode));
    const orderedPublicChildren = internalChildren.map((item) => item.proxy);
    publicChildren.sort((a, b) => {
      const indexA = orderedPublicChildren.indexOf(a);
      const indexB = orderedPublicChildren.indexOf(b);
      return indexA - indexB;
    });
  }
  function useChildren(key) {
    const publicChildren = vue.reactive([]);
    const internalChildren = vue.reactive([]);
    const parent = vue.getCurrentInstance();
    const linkChildren = (value) => {
      const link = (child) => {
        if (child.proxy) {
          internalChildren.push(child);
          publicChildren.push(child.proxy);
          sortChildren(parent, publicChildren, internalChildren);
        }
      };
      const unlink = (child) => {
        const index = internalChildren.indexOf(child);
        publicChildren.splice(index, 1);
        internalChildren.splice(index, 1);
      };
      vue.provide(
        key,
        Object.assign(
          {
            link,
            unlink,
            children: publicChildren,
            internalChildren
          },
          value
        )
      );
    };
    return {
      children: publicChildren,
      linkChildren
    };
  }
  const __default__$d = {
    name: "wd-grid",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    ...__default__$d,
    props: gridProps,
    setup(__props, { expose: __expose }) {
      __expose();
      const nextTick = () => new Promise((resolve) => setTimeout(resolve, 20));
      const props = __props;
      const { linkChildren, children } = useChildren(GRID_KEY);
      linkChildren({ props });
      vue.watch(
        () => props.column,
        (val, oldVal) => {
          if (val === oldVal)
            return;
          if (!val || val <= 0) {
            formatAppLog(
              "error",
              "at uni_modules/wot-design-uni/components/wd-grid/wd-grid.vue:37",
              "The number of columns attribute value is invalid. The attribute must be greater than 0 and it is not recommended to use a larger value attribute."
            );
          }
          oldVal && init();
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => props.border,
        (val) => {
          val && Promise.resolve().then(nextTick).then(() => {
            init();
          });
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => children,
        () => {
          handleChildrenChange();
        },
        {
          deep: true
        }
      );
      const rootStyle = vue.computed(() => {
        return `${props.gutter ? "padding-left:" + props.gutter + "px;padding-bottom:" + props.gutter + "px;" : ""}${props.customStyle}`;
      });
      const handleChildrenChange = debounce(() => {
        init();
      }, 50);
      function init() {
        if (!children)
          return;
        children.forEach((item, index) => {
          if (props.border) {
            const { column } = props;
            if (column) {
              const isRightItem = children.length - 1 === index || (index + 1) % column === 0;
              const isFirstLine = index + 1 <= column;
              isFirstLine && item.$.exposed.setiIemClass("is-first");
              isRightItem && item.$.exposed.setiIemClass("is-right");
              !isFirstLine && item.$.exposed.setiIemClass("is-border");
            } else {
              item.$.exposed.setiIemClass("is-first");
            }
            children.length - 1 === index && item.$.exposed.setiIemClass(item.$.exposed.itemClass.value + " is-last");
          }
          item.$.exposed.init();
        });
      }
      const __returned__ = { nextTick, props, linkChildren, children, rootStyle, handleChildrenChange, init };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(`wd-grid ${_ctx.customClass}`),
        style: vue.normalizeStyle($setup.rootStyle)
      },
      [
        vue.createCommentVNode(" 默认插入的 item "),
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-6fdada2e"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-grid/wd-grid.vue"]]);
  const _b64chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"];
  const _mkUriSafe = (src) => src.replace(/[+/]/g, (m0) => m0 === "+" ? "-" : "_").replace(/=+\$/m, "");
  const fromUint8Array = (src, rfc4648 = false) => {
    let b64 = "";
    for (let i = 0, l = src.length; i < l; i += 3) {
      const [a0, a1, a2] = [src[i], src[i + 1], src[i + 2]];
      const ord = a0 << 16 | a1 << 8 | a2;
      b64 += _b64chars[ord >>> 18];
      b64 += _b64chars[ord >>> 12 & 63];
      b64 += typeof a1 !== "undefined" ? _b64chars[ord >>> 6 & 63] : "=";
      b64 += typeof a2 !== "undefined" ? _b64chars[ord & 63] : "=";
    }
    return rfc4648 ? _mkUriSafe(b64) : b64;
  };
  const _btoa = typeof btoa === "function" ? (s) => btoa(s) : (s) => {
    if (s.charCodeAt(0) > 255) {
      throw new RangeError("The string contains invalid characters.");
    }
    return fromUint8Array(Uint8Array.from(s, (c) => c.charCodeAt(0)));
  };
  const utob = (src) => unescape(encodeURIComponent(src));
  function encode(src, rfc4648 = false) {
    const b64 = _btoa(utob(src));
    return rfc4648 ? _mkUriSafe(b64) : b64;
  }
  const buttonProps = {
    ...baseProps,
    /**
     * 幽灵按钮
     */
    plain: makeBooleanProp(false),
    /**
     * 圆角按钮
     */
    round: makeBooleanProp(true),
    /**
     * 禁用按钮
     */
    disabled: makeBooleanProp(false),
    /**
     * 是否细边框
     */
    hairline: makeBooleanProp(false),
    /**
     * 块状按钮
     */
    block: makeBooleanProp(false),
    /**
     * 按钮类型，可选值：primary / success / info / warning / error / text / icon
     */
    type: makeStringProp("primary"),
    /**
     * 按钮尺寸，可选值：small / medium / large
     */
    size: makeStringProp("medium"),
    /**
     * 图标类名
     */
    icon: String,
    /**
     * 类名前缀，用于使用自定义图标，用法参考Icon组件
     */
    classPrefix: makeStringProp("wd-icon"),
    /**
     * 加载中按钮
     */
    loading: makeBooleanProp(false),
    /**
     * 加载图标颜色
     */
    loadingColor: String,
    /**
     * 开放能力
     */
    openType: String,
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     */
    hoverStopPropagation: Boolean,
    /**
     * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
     */
    lang: String,
    /**
     * 会话来源，open-type="contact"时有效
     */
    sessionFrom: String,
    /**
     * 会话内消息卡片标题，open-type="contact"时有效
     */
    sendMessageTitle: String,
    /**
     * 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
     */
    sendMessagePath: String,
    /**
     * 会话内消息卡片图片，open-type="contact"时有效
     */
    sendMessageImg: String,
    /**
     * 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
     */
    appParameter: String,
    /**
     * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
     */
    showMessageCard: Boolean,
    /**
     * 按钮的唯一标识，可用于设置隐私同意授权按钮的id
     */
    buttonId: String,
    /**
     * 支付宝小程序，当 open-type 为 getAuthorize 时有效。
     * 可选值：'phoneNumber' | 'userInfo'
     */
    scope: String
  };
  const __default__$c = {
    name: "wd-button",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    ...__default__$c,
    props: buttonProps,
    emits: [
      "click",
      "getuserinfo",
      "contact",
      "getphonenumber",
      "error",
      "launchapp",
      "opensetting",
      "chooseavatar",
      "agreeprivacyauthorization"
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const loadingIcon = (color = "#4D80F0", reverse = true) => {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="a"><stop stop-color="${reverse ? color : "#fff"}" offset="0%" stop-opacity="0"/><stop stop-color="${reverse ? color : "#fff"}" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${reverse ? "#fff" : color}"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#a)" stroke-width="3.5" stroke-linecap="round"/></g></svg>`;
      };
      const props = __props;
      const emit = __emit;
      const hoverStartTime = vue.ref(20);
      const hoverStayTime = vue.ref(70);
      const loadingIconSvg = vue.ref("");
      const loadingStyle = vue.computed(() => {
        return `background-image: url(${loadingIconSvg.value});`;
      });
      vue.watch(
        () => props.loading,
        () => {
          buildLoadingSvg();
        },
        { deep: true, immediate: true }
      );
      function handleClick(event) {
        if (!props.disabled && !props.loading) {
          emit("click", event);
        }
      }
      function handleGetAuthorize(event) {
        if (props.scope === "phoneNumber") {
          handleGetphonenumber(event);
        } else if (props.scope === "userInfo") {
          handleGetuserinfo(event);
        }
      }
      function handleGetuserinfo(event) {
        emit("getuserinfo", event.detail);
      }
      function handleConcat(event) {
        emit("contact", event.detail);
      }
      function handleGetphonenumber(event) {
        emit("getphonenumber", event.detail);
      }
      function handleError(event) {
        emit("error", event.detail);
      }
      function handleLaunchapp(event) {
        emit("launchapp", event.detail);
      }
      function handleOpensetting(event) {
        emit("opensetting", event.detail);
      }
      function handleChooseavatar(event) {
        emit("chooseavatar", event.detail);
      }
      function handleAgreePrivacyAuthorization(event) {
        emit("agreeprivacyauthorization", event.detail);
      }
      function buildLoadingSvg() {
        const { loadingColor, type, plain } = props;
        let color = loadingColor;
        if (!color) {
          switch (type) {
            case "primary":
              color = "#4D80F0";
              break;
            case "success":
              color = "#34d19d";
              break;
            case "info":
              color = "#333";
              break;
            case "warning":
              color = "#f0883a";
              break;
            case "error":
              color = "#fa4350";
              break;
            case "default":
              color = "#333";
              break;
          }
        }
        const svg = loadingIcon(color, !plain);
        loadingIconSvg.value = `"data:image/svg+xml;base64,${encode(svg)}"`;
      }
      const __returned__ = { loadingIcon, props, emit, hoverStartTime, hoverStayTime, loadingIconSvg, loadingStyle, handleClick, handleGetAuthorize, handleGetuserinfo, handleConcat, handleGetphonenumber, handleError, handleLaunchapp, handleOpensetting, handleChooseavatar, handleAgreePrivacyAuthorization, buildLoadingSvg, wdIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("button", {
      id: _ctx.buttonId,
      "hover-class": `${_ctx.disabled || _ctx.loading ? "" : "wd-button--active"}`,
      style: vue.normalizeStyle(_ctx.customStyle),
      class: vue.normalizeClass([
        "wd-button",
        "is-" + _ctx.type,
        "is-" + _ctx.size,
        _ctx.round ? "is-round" : "",
        _ctx.hairline ? "is-hairline" : "",
        _ctx.plain ? "is-plain" : "",
        _ctx.disabled ? "is-disabled" : "",
        _ctx.block ? "is-block" : "",
        _ctx.loading ? "is-loading" : "",
        _ctx.customClass
      ]),
      "hover-start-time": $setup.hoverStartTime,
      "hover-stay-time": $setup.hoverStayTime,
      "open-type": _ctx.disabled || _ctx.loading ? void 0 : _ctx.openType,
      "send-message-title": _ctx.sendMessageTitle,
      "send-message-path": _ctx.sendMessagePath,
      "send-message-img": _ctx.sendMessageImg,
      "app-parameter": _ctx.appParameter,
      "show-message-card": _ctx.showMessageCard,
      "session-from": _ctx.sessionFrom,
      lang: _ctx.lang,
      "hover-stop-propagation": _ctx.hoverStopPropagation,
      scope: _ctx.scope,
      onClick: $setup.handleClick,
      "on:getAuthorize": $setup.handleGetAuthorize,
      onGetuserinfo: $setup.handleGetuserinfo,
      onContact: $setup.handleConcat,
      onGetphonenumber: $setup.handleGetphonenumber,
      onError: $setup.handleError,
      onLaunchapp: $setup.handleLaunchapp,
      onOpensetting: $setup.handleOpensetting,
      onChooseavatar: $setup.handleChooseavatar,
      onAgreeprivacyauthorization: $setup.handleAgreePrivacyAuthorization
    }, [
      vue.createElementVNode("view", { class: "wd-button__content" }, [
        _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "wd-button__loading"
        }, [
          vue.createElementVNode(
            "view",
            {
              class: "wd-button__loading-svg",
              style: vue.normalizeStyle($setup.loadingStyle)
            },
            null,
            4
            /* STYLE */
          )
        ])) : _ctx.icon ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
          key: 1,
          "custom-class": "wd-button__icon",
          name: _ctx.icon,
          classPrefix: _ctx.classPrefix
        }, null, 8, ["name", "classPrefix"])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "wd-button__text" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ])
    ], 46, ["id", "hover-class", "hover-start-time", "hover-stay-time", "open-type", "send-message-title", "send-message-path", "send-message-img", "app-parameter", "show-message-card", "session-from", "lang", "hover-stop-propagation", "scope"]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-d858c170"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-button/wd-button.vue"]]);
  const imgUrl = "data:image/jpeg;base64,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";
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "mine",
    setup(__props, { expose: __expose }) {
      __expose();
      const clickEditInfo = () => {
        uni.navigateTo({
          url: "/pages/mine/info"
        });
      };
      const clickToEditPassword = () => {
        formatAppLog("log", "at pages/mine/mine.vue:11", 11);
        uni.navigateTo({
          url: "/pages/mine/edit-password"
        });
      };
      const __returned__ = { imgUrl, clickEditInfo, clickToEditPassword };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_wd_img = resolveEasycom(vue.resolveDynamicComponent("wd-img"), __easycom_0$1);
    const _component_wd_grid_item = resolveEasycom(vue.resolveDynamicComponent("wd-grid-item"), __easycom_1$1);
    const _component_wd_grid = resolveEasycom(vue.resolveDynamicComponent("wd-grid"), __easycom_2$2);
    const _component_wd_button = resolveEasycom(vue.resolveDynamicComponent("wd-button"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "mine-page" }, [
      vue.createElementVNode("view", { class: "mine__header" }, [
        vue.createElementVNode("view", {
          class: "header-con",
          onClick: $setup.clickEditInfo
        }, [
          vue.createVNode(_component_wd_img, {
            width: 80,
            height: 80,
            round: "",
            src: $setup.imgUrl
          }),
          vue.createElementVNode("view", { class: "name" }, "京东")
        ])
      ]),
      vue.createElementVNode("view", { class: "mine__main" }, [
        vue.createVNode(_component_wd_grid, {
          border: "",
          clickable: "",
          "hover-class": " "
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_wd_grid_item, {
              icon: "notification",
              text: "系统通知",
              "is-dot": ""
            }),
            vue.createVNode(_component_wd_grid_item, {
              icon: "lock-on",
              text: "修改密码",
              onItemclick: $setup.clickToEditPassword
            })
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createElementVNode("view", { class: "mine__footer" }, [
        vue.createVNode(_component_wd_button, {
          type: "error",
          block: ""
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("退出登录")
          ]),
          _: 1
          /* STABLE */
        })
      ])
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-7c2ebfa5"], ["__file", "/Users/jing/Code/mini/vehicle-info/pages/mine/mine.vue"]]);
  const transitionProps = {
    ...baseProps,
    /**
     * 是否展示组件
     * 类型：boolean
     * 默认值：false
     */
    show: makeBooleanProp(false),
    /**
     * 动画执行时间
     * 类型：number | boolean | Record<string, number>
     * 默认值：300 (毫秒)
     */
    duration: {
      type: [Object, Number, Boolean],
      default: 300
    },
    /**
     * 弹层内容懒渲染，触发展示时才渲染内容
     * 类型：boolean
     * 默认值：false
     */
    lazyRender: makeBooleanProp(false),
    /**
     * 动画类型
     * 类型：string
     * 可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in
     * 默认值：'fade'
     */
    name: [String, Array],
    /**
     * 是否在动画结束时销毁子节点（display: none)
     * 类型：boolean
     * 默认值：false
     */
    destroy: makeBooleanProp(true),
    /**
     * 进入过渡的开始状态
     * 类型：string
     */
    enterClass: makeStringProp(""),
    /**
     * 进入过渡的激活状态
     * 类型：string
     */
    enterActiveClass: makeStringProp(""),
    /**
     * 进入过渡的结束状态
     * 类型：string
     */
    enterToClass: makeStringProp(""),
    /**
     * 离开过渡的开始状态
     * 类型：string
     */
    leaveClass: makeStringProp(""),
    /**
     * 离开过渡的激活状态
     * 类型：string
     */
    leaveActiveClass: makeStringProp(""),
    /**
     * 离开过渡的结束状态
     * 类型：string
     */
    leaveToClass: makeStringProp("")
  };
  const __default__$b = {
    name: "wd-transition",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    ...__default__$b,
    props: transitionProps,
    emits: ["click", "before-enter", "enter", "before-leave", "leave", "after-leave", "after-enter"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const getClassNames = (name) => {
        let enter2 = `${props.enterClass} ${props.enterActiveClass}`;
        let enterTo = `${props.enterToClass} ${props.enterActiveClass}`;
        let leave2 = `${props.leaveClass} ${props.leaveActiveClass}`;
        let leaveTo = `${props.leaveToClass} ${props.leaveActiveClass}`;
        if (Array.isArray(name)) {
          for (let index = 0; index < name.length; index++) {
            enter2 = `wd-${name[index]}-enter wd-${name[index]}-enter-active ${enter2}`;
            enterTo = `wd-${name[index]}-enter-to wd-${name[index]}-enter-active ${enterTo}`;
            leave2 = `wd-${name[index]}-leave wd-${name[index]}-leave-active ${leave2}`;
            leaveTo = `wd-${name[index]}-leave-to wd-${name[index]}-leave-active ${leaveTo}`;
          }
        } else if (name) {
          enter2 = `wd-${name}-enter wd-${name}-enter-active ${enter2}`;
          enterTo = `wd-${name}-enter-to wd-${name}-enter-active ${enterTo}`;
          leave2 = `wd-${name}-leave wd-${name}-leave-active ${leave2}`;
          leaveTo = `wd-${name}-leave-to wd-${name}-leave-active ${leaveTo}`;
        }
        return {
          enter: enter2,
          "enter-to": enterTo,
          leave: leave2,
          "leave-to": leaveTo
        };
      };
      const props = __props;
      const emit = __emit;
      const inited = vue.ref(false);
      const display = vue.ref(false);
      const status = vue.ref("");
      const transitionEnded = vue.ref(false);
      const currentDuration = vue.ref(300);
      const classes = vue.ref("");
      const enterPromise = vue.ref(null);
      const enterLifeCyclePromises = vue.ref(null);
      const leaveLifeCyclePromises = vue.ref(null);
      const style = vue.computed(() => {
        return `-webkit-transition-duration:${currentDuration.value}ms;transition-duration:${currentDuration.value}ms;${display.value || !props.destroy ? "" : "display: none;"}${props.customStyle}`;
      });
      const rootClass = vue.computed(() => {
        return `wd-transition ${props.customClass}  ${classes.value}`;
      });
      vue.onBeforeMount(() => {
        if (props.show) {
          enter();
        }
      });
      vue.watch(
        () => props.show,
        (newVal) => {
          handleShow(newVal);
        },
        { deep: true }
      );
      function handleClick() {
        emit("click");
      }
      function handleShow(value) {
        if (value) {
          handleAbortPromise();
          enter();
        } else {
          leave();
        }
      }
      function handleAbortPromise() {
        isPromise(enterPromise.value) && enterPromise.value.abort();
        isPromise(enterLifeCyclePromises.value) && enterLifeCyclePromises.value.abort();
        isPromise(leaveLifeCyclePromises.value) && leaveLifeCyclePromises.value.abort();
        enterPromise.value = null;
        enterLifeCyclePromises.value = null;
        leaveLifeCyclePromises.value = null;
      }
      function enter() {
        enterPromise.value = new AbortablePromise(async (resolve) => {
          try {
            const classNames = getClassNames(props.name);
            const duration = isObj(props.duration) ? props.duration.enter : props.duration;
            status.value = "enter";
            emit("before-enter");
            enterLifeCyclePromises.value = pause();
            await enterLifeCyclePromises.value;
            emit("enter");
            classes.value = classNames.enter;
            currentDuration.value = duration;
            enterLifeCyclePromises.value = pause();
            await enterLifeCyclePromises.value;
            inited.value = true;
            display.value = true;
            enterLifeCyclePromises.value = pause();
            await enterLifeCyclePromises.value;
            enterLifeCyclePromises.value = null;
            transitionEnded.value = false;
            classes.value = classNames["enter-to"];
            resolve();
          } catch (error) {
          }
        });
      }
      async function leave() {
        if (!enterPromise.value) {
          transitionEnded.value = false;
          return onTransitionEnd();
        }
        try {
          await enterPromise.value;
          if (!display.value)
            return;
          const classNames = getClassNames(props.name);
          const duration = isObj(props.duration) ? props.duration.leave : props.duration;
          status.value = "leave";
          emit("before-leave");
          currentDuration.value = duration;
          leaveLifeCyclePromises.value = pause();
          await leaveLifeCyclePromises.value;
          emit("leave");
          classes.value = classNames.leave;
          leaveLifeCyclePromises.value = pause();
          await leaveLifeCyclePromises.value;
          transitionEnded.value = false;
          classes.value = classNames["leave-to"];
          leaveLifeCyclePromises.value = setPromise(currentDuration.value);
          await leaveLifeCyclePromises.value;
          leaveLifeCyclePromises.value = null;
          onTransitionEnd();
          enterPromise.value = null;
        } catch (error) {
        }
      }
      function setPromise(duration) {
        return new AbortablePromise((resolve) => {
          const timer = setTimeout(() => {
            clearTimeout(timer);
            resolve();
          }, duration);
        });
      }
      function onTransitionEnd() {
        if (transitionEnded.value)
          return;
        transitionEnded.value = true;
        if (status.value === "leave") {
          emit("after-leave");
        } else if (status.value === "enter") {
          emit("after-enter");
        }
        if (!props.show && display.value) {
          display.value = false;
        }
      }
      const __returned__ = { getClassNames, props, emit, inited, display, status, transitionEnded, currentDuration, classes, enterPromise, enterLifeCyclePromises, leaveLifeCyclePromises, style, rootClass, handleClick, handleShow, handleAbortPromise, enter, leave, setPromise, onTransitionEnd };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return !_ctx.lazyRender || $setup.inited ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass($setup.rootClass),
        style: vue.normalizeStyle($setup.style),
        onTransitionend: $setup.onTransitionEnd,
        onClick: $setup.handleClick
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )) : vue.createCommentVNode("v-if", true);
  }
  const wdTransition = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-af59a128"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-transition/wd-transition.vue"]]);
  const overlayProps = {
    ...baseProps,
    /**
     * 是否展示遮罩层
     */
    show: makeBooleanProp(false),
    /**
     * 动画时长，单位毫秒
     */
    duration: {
      type: [Object, Number, Boolean],
      default: 300
    },
    /**
     * 是否锁定滚动
     */
    lockScroll: makeBooleanProp(true),
    /**
     * 层级
     */
    zIndex: makeNumberProp(10)
  };
  const __default__$a = {
    name: "wd-overlay",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    ...__default__$a,
    props: overlayProps,
    emits: ["click"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      function handleClick() {
        emit("click");
      }
      function noop() {
      }
      const __returned__ = { props, emit, handleClick, noop, wdTransition };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock($setup["wdTransition"], {
      show: _ctx.show,
      name: "fade",
      "custom-class": "wd-overlay",
      duration: _ctx.duration,
      "custom-style": `z-index: ${_ctx.zIndex}; ${_ctx.customStyle}`,
      onClick: $setup.handleClick,
      onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers(($event) => _ctx.lockScroll ? $setup.noop : "", ["stop", "prevent"]))
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "custom-style"]);
  }
  const wdOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-6e0d1141"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-overlay/wd-overlay.vue"]]);
  const popupProps = {
    ...baseProps,
    /**
     * 动画类型，参见 wd-transition 组件的name
     * 类型：string
     * 可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in
     */
    transition: String,
    /**
     * 关闭按钮
     * 类型：boolean
     * 默认值：false
     */
    closable: makeBooleanProp(false),
    /**
     * 弹出框的位置
     * 类型：string
     * 默认值：center
     * 可选值：center / top / right / bottom / left
     */
    position: makeStringProp("center"),
    /**
     * 点击遮罩是否关闭
     * 类型：boolean
     * 默认值：true
     */
    closeOnClickModal: makeBooleanProp(true),
    /**
     * 动画持续时间
     * 类型：number | boolean
     * 默认值：300
     */
    duration: {
      type: [Number, Boolean],
      default: 300
    },
    /**
     * 是否显示遮罩
     * 类型：boolean
     * 默认值：true
     */
    modal: makeBooleanProp(true),
    /**
     * 设置层级
     * 类型：number
     * 默认值：10
     */
    zIndex: makeNumberProp(10),
    /**
     * 是否当关闭时将弹出层隐藏（display: none)
     * 类型：boolean
     * 默认值：true
     */
    hideWhenClose: makeBooleanProp(true),
    /**
     * 遮罩样式
     * 类型：string
     * 默认值：''
     */
    modalStyle: makeStringProp(""),
    /**
     * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
     * 类型：boolean
     * 默认值：false
     */
    safeAreaInsetBottom: makeBooleanProp(false),
    /**
     * 弹出层是否显示
     */
    modelValue: makeBooleanProp(false),
    /**
     * 弹层内容懒渲染，触发展示时才渲染内容
     * 类型：boolean
     * 默认值：true
     */
    lazyRender: makeBooleanProp(true),
    /**
     * 是否锁定滚动
     * 类型：boolean
     * 默认值：true
     */
    lockScroll: makeBooleanProp(true)
  };
  const __default__$9 = {
    name: "wd-popup",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    ...__default__$9,
    props: popupProps,
    emits: [
      "update:modelValue",
      "before-enter",
      "enter",
      "before-leave",
      "leave",
      "after-leave",
      "after-enter",
      "click-modal",
      "close"
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const transitionName = vue.computed(() => {
        if (props.transition) {
          return props.transition;
        }
        if (props.position === "center") {
          return ["zoom-in", "fade"];
        }
        if (props.position === "left") {
          return "slide-left";
        }
        if (props.position === "right") {
          return "slide-right";
        }
        if (props.position === "bottom") {
          return "slide-up";
        }
        if (props.position === "top") {
          return "slide-down";
        }
        return "slide-up";
      });
      const safeBottom = vue.ref(0);
      const style = vue.computed(() => {
        return `z-index:${props.zIndex}; padding-bottom: ${safeBottom.value}px;${props.customStyle}`;
      });
      const rootClass = vue.computed(() => {
        return `wd-popup wd-popup--${props.position} ${!props.transition && props.position === "center" ? "is-deep" : ""} ${props.customClass || ""}`;
      });
      vue.onBeforeMount(() => {
        if (props.safeAreaInsetBottom) {
          const { safeArea, screenHeight, safeAreaInsets } = uni.getSystemInfoSync();
          if (safeArea) {
            safeBottom.value = safeAreaInsets ? safeAreaInsets.bottom : 0;
          } else {
            safeBottom.value = 0;
          }
        }
      });
      function handleClickModal() {
        emit("click-modal");
        if (props.closeOnClickModal) {
          close();
        }
      }
      function close() {
        emit("close");
        emit("update:modelValue", false);
      }
      function noop() {
      }
      const __returned__ = { props, emit, transitionName, safeBottom, style, rootClass, handleClickModal, close, noop, wdIcon, wdOverlay, wdTransition };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "wd-popup-wrapper" }, [
      _ctx.modal ? (vue.openBlock(), vue.createBlock($setup["wdOverlay"], {
        key: 0,
        show: _ctx.modelValue,
        "z-index": _ctx.zIndex,
        "lock-scroll": _ctx.lockScroll,
        duration: _ctx.duration,
        "custom-style": _ctx.modalStyle,
        onClick: $setup.handleClickModal,
        onTouchmove: $setup.noop
      }, null, 8, ["show", "z-index", "lock-scroll", "duration", "custom-style"])) : vue.createCommentVNode("v-if", true),
      vue.createVNode($setup["wdTransition"], {
        "lazy-render": _ctx.lazyRender,
        "custom-class": $setup.rootClass,
        "custom-style": $setup.style,
        duration: _ctx.duration,
        show: _ctx.modelValue,
        name: $setup.transitionName,
        destroy: _ctx.hideWhenClose,
        onBeforeEnter: _cache[0] || (_cache[0] = ($event) => $setup.emit("before-enter")),
        onEnter: _cache[1] || (_cache[1] = ($event) => $setup.emit("enter")),
        onAfterEnter: _cache[2] || (_cache[2] = ($event) => $setup.emit("after-enter")),
        onBeforeLeave: _cache[3] || (_cache[3] = ($event) => $setup.emit("before-leave")),
        onLeave: _cache[4] || (_cache[4] = ($event) => $setup.emit("leave")),
        onAfterLeave: _cache[5] || (_cache[5] = ($event) => $setup.emit("after-leave"))
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          _ctx.closable ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
            key: 0,
            "custom-class": "wd-popup__close",
            name: "add",
            onClick: $setup.close
          })) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["lazy-render", "custom-class", "custom-style", "duration", "show", "name", "destroy"])
    ]);
  }
  const wdPopup = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-25a8a9f7"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-popup/wd-popup.vue"]]);
  const CELL_GROUP_KEY = Symbol("wd-cell-group");
  const cellGroupProps = {
    ...baseProps,
    /**
     * 分组标题
     */
    title: String,
    /**
     * 分组右侧内容
     */
    value: String,
    /**
     * 分组启用插槽
     */
    useSlot: makeBooleanProp(false),
    /**
     * 是否展示边框线
     */
    border: makeBooleanProp(false)
  };
  function useCell() {
    const { parent: cellGroup, index } = useParent(CELL_GROUP_KEY);
    const border = vue.computed(() => {
      return cellGroup && cellGroup.props.border && index.value;
    });
    return { border };
  }
  const FORM_KEY = Symbol("wd-form");
  const formProps = {
    ...baseProps,
    /**
     * 表单数据对象
     */
    model: makeRequiredProp(Object),
    /**
     * 表单验证规则
     */
    rules: {
      type: Object,
      default: () => ({})
    },
    /**
     * 是否在输入时重置表单校验信息
     */
    resetOnChange: makeBooleanProp(true),
    /**
     * 错误提示类型
     */
    errorType: {
      type: String,
      default: "message"
    }
  };
  const zhCN = {
    calendar: {
      placeholder: "请选择",
      title: "选择日期",
      day: "日",
      week: "周",
      month: "月",
      confirm: "确定",
      startTime: "开始时间",
      endTime: "结束时间",
      to: "至",
      timeFormat: "YY年MM月DD日 HH:mm:ss",
      dateFormat: "YYYY年MM月DD日",
      weekFormat: (year, week) => `${year} 第 ${week} 周`,
      startWeek: "开始周",
      endWeek: "结束周",
      startMonth: "开始月",
      endMonth: "结束月",
      monthFormat: "YYYY年MM月"
    },
    calendarView: {
      startTime: "开始",
      endTime: "结束",
      weeks: {
        sun: "日",
        mon: "一",
        tue: "二",
        wed: "三",
        thu: "四",
        fri: "五",
        sat: "六"
      },
      rangePrompt: (maxRange) => `选择天数不能超过${maxRange}天`,
      rangePromptWeek: (maxRange) => `选择周数不能超过${maxRange}周`,
      rangePromptMonth: (maxRange) => `选择月份不能超过${maxRange}个月`,
      monthTitle: "YYYY年M月",
      yearTitle: "YYYY年",
      month: "M月",
      hour: (value) => `${value}时`,
      minute: (value) => `${value}分`,
      second: (value) => `${value}秒`
    },
    collapse: {
      expand: "展开",
      retract: "收起"
    },
    colPicker: {
      title: "请选择",
      placeholder: "请选择",
      select: "请选择"
    },
    datetimePicker: {
      start: "开始时间",
      end: "结束时间",
      to: "至",
      placeholder: "请选择",
      confirm: "完成",
      cancel: "取消"
    },
    loadmore: {
      loading: "正在努力加载中...",
      finished: "已加载完毕",
      error: "加载失败",
      retry: "点击重试"
    },
    messageBox: {
      inputPlaceholder: "请输入",
      confirm: "确定",
      cancel: "取消",
      inputNoValidate: "输入的数据不合法"
    },
    numberKeyboard: {
      confirm: "完成"
    },
    pagination: {
      prev: "上一页",
      next: "下一页",
      page: (value) => `当前页：${value}`,
      total: (total) => `当前数据：${total}条`,
      size: (size) => `分页大小：${size}`
    },
    picker: {
      cancel: "取消",
      done: "完成",
      placeholder: "请选择"
    },
    imgCropper: {
      confirm: "完成",
      cancel: "取消"
    },
    search: {
      search: "搜索",
      cancel: "取消"
    },
    steps: {
      wait: "未开始",
      finished: "已完成",
      process: "进行中",
      failed: "失败"
    },
    tabs: {
      all: "全部"
    },
    upload: {
      error: "上传失败"
    },
    input: {
      placeholder: "请输入..."
    },
    selectPicker: {
      title: "请选择",
      placeholder: "请选择",
      select: "请选择",
      confirm: "确认",
      filterPlaceholder: "搜索"
    },
    tag: {
      placeholder: "请输入",
      add: "新增标签"
    },
    textarea: {
      placeholder: "请输入..."
    },
    tableCol: {
      indexLabel: "序号"
    },
    signature: {
      confirmText: "确认",
      clearText: "清空",
      revokeText: "撤销",
      restoreText: "恢复"
    }
  };
  const lang = vue.ref("zh-CN");
  const messages = vue.reactive({
    "zh-CN": zhCN
  });
  const Locale = {
    messages() {
      return messages[lang.value];
    },
    use(newLang, newMessage) {
      lang.value = newLang;
      if (newMessage) {
        this.add({ [newLang]: newMessage });
      }
    },
    add(newMessages = {}) {
      deepAssign(messages, newMessages);
    }
  };
  const useTranslate = (name) => {
    const prefix = name ? camelCase(name) + "." : "";
    const translate = (key, ...args) => {
      const currentMessages = Locale.messages();
      const message = getPropByPath(currentMessages, prefix + key);
      return isFunction(message) ? message(...args) : isDef(message) ? message : `${prefix}${key}`;
    };
    return { translate };
  };
  const inputProps = {
    ...baseProps,
    customInputClass: makeStringProp(""),
    customLabelClass: makeStringProp(""),
    // 原生属性
    /**
     * 占位文本
     */
    placeholder: String,
    /**
     * 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight
     */
    placeholderStyle: String,
    /**
     * 原生属性，指定 placeholder 的样式类
     */
    placeholderClass: makeStringProp(""),
    /**
     * 原生属性，指定光标与键盘的距离。取 input 距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离
     */
    cursorSpacing: makeNumberProp(0),
    /**
     * 原生属性，指定focus时的光标位置
     */
    cursor: makeNumberProp(-1),
    /**
     * 原生属性，光标起始位置，自动聚集时有效，需与selection-end搭配使用
     */
    selectionStart: makeNumberProp(-1),
    /**
     * 原生属性，光标结束位置，自动聚集时有效，需与selection-start搭配使用
     */
    selectionEnd: makeNumberProp(-1),
    /**
     * 原生属性，键盘弹起时，是否自动上推页面
     */
    adjustPosition: makeBooleanProp(true),
    /**
     * focus时，点击页面的时候不收起键盘
     */
    holdKeyboard: makeBooleanProp(false),
    /**
     * 设置键盘右下角按钮的文字，仅在type='text'时生效，可选值：done / go / next / search / send
     */
    confirmType: makeStringProp("done"),
    /**
     * 点击键盘右下角按钮时是否保持键盘不收起
     */
    confirmHold: makeBooleanProp(false),
    /**
     * 原生属性，获取焦点
     */
    focus: makeBooleanProp(false),
    /**
     * 类型，可选值：text / number / digit / idcard / safe-password / nickname / tel
     */
    type: makeStringProp("text"),
    /**
     * 原生属性，最大长度
     */
    maxlength: {
      type: Number,
      default: -1
    },
    /**
     * 原生属性，禁用
     */
    disabled: makeBooleanProp(false),
    /**
     * 微信小程序原生属性，强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
     */
    alwaysEmbed: makeBooleanProp(false),
    // 原生属性结束
    /**
     * 输入框的值靠右展示
     */
    alignRight: makeBooleanProp(false),
    /**
     * 绑定值
     */
    modelValue: makeNumericProp(""),
    /**
     * 显示为密码框
     */
    showPassword: makeBooleanProp(false),
    /**
     * 显示清空按钮
     */
    clearable: makeBooleanProp(false),
    /**
     * 只读
     */
    readonly: makeBooleanProp(false),
    /**
     * 前置图标，icon组件中的图标类名
     */
    prefixIcon: String,
    /**
     * 后置图标，icon组件中的图标类名
     */
    suffixIcon: String,
    /**
     * 显示字数限制，需要同时设置 maxlength
     */
    showWordLimit: makeBooleanProp(false),
    /**
     * 设置左侧标题
     */
    label: String,
    /**
     * 设置左侧标题宽度
     */
    labelWidth: makeStringProp(""),
    /**
     * 设置输入框大小，可选值：large
     */
    size: String,
    /**
     * 设置输入框错误状态，错误状态时为红色
     */
    error: makeBooleanProp(false),
    /**
     * 当有label属性时，设置标题和输入框垂直居中，默认为顶部居中
     */
    center: makeBooleanProp(false),
    /**
     * 非 cell 类型下是否隐藏下划线
     */
    noBorder: makeBooleanProp(false),
    /**
     * 是否必填
     */
    required: makeBooleanProp(false),
    /**
     * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
     */
    prop: String,
    /**
     * 表单验证规则，结合wd-form组件使用
     */
    rules: makeArrayProp(),
    /**
     * 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
     * 类型: "focus" | "always"
     * 默认值: "always"
     */
    clearTrigger: makeStringProp("always"),
    /**
     * 是否在点击清除按钮时聚焦输入框
     * 类型: boolean
     * 默认值: true
     */
    focusWhenClear: makeBooleanProp(true),
    /**
     * 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
     * 类型: boolean
     * 默认值: true
     */
    ignoreCompositionEvent: makeBooleanProp(true),
    /**
     * 它提供了用户在编辑元素或其内容时可能输入的数据类型的提示。在符合条件的高版本webview里，uni-app的web和app-vue平台中可使用本属性。
     * 类型: InputMode
     * 可选值: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | "password"
     * 默认值: "text"
     */
    inputmode: makeStringProp("text")
  };
  const __default__$8 = {
    name: "wd-input",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    ...__default__$8,
    props: inputProps,
    emits: [
      "update:modelValue",
      "clear",
      "blur",
      "focus",
      "input",
      "keyboardheightchange",
      "confirm",
      "clicksuffixicon",
      "clickprefixicon",
      "click"
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const slots = vue.useSlots();
      const { translate } = useTranslate("input");
      const isPwdVisible = vue.ref(false);
      const clearing = vue.ref(false);
      const focused = vue.ref(false);
      const focusing = vue.ref(false);
      const inputValue = vue.ref(getInitValue());
      const cell = useCell();
      vue.watch(
        () => props.focus,
        (newValue) => {
          focused.value = newValue;
        },
        { immediate: true, deep: true }
      );
      vue.watch(
        () => props.modelValue,
        (newValue) => {
          inputValue.value = isDef(newValue) ? String(newValue) : "";
        }
      );
      const { parent: form } = useParent(FORM_KEY);
      const placeholderValue = vue.computed(() => {
        return isDef(props.placeholder) ? props.placeholder : translate("placeholder");
      });
      const showClear = vue.computed(() => {
        const { disabled, readonly, clearable, clearTrigger } = props;
        if (clearable && !readonly && !disabled && inputValue.value && (clearTrigger === "always" || props.clearTrigger === "focus" && focusing.value)) {
          return true;
        } else {
          return false;
        }
      });
      const showWordCount = vue.computed(() => {
        const { disabled, readonly, maxlength, showWordLimit } = props;
        return Boolean(!disabled && !readonly && isDef(maxlength) && maxlength > -1 && showWordLimit);
      });
      const errorMessage = vue.computed(() => {
        if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
          return form.errorMessages[props.prop];
        } else {
          return "";
        }
      });
      const isRequired = vue.computed(() => {
        let formRequired = false;
        if (form && form.props.rules) {
          const rules = form.props.rules;
          for (const key in rules) {
            if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
              formRequired = rules[key].some((rule) => rule.required);
            }
          }
        }
        return props.required || props.rules.some((rule) => rule.required) || formRequired;
      });
      const rootClass = vue.computed(() => {
        return `wd-input  ${props.label || slots.label ? "is-cell" : ""} ${props.center ? "is-center" : ""} ${cell.border.value ? "is-border" : ""} ${props.size ? "is-" + props.size : ""} ${props.error ? "is-error" : ""} ${props.disabled ? "is-disabled" : ""}  ${inputValue.value && String(inputValue.value).length > 0 ? "is-not-empty" : ""}  ${props.noBorder ? "is-no-border" : ""} ${props.customClass}`;
      });
      const labelClass = vue.computed(() => {
        return `wd-input__label ${props.customLabelClass} ${isRequired.value ? "is-required" : ""}`;
      });
      const inputPlaceholderClass = vue.computed(() => {
        return `wd-input__placeholder  ${props.placeholderClass}`;
      });
      const labelStyle = vue.computed(() => {
        return props.labelWidth ? objToStyle({
          "min-width": props.labelWidth,
          "max-width": props.labelWidth
        }) : "";
      });
      function getInitValue() {
        const formatted = formatValue(props.modelValue);
        if (!isValueEqual(formatted, props.modelValue)) {
          emit("update:modelValue", formatted);
        }
        return formatted;
      }
      function formatValue(value) {
        const { maxlength } = props;
        if (isDef(maxlength) && maxlength !== -1 && String(value).length > maxlength) {
          return value.toString().slice(0, maxlength);
        }
        return value;
      }
      function togglePwdVisible() {
        isPwdVisible.value = !isPwdVisible.value;
      }
      async function handleClear() {
        clearing.value = true;
        focusing.value = false;
        inputValue.value = "";
        if (props.focusWhenClear) {
          focused.value = false;
        }
        await pause();
        if (props.focusWhenClear) {
          focused.value = true;
          focusing.value = true;
        }
        emit("update:modelValue", inputValue.value);
        emit("clear");
      }
      async function handleBlur() {
        await pause(150);
        if (clearing.value) {
          clearing.value = false;
          return;
        }
        focusing.value = false;
        emit("blur", {
          value: inputValue.value
        });
      }
      function handleFocus({ detail }) {
        focusing.value = true;
        emit("focus", detail);
      }
      function handleInput({ detail }) {
        emit("update:modelValue", inputValue.value);
        emit("input", detail);
      }
      function handleKeyboardheightchange({ detail }) {
        emit("keyboardheightchange", detail);
      }
      function handleConfirm({ detail }) {
        emit("confirm", detail);
      }
      function onClickSuffixIcon() {
        emit("clicksuffixicon");
      }
      function onClickPrefixIcon() {
        emit("clickprefixicon");
      }
      function handleClick(event) {
        emit("click", event);
      }
      function isValueEqual(value1, value2) {
        return isEqual(String(value1), String(value2));
      }
      const __returned__ = { props, emit, slots, translate, isPwdVisible, clearing, focused, focusing, inputValue, cell, form, placeholderValue, showClear, showWordCount, errorMessage, isRequired, rootClass, labelClass, inputPlaceholderClass, labelStyle, getInitValue, formatValue, togglePwdVisible, handleClear, handleBlur, handleFocus, handleInput, handleKeyboardheightchange, handleConfirm, onClickSuffixIcon, onClickPrefixIcon, handleClick, isValueEqual, wdIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass($setup.rootClass),
        style: vue.normalizeStyle(_ctx.customStyle),
        onClick: $setup.handleClick
      },
      [
        _ctx.label || _ctx.$slots.label ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass($setup.labelClass),
            style: vue.normalizeStyle($setup.labelStyle)
          },
          [
            _ctx.prefixIcon || _ctx.$slots.prefix ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "wd-input__prefix"
            }, [
              _ctx.prefixIcon && !_ctx.$slots.prefix ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
                key: 0,
                "custom-class": "wd-input__icon",
                name: _ctx.prefixIcon,
                onClick: $setup.onClickPrefixIcon
              }, null, 8, ["name"])) : vue.renderSlot(_ctx.$slots, "prefix", { key: 1 }, void 0, true)
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "wd-input__label-inner" }, [
              _ctx.label && !_ctx.$slots.label ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createTextVNode(
                    vue.toDisplayString(_ctx.label),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.renderSlot(_ctx.$slots, "label", { key: 1 }, void 0, true)
            ])
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "wd-input__body" }, [
          vue.createElementVNode("view", { class: "wd-input__value" }, [
            (_ctx.prefixIcon || _ctx.$slots.prefix) && !_ctx.label ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "wd-input__prefix"
            }, [
              _ctx.prefixIcon && !_ctx.$slots.prefix ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
                key: 0,
                "custom-class": "wd-input__icon",
                name: _ctx.prefixIcon,
                onClick: $setup.onClickPrefixIcon
              }, null, 8, ["name"])) : vue.renderSlot(_ctx.$slots, "prefix", { key: 1 }, void 0, true)
            ])) : vue.createCommentVNode("v-if", true),
            vue.withDirectives(vue.createElementVNode("input", {
              class: vue.normalizeClass([
                "wd-input__inner",
                _ctx.prefixIcon ? "wd-input__inner--prefix" : "",
                $setup.showWordCount ? "wd-input__inner--count" : "",
                _ctx.alignRight ? "is-align-right" : "",
                _ctx.customInputClass
              ]),
              type: _ctx.type,
              password: _ctx.showPassword && !$setup.isPwdVisible,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.inputValue = $event),
              placeholder: $setup.placeholderValue,
              disabled: _ctx.disabled || _ctx.readonly,
              maxlength: _ctx.maxlength,
              focus: $setup.focused,
              "confirm-type": _ctx.confirmType,
              "confirm-hold": _ctx.confirmHold,
              cursor: _ctx.cursor,
              "cursor-spacing": _ctx.cursorSpacing,
              "placeholder-style": _ctx.placeholderStyle,
              "selection-start": _ctx.selectionStart,
              "selection-end": _ctx.selectionEnd,
              "adjust-position": _ctx.adjustPosition,
              "hold-keyboard": _ctx.holdKeyboard,
              "always-embed": _ctx.alwaysEmbed,
              "placeholder-class": $setup.inputPlaceholderClass,
              ignoreCompositionEvent: _ctx.ignoreCompositionEvent,
              inputmode: _ctx.inputmode,
              onInput: $setup.handleInput,
              onFocus: $setup.handleFocus,
              onBlur: $setup.handleBlur,
              onConfirm: $setup.handleConfirm,
              onKeyboardheightchange: $setup.handleKeyboardheightchange
            }, null, 42, ["type", "password", "placeholder", "disabled", "maxlength", "focus", "confirm-type", "confirm-hold", "cursor", "cursor-spacing", "placeholder-style", "selection-start", "selection-end", "adjust-position", "hold-keyboard", "always-embed", "placeholder-class", "ignoreCompositionEvent", "inputmode"]), [
              [vue.vModelDynamic, $setup.inputValue]
            ]),
            $setup.props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "wd-input__readonly-mask"
            })) : vue.createCommentVNode("v-if", true),
            $setup.showClear || _ctx.showPassword || _ctx.suffixIcon || $setup.showWordCount || _ctx.$slots.suffix ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "wd-input__suffix"
            }, [
              $setup.showClear ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
                key: 0,
                "custom-class": "wd-input__clear",
                name: "error-fill",
                onClick: $setup.handleClear
              })) : vue.createCommentVNode("v-if", true),
              _ctx.showPassword ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
                key: 1,
                "custom-class": "wd-input__icon",
                name: $setup.isPwdVisible ? "view" : "eye-close",
                onClick: $setup.togglePwdVisible
              }, null, 8, ["name"])) : vue.createCommentVNode("v-if", true),
              $setup.showWordCount ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "wd-input__count"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass([
                      $setup.inputValue && String($setup.inputValue).length > 0 ? "wd-input__count-current" : "",
                      String($setup.inputValue).length > _ctx.maxlength ? "is-error" : ""
                    ])
                  },
                  vue.toDisplayString(String($setup.inputValue).length),
                  3
                  /* TEXT, CLASS */
                ),
                vue.createTextVNode(
                  " /" + vue.toDisplayString(_ctx.maxlength),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true),
              _ctx.suffixIcon && !_ctx.$slots.suffix ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
                key: 3,
                "custom-class": "wd-input__icon",
                name: _ctx.suffixIcon,
                onClick: $setup.onClickSuffixIcon
              }, null, 8, ["name"])) : vue.renderSlot(_ctx.$slots, "suffix", { key: 4 }, void 0, true)
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          $setup.errorMessage ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "wd-input__error-message"
            },
            vue.toDisplayString($setup.errorMessage),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-4e0c9774"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-input/wd-input.vue"]]);
  const messageBoxProps = {
    ...baseProps,
    /**
     * 指定唯一标识
     */
    selector: makeStringProp("")
  };
  const messageDefaultOptionKey = "__MESSAGE_OPTION__";
  const defaultOptions$1 = {
    title: "",
    showCancelButton: false,
    show: false,
    closeOnClickModal: true,
    msg: "",
    type: "alert",
    inputType: "text",
    inputValue: "",
    showErr: false,
    zIndex: 99,
    lazyRender: true,
    inputError: ""
  };
  const getMessageDefaultOptionKey = (selector) => {
    return selector ? `${messageDefaultOptionKey}${selector}` : messageDefaultOptionKey;
  };
  const __default__$7 = {
    name: "wd-message-box",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    ...__default__$7,
    props: messageBoxProps,
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const { translate } = useTranslate("message-box");
      const rootClass = vue.computed(() => {
        return `wd-message-box__container ${props.customClass}`;
      });
      const bodyClass = vue.computed(() => {
        return `wd-message-box__body ${!messageState.title ? "is-no-title" : ""} ${messageState.type === "prompt" ? "is-prompt" : ""}`;
      });
      const messageOptionKey = getMessageDefaultOptionKey(props.selector);
      const messageOption = vue.inject(messageOptionKey, vue.ref(defaultOptions$1));
      const messageState = vue.reactive({
        msg: "",
        // 消息内容
        show: false,
        // 是否显示弹框
        title: "",
        // 标题
        showCancelButton: false,
        // 是否展示取消按钮
        closeOnClickModal: true,
        // 是否支持点击蒙层关闭
        confirmButtonText: "",
        // 确定按钮文案
        cancelButtonText: "",
        // 取消按钮文案
        type: "alert",
        // 弹框类型
        inputType: "text",
        // 输入框类型
        inputValue: "",
        // 输入框初始值
        inputPlaceholder: "",
        // 输入框placeholder
        inputError: "",
        // 输入框错误提示文案
        showErr: false,
        // 是否显示错误提示
        zIndex: 99,
        // 弹窗层级
        lazyRender: true
        // 弹层内容懒渲染
      });
      const customConfirmProps = vue.computed(() => {
        const buttonProps2 = deepAssign(
          {
            block: true
          },
          isDef(messageState.confirmButtonProps) ? omitBy(messageState.confirmButtonProps, isUndefined) : {}
        );
        buttonProps2.customClass = `${buttonProps2.customClass || ""} wd-message-box__actions-btn`;
        return buttonProps2;
      });
      const customCancelProps = vue.computed(() => {
        const buttonProps2 = deepAssign(
          {
            block: true,
            type: "info"
          },
          isDef(messageState.cancelButtonProps) ? omitBy(messageState.cancelButtonProps, isUndefined) : {}
        );
        buttonProps2.customClass = `${buttonProps2.customClass || ""} wd-message-box__actions-btn`;
        return buttonProps2;
      });
      vue.watch(
        () => messageOption.value,
        (newVal) => {
          reset(newVal);
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => messageState.show,
        (newValue) => {
          resetErr(!!newValue);
        },
        {
          deep: true,
          immediate: true
        }
      );
      function toggleModal(action2) {
        if (action2 === "modal" && !messageState.closeOnClickModal) {
          return;
        }
        if (messageState.type === "prompt" && action2 === "confirm" && !validate()) {
          return;
        }
        switch (action2) {
          case "confirm":
            if (messageState.beforeConfirm) {
              messageState.beforeConfirm({
                resolve: (isPass) => {
                  if (isPass) {
                    handleConfirm({
                      action: action2,
                      value: messageState.inputValue
                    });
                  }
                }
              });
            } else {
              handleConfirm({
                action: action2,
                value: messageState.inputValue
              });
            }
            break;
          case "cancel":
            handleCancel({
              action: action2
            });
            break;
          default:
            handleCancel({
              action: "modal"
            });
            break;
        }
      }
      function handleConfirm(result) {
        messageState.show = false;
        if (isFunction(messageState.success)) {
          messageState.success(result);
        }
      }
      function handleCancel(result) {
        messageState.show = false;
        if (isFunction(messageState.fail)) {
          messageState.fail(result);
        }
      }
      function validate() {
        if (messageState.inputPattern && !messageState.inputPattern.test(String(messageState.inputValue))) {
          messageState.showErr = true;
          return false;
        }
        if (typeof messageState.inputValidate === "function") {
          const validateResult = messageState.inputValidate(messageState.inputValue);
          if (!validateResult) {
            messageState.showErr = true;
            return false;
          }
        }
        messageState.showErr = false;
        return true;
      }
      function resetErr(val) {
        if (val === false) {
          messageState.showErr = false;
        }
      }
      function inputValChange({ value }) {
        if (value === "") {
          messageState.showErr = false;
          return;
        }
        messageState.inputValue = value;
      }
      function reset(option) {
        if (option) {
          messageState.title = isDef(option.title) ? option.title : "";
          messageState.showCancelButton = isDef(option.showCancelButton) ? option.showCancelButton : false;
          messageState.show = option.show;
          messageState.closeOnClickModal = option.closeOnClickModal;
          messageState.confirmButtonText = option.confirmButtonText;
          messageState.cancelButtonText = option.cancelButtonText;
          messageState.msg = option.msg;
          messageState.type = option.type;
          messageState.inputType = option.inputType;
          messageState.inputSize = option.inputSize;
          messageState.inputValue = option.inputValue;
          messageState.inputPlaceholder = option.inputPlaceholder;
          messageState.inputPattern = option.inputPattern;
          messageState.inputValidate = option.inputValidate;
          messageState.success = option.success;
          messageState.fail = option.fail;
          messageState.beforeConfirm = option.beforeConfirm;
          messageState.inputError = option.inputError;
          messageState.showErr = option.showErr;
          messageState.zIndex = option.zIndex;
          messageState.lazyRender = option.lazyRender;
          messageState.confirmButtonProps = option.confirmButtonProps;
          messageState.cancelButtonProps = option.cancelButtonProps;
        }
      }
      const __returned__ = { props, translate, rootClass, bodyClass, messageOptionKey, messageOption, messageState, customConfirmProps, customCancelProps, toggleModal, handleConfirm, handleCancel, validate, resetErr, inputValChange, reset, wdPopup, wdButton: __easycom_4, wdInput: __easycom_2$1 };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode($setup["wdPopup"], {
        transition: "zoom-in",
        modelValue: $setup.messageState.show,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.messageState.show = $event),
        "close-on-click-modal": $setup.messageState.closeOnClickModal,
        "lazy-render": $setup.messageState.lazyRender,
        "custom-class": "wd-message-box",
        onClickModal: _cache[4] || (_cache[4] = ($event) => $setup.toggleModal("modal")),
        "z-index": $setup.messageState.zIndex,
        duration: 200
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass($setup.rootClass)
            },
            [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass($setup.bodyClass)
                },
                [
                  $setup.messageState.title ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: "wd-message-box__title"
                    },
                    vue.toDisplayString($setup.messageState.title),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", { class: "wd-message-box__content" }, [
                    $setup.messageState.type === "prompt" ? (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      { key: 0 },
                      [
                        vue.createVNode($setup["wdInput"], {
                          modelValue: $setup.messageState.inputValue,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.messageState.inputValue = $event),
                          type: $setup.messageState.inputType,
                          size: $setup.messageState.inputSize,
                          placeholder: $setup.messageState.inputPlaceholder,
                          onInput: $setup.inputValChange
                        }, null, 8, ["modelValue", "type", "size", "placeholder"]),
                        $setup.messageState.showErr ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "wd-message-box__input-error"
                          },
                          vue.toDisplayString($setup.messageState.inputError || $setup.translate("inputNoValidate")),
                          1
                          /* TEXT */
                        )) : vue.createCommentVNode("v-if", true)
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : vue.createCommentVNode("v-if", true),
                    vue.renderSlot(_ctx.$slots, "default", {}, () => [
                      vue.createTextVNode(
                        vue.toDisplayString($setup.messageState.msg),
                        1
                        /* TEXT */
                      )
                    ], true)
                  ])
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(`wd-message-box__actions ${$setup.messageState.showCancelButton ? "wd-message-box__flex" : "wd-message-box__block"}`)
                },
                [
                  $setup.messageState.showCancelButton ? (vue.openBlock(), vue.createBlock(
                    $setup["wdButton"],
                    vue.mergeProps({ key: 0 }, $setup.customCancelProps, {
                      onClick: _cache[1] || (_cache[1] = ($event) => $setup.toggleModal("cancel"))
                    }),
                    {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(
                          vue.toDisplayString($setup.messageState.cancelButtonText || $setup.translate("cancel")),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    },
                    16
                    /* FULL_PROPS */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createVNode(
                    $setup["wdButton"],
                    vue.mergeProps($setup.customConfirmProps, {
                      onClick: _cache[2] || (_cache[2] = ($event) => $setup.toggleModal("confirm"))
                    }),
                    {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(
                          vue.toDisplayString($setup.messageState.confirmButtonText || $setup.translate("confirm")),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    },
                    16
                    /* FULL_PROPS */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["modelValue", "close-on-click-modal", "lazy-render", "z-index"])
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-c8139c88"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-message-box/wd-message-box.vue"]]);
  const loadingProps = {
    ...baseProps,
    /**
     * 加载指示器类型，可选值：'outline' | 'ring'
     */
    type: makeStringProp("ring"),
    /**
     * 设置加载指示器颜色
     */
    color: makeStringProp("#4D80F0"),
    /**
     * 设置加载指示器大小
     */
    size: makeNumericProp("")
  };
  const __default__$6 = {
    name: "wd-loading",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$6,
    props: loadingProps,
    setup(__props, { expose: __expose }) {
      __expose();
      const svgDefineId = context.id++;
      const svgDefineId1 = context.id++;
      const svgDefineId2 = context.id++;
      const icon = {
        outline(color = "#4D80F0") {
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="${svgDefineId}"><stop stop-color="#FFF" offset="0%" stop-opacity="0"/><stop stop-color="#FFF" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${color}"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#${svgDefineId}) " stroke-width="3.5" stroke-linecap="round"/></g></svg>`;
        },
        ring(color = "#4D80F0", intermediateColor2 = "#a6bff7") {
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="${svgDefineId1}" gradientUnits="userSpaceOnUse" x1="50" x2="50" y2="180"><stop offset="0" stop-color="${color}"></stop> <stop offset="1" stop-color="${intermediateColor2}"></stop></linearGradient> <path fill="url(#${svgDefineId1})" d="M20 100c0-44.1 35.9-80 80-80V0C44.8 0 0 44.8 0 100s44.8 100 100 100v-20c-44.1 0-80-35.9-80-80z"></path> <linearGradient id="${svgDefineId2}" gradientUnits="userSpaceOnUse" x1="150" y1="20" x2="150" y2="180"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop> <stop offset="1" stop-color="${intermediateColor2}"></stop></linearGradient> <path fill="url(#${svgDefineId2})" d="M100 0v20c44.1 0 80 35.9 80 80s-35.9 80-80 80v20c55.2 0 100-44.8 100-100S155.2 0 100 0z"></path> <circle cx="100" cy="10" r="10" fill="${color}"></circle></svg>`;
        }
      };
      const props = __props;
      const svg = vue.ref("");
      const intermediateColor = vue.ref("");
      const iconSize = vue.ref(null);
      vue.watch(
        () => props.size,
        (newVal) => {
          iconSize.value = addUnit(newVal);
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => props.type,
        () => {
          buildSvg();
        },
        {
          deep: true,
          immediate: true
        }
      );
      const rootStyle = vue.computed(() => {
        const style = {};
        if (isDef(iconSize.value)) {
          style.height = addUnit(iconSize.value);
          style.width = addUnit(iconSize.value);
        }
        return `${objToStyle(style)} ${props.customStyle}`;
      });
      vue.onBeforeMount(() => {
        intermediateColor.value = gradient(props.color, "#ffffff", 2)[1];
        buildSvg();
      });
      function buildSvg() {
        const { type, color } = props;
        let ringType = isDef(type) ? type : "ring";
        const svgStr = `"data:image/svg+xml;base64,${encode(ringType === "ring" ? icon[ringType](color, intermediateColor.value) : icon[ringType](color))}"`;
        svg.value = svgStr;
      }
      const __returned__ = { svgDefineId, svgDefineId1, svgDefineId2, icon, props, svg, intermediateColor, iconSize, rootStyle, buildSvg };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(`wd-loading ${$setup.props.customClass}`),
        style: vue.normalizeStyle($setup.rootStyle)
      },
      [
        vue.createElementVNode("view", { class: "wd-loading__body" }, [
          vue.createElementVNode(
            "view",
            {
              class: "wd-loading__svg",
              style: vue.normalizeStyle(`background-image: url(${$setup.svg});`)
            },
            null,
            4
            /* STYLE */
          )
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const wdLoading = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-f2b508ee"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue"]]);
  const toastDefaultOptionKey = "__TOAST_OPTION__";
  const defaultOptions = {
    duration: 2e3,
    show: false
  };
  const None = Symbol("None");
  function useToast(selector = "") {
    const toastOptionKey = getToastOptionKey(selector);
    const toastOption = vue.inject(toastOptionKey, vue.ref(None));
    if (toastOption.value === None) {
      toastOption.value = defaultOptions;
      vue.provide(toastOptionKey, toastOption);
    }
    let timer = null;
    const createMethod = (toastOptions) => {
      return (options) => {
        return show(deepMerge(toastOptions, typeof options === "string" ? { msg: options } : options));
      };
    };
    const show = (option) => {
      const options = deepMerge(defaultOptions, typeof option === "string" ? { msg: option } : option);
      toastOption.value = deepMerge(options, {
        show: true
      });
      timer && clearTimeout(timer);
      if (toastOption.value.duration && toastOption.value.duration > 0) {
        timer = setTimeout(() => {
          timer && clearTimeout(timer);
          close();
        }, options.duration);
      }
    };
    const loading = createMethod({
      iconName: "loading",
      duration: 0,
      cover: true
    });
    const success = createMethod({
      iconName: "success",
      duration: 1500
    });
    const error = createMethod({ iconName: "error" });
    const warning = createMethod({ iconName: "warning" });
    const info = createMethod({ iconName: "info" });
    const close = () => {
      toastOption.value = { show: false };
    };
    return {
      show,
      loading,
      success,
      error,
      warning,
      info,
      close
    };
  }
  const getToastOptionKey = (selector) => {
    return selector ? `${toastDefaultOptionKey}${selector}` : toastDefaultOptionKey;
  };
  const toastIcon = {
    success() {
      return '<svg width="42px" height="42px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>成功</title><desc>Created with Sketch.</desc><defs><filter x="-63.2%" y="-80.0%" width="226.3%" height="260.0%" filterUnits="objectBoundingBox" id="filter-1"><feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.122733141   0 0 0 0 0.710852582   0 0 0 0 0.514812768  0 0 0 1 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter><rect id="path-2" x="3.4176226" y="5.81442199" width="3" height="8.5" rx="1.5"></rect><linearGradient x1="50%" y1="0.126649064%" x2="50%" y2="100%" id="linearGradient-4"><stop stop-color="#ACFFBD" stop-opacity="0.208123907" offset="0%"></stop><stop stop-color="#10B87C" offset="100%"></stop></linearGradient></defs><g id="规范" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="反馈-轻提示" transform="translate(-388.000000, -538.000000)"><g id="成功" transform="translate(388.000000, 538.000000)"><circle id="Oval" fill="#34D19D" opacity="0.400000006" cx="21" cy="21" r="20"></circle><circle id="Oval" fill="#34D19D" cx="21" cy="21" r="16"></circle><g id="Group-6" filter="url(#filter-1)" transform="translate(11.500000, 14.000000)"><mask id="mask-3" fill="white"><use xlink:href="#path-2"></use></mask><use id="Rectangle-Copy-24" fill="#C4FFEB" transform="translate(4.917623, 10.064422) rotate(-45.000000) translate(-4.917623, -10.064422) " xlink:href="#path-2"></use><rect id="Rectangle" fill="url(#linearGradient-4)" mask="url(#mask-3)" transform="translate(6.215869, 11.372277) rotate(-45.000000) translate(-6.215869, -11.372277) " x="4.71586891" y="9.52269089" width="3" height="3.69917136"></rect><rect id="Rectangle" fill="#FFFFFF" transform="translate(11.636236, 7.232744) scale(1, -1) rotate(-45.000000) translate(-11.636236, -7.232744) " x="10.1362361" y="-1.02185365" width="3" height="16.5091951" rx="1.5"></rect></g></g></g></g></svg>';
    },
    warning() {
      return '<svg width="42px" height="42px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>警告</title><desc>Created with Sketch.</desc> <defs> <filter x="-240.0%" y="-60.0%" width="580.0%" height="220.0%" filterUnits="objectBoundingBox" id="filter-1"><feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.824756567   0 0 0 0 0.450356612   0 0 0 0 0.168550194  0 0 0 1 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode> <feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><g id="规范" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="反馈-轻提示" transform="translate(-580.000000, -538.000000)"> <g id="警告" transform="translate(580.000000, 538.000000)"><circle id="Oval" fill="#F0883A" opacity="0.400000006" cx="21" cy="21" r="20"></circle><circle id="Oval" fill="#F0883A" cx="21" cy="21" r="16"></circle><g id="Group-6" filter="url(#filter-1)" transform="translate(18.500000, 10.800000)"><rect id="Rectangle" fill="#FFFFFF" transform="translate(2.492935, 7.171583) scale(1, -1) rotate(-360.000000) translate(-2.492935, -7.171583) " x="0.992934699" y="0.955464537" width="3" height="12.4322365" rx="1.5"></rect><rect id="Rectangle-Copy-25" fill="#FFDEC5" transform="translate(2.508751, 17.202636) scale(1, -1) rotate(-360.000000) translate(-2.508751, -17.202636) " x="1.00875134" y="15.200563" width="3" height="4.00414639" rx="1.5"></rect></g></g></g></g></svg>';
    },
    info() {
      return '<svg width="42px" height="42px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>常规</title><desc>Created with Sketch.</desc><defs><filter x="-300.0%" y="-57.1%" width="700.0%" height="214.3%" filterUnits="objectBoundingBox" id="filter-1"><feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.362700096   0 0 0 0 0.409035039   0 0 0 0 0.520238904  0 0 0 1 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><g id="规范" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="反馈-轻提示" transform="translate(-772.000000, -538.000000)"><g id="常规" transform="translate(772.000000, 538.000000)"><circle id="Oval" fill="#909CB7" opacity="0.4" cx="21" cy="21" r="20"></circle><circle id="Oval" fill="#909CB7" cx="21" cy="21" r="16"></circle><g id="Group-6" filter="url(#filter-1)" transform="translate(18.500000, 9.800000)"><g id="编组-2" transform="translate(2.492935, 10.204709) rotate(-180.000000) translate(-2.492935, -10.204709) translate(0.992935, 0.204709)"><rect id="Rectangle" fill="#FFFFFF" transform="translate(1.500000, 7.000000) scale(1, -1) rotate(-360.000000) translate(-1.500000, -7.000000) " x="0" y="0" width="3" height="14" rx="1.5"></rect><rect id="Rectangle-Copy-25" fill="#EEEEEE" transform="translate(1.500000, 18.000000) scale(1, -1) rotate(-360.000000) translate(-1.500000, -18.000000) " x="0" y="16" width="3" height="4" rx="1.5"></rect></g></g></g></g></g></svg>';
    },
    error() {
      return '<svg width="42px" height="42px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>toast</title><desc>Created with Sketch.</desc><defs><linearGradient x1="99.6229896%" y1="50.3770104%" x2="0.377010363%" y2="50.3770104%" id="linearGradient-1"><stop stop-color="#FFDFDF" offset="0%"></stop><stop stop-color="#F9BEBE" offset="100%"></stop></linearGradient><linearGradient x1="0.377010363%" y1="50.3770104%" x2="99.6229896%" y2="50.3770104%" id="linearGradient-2"><stop stop-color="#FFDFDF" offset="0%"></stop><stop stop-color="#F9BEBE" offset="100%"></stop></linearGradient></defs><g id="规范" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="反馈-轻提示" transform="translate(-196.000000, -538.000000)"> <g id="toast" transform="translate(196.000000, 538.000000)"><circle id="Oval" fill="#FA4350" opacity="0.400000006" cx="21" cy="21" r="20"></circle><circle id="Oval" fill="#FA4350" opacity="0.900000036" cx="21" cy="21" r="16"></circle><rect id="矩形" fill="#FFDFDF" transform="translate(21.071068, 21.071068) rotate(-225.000000) translate(-21.071068, -21.071068) " x="12.5710678" y="19.5710678" width="17" height="3" rx="1.5"></rect><rect id="矩形" fill="url(#linearGradient-1)" transform="translate(19.303301, 22.838835) rotate(-225.000000) translate(-19.303301, -22.838835) " x="17.3033009" y="21.3388348" width="4" height="3"></rect><rect id="矩形" fill="url(#linearGradient-2)" transform="translate(22.838835, 19.303301) rotate(-225.000000) translate(-22.838835, -19.303301) " x="20.8388348" y="17.8033009" width="4" height="3"></rect><rect id="矩形" fill="#FFFFFF" transform="translate(21.071068, 21.071068) rotate(-315.000000) translate(-21.071068, -21.071068) " x="12.5710678" y="19.5710678" width="17" height="3" rx="1.5"></rect></g></g></g></svg>';
    }
  };
  const toastProps = {
    ...baseProps,
    /**
     * 选择器
     * @type {string}
     * @default ''
     */
    selector: makeStringProp(""),
    /**
     * 提示信息
     * @type {string}
     * @default ''
     */
    msg: {
      type: String,
      default: ""
    },
    /**
     * 排列方向
     * @type {'vertical' | 'horizontal'}
     * @default 'horizontal'
     */
    direction: makeStringProp("horizontal"),
    /**
     * 图标名称
     * @type {'success' | 'error' | 'warning' | 'loading' | 'info'}
     * @default ''
     */
    iconName: {
      type: String,
      default: ""
    },
    /**
     * 图标大小
     * @type {number}
     */
    iconSize: Number,
    /**
     * 加载类型
     * @type {'outline' | 'ring'}
     * @default 'outline'
     */
    loadingType: makeStringProp("outline"),
    /**
     * 加载颜色
     * @type {string}
     * @default '#4D80F0'
     */
    loadingColor: {
      type: String,
      default: "#4D80F0"
    },
    /**
     * 加载大小
     * @type {number}
     */
    loadingSize: Number,
    /**
     * 图标颜色
     * @type {string}
     */
    iconColor: String,
    /**
     * 位置
     * @type {'top' | 'middle-top' | 'middle' | 'bottom'}
     * @default 'middle-top'
     */
    position: makeStringProp("middle-top"),
    /**
     * 层级
     * @type {number}
     * @default 100
     */
    zIndex: {
      type: Number,
      default: 100
    },
    /**
     * 是否存在遮罩层
     * @type {boolean}
     * @default false
     */
    cover: {
      type: Boolean,
      default: false
    },
    /**
     * 图标类名
     * @type {string}
     * @default ''
     */
    iconClass: {
      type: String,
      default: ""
    },
    /**
     * 类名前缀
     * @type {string}
     * @default 'wd-icon'
     */
    classPrefix: {
      type: String,
      default: "wd-icon"
    },
    /**
     * 完全展示后的回调函数
     * @type {Function}
     */
    opened: Function,
    /**
     * 完全关闭时的回调函数
     * @type {Function}
     */
    closed: Function
  };
  const __default__$5 = {
    name: "wd-toast",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$5,
    props: toastProps,
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const iconName = vue.ref("");
      const msg = vue.ref("");
      const position = vue.ref("middle");
      const show = vue.ref(false);
      const zIndex = vue.ref(100);
      const loadingType = vue.ref("outline");
      const loadingColor = vue.ref("#4D80F0");
      const iconSize = vue.ref();
      const loadingSize = vue.ref();
      const svgStr = vue.ref("");
      const cover = vue.ref(false);
      const classPrefix = vue.ref("wd-icon");
      const iconClass = vue.ref("");
      const direction = vue.ref("horizontal");
      let opened = null;
      let closed = null;
      const toastOptionKey = getToastOptionKey(props.selector);
      const toastOption = vue.inject(toastOptionKey, vue.ref(defaultOptions));
      vue.watch(
        () => toastOption.value,
        (newVal) => {
          reset(newVal);
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => iconName.value,
        () => {
          buildSvg();
        },
        {
          deep: true,
          immediate: true
        }
      );
      const transitionStyle = vue.computed(() => {
        const style = {
          "z-index": zIndex.value,
          position: "fixed",
          top: "50%",
          left: 0,
          width: "100%",
          transform: "translate(0, -50%)",
          "text-align": "center",
          "pointer-events": "none"
        };
        return objToStyle(style);
      });
      const rootClass = vue.computed(() => {
        return `wd-toast ${props.customClass} wd-toast--${position.value} ${(iconName.value !== "loading" || msg.value) && (iconName.value || iconClass.value) ? "wd-toast--with-icon" : ""} ${iconName.value === "loading" && !msg.value ? "wd-toast--loading" : ""} ${direction.value === "vertical" ? "is-vertical" : ""}`;
      });
      const svgStyle = vue.computed(() => {
        const style = {
          backgroundImage: `url(${svgStr.value})`
        };
        if (isDef(iconSize.value)) {
          style.width = iconSize.value;
          style.height = iconSize.value;
        }
        return objToStyle(style);
      });
      vue.onBeforeMount(() => {
        buildSvg();
      });
      function handleAfterEnter() {
        if (isFunction(opened)) {
          opened();
        }
      }
      function handleAfterLeave() {
        if (isFunction(closed)) {
          closed();
        }
      }
      function buildSvg() {
        if (iconName.value !== "success" && iconName.value !== "warning" && iconName.value !== "info" && iconName.value !== "error")
          return;
        const iconSvg = toastIcon[iconName.value]();
        const iconSvgStr = `"data:image/svg+xml;base64,${encode(iconSvg)}"`;
        svgStr.value = iconSvgStr;
      }
      function reset(option) {
        show.value = isDef(option.show) ? option.show : false;
        if (show.value) {
          mergeOptionsWithProps(option, props);
        }
      }
      function mergeOptionsWithProps(option, props2) {
        iconName.value = isDef(option.iconName) ? option.iconName : props2.iconName;
        iconClass.value = isDef(option.iconClass) ? option.iconClass : props2.iconClass;
        msg.value = isDef(option.msg) ? option.msg : props2.msg;
        position.value = isDef(option.position) ? option.position : props2.position;
        zIndex.value = isDef(option.zIndex) ? option.zIndex : props2.zIndex;
        loadingType.value = isDef(option.loadingType) ? option.loadingType : props2.loadingType;
        loadingColor.value = isDef(option.loadingColor) ? option.loadingColor : props2.loadingColor;
        iconSize.value = isDef(option.iconSize) ? addUnit(option.iconSize) : isDef(props2.iconSize) ? addUnit(props2.iconSize) : void 0;
        loadingSize.value = isDef(option.loadingSize) ? addUnit(option.loadingSize) : isDef(props2.loadingSize) ? addUnit(props2.loadingSize) : void 0;
        cover.value = isDef(option.cover) ? option.cover : props2.cover;
        classPrefix.value = isDef(option.classPrefix) ? option.classPrefix : props2.classPrefix;
        direction.value = isDef(option.direction) ? option.direction : props2.direction;
        closed = isFunction(option.closed) ? option.closed : isFunction(props2.closed) ? props2.closed : null;
        opened = isFunction(option.opened) ? option.opened : isFunction(props2.opened) ? props2.opened : null;
      }
      const __returned__ = { props, iconName, msg, position, show, zIndex, loadingType, loadingColor, iconSize, loadingSize, svgStr, cover, classPrefix, iconClass, direction, get opened() {
        return opened;
      }, set opened(v) {
        opened = v;
      }, get closed() {
        return closed;
      }, set closed(v) {
        closed = v;
      }, toastOptionKey, toastOption, transitionStyle, rootClass, svgStyle, handleAfterEnter, handleAfterLeave, buildSvg, reset, mergeOptionsWithProps, wdIcon, wdLoading, wdOverlay, wdTransition };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        $setup.cover ? (vue.openBlock(), vue.createBlock($setup["wdOverlay"], {
          key: 0,
          "z-index": $setup.zIndex,
          "lock-scroll": "",
          show: $setup.show,
          "custom-style": "background-color: transparent;pointer-events: auto;"
        }, null, 8, ["z-index", "show"])) : vue.createCommentVNode("v-if", true),
        vue.createVNode($setup["wdTransition"], {
          name: "fade",
          show: $setup.show,
          "custom-style": $setup.transitionStyle,
          onAfterEnter: $setup.handleAfterEnter,
          onAfterLeave: $setup.handleAfterLeave
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass($setup.rootClass)
              },
              [
                vue.createCommentVNode("iconName优先级更高"),
                $setup.iconName === "loading" ? (vue.openBlock(), vue.createBlock($setup["wdLoading"], {
                  key: 0,
                  type: $setup.loadingType,
                  color: $setup.loadingColor,
                  size: $setup.loadingSize,
                  "custom-class": `wd-toast__icon ${$setup.direction === "vertical" ? "is-vertical" : ""}`
                }, null, 8, ["type", "color", "size", "custom-class"])) : $setup.iconName === "success" || $setup.iconName === "warning" || $setup.iconName === "info" || $setup.iconName === "error" ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    class: vue.normalizeClass(`wd-toast__iconWrap wd-toast__icon ${$setup.direction === "vertical" ? "is-vertical" : ""}`)
                  },
                  [
                    vue.createElementVNode("view", { class: "wd-toast__iconBox" }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: "wd-toast__iconSvg",
                          style: vue.normalizeStyle($setup.svgStyle)
                        },
                        null,
                        4
                        /* STYLE */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                )) : $setup.iconClass ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
                  key: 2,
                  "custom-class": `wd-toast__icon ${$setup.direction === "vertical" ? "is-vertical" : ""}`,
                  size: $setup.iconSize,
                  "class-prefix": $setup.classPrefix,
                  name: $setup.iconClass
                }, null, 8, ["custom-class", "size", "class-prefix", "name"])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode("文本"),
                $setup.msg ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 3,
                    class: "wd-toast__msg"
                  },
                  vue.toDisplayString($setup.msg),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["show", "custom-style"])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-fce8c80a"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-toast/wd-toast.vue"]]);
  const videoPreviewProps = {
    ...baseProps
  };
  const __default__$4 = {
    name: "wd-video-preview",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$4,
    props: videoPreviewProps,
    setup(__props, { expose: __expose }) {
      const showPopup = vue.ref(false);
      const previdewVideo = vue.reactive({ url: "", poster: "", title: "" });
      function open(video) {
        showPopup.value = true;
        previdewVideo.url = video.url;
        previdewVideo.poster = video.poster;
        previdewVideo.title = video.title;
      }
      function close() {
        showPopup.value = false;
        vue.nextTick(() => {
          handleClosed();
        });
      }
      function handleClosed() {
        previdewVideo.url = "";
        previdewVideo.poster = "";
        previdewVideo.title = "";
      }
      __expose({
        open,
        close
      });
      const __returned__ = { showPopup, previdewVideo, open, close, handleClosed, wdIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return $setup.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(`wd-video-preview ${_ctx.customClass}`),
        style: vue.normalizeStyle(_ctx.customStyle),
        onClick: $setup.close
      },
      [
        vue.createElementVNode("view", {
          class: "wd-video-preview__video",
          onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          $setup.previdewVideo.url ? (vue.openBlock(), vue.createElementBlock("video", {
            key: 0,
            class: "wd-video-preview__video",
            controls: true,
            poster: $setup.previdewVideo.poster,
            title: $setup.previdewVideo.title,
            "play-btn-position": "center",
            enableNative: true,
            src: $setup.previdewVideo.url,
            "enable-progress-gesture": false
          }, null, 8, ["poster", "title", "src"])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createVNode($setup["wdIcon"], {
          name: "close",
          "custom-class": `wd-video-preview__close`,
          onClick: $setup.close
        })
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const wdVideoPreview = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-f37e4d17"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-video-preview/wd-video-preview.vue"]]);
  const UPLOAD_STATUS = {
    PENDING: "pending",
    LOADING: "loading",
    SUCCESS: "success",
    FAIL: "fail"
  };
  function useUpload() {
    let currentTask = null;
    const abort = (task) => {
      if (task) {
        task.abort();
      } else if (currentTask) {
        currentTask.abort();
        currentTask = null;
      }
    };
    const defaultUpload = (file, formData, options) => {
      if (options.abortPrevious) {
        abort();
      }
      const uploadTask = uni.uploadFile({
        url: options.action,
        header: options.header,
        name: options.name,
        fileName: options.name,
        fileType: options.fileType,
        formData,
        filePath: file.url,
        success(res) {
          if (res.statusCode === options.statusCode) {
            options.onSuccess(res, file, formData);
          } else {
            options.onError({ ...res, errMsg: res.errMsg || "" }, file, formData);
          }
        },
        fail(err) {
          options.onError(err, file, formData);
        }
      });
      currentTask = uploadTask;
      uploadTask.onProgressUpdate((res) => {
        options.onProgress(res, file);
      });
      return uploadTask;
    };
    const startUpload = (file, options) => {
      const {
        uploadMethod,
        formData = {},
        action: action2,
        name = "file",
        header = {},
        fileType = "image",
        statusCode = 200,
        statusKey = "status",
        abortPrevious = false
      } = options;
      file[statusKey] = UPLOAD_STATUS.LOADING;
      const uploadOptions = {
        action: action2,
        header,
        name,
        fileName: name,
        fileType,
        statusCode,
        abortPrevious,
        onSuccess: (res, file2, formData2) => {
          var _a;
          file2[statusKey] = UPLOAD_STATUS.SUCCESS;
          currentTask = null;
          (_a = options.onSuccess) == null ? void 0 : _a.call(options, res, file2, formData2);
        },
        onError: (error, file2, formData2) => {
          var _a;
          file2[statusKey] = UPLOAD_STATUS.FAIL;
          file2.error = error.errMsg;
          currentTask = null;
          (_a = options.onError) == null ? void 0 : _a.call(options, error, file2, formData2);
        },
        onProgress: (res, file2) => {
          var _a;
          file2.percent = res.progress;
          (_a = options.onProgress) == null ? void 0 : _a.call(options, res, file2);
        }
      };
      if (isFunction(uploadMethod)) {
        return uploadMethod(file, formData, uploadOptions);
      } else {
        return defaultUpload(file, formData, uploadOptions);
      }
    };
    function formatImage(res) {
      if (isArray(res.tempFiles)) {
        return res.tempFiles.map((item) => ({
          path: item.path || "",
          name: item.name || "",
          size: item.size,
          type: "image",
          thumb: item.path || ""
        }));
      }
      return [
        {
          path: res.tempFiles.path || "",
          name: res.tempFiles.name || "",
          size: res.tempFiles.size,
          type: "image",
          thumb: res.tempFiles.path || ""
        }
      ];
    }
    function formatVideo(res) {
      return [
        {
          path: res.tempFilePath || res.filePath || "",
          name: res.name || "",
          size: res.size,
          type: "video",
          thumb: res.thumbTempFilePath || "",
          duration: res.duration
        }
      ];
    }
    function chooseFile({
      multiple,
      sizeType,
      sourceType,
      maxCount,
      accept,
      compressed,
      maxDuration,
      camera,
      extension
    }) {
      return new Promise((resolve, reject) => {
        switch (accept) {
          case "image":
            uni.chooseImage({
              count: multiple ? Math.min(maxCount || 9, 9) : 1,
              // 默认9,最大9
              sizeType,
              sourceType,
              success: (res) => resolve(formatImage(res)),
              fail: reject
            });
            break;
          case "video":
            uni.chooseVideo({
              sourceType,
              compressed,
              maxDuration,
              camera,
              success: (res) => resolve(formatVideo(res)),
              fail: reject
            });
            break;
          case "all":
            break;
          default:
            uni.chooseImage({
              count: multiple ? Math.min(maxCount || 9, 9) : 1,
              // 默认9,最大9
              sizeType,
              sourceType,
              success: (res) => resolve(formatImage(res)),
              fail: reject
            });
            break;
        }
      });
    }
    return {
      startUpload,
      abort,
      UPLOAD_STATUS,
      chooseFile
    };
  }
  const uploadProps = {
    ...baseProps,
    /**
     * 上传的文件列表,例如:[{name:'food.jpg',url:'https://xxx.cdn.com/xxx.jpg'}]
     * 类型：array
     * 默认值：[]
     */
    fileList: makeArrayProp(),
    /**
     * 必选参数，上传的地址
     * 类型：string
     * 默认值：''
     */
    action: makeStringProp(""),
    /**
     * 设置上传的请求头部
     * 类型：object
     * 默认值：{}
     */
    header: { type: Object, default: () => ({}) },
    /**
     * 是否支持多选文件
     * 类型：boolean
     * 默认值：false
     */
    multiple: makeBooleanProp(false),
    /**
     * 是否禁用
     * 类型：boolean
     * 默认值：false
     */
    disabled: makeBooleanProp(false),
    /**
     * 最大允许上传个数
     * 类型：number
     * 默认值：无
     */
    limit: Number,
    /**
     * 限制上传个数的情况下，是否展示当前上传的个数
     * 类型：boolean
     * 默认值：true
     */
    showLimitNum: makeBooleanProp(true),
    /**
     * 文件大小限制，单位为byte
     * 类型：number
     * 默认值：Number.MAX_VALUE
     */
    maxSize: makeNumberProp(Number.MAX_VALUE),
    /**
     * 选择图片的来源，chooseImage接口详细参数，查看官方手册
     * 类型：array
     * 默认值：['album','camera']
     */
    sourceType: {
      type: Array,
      default: () => ["album", "camera"]
    },
    /**
     * 所选的图片的尺寸，chooseImage接口详细参数，查看官方手册
     * 类型：array
     * 默认值：['original','compressed']
     */
    sizeType: {
      type: Array,
      default: () => ["original", "compressed"]
    },
    /**
     * 文件对应的key，开发者在服务端可以通过这个key获取文件的二进制内容，uploadFile接口详细参数，查看官方手册
     * 类型：string
     * 默认值：'file'
     */
    name: makeStringProp("file"),
    /**
     * HTTP请求中其他额外的formdata，uploadFile接口详细参数，查看官方手册
     * 类型：object
     * 默认值：{}
     */
    formData: { type: Object, default: () => {
    } },
    /**
     * 预览失败执行操作
     * 类型：function({index,imgList})
     * 默认值：-
     */
    onPreviewFail: Function,
    /**
     * 上传文件之前的钩子，参数为上传的文件和文件列表，若返回false或者返回Promise且被reject，则停止上传。
     * 类型：function({files,fileList,resolve})
     * 默认值：-
     */
    beforeUpload: Function,
    /**
     * 选择图片之前的钩子，参数为文件列表，若返回false或者返回Promise且被reject，则停止上传。
     * 类型：function({fileList,resolve})
     * 默认值：-
     */
    beforeChoose: Function,
    /**
     * 删除文件之前的钩子，参数为要删除的文件和文件列表，若返回false或者返回Promise且被reject，则停止上传。
     * 类型：function({file,fileList,resolve})
     * 默认值：-
     */
    beforeRemove: Function,
    /**
     * 图片预览前的钩子，参数为预览的图片下标和图片列表，若返回false或者返回Promise且被reject，则停止上传。
     * 类型：function({index,imgList,resolve})
     * 默认值：-
     */
    beforePreview: Function,
    /**
     * 构建上传formData的钩子，参数为上传的文件、待处理的formData，返回值为处理后的formData，若返回false或者返回Promise且被reject，则停止上传。
     * 类型：function({file,formData,resolve})
     * 默认值：-
     * 最低版本：0.1.61
     */
    buildFormData: Function,
    /**
     * 加载中图标类型
     * 类型：string
     * 默认值：'ring'
     */
    loadingType: makeStringProp("ring"),
    /**
     * 加载中图标颜色
     * 类型：string
     * 默认值：'#ffffff'
     */
    loadingColor: makeStringProp("#ffffff"),
    /**
     * 文件类型，可选值：'image' | 'video' | 'media' | 'all' | 'file'
     * 默认值：image
     * 描述：'media'表示同时支持'image'和'video'，'file'表示支持除'image'和'video'外的所有文件类型，'all'标识支持全部类型文件
     * 'media'和'file'仅微信支持，'all'仅微信和H5支持
     */
    accept: makeStringProp("image"),
    /**
     * file 数据结构中，status 对应的 key
     * 类型：string
     * 默认值：'status'
     */
    statusKey: makeStringProp("status"),
    /**
     * 加载中图标尺寸
     * 类型：string
     * 默认值：'24px'
     */
    loadingSize: makeStringProp("24px"),
    /**
     * 是否压缩视频，当 accept 为 video 时生效。
     * 类型：boolean
     * 默认值：true
     */
    compressed: makeBooleanProp(true),
    /**
     * 拍摄视频最长拍摄时间，当 accept 为 video | media 时生效，单位秒。
     * 类型：number
     * 默认值：60
     */
    maxDuration: makeNumberProp(60),
    /**
     * 使用前置或者后置相机，当 accept 为 video | media 时生效，可选值为：back｜front。
     * 类型：UploadCameraType
     * 默认值：'back'
     */
    camera: makeStringProp("back"),
    /**
     * 预览图片的mode属性
     */
    imageMode: makeStringProp("aspectFit"),
    /**
     * 接口响应的成功状态（statusCode）值
     */
    successStatus: makeNumberProp(200),
    /**
     * 自定义上传按钮样式
     * 类型：string
     */
    customEvokeClass: makeStringProp(""),
    /**
     * 自定义预览图片列表样式
     * 类型：string
     */
    customPreviewClass: makeStringProp(""),
    /**
     * 是否选择文件后自动上传
     * 类型：boolean
     */
    autoUpload: makeBooleanProp(true),
    /**
     * 点击已上传时是否可以重新上传
     * 类型：boolean
     * 默认值：false
     */
    reupload: makeBooleanProp(false),
    /**
     * 自定义上传文件的请求方法
     * 类型：UploadMethod
     * 默认值：-
     */
    uploadMethod: Function,
    /**
     * 根据文件拓展名过滤,每一项都不能是空字符串。默认不过滤。
     * H5支持全部类型过滤。
     * 微信小程序支持all和file时过滤,其余平台不支持。
     */
    extension: Array
  };
  const __default__$3 = {
    name: "wd-upload",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$3,
    props: uploadProps,
    emits: ["fail", "change", "success", "progress", "oversize", "chooseerror", "remove", "update:fileList"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const emit = __emit;
      __expose({
        submit: () => startUploadFiles(),
        abort: () => abort()
      });
      const { translate } = useTranslate("upload");
      const uploadFiles = vue.ref([]);
      const showUpload = vue.computed(() => !props.limit || uploadFiles.value.length < props.limit);
      const videoPreview = vue.ref();
      const { startUpload, abort, chooseFile, UPLOAD_STATUS: UPLOAD_STATUS2 } = useUpload();
      vue.watch(
        () => props.fileList,
        (val) => {
          const { statusKey } = props;
          if (isEqual(val, uploadFiles.value))
            return;
          const uploadFileList = val.map((item) => {
            item[statusKey] = item[statusKey] || "success";
            item.response = item.response || "";
            return { ...item, uid: context.id++ };
          });
          uploadFiles.value = uploadFileList;
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => props.limit,
        (val) => {
          if (val && val < uploadFiles.value.length) {
            formatAppLog("error", "at uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue:172", "[wot-design]Error: props limit must less than fileList.length");
          }
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => props.beforePreview,
        (fn) => {
          if (fn && !isFunction(fn)) {
            formatAppLog("error", "at uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue:185", "The type of beforePreview must be Function");
          }
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => props.onPreviewFail,
        (fn) => {
          if (fn && !isFunction(fn)) {
            formatAppLog("error", "at uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue:198", "The type of onPreviewFail must be Function");
          }
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => props.beforeRemove,
        (fn) => {
          if (fn && !isFunction(fn)) {
            formatAppLog("error", "at uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue:211", "The type of beforeRemove must be Function");
          }
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => props.beforeUpload,
        (fn) => {
          if (fn && !isFunction(fn)) {
            formatAppLog("error", "at uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue:224", "The type of beforeUpload must be Function");
          }
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => props.beforeChoose,
        (fn) => {
          if (fn && !isFunction(fn)) {
            formatAppLog("error", "at uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue:237", "The type of beforeChoose must be Function");
          }
        },
        {
          deep: true,
          immediate: true
        }
      );
      vue.watch(
        () => props.buildFormData,
        (fn) => {
          if (fn && !isFunction(fn)) {
            formatAppLog("error", "at uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue:250", "The type of buildFormData must be Function");
          }
        },
        {
          deep: true,
          immediate: true
        }
      );
      function emitFileList() {
        emit("update:fileList", uploadFiles.value);
      }
      function startUploadFiles() {
        const { buildFormData, formData = {}, statusKey } = props;
        const { action: action2, name, header = {}, accept, successStatus, uploadMethod } = props;
        const statusCode = isDef(successStatus) ? successStatus : 200;
        for (const uploadFile of uploadFiles.value) {
          if (uploadFile[statusKey] === UPLOAD_STATUS2.PENDING) {
            if (buildFormData) {
              buildFormData({
                file: uploadFile,
                formData,
                resolve: (formData2) => {
                  formData2 && startUpload(uploadFile, {
                    action: action2,
                    header,
                    name,
                    formData: formData2,
                    fileType: accept,
                    statusCode,
                    statusKey,
                    uploadMethod,
                    onSuccess: handleSuccess,
                    onError: handleError,
                    onProgress: handleProgress
                  });
                }
              });
            } else {
              startUpload(uploadFile, {
                action: action2,
                header,
                name,
                formData,
                fileType: accept,
                statusCode,
                statusKey,
                uploadMethod,
                onSuccess: handleSuccess,
                onError: handleError,
                onProgress: handleProgress
              });
            }
          }
        }
      }
      function getImageInfo(img) {
        return new Promise((resolve, reject) => {
          uni.getImageInfo({
            src: img,
            success: (res) => {
              resolve(res);
            },
            fail: (error) => {
              reject(error);
            }
          });
        });
      }
      function initFile(file, currentIndex) {
        const { statusKey } = props;
        const initState = {
          uid: context.id++,
          // 仅h5支持 name
          name: file.name || "",
          thumb: file.thumb || "",
          [statusKey]: "pending",
          size: file.size || 0,
          url: file.path,
          percent: 0
        };
        if (typeof currentIndex === "number") {
          uploadFiles.value.splice(currentIndex, 1, initState);
        } else {
          uploadFiles.value.push(initState);
        }
        if (props.autoUpload) {
          startUploadFiles();
        }
      }
      function handleError(err, file, formData) {
        const { statusKey } = props;
        const index = uploadFiles.value.findIndex((item) => item.uid === file.uid);
        if (index > -1) {
          uploadFiles.value[index][statusKey] = "fail";
          uploadFiles.value[index].error = err.message;
          uploadFiles.value[index].response = err;
          emit("fail", { error: err, file, formData });
          emitFileList();
        }
      }
      function handleSuccess(res, file, formData) {
        const { statusKey } = props;
        const index = uploadFiles.value.findIndex((item) => item.uid === file.uid);
        if (index > -1) {
          uploadFiles.value[index][statusKey] = "success";
          uploadFiles.value[index].response = res.data;
          emit("change", { fileList: uploadFiles.value });
          emit("success", { file, fileList: uploadFiles.value, formData });
          emitFileList();
        }
      }
      function handleProgress(res, file) {
        const index = uploadFiles.value.findIndex((item) => item.uid === file.uid);
        if (index > -1) {
          uploadFiles.value[index].percent = res.progress;
          emit("progress", { response: res, file });
        }
      }
      function onChooseFile(currentIndex) {
        const { multiple, maxSize, accept, sizeType, limit, sourceType, compressed, maxDuration, camera, beforeUpload, extension } = props;
        chooseFile({
          multiple,
          sizeType,
          sourceType,
          maxCount: limit ? limit - uploadFiles.value.length : 9,
          accept,
          compressed,
          maxDuration,
          camera,
          extension
        }).then((res) => {
          let files = res;
          if (!multiple) {
            files = files.slice(0, 1);
          }
          const mapFiles = async (files2) => {
            for (let index = 0; index < files2.length; index++) {
              const file = files2[index];
              if (file.type === "image" && !file.size) {
                const imageInfo = await getImageInfo(file.path);
                file.size = imageInfo.width * imageInfo.height;
              }
              Number(file.size) <= maxSize ? initFile(file, currentIndex) : emit("oversize", { file });
            }
          };
          if (beforeUpload) {
            beforeUpload({
              files,
              fileList: uploadFiles.value,
              resolve: (isPass) => {
                isPass && mapFiles(files);
              }
            });
          } else {
            mapFiles(files);
          }
        }).catch((error) => {
          emit("chooseerror", { error });
        });
      }
      function handleChoose(index) {
        if (props.disabled)
          return;
        const { beforeChoose } = props;
        if (beforeChoose) {
          beforeChoose({
            fileList: uploadFiles.value,
            resolve: (isPass) => {
              isPass && onChooseFile(index);
            }
          });
        } else {
          onChooseFile(index);
        }
      }
      function handleRemove(file) {
        uploadFiles.value.splice(
          uploadFiles.value.findIndex((item) => item.uid === file.uid),
          1
        );
        emit("change", {
          fileList: uploadFiles.value
        });
        emit("remove", { file });
        emitFileList();
      }
      function removeFile(index) {
        const { beforeRemove } = props;
        const intIndex = index;
        const file = uploadFiles.value[intIndex];
        if (beforeRemove) {
          beforeRemove({
            file,
            index: intIndex,
            fileList: uploadFiles.value,
            resolve: (isPass) => {
              isPass && handleRemove(file);
            }
          });
        } else {
          handleRemove(file);
        }
      }
      function handlePreviewFile(file) {
        uni.openDocument({
          filePath: file.url,
          showMenu: true
        });
      }
      function handlePreviewImage(index, lists) {
        const { onPreviewFail } = props;
        uni.previewImage({
          urls: lists,
          current: lists[index],
          fail() {
            if (onPreviewFail) {
              onPreviewFail({
                index,
                imgList: lists
              });
            } else {
              uni.showToast({ title: "预览图片失败", icon: "none" });
            }
          }
        });
      }
      function handlePreviewVieo(index, lists) {
        var _a;
        (_a = videoPreview.value) == null ? void 0 : _a.open({ url: lists[index].url, poster: lists[index].thumb, title: lists[index].name });
      }
      function onPreviewImage(file) {
        const { beforePreview, reupload } = props;
        const fileList = deepClone(uploadFiles.value);
        const index = fileList.findIndex((item) => item.url === file.url);
        const imgList = fileList.filter((file2) => isImage(file2)).map((file2) => file2.url);
        const imgIndex = imgList.findIndex((item) => item === file.url);
        if (reupload) {
          handleChoose(index);
        } else {
          if (beforePreview) {
            beforePreview({
              file,
              index,
              fileList,
              imgList,
              resolve: (isPass) => {
                isPass && handlePreviewImage(imgIndex, imgList);
              }
            });
          } else {
            handlePreviewImage(imgIndex, imgList);
          }
        }
      }
      function onPreviewVideo(file) {
        const { beforePreview, reupload } = props;
        const fileList = deepClone(uploadFiles.value);
        const index = fileList.findIndex((item) => item.url === file.url);
        const videoList = fileList.filter((file2) => isVideo(file2));
        const videoIndex = videoList.findIndex((item) => item.url === file.url);
        if (reupload) {
          handleChoose(index);
        } else {
          if (beforePreview) {
            beforePreview({
              file,
              index,
              imgList: [],
              fileList,
              resolve: (isPass) => {
                isPass && handlePreviewVieo(videoIndex, videoList);
              }
            });
          } else {
            handlePreviewVieo(videoIndex, videoList);
          }
        }
      }
      function onPreviewFile(file) {
        const { beforePreview, reupload } = props;
        const fileList = deepClone(uploadFiles.value);
        const index = fileList.findIndex((item) => item.url === file.url);
        if (reupload) {
          handleChoose(index);
        } else {
          if (beforePreview) {
            beforePreview({
              file,
              index,
              imgList: [],
              fileList,
              resolve: (isPass) => {
                isPass && handlePreviewFile(file);
              }
            });
          } else {
            handlePreviewFile(file);
          }
        }
      }
      function isVideo(file) {
        return file.name && isVideoUrl(file.name) || isVideoUrl(file.url);
      }
      function isImage(file) {
        return file.name && isImageUrl(file.name) || isImageUrl(file.url);
      }
      const __returned__ = { props, emit, translate, uploadFiles, showUpload, videoPreview, startUpload, abort, chooseFile, UPLOAD_STATUS: UPLOAD_STATUS2, emitFileList, startUploadFiles, getImageInfo, initFile, handleError, handleSuccess, handleProgress, onChooseFile, handleChoose, handleRemove, removeFile, handlePreviewFile, handlePreviewImage, handlePreviewVieo, onPreviewImage, onPreviewVideo, onPreviewFile, isVideo, isImage, wdIcon, wdVideoPreview, wdLoading };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["wd-upload", _ctx.customClass]),
            style: vue.normalizeStyle(_ctx.customStyle)
          },
          [
            vue.createCommentVNode(" 预览列表 "),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.uploadFiles, (file, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: vue.normalizeClass(["wd-upload__preview", _ctx.customPreviewClass]),
                    key: index
                  },
                  [
                    vue.createCommentVNode(" 成功时展示图片 "),
                    vue.createElementVNode("view", { class: "wd-upload__status-content" }, [
                      $setup.isImage(file) ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        src: file.url,
                        mode: _ctx.imageMode,
                        class: "wd-upload__picture",
                        onClick: ($event) => $setup.onPreviewImage(file)
                      }, null, 8, ["src", "mode", "onClick"])) : $setup.isVideo(file) ? (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        { key: 1 },
                        [
                          file.thumb ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "wd-upload__video",
                            onClick: ($event) => $setup.onPreviewVideo(file)
                          }, [
                            vue.createElementVNode("image", {
                              src: file.thumb,
                              mode: _ctx.imageMode,
                              class: "wd-upload__picture"
                            }, null, 8, ["src", "mode"]),
                            vue.createVNode($setup["wdIcon"], {
                              name: "play-circle-filled",
                              "custom-class": "wd-upload__video-paly"
                            })
                          ], 8, ["onClick"])) : (vue.openBlock(), vue.createElementBlock("view", {
                            key: 1,
                            class: "wd-upload__video",
                            onClick: ($event) => $setup.onPreviewVideo(file)
                          }, [
                            vue.createVNode($setup["wdIcon"], {
                              "custom-class": "wd-upload__video-icon",
                              name: "video"
                            })
                          ], 8, ["onClick"]))
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : (vue.openBlock(), vue.createElementBlock("view", {
                        key: 2,
                        class: "wd-upload__file",
                        onClick: ($event) => $setup.onPreviewFile(file)
                      }, [
                        vue.createVNode($setup["wdIcon"], {
                          name: "file",
                          "custom-class": "wd-upload__file-icon"
                        }),
                        vue.createElementVNode(
                          "view",
                          { class: "wd-upload__file-name" },
                          vue.toDisplayString(file.name || file.url),
                          1
                          /* TEXT */
                        )
                      ], 8, ["onClick"]))
                    ]),
                    file[$setup.props.statusKey] !== "success" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "wd-upload__mask wd-upload__status-content"
                    }, [
                      vue.createCommentVNode(" loading时展示loading图标和进度 "),
                      file[$setup.props.statusKey] === "loading" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "wd-upload__status-content"
                      }, [
                        vue.createVNode($setup["wdLoading"], {
                          type: _ctx.loadingType,
                          size: _ctx.loadingSize,
                          color: _ctx.loadingColor
                        }, null, 8, ["type", "size", "color"]),
                        vue.createElementVNode(
                          "text",
                          { class: "wd-upload__progress-txt" },
                          vue.toDisplayString(file.percent) + "%",
                          1
                          /* TEXT */
                        )
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createCommentVNode(" 失败时展示失败图标以及失败信息 "),
                      file[$setup.props.statusKey] === "fail" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "wd-upload__status-content"
                      }, [
                        vue.createVNode($setup["wdIcon"], {
                          name: "close-outline",
                          "custom-class": "wd-upload__icon"
                        }),
                        vue.createElementVNode(
                          "text",
                          { class: "wd-upload__progress-txt" },
                          vue.toDisplayString(file.error || $setup.translate("error")),
                          1
                          /* TEXT */
                        )
                      ])) : vue.createCommentVNode("v-if", true)
                    ])) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(" 上传状态为上传中时不展示移除按钮 "),
                    file[$setup.props.statusKey] !== "loading" && !_ctx.disabled ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
                      key: 1,
                      name: "error-fill",
                      "custom-class": "wd-upload__close",
                      onClick: ($event) => $setup.removeFile(index)
                    }, null, 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(" 自定义预览样式 "),
                    _ctx.$slots["preview-cover"] ? vue.renderSlot(_ctx.$slots, "preview-cover", {
                      key: 2,
                      file,
                      index
                    }, void 0, true) : vue.createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            $setup.showUpload ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: vue.normalizeClass(["wd-upload__evoke-slot", _ctx.customEvokeClass]),
                    onClick: $setup.handleChoose
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  2
                  /* CLASS */
                )) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createCommentVNode(" 唤起项 "),
                    vue.createElementVNode(
                      "view",
                      {
                        onClick: $setup.handleChoose,
                        class: vue.normalizeClass(["wd-upload__evoke", _ctx.disabled ? "is-disabled" : "", _ctx.customEvokeClass])
                      },
                      [
                        vue.createCommentVNode(" 唤起项图标 "),
                        vue.createVNode($setup["wdIcon"], {
                          class: "wd-upload__evoke-icon",
                          name: "fill-camera"
                        }),
                        vue.createCommentVNode(" 有限制个数时确认是否展示限制个数 "),
                        _ctx.limit && _ctx.showLimitNum ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "wd-upload__evoke-num"
                          },
                          "（" + vue.toDisplayString($setup.uploadFiles.length) + "/" + vue.toDisplayString(_ctx.limit) + "）",
                          1
                          /* TEXT */
                        )) : vue.createCommentVNode("v-if", true)
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.createVNode(
          $setup["wdVideoPreview"],
          { ref: "videoPreview" },
          null,
          512
          /* NEED_PATCH */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-d50d9cde"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue"]]);
  const cellProps = {
    ...baseProps,
    /**
     * 标题
     */
    title: String,
    /**
     * 右侧内容
     */
    value: makeNumericProp(""),
    /**
     * 图标类名
     */
    icon: String,
    /**
     * 描述信息
     */
    label: String,
    /**
     * 是否为跳转链接
     */
    isLink: makeBooleanProp(false),
    /**
     * 跳转地址
     */
    to: String,
    /**
     * 跳转时是否替换栈顶页面
     */
    replace: makeBooleanProp(false),
    /**
     * 开启点击反馈，is-link 默认开启
     */
    clickable: makeBooleanProp(false),
    /**
     * 设置单元格大小，可选值：large
     */
    size: String,
    /**
     * 是否展示边框线
     */
    border: makeBooleanProp(void 0),
    /**
     * 设置左侧标题宽度
     */
    titleWidth: String,
    /**
     * 是否垂直居中，默认顶部居中
     */
    center: makeBooleanProp(false),
    /**
     * 是否必填
     */
    required: makeBooleanProp(false),
    /**
     * 表单属性，上下结构
     */
    vertical: makeBooleanProp(false),
    /**
     * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
     */
    prop: String,
    /**
     * 表单验证规则，结合wd-form组件使用
     */
    rules: makeArrayProp(),
    /**
     * icon 使用 slot 时的自定义样式
     */
    customIconClass: makeStringProp(""),
    /**
     * label 使用 slot 时的自定义样式
     */
    customLabelClass: makeStringProp(""),
    /**
     * value 使用 slot 时的自定义样式
     */
    customValueClass: makeStringProp(""),
    /**
     * title 使用 slot 时的自定义样式
     */
    customTitleClass: makeStringProp("")
  };
  const __default__$2 = {
    name: "wd-cell",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$2,
    props: cellProps,
    emits: ["click"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const cell = useCell();
      const isBorder = vue.computed(() => {
        return Boolean(isDef(props.border) ? props.border : cell.border.value);
      });
      const { parent: form } = useParent(FORM_KEY);
      const errorMessage = vue.computed(() => {
        if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
          return form.errorMessages[props.prop];
        } else {
          return "";
        }
      });
      const isRequired = vue.computed(() => {
        let formRequired = false;
        if (form && form.props.rules) {
          const rules = form.props.rules;
          for (const key in rules) {
            if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
              formRequired = rules[key].some((rule) => rule.required);
            }
          }
        }
        return props.required || props.rules.some((rule) => rule.required) || formRequired;
      });
      function onClick() {
        const url = props.to;
        if (props.clickable || props.isLink) {
          emit("click");
        }
        if (url && props.isLink) {
          if (props.replace) {
            uni.redirectTo({ url });
          } else {
            uni.navigateTo({ url });
          }
        }
      }
      const __returned__ = { props, emit, cell, isBorder, form, errorMessage, isRequired, onClick, wdIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["wd-cell", $setup.isBorder ? "is-border" : "", _ctx.size ? "is-" + _ctx.size : "", _ctx.center ? "is-center" : "", _ctx.customClass]),
      style: vue.normalizeStyle(_ctx.customStyle),
      "hover-class": _ctx.isLink || _ctx.clickable ? "is-hover" : "none",
      "hover-stay-time": 70,
      onClick: $setup.onClick
    }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["wd-cell__wrapper", _ctx.vertical ? "is-vertical" : ""])
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["wd-cell__left", $setup.isRequired ? "is-required" : ""]),
              style: vue.normalizeStyle(_ctx.titleWidth ? "min-width:" + _ctx.titleWidth + ";max-width:" + _ctx.titleWidth + ";" : "")
            },
            [
              vue.createCommentVNode("左侧icon部位"),
              _ctx.icon ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
                key: 0,
                name: _ctx.icon,
                "custom-class": `wd-cell__icon  ${_ctx.customIconClass}`
              }, null, 8, ["name", "custom-class"])) : vue.renderSlot(_ctx.$slots, "icon", { key: 1 }, void 0, true),
              vue.createElementVNode("view", { class: "wd-cell__title" }, [
                vue.createCommentVNode("title BEGIN"),
                _ctx.title ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: vue.normalizeClass(_ctx.customTitleClass)
                  },
                  vue.toDisplayString(_ctx.title),
                  3
                  /* TEXT, CLASS */
                )) : vue.renderSlot(_ctx.$slots, "title", { key: 1 }, void 0, true),
                vue.createCommentVNode("title END"),
                vue.createCommentVNode("label BEGIN"),
                _ctx.label ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 2,
                    class: vue.normalizeClass(`wd-cell__label ${_ctx.customLabelClass}`)
                  },
                  vue.toDisplayString(_ctx.label),
                  3
                  /* TEXT, CLASS */
                )) : vue.renderSlot(_ctx.$slots, "label", { key: 3 }, void 0, true),
                vue.createCommentVNode("label END")
              ])
            ],
            6
            /* CLASS, STYLE */
          ),
          vue.createCommentVNode("right content BEGIN"),
          vue.createElementVNode("view", { class: "wd-cell__right" }, [
            vue.createElementVNode("view", { class: "wd-cell__body" }, [
              vue.createCommentVNode("文案内容"),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(`wd-cell__value ${_ctx.customValueClass}`)
                },
                [
                  vue.renderSlot(_ctx.$slots, "default", {}, () => [
                    vue.createTextVNode(
                      vue.toDisplayString(_ctx.value),
                      1
                      /* TEXT */
                    )
                  ], true)
                ],
                2
                /* CLASS */
              ),
              vue.createCommentVNode("箭头"),
              _ctx.isLink ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
                key: 0,
                "custom-class": "wd-cell__arrow-right",
                name: "arrow-right"
              })) : vue.renderSlot(_ctx.$slots, "right-icon", { key: 1 }, void 0, true)
            ]),
            $setup.errorMessage ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "wd-cell__error-message"
              },
              vue.toDisplayString($setup.errorMessage),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createCommentVNode("right content END")
        ],
        2
        /* CLASS */
      )
    ], 14, ["hover-class"]);
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-f1c5bbe2"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-cell/wd-cell.vue"]]);
  const __default__$1 = {
    name: "wd-cell-group",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$1,
    props: cellGroupProps,
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const { linkChildren } = useChildren(CELL_GROUP_KEY);
      linkChildren({ props });
      const __returned__ = { props, linkChildren };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["wd-cell-group", _ctx.border ? "is-border" : "", _ctx.customClass]),
        style: vue.normalizeStyle(_ctx.customStyle)
      },
      [
        _ctx.title || _ctx.value || _ctx.useSlot ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "wd-cell-group__title"
        }, [
          vue.createCommentVNode("左侧标题"),
          vue.createElementVNode("view", { class: "wd-cell-group__left" }, [
            !_ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock(
              "text",
              { key: 0 },
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : vue.renderSlot(_ctx.$slots, "title", { key: 1 }, void 0, true)
          ]),
          vue.createCommentVNode("右侧标题"),
          vue.createElementVNode("view", { class: "wd-cell-group__right" }, [
            !_ctx.$slots.value ? (vue.openBlock(), vue.createElementBlock(
              "text",
              { key: 0 },
              vue.toDisplayString(_ctx.value),
              1
              /* TEXT */
            )) : vue.renderSlot(_ctx.$slots, "value", { key: 1 }, void 0, true)
          ])
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "wd-cell-group__body" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-55e5786b"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.vue"]]);
  const __default__ = {
    name: "wd-form",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    ...__default__,
    props: formProps,
    setup(__props, { expose: __expose }) {
      const { show: showToast } = useToast("wd-form-toast");
      const props = __props;
      const { children, linkChildren } = useChildren(FORM_KEY);
      let errorMessages = vue.reactive({});
      linkChildren({ props, errorMessages });
      vue.watch(
        () => props.model,
        () => {
          if (props.resetOnChange) {
            clearMessage();
          }
        },
        { immediate: true, deep: true }
      );
      async function validate(prop) {
        const errors = [];
        let valid = true;
        const promises = [];
        const formRules = getMergeRules();
        const propsToValidate = isArray(prop) ? prop : isDef(prop) ? [prop] : [];
        const rulesToValidate = propsToValidate.length > 0 ? propsToValidate.reduce((acc, key) => {
          if (formRules[key]) {
            acc[key] = formRules[key];
          }
          return acc;
        }, {}) : formRules;
        for (const propName in rulesToValidate) {
          const rules = rulesToValidate[propName];
          const value = getPropByPath(props.model, propName);
          if (rules && rules.length > 0) {
            for (const rule of rules) {
              if (rule.required && (!isDef(value) || value === "")) {
                errors.push({
                  prop: propName,
                  message: rule.message
                });
                valid = false;
                break;
              }
              if (rule.pattern && !rule.pattern.test(value)) {
                errors.push({
                  prop: propName,
                  message: rule.message
                });
                valid = false;
                break;
              }
              const { validator, ...ruleWithoutValidator } = rule;
              if (validator) {
                const result = validator(value, ruleWithoutValidator);
                if (isPromise(result)) {
                  promises.push(
                    result.then((res) => {
                      if (typeof res === "string") {
                        errors.push({
                          prop: propName,
                          message: res
                        });
                        valid = false;
                      } else if (typeof res === "boolean" && !res) {
                        errors.push({
                          prop: propName,
                          message: rule.message
                        });
                        valid = false;
                      }
                    }).catch((error) => {
                      const message = isDef(error) ? isString(error) ? error : error.message || rule.message : rule.message;
                      errors.push({ prop: propName, message });
                      valid = false;
                    })
                  );
                } else {
                  if (!result) {
                    errors.push({
                      prop: propName,
                      message: rule.message
                    });
                    valid = false;
                  }
                }
              }
            }
          }
        }
        await Promise.all(promises);
        showMessage(errors);
        if (valid) {
          if (propsToValidate.length) {
            propsToValidate.forEach(clearMessage);
          } else {
            clearMessage();
          }
        }
        return {
          valid,
          errors
        };
      }
      function getMergeRules() {
        const mergedRules = deepClone(props.rules);
        const childrenProps = children.map((child) => child.prop);
        Object.keys(mergedRules).forEach((key) => {
          if (!childrenProps.includes(key)) {
            delete mergedRules[key];
          }
        });
        children.forEach((item) => {
          if (isDef(item.prop) && isDef(item.rules) && item.rules.length) {
            if (mergedRules[item.prop]) {
              mergedRules[item.prop] = [...mergedRules[item.prop], ...item.rules];
            } else {
              mergedRules[item.prop] = item.rules;
            }
          }
        });
        return mergedRules;
      }
      function showMessage(errors) {
        const childrenProps = children.map((e) => e.prop).filter(Boolean);
        const messages2 = errors.filter((error) => error.message && childrenProps.includes(error.prop));
        if (messages2.length) {
          messages2.sort((a, b) => {
            return childrenProps.indexOf(a.prop) - childrenProps.indexOf(b.prop);
          });
          if (props.errorType === "toast") {
            showToast(messages2[0].message);
          } else if (props.errorType === "message") {
            messages2.forEach((error) => {
              errorMessages[error.prop] = error.message;
            });
          }
        }
      }
      function clearMessage(prop) {
        if (prop) {
          errorMessages[prop] = "";
        } else {
          Object.keys(errorMessages).forEach((key) => {
            errorMessages[key] = "";
          });
        }
      }
      function reset() {
        clearMessage();
      }
      __expose({ validate, reset });
      const __returned__ = { showToast, props, children, linkChildren, get errorMessages() {
        return errorMessages;
      }, set errorMessages(v) {
        errorMessages = v;
      }, validate, getMergeRules, showMessage, clearMessage, reset, wdToast: __easycom_1 };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(`wd-form ${_ctx.customClass}`),
        style: vue.normalizeStyle(_ctx.customStyle)
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
        $setup.props.errorType === "toast" ? (vue.openBlock(), vue.createBlock($setup["wdToast"], {
          key: 0,
          selector: "wd-form-toast"
        })) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-6504e7d0"], ["__file", "/Users/jing/Code/mini/vehicle-info/uni_modules/wot-design-uni/components/wd-form/wd-form.vue"]]);
  const action$1 = "https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload";
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "info",
    setup(__props, { expose: __expose }) {
      __expose();
      const model = vue.ref({
        value: "",
        fileList: []
      });
      const fileList = vue.ref([
        {
          url: "https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg"
        }
      ]);
      const handleSubmit = () => {
      };
      const handleFileChange = () => {
      };
      const __returned__ = { model, fileList, action: action$1, handleSubmit, handleFileChange };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_wd_message_box = resolveEasycom(vue.resolveDynamicComponent("wd-message-box"), __easycom_0);
    const _component_wd_toast = resolveEasycom(vue.resolveDynamicComponent("wd-toast"), __easycom_1);
    const _component_wd_upload = resolveEasycom(vue.resolveDynamicComponent("wd-upload"), __easycom_2);
    const _component_wd_cell = resolveEasycom(vue.resolveDynamicComponent("wd-cell"), __easycom_3$1);
    const _component_wd_input = resolveEasycom(vue.resolveDynamicComponent("wd-input"), __easycom_2$1);
    const _component_wd_cell_group = resolveEasycom(vue.resolveDynamicComponent("wd-cell-group"), __easycom_3);
    const _component_wd_button = resolveEasycom(vue.resolveDynamicComponent("wd-button"), __easycom_4);
    const _component_wd_form = resolveEasycom(vue.resolveDynamicComponent("wd-form"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "info-page" }, [
      vue.createElementVNode("view", { class: "form-con" }, [
        vue.createVNode(_component_wd_message_box),
        vue.createVNode(_component_wd_toast),
        vue.createVNode(_component_wd_form, {
          ref: "form",
          model: $setup.model
        }, {
          default: vue.withCtx(() => [
            vue.createCommentVNode(' <view style="margin-top: 30rpx;"> '),
            vue.createVNode(_component_wd_cell_group, { border: "" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_wd_cell, {
                  title: "头像",
                  "title-width": "100px",
                  prop: "fileList",
                  rules: [{ required: true, message: "请上传头像" }]
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_wd_upload, {
                      "file-list": $setup.model.fileList,
                      limit: 1,
                      action: "https://ftf.jd.com/api/uploadImg",
                      onChange: $setup.handleFileChange
                    }, null, 8, ["file-list"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_wd_input, {
                  label: "用户名",
                  "label-width": "100px",
                  prop: "value",
                  clearable: "",
                  modelValue: $setup.model.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.model.value = $event),
                  placeholder: "请输入用户名",
                  rules: [{ required: true, message: "请填写用户名" }]
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode("view", { class: "footer" }, [
              vue.createVNode(_component_wd_button, {
                type: "primary",
                onClick: $setup.handleSubmit,
                block: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("提交")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            vue.createCommentVNode(" </view> ")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model"])
      ])
    ]);
  }
  const PagesMineInfo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-d8e5dcab"], ["__file", "/Users/jing/Code/mini/vehicle-info/pages/mine/info.vue"]]);
  const action = "https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload";
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "edit-password",
    setup(__props, { expose: __expose }) {
      __expose();
      const model = vue.ref({
        value: "",
        password: "",
        password2: ""
      });
      const rules = {
        value: [{ required: true, message: "请填写用户名" }],
        password: [{ required: true, message: "请填写密码" }]
      };
      const fileList = vue.ref([
        {
          url: "https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg"
        }
      ]);
      const handleSubmit = () => {
      };
      const handleFileChange = () => {
      };
      const __returned__ = { model, rules, fileList, action, handleSubmit, handleFileChange };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_wd_message_box = resolveEasycom(vue.resolveDynamicComponent("wd-message-box"), __easycom_0);
    const _component_wd_toast = resolveEasycom(vue.resolveDynamicComponent("wd-toast"), __easycom_1);
    const _component_wd_input = resolveEasycom(vue.resolveDynamicComponent("wd-input"), __easycom_2$1);
    const _component_wd_cell_group = resolveEasycom(vue.resolveDynamicComponent("wd-cell-group"), __easycom_3);
    const _component_wd_button = resolveEasycom(vue.resolveDynamicComponent("wd-button"), __easycom_4);
    const _component_wd_form = resolveEasycom(vue.resolveDynamicComponent("wd-form"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "edit-password-page" }, [
      vue.createElementVNode("view", { class: "form-con" }, [
        vue.createVNode(_component_wd_message_box),
        vue.createVNode(_component_wd_toast),
        vue.createVNode(_component_wd_form, {
          ref: "form",
          model: $setup.model,
          rules: $setup.rules
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_wd_cell_group, { border: "" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_wd_input, {
                  label: "用户名",
                  "label-width": "100px",
                  prop: "value",
                  clearable: "",
                  modelValue: $setup.model.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.model.value = $event),
                  placeholder: "请输入用户名"
                }, null, 8, ["modelValue"]),
                vue.createVNode(_component_wd_input, {
                  label: "用户名",
                  "label-width": "100px",
                  prop: "password",
                  clearable: "",
                  modelValue: $setup.model.password,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.model.password = $event),
                  placeholder: "请输入用户名"
                }, null, 8, ["modelValue"]),
                vue.createVNode(_component_wd_input, {
                  label: "用户名",
                  "label-width": "100px",
                  prop: "password2",
                  clearable: "",
                  modelValue: $setup.model.password2,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.model.password2 = $event),
                  placeholder: "请输入用户名"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode("view", { class: "footer" }, [
              vue.createVNode(_component_wd_button, {
                type: "primary",
                onClick: $setup.handleSubmit,
                block: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("提交")
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model"])
      ])
    ]);
  }
  const PagesMineEditPassword = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/jing/Code/mini/vehicle-info/pages/mine/edit-password.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/order/order", PagesOrderOrder);
  __definePage("pages/trace/trace", PagesTraceTrace);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/mine/info", PagesMineInfo);
  __definePage("pages/mine/edit-password", PagesMineEditPassword);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/jing/Code/mini/vehicle-info/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
