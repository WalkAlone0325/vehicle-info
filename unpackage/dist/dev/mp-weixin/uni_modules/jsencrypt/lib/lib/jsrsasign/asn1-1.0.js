"use strict";
const uni_modules_jsencrypt_lib_lib_jsbn_jsbn = require("../jsbn/jsbn.js");
const uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo = require("./yahoo.js");
/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
var KJUR = {};
if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1)
  KJUR.asn1 = {};
KJUR.asn1.ASN1Util = new function() {
  this.integerToByteHex = function(i) {
    var h = i.toString(16);
    if (h.length % 2 == 1)
      h = "0" + h;
    return h;
  };
  this.bigIntToMinTwosComplementsHex = function(bigIntegerValue) {
    var h = bigIntegerValue.toString(16);
    if (h.substr(0, 1) != "-") {
      if (h.length % 2 == 1) {
        h = "0" + h;
      } else {
        if (!h.match(/^[0-7]/)) {
          h = "00" + h;
        }
      }
    } else {
      var hPos = h.substr(1);
      var xorLen = hPos.length;
      if (xorLen % 2 == 1) {
        xorLen += 1;
      } else {
        if (!h.match(/^[0-7]/)) {
          xorLen += 2;
        }
      }
      var hMask = "";
      for (var i = 0; i < xorLen; i++) {
        hMask += "f";
      }
      var biMask = new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(hMask, 16);
      var biNeg = biMask.xor(bigIntegerValue).add(uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger.ONE);
      h = biNeg.toString(16).replace(/^-/, "");
    }
    return h;
  };
  this.getPEMStringFromHex = function(dataHex, pemHeader) {
    return hextopem(dataHex, pemHeader);
  };
  this.newObject = function(param) {
    var _KJUR = KJUR, _KJUR_asn1 = _KJUR.asn1, _DERBoolean = _KJUR_asn1.DERBoolean, _DERInteger = _KJUR_asn1.DERInteger, _DERBitString = _KJUR_asn1.DERBitString, _DEROctetString = _KJUR_asn1.DEROctetString, _DERNull = _KJUR_asn1.DERNull, _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier, _DEREnumerated = _KJUR_asn1.DEREnumerated, _DERUTF8String = _KJUR_asn1.DERUTF8String, _DERNumericString = _KJUR_asn1.DERNumericString, _DERPrintableString = _KJUR_asn1.DERPrintableString, _DERTeletexString = _KJUR_asn1.DERTeletexString, _DERIA5String = _KJUR_asn1.DERIA5String, _DERUTCTime = _KJUR_asn1.DERUTCTime, _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime, _DERSequence = _KJUR_asn1.DERSequence, _DERSet = _KJUR_asn1.DERSet, _DERTaggedObject = _KJUR_asn1.DERTaggedObject, _newObject = _KJUR_asn1.ASN1Util.newObject;
    var keys = Object.keys(param);
    if (keys.length != 1)
      throw "key of param shall be only one.";
    var key = keys[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1)
      throw "undefined key: " + key;
    if (key == "bool")
      return new _DERBoolean(param[key]);
    if (key == "int")
      return new _DERInteger(param[key]);
    if (key == "bitstr")
      return new _DERBitString(param[key]);
    if (key == "octstr")
      return new _DEROctetString(param[key]);
    if (key == "null")
      return new _DERNull(param[key]);
    if (key == "oid")
      return new _DERObjectIdentifier(param[key]);
    if (key == "enum")
      return new _DEREnumerated(param[key]);
    if (key == "utf8str")
      return new _DERUTF8String(param[key]);
    if (key == "numstr")
      return new _DERNumericString(param[key]);
    if (key == "prnstr")
      return new _DERPrintableString(param[key]);
    if (key == "telstr")
      return new _DERTeletexString(param[key]);
    if (key == "ia5str")
      return new _DERIA5String(param[key]);
    if (key == "utctime")
      return new _DERUTCTime(param[key]);
    if (key == "gentime")
      return new _DERGeneralizedTime(param[key]);
    if (key == "seq") {
      var paramList = param[key];
      var a = [];
      for (var i = 0; i < paramList.length; i++) {
        var asn1Obj = _newObject(paramList[i]);
        a.push(asn1Obj);
      }
      return new _DERSequence({ "array": a });
    }
    if (key == "set") {
      var paramList = param[key];
      var a = [];
      for (var i = 0; i < paramList.length; i++) {
        var asn1Obj = _newObject(paramList[i]);
        a.push(asn1Obj);
      }
      return new _DERSet({ "array": a });
    }
    if (key == "tag") {
      var tagParam = param[key];
      if (Object.prototype.toString.call(tagParam) === "[object Array]" && tagParam.length == 3) {
        var obj = _newObject(tagParam[2]);
        return new _DERTaggedObject({
          tag: tagParam[0],
          explicit: tagParam[1],
          obj
        });
      } else {
        var newParam = {};
        if (tagParam.explicit !== void 0)
          newParam.explicit = tagParam.explicit;
        if (tagParam.tag !== void 0)
          newParam.tag = tagParam.tag;
        if (tagParam.obj === void 0)
          throw "obj shall be specified for 'tag'.";
        newParam.obj = _newObject(tagParam.obj);
        return new _DERTaggedObject(newParam);
      }
    }
  };
  this.jsonToASN1HEX = function(param) {
    var asn1Obj = this.newObject(param);
    return asn1Obj.getEncodedHex();
  };
}();
KJUR.asn1.ASN1Util.oidHexToInt = function(hex) {
  var s = "";
  var i01 = parseInt(hex.substr(0, 2), 16);
  var i0 = Math.floor(i01 / 40);
  var i1 = i01 % 40;
  var s = i0 + "." + i1;
  var binbuf = "";
  for (var i = 2; i < hex.length; i += 2) {
    var value = parseInt(hex.substr(i, 2), 16);
    var bin = ("00000000" + value.toString(2)).slice(-8);
    binbuf = binbuf + bin.substr(1, 7);
    if (bin.substr(0, 1) == "0") {
      var bi = new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(binbuf, 2);
      s = s + "." + bi.toString(10);
      binbuf = "";
    }
  }
  return s;
};
KJUR.asn1.ASN1Util.oidIntToHex = function(oidString) {
  var itox = function(i2) {
    var h2 = i2.toString(16);
    if (h2.length == 1)
      h2 = "0" + h2;
    return h2;
  };
  var roidtox = function(roid) {
    var h2 = "";
    var bi = new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(roid, 10);
    var b = bi.toString(2);
    var padLen = 7 - b.length % 7;
    if (padLen == 7)
      padLen = 0;
    var bPad = "";
    for (var i2 = 0; i2 < padLen; i2++)
      bPad += "0";
    b = bPad + b;
    for (var i2 = 0; i2 < b.length - 1; i2 += 7) {
      var b8 = b.substr(i2, 7);
      if (i2 != b.length - 7)
        b8 = "1" + b8;
      h2 += itox(parseInt(b8, 2));
    }
    return h2;
  };
  if (!oidString.match(/^[0-9.]+$/)) {
    throw "malformed oid string: " + oidString;
  }
  var h = "";
  var a = oidString.split(".");
  var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
  h += itox(i0);
  a.splice(0, 2);
  for (var i = 0; i < a.length; i++) {
    h += roidtox(a[i]);
  }
  return h;
};
KJUR.asn1.ASN1Object = function() {
  var hV = "";
  this.getLengthHexFromValue = function() {
    if (typeof this.hV == "undefined" || this.hV == null) {
      throw "this.hV is null or undefined.";
    }
    if (this.hV.length % 2 == 1) {
      throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
    }
    var n = this.hV.length / 2;
    var hN = n.toString(16);
    if (hN.length % 2 == 1) {
      hN = "0" + hN;
    }
    if (n < 128) {
      return hN;
    } else {
      var hNlen = hN.length / 2;
      if (hNlen > 15) {
        throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
      }
      var head = 128 + hNlen;
      return head.toString(16) + hN;
    }
  };
  this.getEncodedHex = function() {
    if (this.hTLV == null || this.isModified) {
      this.hV = this.getFreshValueHex();
      this.hL = this.getLengthHexFromValue();
      this.hTLV = this.hT + this.hL + this.hV;
      this.isModified = false;
    }
    return this.hTLV;
  };
  this.getValueHex = function() {
    this.getEncodedHex();
    return this.hV;
  };
  this.getFreshValueHex = function() {
    return "";
  };
};
KJUR.asn1.DERAbstractString = function(params) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  this.getString = function() {
    return this.s;
  };
  this.setString = function(newS) {
    this.hTLV = null;
    this.isModified = true;
    this.s = newS;
    this.hV = stohex(this.s);
  };
  this.setStringHex = function(newHexString) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = newHexString;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params == "string") {
      this.setString(params);
    } else if (typeof params["str"] != "undefined") {
      this.setString(params["str"]);
    } else if (typeof params["hex"] != "undefined") {
      this.setStringHex(params["hex"]);
    }
  }
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractTime = function(params) {
  KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
  this.localDateToUTC = function(d) {
    utc = d.getTime() + d.getTimezoneOffset() * 6e4;
    var utcDate = new Date(utc);
    return utcDate;
  };
  this.formatDate = function(dateObject, type, withMillis) {
    var pad = this.zeroPadding;
    var d = this.localDateToUTC(dateObject);
    var year = String(d.getFullYear());
    if (type == "utc")
      year = year.substr(2, 2);
    var month = pad(String(d.getMonth() + 1), 2);
    var day = pad(String(d.getDate()), 2);
    var hour = pad(String(d.getHours()), 2);
    var min = pad(String(d.getMinutes()), 2);
    var sec = pad(String(d.getSeconds()), 2);
    var s = year + month + day + hour + min + sec;
    if (withMillis === true) {
      var millis = d.getMilliseconds();
      if (millis != 0) {
        var sMillis = pad(String(millis), 3);
        sMillis = sMillis.replace(/[0]+$/, "");
        s = s + "." + sMillis;
      }
    }
    return s + "Z";
  };
  this.zeroPadding = function(s, len) {
    if (s.length >= len)
      return s;
    return new Array(len - s.length + 1).join("0") + s;
  };
  this.getString = function() {
    return this.s;
  };
  this.setString = function(newS) {
    this.hTLV = null;
    this.isModified = true;
    this.s = newS;
    this.hV = stohex(newS);
  };
  this.setByDateValue = function(year, month, day, hour, min, sec) {
    var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
    this.setByDate(dateObject);
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
KJUR.asn1.DERAbstractStructured = function(params) {
  KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
  this.setByASN1ObjectArray = function(asn1ObjectArray) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array = asn1ObjectArray;
  };
  this.appendASN1Object = function(asn1Object) {
    this.hTLV = null;
    this.isModified = true;
    this.asn1Array.push(asn1Object);
  };
  this.asn1Array = new Array();
  if (typeof params != "undefined") {
    if (typeof params["array"] != "undefined") {
      this.asn1Array = params["array"];
    }
  }
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBoolean = function() {
  KJUR.asn1.DERBoolean.superclass.constructor.call(this);
  this.hT = "01";
  this.hTLV = "0101ff";
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
KJUR.asn1.DERInteger = function(params) {
  KJUR.asn1.DERInteger.superclass.constructor.call(this);
  this.hT = "02";
  this.setByBigInteger = function(bigIntegerValue) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
  };
  this.setByInteger = function(intValue) {
    var bi = new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(String(intValue), 10);
    this.setByBigInteger(bi);
  };
  this.setValueHex = function(newHexString) {
    this.hV = newHexString;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params["bigint"] != "undefined") {
      this.setByBigInteger(params["bigint"]);
    } else if (typeof params["int"] != "undefined") {
      this.setByInteger(params["int"]);
    } else if (typeof params == "number") {
      this.setByInteger(params);
    } else if (typeof params["hex"] != "undefined") {
      this.setValueHex(params["hex"]);
    }
  }
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
KJUR.asn1.DERBitString = function(params) {
  if (params !== void 0 && typeof params.obj !== "undefined") {
    var o = KJUR.asn1.ASN1Util.newObject(params.obj);
    params.hex = "00" + o.getEncodedHex();
  }
  KJUR.asn1.DERBitString.superclass.constructor.call(this);
  this.hT = "03";
  this.setHexValueIncludingUnusedBits = function(newHexStringIncludingUnusedBits) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = newHexStringIncludingUnusedBits;
  };
  this.setUnusedBitsAndHexValue = function(unusedBits, hValue) {
    if (unusedBits < 0 || 7 < unusedBits) {
      throw "unused bits shall be from 0 to 7: u = " + unusedBits;
    }
    var hUnusedBits = "0" + unusedBits;
    this.hTLV = null;
    this.isModified = true;
    this.hV = hUnusedBits + hValue;
  };
  this.setByBinaryString = function(binaryString) {
    binaryString = binaryString.replace(/0+$/, "");
    var unusedBits = 8 - binaryString.length % 8;
    if (unusedBits == 8)
      unusedBits = 0;
    for (var i = 0; i <= unusedBits; i++) {
      binaryString += "0";
    }
    var h = "";
    for (var i = 0; i < binaryString.length - 1; i += 8) {
      var b = binaryString.substr(i, 8);
      var x = parseInt(b, 2).toString(16);
      if (x.length == 1)
        x = "0" + x;
      h += x;
    }
    this.hTLV = null;
    this.isModified = true;
    this.hV = "0" + unusedBits + h;
  };
  this.setByBooleanArray = function(booleanArray) {
    var s = "";
    for (var i = 0; i < booleanArray.length; i++) {
      if (booleanArray[i] == true) {
        s += "1";
      } else {
        s += "0";
      }
    }
    this.setByBinaryString(s);
  };
  this.newFalseArray = function(nLength) {
    var a = new Array(nLength);
    for (var i = 0; i < nLength; i++) {
      a[i] = false;
    }
    return a;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
      this.setHexValueIncludingUnusedBits(params);
    } else if (typeof params["hex"] != "undefined") {
      this.setHexValueIncludingUnusedBits(params["hex"]);
    } else if (typeof params["bin"] != "undefined") {
      this.setByBinaryString(params["bin"]);
    } else if (typeof params["array"] != "undefined") {
      this.setByBooleanArray(params["array"]);
    }
  }
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
KJUR.asn1.DEROctetString = function(params) {
  if (params !== void 0 && typeof params.obj !== "undefined") {
    var o = KJUR.asn1.ASN1Util.newObject(params.obj);
    params.hex = o.getEncodedHex();
  }
  KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
  this.hT = "04";
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNull = function() {
  KJUR.asn1.DERNull.superclass.constructor.call(this);
  this.hT = "05";
  this.hTLV = "0500";
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
KJUR.asn1.DERObjectIdentifier = function(params) {
  var itox = function(i) {
    var h = i.toString(16);
    if (h.length == 1)
      h = "0" + h;
    return h;
  };
  var roidtox = function(roid) {
    var h = "";
    var bi = new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(roid, 10);
    var b = bi.toString(2);
    var padLen = 7 - b.length % 7;
    if (padLen == 7)
      padLen = 0;
    var bPad = "";
    for (var i = 0; i < padLen; i++)
      bPad += "0";
    b = bPad + b;
    for (var i = 0; i < b.length - 1; i += 7) {
      var b8 = b.substr(i, 7);
      if (i != b.length - 7)
        b8 = "1" + b8;
      h += itox(parseInt(b8, 2));
    }
    return h;
  };
  KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
  this.hT = "06";
  this.setValueHex = function(newHexString) {
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = newHexString;
  };
  this.setValueOidString = function(oidString) {
    if (!oidString.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + oidString;
    }
    var h = "";
    var a = oidString.split(".");
    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
    h += itox(i0);
    a.splice(0, 2);
    for (var i = 0; i < a.length; i++) {
      h += roidtox(a[i]);
    }
    this.hTLV = null;
    this.isModified = true;
    this.s = null;
    this.hV = h;
  };
  this.setValueName = function(oidName) {
    var oid = KJUR.asn1.x509.OID.name2oid(oidName);
    if (oid !== "") {
      this.setValueOidString(oid);
    } else {
      throw "DERObjectIdentifier oidName undefined: " + oidName;
    }
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (params !== void 0) {
    if (typeof params === "string") {
      if (params.match(/^[0-2].[0-9.]+$/)) {
        this.setValueOidString(params);
      } else {
        this.setValueName(params);
      }
    } else if (params.oid !== void 0) {
      this.setValueOidString(params.oid);
    } else if (params.hex !== void 0) {
      this.setValueHex(params.hex);
    } else if (params.name !== void 0) {
      this.setValueName(params.name);
    }
  }
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
KJUR.asn1.DEREnumerated = function(params) {
  KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
  this.hT = "0a";
  this.setByBigInteger = function(bigIntegerValue) {
    this.hTLV = null;
    this.isModified = true;
    this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
  };
  this.setByInteger = function(intValue) {
    var bi = new uni_modules_jsencrypt_lib_lib_jsbn_jsbn.BigInteger(String(intValue), 10);
    this.setByBigInteger(bi);
  };
  this.setValueHex = function(newHexString) {
    this.hV = newHexString;
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params["int"] != "undefined") {
      this.setByInteger(params["int"]);
    } else if (typeof params == "number") {
      this.setByInteger(params);
    } else if (typeof params["hex"] != "undefined") {
      this.setValueHex(params["hex"]);
    }
  }
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);
KJUR.asn1.DERUTF8String = function(params) {
  KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
  this.hT = "0c";
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERNumericString = function(params) {
  KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
  this.hT = "12";
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERPrintableString = function(params) {
  KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
  this.hT = "13";
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERTeletexString = function(params) {
  KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
  this.hT = "14";
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERIA5String = function(params) {
  KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
  this.hT = "16";
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
KJUR.asn1.DERUTCTime = function(params) {
  KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
  this.hT = "17";
  this.setByDate = function(dateObject) {
    this.hTLV = null;
    this.isModified = true;
    this.date = dateObject;
    this.s = this.formatDate(this.date, "utc");
    this.hV = stohex(this.s);
  };
  this.getFreshValueHex = function() {
    if (typeof this.date == "undefined" && typeof this.s == "undefined") {
      this.date = /* @__PURE__ */ new Date();
      this.s = this.formatDate(this.date, "utc");
      this.hV = stohex(this.s);
    }
    return this.hV;
  };
  if (params !== void 0) {
    if (params.str !== void 0) {
      this.setString(params.str);
    } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
      this.setString(params);
    } else if (params.hex !== void 0) {
      this.setStringHex(params.hex);
    } else if (params.date !== void 0) {
      this.setByDate(params.date);
    }
  }
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERGeneralizedTime = function(params) {
  KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
  this.hT = "18";
  this.withMillis = false;
  this.setByDate = function(dateObject) {
    this.hTLV = null;
    this.isModified = true;
    this.date = dateObject;
    this.s = this.formatDate(this.date, "gen", this.withMillis);
    this.hV = stohex(this.s);
  };
  this.getFreshValueHex = function() {
    if (this.date === void 0 && this.s === void 0) {
      this.date = /* @__PURE__ */ new Date();
      this.s = this.formatDate(this.date, "gen", this.withMillis);
      this.hV = stohex(this.s);
    }
    return this.hV;
  };
  if (params !== void 0) {
    if (params.str !== void 0) {
      this.setString(params.str);
    } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
      this.setString(params);
    } else if (params.hex !== void 0) {
      this.setStringHex(params.hex);
    } else if (params.date !== void 0) {
      this.setByDate(params.date);
    }
    if (params.millis === true) {
      this.withMillis = true;
    }
  }
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
KJUR.asn1.DERSequence = function(params) {
  KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
  this.hT = "30";
  this.getFreshValueHex = function() {
    var h = "";
    for (var i = 0; i < this.asn1Array.length; i++) {
      var asn1Obj = this.asn1Array[i];
      h += asn1Obj.getEncodedHex();
    }
    this.hV = h;
    return this.hV;
  };
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERSet = function(params) {
  KJUR.asn1.DERSet.superclass.constructor.call(this, params);
  this.hT = "31";
  this.sortFlag = true;
  this.getFreshValueHex = function() {
    var a = new Array();
    for (var i = 0; i < this.asn1Array.length; i++) {
      var asn1Obj = this.asn1Array[i];
      a.push(asn1Obj.getEncodedHex());
    }
    if (this.sortFlag == true)
      a.sort();
    this.hV = a.join("");
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params.sortflag != "undefined" && params.sortflag == false)
      this.sortFlag = false;
  }
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
KJUR.asn1.DERTaggedObject = function(params) {
  KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
  this.hT = "a0";
  this.hV = "";
  this.isExplicit = true;
  this.asn1Object = null;
  this.setASN1Object = function(isExplicitFlag, tagNoHex, asn1Object) {
    this.hT = tagNoHex;
    this.isExplicit = isExplicitFlag;
    this.asn1Object = asn1Object;
    if (this.isExplicit) {
      this.hV = this.asn1Object.getEncodedHex();
      this.hTLV = null;
      this.isModified = true;
    } else {
      this.hV = null;
      this.hTLV = asn1Object.getEncodedHex();
      this.hTLV = this.hTLV.replace(/^../, tagNoHex);
      this.isModified = false;
    }
  };
  this.getFreshValueHex = function() {
    return this.hV;
  };
  if (typeof params != "undefined") {
    if (typeof params["tag"] != "undefined") {
      this.hT = params["tag"];
    }
    if (typeof params["explicit"] != "undefined") {
      this.isExplicit = params["explicit"];
    }
    if (typeof params["obj"] != "undefined") {
      this.asn1Object = params["obj"];
      this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
    }
  }
};
uni_modules_jsencrypt_lib_lib_jsrsasign_yahoo.YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
exports.KJUR = KJUR;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/jsencrypt/lib/lib/jsrsasign/asn1-1.0.js.map
