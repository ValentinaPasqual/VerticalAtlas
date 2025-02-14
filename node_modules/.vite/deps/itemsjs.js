import "./chunk-BUSYA2B4.js";

// node_modules/itemsjs/dist/index.modern.js
var t = "object" == typeof global && global && global.Object === Object && global;
var e = "object" == typeof self && self && self.Object === Object && self;
var r = t || e || Function("return this")();
var n = r.Symbol;
var o = Object.prototype;
var i = o.hasOwnProperty;
var s = o.toString;
var a = n ? n.toStringTag : void 0;
var c = Object.prototype.toString;
var u = "[object Null]";
var l = "[object Undefined]";
var h = n ? n.toStringTag : void 0;
function f(t3) {
  return null == t3 ? void 0 === t3 ? l : u : h && h in Object(t3) ? function(t4) {
    var e2 = i.call(t4, a), r2 = t4[a];
    try {
      t4[a] = void 0;
      var n2 = true;
    } catch (t5) {
    }
    var o2 = s.call(t4);
    return n2 && (e2 ? t4[a] = r2 : delete t4[a]), o2;
  }(t3) : function(t4) {
    return c.call(t4);
  }(t3);
}
function d(t3) {
  return null != t3 && "object" == typeof t3;
}
var p = "[object Symbol]";
function w(t3) {
  return "symbol" == typeof t3 || d(t3) && f(t3) == p;
}
function g(t3, e2) {
  for (var r2 = -1, n2 = null == t3 ? 0 : t3.length, o2 = Array(n2); ++r2 < n2; ) o2[r2] = e2(t3[r2], r2, t3);
  return o2;
}
var v = Array.isArray;
var y = 1 / 0;
var _ = n ? n.prototype : void 0;
var b = _ ? _.toString : void 0;
function m(t3) {
  if ("string" == typeof t3) return t3;
  if (v(t3)) return g(t3, m) + "";
  if (w(t3)) return b ? b.call(t3) : "";
  var e2 = t3 + "";
  return "0" == e2 && 1 / t3 == -y ? "-0" : e2;
}
function j(t3) {
  var e2 = typeof t3;
  return null != t3 && ("object" == e2 || "function" == e2);
}
function S(t3) {
  return t3;
}
var O = "[object AsyncFunction]";
var x = "[object Function]";
var k = "[object GeneratorFunction]";
var A = "[object Proxy]";
function E(t3) {
  if (!j(t3)) return false;
  var e2 = f(t3);
  return e2 == x || e2 == k || e2 == O || e2 == A;
}
var z;
var F = r["__core-js_shared__"];
var P = (z = /[^.]+$/.exec(F && F.keys && F.keys.IE_PROTO || "")) ? "Symbol(src)_1." + z : "";
var T = Function.prototype.toString;
function I(t3) {
  if (null != t3) {
    try {
      return T.call(t3);
    } catch (t4) {
    }
    try {
      return t3 + "";
    } catch (t4) {
    }
  }
  return "";
}
var M = /^\[object .+?Constructor\]$/;
var N = RegExp("^" + Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function $(t3, e2) {
  var r2 = function(t4, e3) {
    return null == t4 ? void 0 : t4[e3];
  }(t3, e2);
  return function(t4) {
    return !(!j(t4) || (e3 = t4, P && P in e3)) && (E(t4) ? N : M).test(I(t4));
    var e3;
  }(r2) ? r2 : void 0;
}
var W;
var C;
var D;
var V = $(r, "WeakMap");
var R = Object.create;
var U = /* @__PURE__ */ function() {
  function t3() {
  }
  return function(e2) {
    if (!j(e2)) return {};
    if (R) return R(e2);
    t3.prototype = e2;
    var r2 = new t3();
    return t3.prototype = void 0, r2;
  };
}();
var q = Date.now;
var L = function() {
  try {
    var t3 = $(Object, "defineProperty");
    return t3({}, "", {}), t3;
  } catch (t4) {
  }
}();
var B = L;
var J = B ? function(t3, e2) {
  return B(t3, "toString", { configurable: true, enumerable: false, value: (r2 = e2, function() {
    return r2;
  }), writable: true });
  var r2;
} : S;
var H = (W = J, C = 0, D = 0, function() {
  var t3 = q(), e2 = 16 - (t3 - D);
  if (D = t3, e2 > 0) {
    if (++C >= 800) return arguments[0];
  } else C = 0;
  return W.apply(void 0, arguments);
});
function G(t3) {
  return t3 != t3;
}
function Y(t3, e2) {
  return !(null == t3 || !t3.length) && function(t4, e3, r2) {
    return e3 == e3 ? function(t5, e4, r3) {
      for (var n2 = -1, o2 = t5.length; ++n2 < o2; ) if (t5[n2] === e4) return n2;
      return -1;
    }(t4, e3) : function(t5, e4, r3, n2) {
      for (var o2 = t5.length, i2 = -1; ++i2 < o2; ) if (e4(t5[i2], i2, t5)) return i2;
      return -1;
    }(t4, G);
  }(t3, e2) > -1;
}
var K = 9007199254740991;
var Q = /^(?:0|[1-9]\d*)$/;
function X(t3, e2) {
  var r2 = typeof t3;
  return !!(e2 = null == e2 ? K : e2) && ("number" == r2 || "symbol" != r2 && Q.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e2;
}
function Z(t3, e2, r2) {
  "__proto__" == e2 && B ? B(t3, e2, { configurable: true, enumerable: true, value: r2, writable: true }) : t3[e2] = r2;
}
function tt(t3, e2) {
  return t3 === e2 || t3 != t3 && e2 != e2;
}
var et = Object.prototype.hasOwnProperty;
function rt(t3, e2, r2) {
  var n2 = t3[e2];
  et.call(t3, e2) && tt(n2, r2) && (void 0 !== r2 || e2 in t3) || Z(t3, e2, r2);
}
function nt(t3, e2, r2, n2) {
  var o2 = !r2;
  r2 || (r2 = {});
  for (var i2 = -1, s2 = e2.length; ++i2 < s2; ) {
    var a2 = e2[i2], c2 = n2 ? n2(r2[a2], t3[a2], a2, r2, t3) : void 0;
    void 0 === c2 && (c2 = t3[a2]), o2 ? Z(r2, a2, c2) : rt(r2, a2, c2);
  }
  return r2;
}
var ot = Math.max;
function it(t3, e2) {
  return H(function(t4, e3, r2) {
    return e3 = ot(void 0 === e3 ? t4.length - 1 : e3, 0), function() {
      for (var n2 = arguments, o2 = -1, i2 = ot(n2.length - e3, 0), s2 = Array(i2); ++o2 < i2; ) s2[o2] = n2[e3 + o2];
      o2 = -1;
      for (var a2 = Array(e3 + 1); ++o2 < e3; ) a2[o2] = n2[o2];
      return a2[e3] = r2(s2), function(t5, e4, r3) {
        switch (r3.length) {
          case 0:
            return t5.call(e4);
          case 1:
            return t5.call(e4, r3[0]);
          case 2:
            return t5.call(e4, r3[0], r3[1]);
          case 3:
            return t5.call(e4, r3[0], r3[1], r3[2]);
        }
        return t5.apply(e4, r3);
      }(t4, this, a2);
    };
  }(t3, e2, S), t3 + "");
}
var st = 9007199254740991;
function at(t3) {
  return "number" == typeof t3 && t3 > -1 && t3 % 1 == 0 && t3 <= st;
}
function ct(t3) {
  return null != t3 && at(t3.length) && !E(t3);
}
function ut(t3, e2, r2) {
  if (!j(r2)) return false;
  var n2 = typeof e2;
  return !!("number" == n2 ? ct(r2) && X(e2, r2.length) : "string" == n2 && e2 in r2) && tt(r2[e2], t3);
}
var lt = Object.prototype;
function ht(t3) {
  var e2 = t3 && t3.constructor;
  return t3 === ("function" == typeof e2 && e2.prototype || lt);
}
function ft(t3) {
  return d(t3) && "[object Arguments]" == f(t3);
}
var dt = Object.prototype;
var pt = dt.hasOwnProperty;
var wt = dt.propertyIsEnumerable;
var gt = ft(/* @__PURE__ */ function() {
  return arguments;
}()) ? ft : function(t3) {
  return d(t3) && pt.call(t3, "callee") && !wt.call(t3, "callee");
};
var vt = "object" == typeof exports && exports && !exports.nodeType && exports;
var yt = vt && "object" == typeof module && module && !module.nodeType && module;
var _t = yt && yt.exports === vt ? r.Buffer : void 0;
var bt = (_t ? _t.isBuffer : void 0) || function() {
  return false;
};
var mt = {};
function jt(t3) {
  return function(e2) {
    return t3(e2);
  };
}
mt["[object Float32Array]"] = mt["[object Float64Array]"] = mt["[object Int8Array]"] = mt["[object Int16Array]"] = mt["[object Int32Array]"] = mt["[object Uint8Array]"] = mt["[object Uint8ClampedArray]"] = mt["[object Uint16Array]"] = mt["[object Uint32Array]"] = true, mt["[object Arguments]"] = mt["[object Array]"] = mt["[object ArrayBuffer]"] = mt["[object Boolean]"] = mt["[object DataView]"] = mt["[object Date]"] = mt["[object Error]"] = mt["[object Function]"] = mt["[object Map]"] = mt["[object Number]"] = mt["[object Object]"] = mt["[object RegExp]"] = mt["[object Set]"] = mt["[object String]"] = mt["[object WeakMap]"] = false;
var St = "object" == typeof exports && exports && !exports.nodeType && exports;
var Ot = St && "object" == typeof module && module && !module.nodeType && module;
var xt = Ot && Ot.exports === St && t.process;
var kt = function() {
  try {
    return Ot && Ot.require && Ot.require("util").types || xt && xt.binding && xt.binding("util");
  } catch (t3) {
  }
}();
var At = kt && kt.isTypedArray;
var Et = At ? jt(At) : function(t3) {
  return d(t3) && at(t3.length) && !!mt[f(t3)];
};
var zt = Object.prototype.hasOwnProperty;
function Ft(t3, e2) {
  var r2 = v(t3), n2 = !r2 && gt(t3), o2 = !r2 && !n2 && bt(t3), i2 = !r2 && !n2 && !o2 && Et(t3), s2 = r2 || n2 || o2 || i2, a2 = s2 ? function(t4, e3) {
    for (var r3 = -1, n3 = Array(t4); ++r3 < t4; ) n3[r3] = e3(r3);
    return n3;
  }(t3.length, String) : [], c2 = a2.length;
  for (var u2 in t3) !e2 && !zt.call(t3, u2) || s2 && ("length" == u2 || o2 && ("offset" == u2 || "parent" == u2) || i2 && ("buffer" == u2 || "byteLength" == u2 || "byteOffset" == u2) || X(u2, c2)) || a2.push(u2);
  return a2;
}
function Pt(t3, e2) {
  return function(r2) {
    return t3(e2(r2));
  };
}
var Tt = Pt(Object.keys, Object);
var It = Object.prototype.hasOwnProperty;
function Mt(t3) {
  return ct(t3) ? Ft(t3) : function(t4) {
    if (!ht(t4)) return Tt(t4);
    var e2 = [];
    for (var r2 in Object(t4)) It.call(t4, r2) && "constructor" != r2 && e2.push(r2);
    return e2;
  }(t3);
}
var Nt = Object.prototype.hasOwnProperty;
function $t(t3) {
  return ct(t3) ? Ft(t3, true) : function(t4) {
    if (!j(t4)) return function(t5) {
      var e3 = [];
      if (null != t5) for (var r3 in Object(t5)) e3.push(r3);
      return e3;
    }(t4);
    var e2 = ht(t4), r2 = [];
    for (var n2 in t4) ("constructor" != n2 || !e2 && Nt.call(t4, n2)) && r2.push(n2);
    return r2;
  }(t3);
}
var Wt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var Ct = /^\w*$/;
function Dt(t3, e2) {
  if (v(t3)) return false;
  var r2 = typeof t3;
  return !("number" != r2 && "symbol" != r2 && "boolean" != r2 && null != t3 && !w(t3)) || Ct.test(t3) || !Wt.test(t3) || null != e2 && t3 in Object(e2);
}
var Vt = $(Object, "create");
var Rt = Object.prototype.hasOwnProperty;
var Ut = Object.prototype.hasOwnProperty;
function qt(t3) {
  var e2 = -1, r2 = null == t3 ? 0 : t3.length;
  for (this.clear(); ++e2 < r2; ) {
    var n2 = t3[e2];
    this.set(n2[0], n2[1]);
  }
}
function Lt(t3, e2) {
  for (var r2 = t3.length; r2--; ) if (tt(t3[r2][0], e2)) return r2;
  return -1;
}
qt.prototype.clear = function() {
  this.__data__ = Vt ? Vt(null) : {}, this.size = 0;
}, qt.prototype.delete = function(t3) {
  var e2 = this.has(t3) && delete this.__data__[t3];
  return this.size -= e2 ? 1 : 0, e2;
}, qt.prototype.get = function(t3) {
  var e2 = this.__data__;
  if (Vt) {
    var r2 = e2[t3];
    return "__lodash_hash_undefined__" === r2 ? void 0 : r2;
  }
  return Rt.call(e2, t3) ? e2[t3] : void 0;
}, qt.prototype.has = function(t3) {
  var e2 = this.__data__;
  return Vt ? void 0 !== e2[t3] : Ut.call(e2, t3);
}, qt.prototype.set = function(t3, e2) {
  var r2 = this.__data__;
  return this.size += this.has(t3) ? 0 : 1, r2[t3] = Vt && void 0 === e2 ? "__lodash_hash_undefined__" : e2, this;
};
var Bt = Array.prototype.splice;
function Jt(t3) {
  var e2 = -1, r2 = null == t3 ? 0 : t3.length;
  for (this.clear(); ++e2 < r2; ) {
    var n2 = t3[e2];
    this.set(n2[0], n2[1]);
  }
}
Jt.prototype.clear = function() {
  this.__data__ = [], this.size = 0;
}, Jt.prototype.delete = function(t3) {
  var e2 = this.__data__, r2 = Lt(e2, t3);
  return !(r2 < 0 || (r2 == e2.length - 1 ? e2.pop() : Bt.call(e2, r2, 1), --this.size, 0));
}, Jt.prototype.get = function(t3) {
  var e2 = this.__data__, r2 = Lt(e2, t3);
  return r2 < 0 ? void 0 : e2[r2][1];
}, Jt.prototype.has = function(t3) {
  return Lt(this.__data__, t3) > -1;
}, Jt.prototype.set = function(t3, e2) {
  var r2 = this.__data__, n2 = Lt(r2, t3);
  return n2 < 0 ? (++this.size, r2.push([t3, e2])) : r2[n2][1] = e2, this;
};
var Ht = $(r, "Map");
function Gt(t3, e2) {
  var r2, n2, o2 = t3.__data__;
  return ("string" == (n2 = typeof (r2 = e2)) || "number" == n2 || "symbol" == n2 || "boolean" == n2 ? "__proto__" !== r2 : null === r2) ? o2["string" == typeof e2 ? "string" : "hash"] : o2.map;
}
function Yt(t3) {
  var e2 = -1, r2 = null == t3 ? 0 : t3.length;
  for (this.clear(); ++e2 < r2; ) {
    var n2 = t3[e2];
    this.set(n2[0], n2[1]);
  }
}
function Kt(t3, e2) {
  if ("function" != typeof t3 || null != e2 && "function" != typeof e2) throw new TypeError("Expected a function");
  var r2 = function() {
    var n2 = arguments, o2 = e2 ? e2.apply(this, n2) : n2[0], i2 = r2.cache;
    if (i2.has(o2)) return i2.get(o2);
    var s2 = t3.apply(this, n2);
    return r2.cache = i2.set(o2, s2) || i2, s2;
  };
  return r2.cache = new (Kt.Cache || Yt)(), r2;
}
Yt.prototype.clear = function() {
  this.size = 0, this.__data__ = { hash: new qt(), map: new (Ht || Jt)(), string: new qt() };
}, Yt.prototype.delete = function(t3) {
  var e2 = Gt(this, t3).delete(t3);
  return this.size -= e2 ? 1 : 0, e2;
}, Yt.prototype.get = function(t3) {
  return Gt(this, t3).get(t3);
}, Yt.prototype.has = function(t3) {
  return Gt(this, t3).has(t3);
}, Yt.prototype.set = function(t3, e2) {
  var r2 = Gt(this, t3), n2 = r2.size;
  return r2.set(t3, e2), this.size += r2.size == n2 ? 0 : 1, this;
}, Kt.Cache = Yt;
var Qt;
var Xt;
var Zt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var te = /\\(\\)?/g;
var ee = (Qt = Kt(function(t3) {
  var e2 = [];
  return 46 === t3.charCodeAt(0) && e2.push(""), t3.replace(Zt, function(t4, r2, n2, o2) {
    e2.push(n2 ? o2.replace(te, "$1") : r2 || t4);
  }), e2;
}, function(t3) {
  return 500 === Xt.size && Xt.clear(), t3;
}), Xt = Qt.cache, Qt);
function re(t3, e2) {
  return v(t3) ? t3 : Dt(t3, e2) ? [t3] : ee(function(t4) {
    return null == t4 ? "" : m(t4);
  }(t3));
}
var ne = 1 / 0;
function oe(t3) {
  if ("string" == typeof t3 || w(t3)) return t3;
  var e2 = t3 + "";
  return "0" == e2 && 1 / t3 == -ne ? "-0" : e2;
}
function ie(t3, e2) {
  for (var r2 = 0, n2 = (e2 = re(e2, t3)).length; null != t3 && r2 < n2; ) t3 = t3[oe(e2[r2++])];
  return r2 && r2 == n2 ? t3 : void 0;
}
function se(t3, e2) {
  for (var r2 = -1, n2 = e2.length, o2 = t3.length; ++r2 < n2; ) t3[o2 + r2] = e2[r2];
  return t3;
}
var ae = n ? n.isConcatSpreadable : void 0;
function ce(t3) {
  return v(t3) || gt(t3) || !!(ae && t3 && t3[ae]);
}
function ue(t3, e2, r2, n2, o2) {
  var i2 = -1, s2 = t3.length;
  for (r2 || (r2 = ce), o2 || (o2 = []); ++i2 < s2; ) {
    var a2 = t3[i2];
    e2 > 0 && r2(a2) ? e2 > 1 ? ue(a2, e2 - 1, r2, n2, o2) : se(o2, a2) : n2 || (o2[o2.length] = a2);
  }
  return o2;
}
var le = Pt(Object.getPrototypeOf, Object);
function he(t3) {
  var e2 = this.__data__ = new Jt(t3);
  this.size = e2.size;
}
he.prototype.clear = function() {
  this.__data__ = new Jt(), this.size = 0;
}, he.prototype.delete = function(t3) {
  var e2 = this.__data__, r2 = e2.delete(t3);
  return this.size = e2.size, r2;
}, he.prototype.get = function(t3) {
  return this.__data__.get(t3);
}, he.prototype.has = function(t3) {
  return this.__data__.has(t3);
}, he.prototype.set = function(t3, e2) {
  var r2 = this.__data__;
  if (r2 instanceof Jt) {
    var n2 = r2.__data__;
    if (!Ht || n2.length < 199) return n2.push([t3, e2]), this.size = ++r2.size, this;
    r2 = this.__data__ = new Yt(n2);
  }
  return r2.set(t3, e2), this.size = r2.size, this;
};
var fe = "object" == typeof exports && exports && !exports.nodeType && exports;
var de = fe && "object" == typeof module && module && !module.nodeType && module;
var pe = de && de.exports === fe ? r.Buffer : void 0;
var we = pe ? pe.allocUnsafe : void 0;
function ge() {
  return [];
}
var ve = Object.prototype.propertyIsEnumerable;
var ye = Object.getOwnPropertySymbols;
var _e = ye ? function(t3) {
  return null == t3 ? [] : (t3 = Object(t3), function(e2, r2) {
    for (var n2 = -1, o2 = null == e2 ? 0 : e2.length, i2 = 0, s2 = []; ++n2 < o2; ) {
      var a2 = e2[n2];
      ve.call(t3, a2) && (s2[i2++] = a2);
    }
    return s2;
  }(ye(t3)));
} : ge;
var be = _e;
var me = Object.getOwnPropertySymbols ? function(t3) {
  for (var e2 = []; t3; ) se(e2, be(t3)), t3 = le(t3);
  return e2;
} : ge;
function je(t3, e2, r2) {
  var n2 = e2(t3);
  return v(t3) ? n2 : se(n2, r2(t3));
}
function Se(t3) {
  return je(t3, Mt, be);
}
function Oe(t3) {
  return je(t3, $t, me);
}
var xe = $(r, "DataView");
var ke = $(r, "Promise");
var Ae = $(r, "Set");
var Ee = "[object Map]";
var ze = "[object Promise]";
var Fe = "[object Set]";
var Pe = "[object WeakMap]";
var Te = "[object DataView]";
var Ie = I(xe);
var Me = I(Ht);
var Ne = I(ke);
var $e = I(Ae);
var We = I(V);
var Ce = f;
(xe && Ce(new xe(new ArrayBuffer(1))) != Te || Ht && Ce(new Ht()) != Ee || ke && Ce(ke.resolve()) != ze || Ae && Ce(new Ae()) != Fe || V && Ce(new V()) != Pe) && (Ce = function(t3) {
  var e2 = f(t3), r2 = "[object Object]" == e2 ? t3.constructor : void 0, n2 = r2 ? I(r2) : "";
  if (n2) switch (n2) {
    case Ie:
      return Te;
    case Me:
      return Ee;
    case Ne:
      return ze;
    case $e:
      return Fe;
    case We:
      return Pe;
  }
  return e2;
});
var De = Ce;
var Ve = Object.prototype.hasOwnProperty;
var Re = r.Uint8Array;
function Ue(t3) {
  var e2 = new t3.constructor(t3.byteLength);
  return new Re(e2).set(new Re(t3)), e2;
}
var qe = /\w*$/;
var Le = n ? n.prototype : void 0;
var Be = Le ? Le.valueOf : void 0;
var Je = "[object Boolean]";
var He = "[object Date]";
var Ge = "[object Map]";
var Ye = "[object Number]";
var Ke = "[object RegExp]";
var Qe = "[object Set]";
var Xe = "[object String]";
var Ze = "[object Symbol]";
var tr = "[object ArrayBuffer]";
var er = "[object DataView]";
var rr = "[object Float32Array]";
var nr = "[object Float64Array]";
var or = "[object Int8Array]";
var ir = "[object Int16Array]";
var sr = "[object Int32Array]";
var ar = "[object Uint8Array]";
var cr = "[object Uint8ClampedArray]";
var ur = "[object Uint16Array]";
var lr = "[object Uint32Array]";
var hr = kt && kt.isMap;
var fr = hr ? jt(hr) : function(t3) {
  return d(t3) && "[object Map]" == De(t3);
};
var dr = kt && kt.isSet;
var pr = dr ? jt(dr) : function(t3) {
  return d(t3) && "[object Set]" == De(t3);
};
var wr = 1;
var gr = 2;
var vr = 4;
var yr = "[object Arguments]";
var _r = "[object Function]";
var br = "[object GeneratorFunction]";
var mr = "[object Object]";
var jr = {};
function Sr(t3, e2, r2, n2, o2, i2) {
  var s2, a2 = e2 & wr, c2 = e2 & gr, u2 = e2 & vr;
  if (r2 && (s2 = o2 ? r2(t3, n2, o2, i2) : r2(t3)), void 0 !== s2) return s2;
  if (!j(t3)) return t3;
  var l2 = v(t3);
  if (l2) {
    if (s2 = function(t4) {
      var e3 = t4.length, r3 = new t4.constructor(e3);
      return e3 && "string" == typeof t4[0] && Ve.call(t4, "index") && (r3.index = t4.index, r3.input = t4.input), r3;
    }(t3), !a2) return function(t4, e3) {
      var r3 = -1, n3 = t4.length;
      for (e3 || (e3 = Array(n3)); ++r3 < n3; ) e3[r3] = t4[r3];
      return e3;
    }(t3, s2);
  } else {
    var h2 = De(t3), f2 = h2 == _r || h2 == br;
    if (bt(t3)) return function(t4, e3) {
      if (e3) return t4.slice();
      var r3 = t4.length, n3 = we ? we(r3) : new t4.constructor(r3);
      return t4.copy(n3), n3;
    }(t3, a2);
    if (h2 == mr || h2 == yr || f2 && !o2) {
      if (s2 = c2 || f2 ? {} : function(t4) {
        return "function" != typeof t4.constructor || ht(t4) ? {} : U(le(t4));
      }(t3), !a2) return c2 ? function(t4, e3) {
        return nt(t4, me(t4), e3);
      }(t3, function(t4, e3) {
        return t4 && nt(e3, $t(e3), t4);
      }(s2, t3)) : function(t4, e3) {
        return nt(t4, be(t4), e3);
      }(t3, function(t4, e3) {
        return t4 && nt(e3, Mt(e3), t4);
      }(s2, t3));
    } else {
      if (!jr[h2]) return o2 ? t3 : {};
      s2 = function(t4, e3, r3) {
        var n3, o3, i3 = t4.constructor;
        switch (e3) {
          case tr:
            return Ue(t4);
          case Je:
          case He:
            return new i3(+t4);
          case er:
            return function(t5, e4) {
              var r4 = e4 ? Ue(t5.buffer) : t5.buffer;
              return new t5.constructor(r4, t5.byteOffset, t5.byteLength);
            }(t4, r3);
          case rr:
          case nr:
          case or:
          case ir:
          case sr:
          case ar:
          case cr:
          case ur:
          case lr:
            return function(t5, e4) {
              var r4 = e4 ? Ue(t5.buffer) : t5.buffer;
              return new t5.constructor(r4, t5.byteOffset, t5.length);
            }(t4, r3);
          case Ge:
            return new i3();
          case Ye:
          case Xe:
            return new i3(t4);
          case Ke:
            return (o3 = new (n3 = t4).constructor(n3.source, qe.exec(n3))).lastIndex = n3.lastIndex, o3;
          case Qe:
            return new i3();
          case Ze:
            return Be ? Object(Be.call(t4)) : {};
        }
      }(t3, h2, a2);
    }
  }
  i2 || (i2 = new he());
  var d2 = i2.get(t3);
  if (d2) return d2;
  i2.set(t3, s2), pr(t3) ? t3.forEach(function(n3) {
    s2.add(Sr(n3, e2, r2, n3, t3, i2));
  }) : fr(t3) && t3.forEach(function(n3, o3) {
    s2.set(o3, Sr(n3, e2, r2, o3, t3, i2));
  });
  var p2 = l2 ? void 0 : (u2 ? c2 ? Oe : Se : c2 ? $t : Mt)(t3);
  return function(t4, e3) {
    for (var r3 = -1, n3 = null == t4 ? 0 : t4.length; ++r3 < n3 && false !== e3(t4[r3], r3); ) ;
  }(p2 || t3, function(n3, o3) {
    p2 && (n3 = t3[o3 = n3]), rt(s2, o3, Sr(n3, e2, r2, o3, t3, i2));
  }), s2;
}
function Or(t3) {
  return Sr(t3, 4);
}
function xr(t3) {
  var e2 = -1, r2 = null == t3 ? 0 : t3.length;
  for (this.__data__ = new Yt(); ++e2 < r2; ) this.add(t3[e2]);
}
function kr(t3, e2) {
  for (var r2 = -1, n2 = null == t3 ? 0 : t3.length; ++r2 < n2; ) if (e2(t3[r2], r2, t3)) return true;
  return false;
}
function Ar(t3, e2) {
  return t3.has(e2);
}
jr[yr] = jr["[object Array]"] = jr["[object ArrayBuffer]"] = jr["[object DataView]"] = jr["[object Boolean]"] = jr["[object Date]"] = jr["[object Float32Array]"] = jr["[object Float64Array]"] = jr["[object Int8Array]"] = jr["[object Int16Array]"] = jr["[object Int32Array]"] = jr["[object Map]"] = jr["[object Number]"] = jr[mr] = jr["[object RegExp]"] = jr["[object Set]"] = jr["[object String]"] = jr["[object Symbol]"] = jr["[object Uint8Array]"] = jr["[object Uint8ClampedArray]"] = jr["[object Uint16Array]"] = jr["[object Uint32Array]"] = true, jr["[object Error]"] = jr[_r] = jr["[object WeakMap]"] = false, xr.prototype.add = xr.prototype.push = function(t3) {
  return this.__data__.set(t3, "__lodash_hash_undefined__"), this;
}, xr.prototype.has = function(t3) {
  return this.__data__.has(t3);
};
var Er = 1;
var zr = 2;
function Fr(t3, e2, r2, n2, o2, i2) {
  var s2 = r2 & Er, a2 = t3.length, c2 = e2.length;
  if (a2 != c2 && !(s2 && c2 > a2)) return false;
  var u2 = i2.get(t3), l2 = i2.get(e2);
  if (u2 && l2) return u2 == e2 && l2 == t3;
  var h2 = -1, f2 = true, d2 = r2 & zr ? new xr() : void 0;
  for (i2.set(t3, e2), i2.set(e2, t3); ++h2 < a2; ) {
    var p2 = t3[h2], w2 = e2[h2];
    if (n2) var g2 = s2 ? n2(w2, p2, h2, e2, t3, i2) : n2(p2, w2, h2, t3, e2, i2);
    if (void 0 !== g2) {
      if (g2) continue;
      f2 = false;
      break;
    }
    if (d2) {
      if (!kr(e2, function(t4, e3) {
        if (!Ar(d2, e3) && (p2 === t4 || o2(p2, t4, r2, n2, i2))) return d2.push(e3);
      })) {
        f2 = false;
        break;
      }
    } else if (p2 !== w2 && !o2(p2, w2, r2, n2, i2)) {
      f2 = false;
      break;
    }
  }
  return i2.delete(t3), i2.delete(e2), f2;
}
function Pr(t3) {
  var e2 = -1, r2 = Array(t3.size);
  return t3.forEach(function(t4, n2) {
    r2[++e2] = [n2, t4];
  }), r2;
}
function Tr(t3) {
  var e2 = -1, r2 = Array(t3.size);
  return t3.forEach(function(t4) {
    r2[++e2] = t4;
  }), r2;
}
var Ir = 1;
var Mr = 2;
var Nr = "[object Boolean]";
var $r = "[object Date]";
var Wr = "[object Error]";
var Cr = "[object Map]";
var Dr = "[object Number]";
var Vr = "[object RegExp]";
var Rr = "[object Set]";
var Ur = "[object String]";
var qr = "[object Symbol]";
var Lr = "[object ArrayBuffer]";
var Br = "[object DataView]";
var Jr = n ? n.prototype : void 0;
var Hr = Jr ? Jr.valueOf : void 0;
var Gr = 1;
var Yr = Object.prototype.hasOwnProperty;
var Kr = 1;
var Qr = "[object Arguments]";
var Xr = "[object Array]";
var Zr = "[object Object]";
var tn = Object.prototype.hasOwnProperty;
function en(t3, e2, r2, n2, o2) {
  return t3 === e2 || (null == t3 || null == e2 || !d(t3) && !d(e2) ? t3 != t3 && e2 != e2 : function(t4, e3, r3, n3, o3, i2) {
    var s2 = v(t4), a2 = v(e3), c2 = s2 ? Xr : De(t4), u2 = a2 ? Xr : De(e3), l2 = (c2 = c2 == Qr ? Zr : c2) == Zr, h2 = (u2 = u2 == Qr ? Zr : u2) == Zr, f2 = c2 == u2;
    if (f2 && bt(t4)) {
      if (!bt(e3)) return false;
      s2 = true, l2 = false;
    }
    if (f2 && !l2) return i2 || (i2 = new he()), s2 || Et(t4) ? Fr(t4, e3, r3, n3, o3, i2) : function(t5, e4, r4, n4, o4, i3, s3) {
      switch (r4) {
        case Br:
          if (t5.byteLength != e4.byteLength || t5.byteOffset != e4.byteOffset) return false;
          t5 = t5.buffer, e4 = e4.buffer;
        case Lr:
          return !(t5.byteLength != e4.byteLength || !i3(new Re(t5), new Re(e4)));
        case Nr:
        case $r:
        case Dr:
          return tt(+t5, +e4);
        case Wr:
          return t5.name == e4.name && t5.message == e4.message;
        case Vr:
        case Ur:
          return t5 == e4 + "";
        case Cr:
          var a3 = Pr;
        case Rr:
          if (a3 || (a3 = Tr), t5.size != e4.size && !(n4 & Ir)) return false;
          var c3 = s3.get(t5);
          if (c3) return c3 == e4;
          n4 |= Mr, s3.set(t5, e4);
          var u3 = Fr(a3(t5), a3(e4), n4, o4, i3, s3);
          return s3.delete(t5), u3;
        case qr:
          if (Hr) return Hr.call(t5) == Hr.call(e4);
      }
      return false;
    }(t4, e3, c2, r3, n3, o3, i2);
    if (!(r3 & Kr)) {
      var d2 = l2 && tn.call(t4, "__wrapped__"), p2 = h2 && tn.call(e3, "__wrapped__");
      if (d2 || p2) {
        var w2 = d2 ? t4.value() : t4, g2 = p2 ? e3.value() : e3;
        return i2 || (i2 = new he()), o3(w2, g2, r3, n3, i2);
      }
    }
    return !!f2 && (i2 || (i2 = new he()), function(t5, e4, r4, n4, o4, i3) {
      var s3 = r4 & Gr, a3 = Se(t5), c3 = a3.length;
      if (c3 != Se(e4).length && !s3) return false;
      for (var u3 = c3; u3--; ) {
        var l3 = a3[u3];
        if (!(s3 ? l3 in e4 : Yr.call(e4, l3))) return false;
      }
      var h3 = i3.get(t5), f3 = i3.get(e4);
      if (h3 && f3) return h3 == e4 && f3 == t5;
      var d3 = true;
      i3.set(t5, e4), i3.set(e4, t5);
      for (var p3 = s3; ++u3 < c3; ) {
        var w3 = t5[l3 = a3[u3]], g3 = e4[l3];
        if (n4) var v2 = s3 ? n4(g3, w3, l3, e4, t5, i3) : n4(w3, g3, l3, t5, e4, i3);
        if (!(void 0 === v2 ? w3 === g3 || o4(w3, g3, r4, n4, i3) : v2)) {
          d3 = false;
          break;
        }
        p3 || (p3 = "constructor" == l3);
      }
      if (d3 && !p3) {
        var y2 = t5.constructor, _2 = e4.constructor;
        y2 == _2 || !("constructor" in t5) || !("constructor" in e4) || "function" == typeof y2 && y2 instanceof y2 && "function" == typeof _2 && _2 instanceof _2 || (d3 = false);
      }
      return i3.delete(t5), i3.delete(e4), d3;
    }(t4, e3, r3, n3, o3, i2));
  }(t3, e2, r2, n2, en, o2));
}
var rn = 1;
var nn = 2;
function on(t3) {
  return t3 == t3 && !j(t3);
}
function sn(t3, e2) {
  return function(r2) {
    return null != r2 && r2[t3] === e2 && (void 0 !== e2 || t3 in Object(r2));
  };
}
function an(t3, e2) {
  return null != t3 && e2 in Object(t3);
}
var cn = 1;
var un = 2;
function ln(t3) {
  return "function" == typeof t3 ? t3 : null == t3 ? S : "object" == typeof t3 ? v(t3) ? function(t4, e3) {
    return Dt(t4) && on(e3) ? sn(oe(t4), e3) : function(r3) {
      var n3 = function(t5, e4, r4) {
        var n4 = null == t5 ? void 0 : ie(t5, e4);
        return void 0 === n4 ? void 0 : n4;
      }(r3, t4);
      return void 0 === n3 && n3 === e3 ? function(t5, e4) {
        return null != t5 && function(t6, e5, r4) {
          for (var n4 = -1, o3 = (e5 = re(e5, t6)).length, i2 = false; ++n4 < o3; ) {
            var s2 = oe(e5[n4]);
            if (!(i2 = null != t6 && r4(t6, s2))) break;
            t6 = t6[s2];
          }
          return i2 || ++n4 != o3 ? i2 : !!(o3 = null == t6 ? 0 : t6.length) && at(o3) && X(s2, o3) && (v(t6) || gt(t6));
        }(t5, e4, an);
      }(r3, t4) : en(e3, n3, cn | un);
    };
  }(t3[0], t3[1]) : (o2 = function(t4) {
    for (var e3 = Mt(t4), r3 = e3.length; r3--; ) {
      var n3 = e3[r3], o3 = t4[n3];
      e3[r3] = [n3, o3, on(o3)];
    }
    return e3;
  }(n2 = t3), 1 == o2.length && o2[0][2] ? sn(o2[0][0], o2[0][1]) : function(t4) {
    return t4 === n2 || function(t5, e3, r3, n3) {
      var o3 = r3.length, i2 = o3;
      if (null == t5) return !i2;
      for (t5 = Object(t5); o3--; ) {
        var s2 = r3[o3];
        if (s2[2] ? s2[1] !== t5[s2[0]] : !(s2[0] in t5)) return false;
      }
      for (; ++o3 < i2; ) {
        var a2 = (s2 = r3[o3])[0], c2 = t5[a2], u2 = s2[1];
        if (s2[2]) {
          if (void 0 === c2 && !(a2 in t5)) return false;
        } else {
          var l2 = new he();
          if (!en(u2, c2, rn | nn, void 0, l2)) return false;
        }
      }
      return true;
    }(t4, 0, o2);
  }) : Dt(e2 = t3) ? (r2 = oe(e2), function(t4) {
    return null == t4 ? void 0 : t4[r2];
  }) : /* @__PURE__ */ function(t4) {
    return function(e3) {
      return ie(e3, t4);
    };
  }(e2);
  var e2, r2, n2, o2;
}
var hn = function(t3, e2, r2) {
  for (var n2 = -1, o2 = Object(t3), i2 = r2(t3), s2 = i2.length; s2--; ) {
    var a2 = i2[++n2];
    if (false === e2(o2[a2], a2, o2)) break;
  }
  return t3;
};
function fn(t3, e2) {
  return t3 && hn(t3, e2, Mt);
}
var dn;
var pn = (dn = fn, function(t3, e2) {
  if (null == t3) return t3;
  if (!ct(t3)) return dn(t3, e2);
  for (var r2 = t3.length, n2 = -1, o2 = Object(t3); ++n2 < r2 && false !== e2(o2[n2], n2, o2); ) ;
  return t3;
});
function wn(t3, e2) {
  var r2 = -1, n2 = ct(t3) ? Array(t3.length) : [];
  return pn(t3, function(t4, o2, i2) {
    n2[++r2] = e2(t4, o2, i2);
  }), n2;
}
function gn(t3, e2) {
  return t3 > e2;
}
var vn = Math.min;
function yn(t3) {
  return function(t4) {
    return d(t4) && ct(t4);
  }(t3) ? t3 : [];
}
var _n = it(function(t3) {
  var e2 = g(t3, yn);
  return e2.length && e2[0] === t3[0] ? function(t4, e3, r2) {
    for (var n2 = Y, o2 = t4[0].length, i2 = t4.length, s2 = i2, a2 = Array(i2), c2 = Infinity, u2 = []; s2--; ) {
      var l2 = t4[s2];
      c2 = vn(l2.length, c2), a2[s2] = o2 >= 120 && l2.length >= 120 ? new xr(s2 && l2) : void 0;
    }
    l2 = t4[0];
    var h2 = -1, f2 = a2[0];
    t: for (; ++h2 < o2 && u2.length < c2; ) {
      var d2 = l2[h2], p2 = d2;
      if (d2 = 0 !== d2 ? d2 : 0, !(f2 ? Ar(f2, p2) : n2(u2, p2, r2))) {
        for (s2 = i2; --s2; ) {
          var w2 = a2[s2];
          if (!(w2 ? Ar(w2, p2) : n2(t4[s2], p2, r2))) continue t;
        }
        f2 && f2.push(p2), u2.push(d2);
      }
    }
    return u2;
  }(e2) : [];
});
var bn = _n;
function mn(t3, e2) {
  return t3 < e2;
}
function jn(t3, e2) {
  var r2 = {};
  return e2 = ln(e2), fn(t3, function(t4, n2, o2) {
    Z(r2, n2, e2(t4, n2, o2));
  }), r2;
}
function Sn(t3, e2, r2) {
  for (var n2 = -1, o2 = t3.length; ++n2 < o2; ) {
    var i2 = t3[n2], s2 = e2(i2);
    if (null != s2 && (void 0 === a2 ? s2 == s2 && !w(s2) : r2(s2, a2))) var a2 = s2, c2 = i2;
  }
  return c2;
}
function On(t3, e2) {
  return t3 && t3.length ? Sn(t3, ln(e2), gn) : void 0;
}
function xn(t3, e2) {
  for (var r2, n2 = -1, o2 = t3.length; ++n2 < o2; ) {
    var i2 = e2(t3[n2]);
    void 0 !== i2 && (r2 = void 0 === r2 ? i2 : r2 + i2);
  }
  return r2;
}
function kn(t3, e2) {
  return function(t4, e3) {
    var r2 = null == t4 ? 0 : t4.length;
    return r2 ? xn(t4, e3) / r2 : NaN;
  }(t3, ln(e2));
}
function An(t3, e2) {
  if (t3 !== e2) {
    var r2 = void 0 !== t3, n2 = null === t3, o2 = t3 == t3, i2 = w(t3), s2 = void 0 !== e2, a2 = null === e2, c2 = e2 == e2, u2 = w(e2);
    if (!a2 && !u2 && !i2 && t3 > e2 || i2 && s2 && c2 && !a2 && !u2 || n2 && s2 && c2 || !r2 && c2 || !o2) return 1;
    if (!n2 && !i2 && !u2 && t3 < e2 || u2 && r2 && o2 && !n2 && !i2 || a2 && r2 && o2 || !s2 && o2 || !c2) return -1;
  }
  return 0;
}
function En(t3, e2, r2) {
  e2 = e2.length ? g(e2, function(t4) {
    return v(t4) ? function(e3) {
      return ie(e3, 1 === t4.length ? t4[0] : t4);
    } : t4;
  }) : [S];
  var n2 = -1;
  return e2 = g(e2, jt(ln)), function(t4, e3) {
    var n3 = t4.length;
    for (t4.sort(function(t5, e4) {
      return function(t6, e5, r3) {
        for (var n4 = -1, o2 = t6.criteria, i2 = e5.criteria, s2 = o2.length, a2 = r3.length; ++n4 < s2; ) {
          var c2 = An(o2[n4], i2[n4]);
          if (c2) return n4 >= a2 ? c2 : c2 * ("desc" == r3[n4] ? -1 : 1);
        }
        return t6.index - e5.index;
      }(t5, e4, r2);
    }); n3--; ) t4[n3] = t4[n3].value;
    return t4;
  }(wn(t3, function(t4, r3, o2) {
    return { criteria: g(e2, function(e3) {
      return e3(t4);
    }), index: ++n2, value: t4 };
  }));
}
function zn(t3, e2, r2, n2) {
  return null == t3 ? [] : (v(e2) || (e2 = null == e2 ? [] : [e2]), v(r2 = n2 ? void 0 : r2) || (r2 = null == r2 ? [] : [r2]), En(t3, e2, r2));
}
var Fn = it(function(t3, e2) {
  if (null == t3) return [];
  var r2 = e2.length;
  return r2 > 1 && ut(t3, e2[0], e2[1]) ? e2 = [] : r2 > 2 && ut(e2[0], e2[1], e2[2]) && (e2 = [e2[0]]), En(t3, ue(e2, 1), []);
});
function Pn(t3, e2) {
  return t3 && t3.length ? xn(t3, ln(e2)) : 0;
}
function Tn(t3) {
  if (this.words = [], t3) if (Symbol && Symbol.iterator && void 0 !== t3[Symbol.iterator]) {
    const e2 = t3[Symbol.iterator]();
    let r2 = e2.next();
    for (; !r2.done; ) this.add(r2.value), r2 = e2.next();
  } else for (let e2 = 0; e2 < t3.length; e2++) this.add(t3[e2]);
}
Tn.fromWords = function(t3) {
  const e2 = Object.create(Tn.prototype);
  return e2.words = t3, e2;
}, Tn.prototype.add = function(t3) {
  this.resize(t3), this.words[t3 >>> 5] |= 1 << t3;
}, Tn.prototype.flip = function(t3) {
  this.resize(t3), this.words[t3 >>> 5] ^= 1 << t3;
}, Tn.prototype.clear = function() {
  this.words.length = 0;
}, Tn.prototype.remove = function(t3) {
  this.resize(t3), this.words[t3 >>> 5] &= ~(1 << t3);
}, Tn.prototype.isEmpty = function(t3) {
  const e2 = this.words.length;
  for (let t4 = 0; t4 < e2; t4++) if (0 !== this.words[t4]) return false;
  return true;
}, Tn.prototype.has = function(t3) {
  return 0 != (this.words[t3 >>> 5] & 1 << t3);
}, Tn.prototype.checkedAdd = function(t3) {
  this.resize(t3);
  const e2 = this.words[t3 >>> 5], r2 = e2 | 1 << t3;
  return this.words[t3 >>> 5] = r2, (r2 ^ e2) >>> t3;
}, Tn.prototype.trim = function(t3) {
  let e2 = this.words.length;
  for (; e2 > 0 && 0 === this.words[e2 - 1]; ) e2--;
  this.words.length = e2;
}, Tn.prototype.resize = function(t3) {
  const e2 = t3 + 32 >>> 5;
  for (let t4 = this.words.length; t4 < e2; t4++) this.words[t4] = 0;
}, Tn.prototype.hammingWeight = function(t3) {
  return 16843009 * ((t3 = (858993459 & (t3 -= t3 >>> 1 & 1431655765)) + (t3 >>> 2 & 858993459)) + (t3 >>> 4) & 252645135) >>> 24;
}, Tn.prototype.hammingWeight4 = function(t3, e2, r2, n2) {
  return 16843009 * ((t3 = (t3 = (858993459 & (t3 -= t3 >>> 1 & 1431655765)) + (t3 >>> 2 & 858993459)) + (t3 >>> 4) & 252645135) + (e2 = (e2 = (858993459 & (e2 -= e2 >>> 1 & 1431655765)) + (e2 >>> 2 & 858993459)) + (e2 >>> 4) & 252645135) + (r2 = (r2 = (858993459 & (r2 -= r2 >>> 1 & 1431655765)) + (r2 >>> 2 & 858993459)) + (r2 >>> 4) & 252645135) + (n2 = (n2 = (858993459 & (n2 -= n2 >>> 1 & 1431655765)) + (n2 >>> 2 & 858993459)) + (n2 >>> 4) & 252645135)) >>> 24;
}, Tn.prototype.size = function() {
  let t3 = 0;
  const e2 = this.words.length, r2 = this.words;
  for (let n2 = 0; n2 < e2; n2++) t3 += this.hammingWeight(r2[n2]);
  return t3;
}, Tn.prototype.array = function() {
  const t3 = new Array(this.size());
  let e2 = 0;
  const r2 = this.words.length;
  for (let n2 = 0; n2 < r2; ++n2) {
    let r3 = this.words[n2];
    for (; 0 != r3; ) {
      const o2 = r3 & -r3;
      t3[e2++] = (n2 << 5) + this.hammingWeight(o2 - 1 | 0), r3 ^= o2;
    }
  }
  return t3;
}, Tn.prototype.forEach = function(t3) {
  const e2 = this.words.length;
  for (let r2 = 0; r2 < e2; ++r2) {
    let e3 = this.words[r2];
    for (; 0 != e3; ) {
      const n2 = e3 & -e3;
      t3((r2 << 5) + this.hammingWeight(n2 - 1 | 0)), e3 ^= n2;
    }
  }
}, Tn.prototype[Symbol.iterator] = function() {
  const t3 = this.words.length;
  let e2 = 0, r2 = this.words[e2], n2 = this.hammingWeight, o2 = this.words;
  return { [Symbol.iterator]() {
    return this;
  }, next() {
    for (; e2 < t3; ) {
      if (0 !== r2) {
        const t4 = r2 & -r2, o3 = (e2 << 5) + n2(t4 - 1 | 0);
        return r2 ^= t4, { done: false, value: o3 };
      }
      e2++, e2 < t3 && (r2 = o2[e2]);
    }
    return { done: true, value: void 0 };
  } };
}, Tn.prototype.clone = function() {
  const t3 = Object.create(Tn.prototype);
  return t3.words = this.words.slice(), t3;
}, Tn.prototype.intersects = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  for (let r2 = 0; r2 < e2; ++r2) if (0 != (this.words[r2] & t3.words[r2])) return true;
  return false;
}, Tn.prototype.intersection = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  let r2 = 0;
  for (; r2 + 7 < e2; r2 += 8) this.words[r2] &= t3.words[r2], this.words[r2 + 1] &= t3.words[r2 + 1], this.words[r2 + 2] &= t3.words[r2 + 2], this.words[r2 + 3] &= t3.words[r2 + 3], this.words[r2 + 4] &= t3.words[r2 + 4], this.words[r2 + 5] &= t3.words[r2 + 5], this.words[r2 + 6] &= t3.words[r2 + 6], this.words[r2 + 7] &= t3.words[r2 + 7];
  for (; r2 < e2; ++r2) this.words[r2] &= t3.words[r2];
  const n2 = this.words.length;
  for (r2 = e2; r2 < n2; ++r2) this.words[r2] = 0;
  return this;
}, Tn.prototype.intersection_size = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  let r2 = 0;
  for (let n2 = 0; n2 < e2; ++n2) r2 += this.hammingWeight(this.words[n2] & t3.words[n2]);
  return r2;
}, Tn.prototype.new_intersection = function(t3) {
  const e2 = Object.create(Tn.prototype), r2 = Math.min(this.words.length, t3.words.length);
  e2.words = new Array(r2);
  let n2 = 0;
  for (; n2 + 7 < r2; n2 += 8) e2.words[n2] = this.words[n2] & t3.words[n2], e2.words[n2 + 1] = this.words[n2 + 1] & t3.words[n2 + 1], e2.words[n2 + 2] = this.words[n2 + 2] & t3.words[n2 + 2], e2.words[n2 + 3] = this.words[n2 + 3] & t3.words[n2 + 3], e2.words[n2 + 4] = this.words[n2 + 4] & t3.words[n2 + 4], e2.words[n2 + 5] = this.words[n2 + 5] & t3.words[n2 + 5], e2.words[n2 + 6] = this.words[n2 + 6] & t3.words[n2 + 6], e2.words[n2 + 7] = this.words[n2 + 7] & t3.words[n2 + 7];
  for (; n2 < r2; ++n2) e2.words[n2] = this.words[n2] & t3.words[n2];
  return e2;
}, Tn.prototype.equals = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  for (let r2 = 0; r2 < e2; ++r2) if (this.words[r2] != t3.words[r2]) return false;
  if (this.words.length < t3.words.length) {
    const e3 = t3.words.length;
    for (let r2 = this.words.length; r2 < e3; ++r2) if (0 != t3.words[r2]) return false;
  } else if (t3.words.length < this.words.length) {
    const e3 = this.words.length;
    for (let r2 = t3.words.length; r2 < e3; ++r2) if (0 != this.words[r2]) return false;
  }
  return true;
}, Tn.prototype.difference = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  let r2 = 0;
  for (; r2 + 7 < e2; r2 += 8) this.words[r2] &= ~t3.words[r2], this.words[r2 + 1] &= ~t3.words[r2 + 1], this.words[r2 + 2] &= ~t3.words[r2 + 2], this.words[r2 + 3] &= ~t3.words[r2 + 3], this.words[r2 + 4] &= ~t3.words[r2 + 4], this.words[r2 + 5] &= ~t3.words[r2 + 5], this.words[r2 + 6] &= ~t3.words[r2 + 6], this.words[r2 + 7] &= ~t3.words[r2 + 7];
  for (; r2 < e2; ++r2) this.words[r2] &= ~t3.words[r2];
  return this;
}, Tn.prototype.new_difference = function(t3) {
  return this.clone().difference(t3);
}, Tn.prototype.difference2 = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  let r2 = 0;
  for (; r2 + 7 < e2; r2 += 8) t3.words[r2] = this.words[r2] & ~t3.words[r2], t3.words[r2 + 1] = this.words[r2 + 1] & ~t3.words[r2 + 1], t3.words[r2 + 2] = this.words[r2 + 2] & ~t3.words[r2 + 2], t3.words[r2 + 3] = this.words[r2 + 3] & ~t3.words[r2 + 3], t3.words[r2 + 4] = this.words[r2 + 4] & ~t3.words[r2 + 4], t3.words[r2 + 5] = this.words[r2 + 5] & ~t3.words[r2 + 5], t3.words[r2 + 6] = this.words[r2 + 6] & ~t3.words[r2 + 6], t3.words[r2 + 7] = this.words[r2 + 7] & ~t3.words[r2 + 7];
  for (; r2 < e2; ++r2) t3.words[r2] = this.words[r2] & ~t3.words[r2];
  for (r2 = this.words.length - 1; r2 >= e2; --r2) t3.words[r2] = this.words[r2];
  return t3.words.length = this.words.length, t3;
}, Tn.prototype.difference_size = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  let r2 = 0, n2 = 0;
  for (; n2 < e2; ++n2) r2 += this.hammingWeight(this.words[n2] & ~t3.words[n2]);
  const o2 = this.words.length;
  for (; n2 < o2; ++n2) r2 += this.hammingWeight(this.words[n2]);
  return r2;
}, Tn.prototype.change = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  let r2 = 0;
  for (; r2 + 7 < e2; r2 += 8) this.words[r2] ^= t3.words[r2], this.words[r2 + 1] ^= t3.words[r2 + 1], this.words[r2 + 2] ^= t3.words[r2 + 2], this.words[r2 + 3] ^= t3.words[r2 + 3], this.words[r2 + 4] ^= t3.words[r2 + 4], this.words[r2 + 5] ^= t3.words[r2 + 5], this.words[r2 + 6] ^= t3.words[r2 + 6], this.words[r2 + 7] ^= t3.words[r2 + 7];
  for (; r2 < e2; ++r2) this.words[r2] ^= t3.words[r2];
  for (r2 = t3.words.length - 1; r2 >= e2; --r2) this.words[r2] = t3.words[r2];
  return this;
}, Tn.prototype.new_change = function(t3) {
  const e2 = Object.create(Tn.prototype), r2 = Math.max(this.words.length, t3.words.length);
  e2.words = new Array(r2);
  const n2 = Math.min(this.words.length, t3.words.length);
  let o2 = 0;
  for (; o2 + 7 < n2; o2 += 8) e2.words[o2] = this.words[o2] ^ t3.words[o2], e2.words[o2 + 1] = this.words[o2 + 1] ^ t3.words[o2 + 1], e2.words[o2 + 2] = this.words[o2 + 2] ^ t3.words[o2 + 2], e2.words[o2 + 3] = this.words[o2 + 3] ^ t3.words[o2 + 3], e2.words[o2 + 4] = this.words[o2 + 4] ^ t3.words[o2 + 4], e2.words[o2 + 5] = this.words[o2 + 5] ^ t3.words[o2 + 5], e2.words[o2 + 6] = this.words[o2 + 6] ^ t3.words[o2 + 6], e2.words[o2 + 7] = this.words[o2 + 7] ^ t3.words[o2 + 7];
  for (; o2 < n2; ++o2) e2.words[o2] = this.words[o2] ^ t3.words[o2];
  const i2 = this.words.length;
  for (o2 = n2; o2 < i2; ++o2) e2.words[o2] = this.words[o2];
  const s2 = t3.words.length;
  for (o2 = n2; o2 < s2; ++o2) e2.words[o2] = t3.words[o2];
  return e2;
}, Tn.prototype.change_size = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  let r2 = 0, n2 = 0;
  for (; n2 < e2; ++n2) r2 += this.hammingWeight(this.words[n2] ^ t3.words[n2]);
  const o2 = this.words.length > t3.words.length ? this : t3, i2 = o2.words.length;
  for (; n2 < i2; ++n2) r2 += this.hammingWeight(o2.words[n2]);
  return r2;
}, Tn.prototype.toString = function() {
  return "{" + this.array().join(",") + "}";
}, Tn.prototype.union = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  let r2 = 0;
  for (; r2 + 7 < e2; r2 += 8) this.words[r2] |= t3.words[r2], this.words[r2 + 1] |= t3.words[r2 + 1], this.words[r2 + 2] |= t3.words[r2 + 2], this.words[r2 + 3] |= t3.words[r2 + 3], this.words[r2 + 4] |= t3.words[r2 + 4], this.words[r2 + 5] |= t3.words[r2 + 5], this.words[r2 + 6] |= t3.words[r2 + 6], this.words[r2 + 7] |= t3.words[r2 + 7];
  for (; r2 < e2; ++r2) this.words[r2] |= t3.words[r2];
  if (this.words.length < t3.words.length) {
    this.resize((t3.words.length << 5) - 1);
    const r3 = t3.words.length;
    for (let n2 = e2; n2 < r3; ++n2) this.words[n2] = t3.words[n2];
  }
  return this;
}, Tn.prototype.new_union = function(t3) {
  const e2 = Object.create(Tn.prototype), r2 = Math.max(this.words.length, t3.words.length);
  e2.words = new Array(r2);
  const n2 = Math.min(this.words.length, t3.words.length);
  let o2 = 0;
  for (; o2 + 7 < n2; o2 += 8) e2.words[o2] = this.words[o2] | t3.words[o2], e2.words[o2 + 1] = this.words[o2 + 1] | t3.words[o2 + 1], e2.words[o2 + 2] = this.words[o2 + 2] | t3.words[o2 + 2], e2.words[o2 + 3] = this.words[o2 + 3] | t3.words[o2 + 3], e2.words[o2 + 4] = this.words[o2 + 4] | t3.words[o2 + 4], e2.words[o2 + 5] = this.words[o2 + 5] | t3.words[o2 + 5], e2.words[o2 + 6] = this.words[o2 + 6] | t3.words[o2 + 6], e2.words[o2 + 7] = this.words[o2 + 7] | t3.words[o2 + 7];
  for (; o2 < n2; ++o2) e2.words[o2] = this.words[o2] | t3.words[o2];
  const i2 = this.words.length;
  for (o2 = n2; o2 < i2; ++o2) e2.words[o2] = this.words[o2];
  const s2 = t3.words.length;
  for (o2 = n2; o2 < s2; ++o2) e2.words[o2] = t3.words[o2];
  return e2;
}, Tn.prototype.union_size = function(t3) {
  const e2 = Math.min(this.words.length, t3.words.length);
  let r2 = 0;
  for (let n2 = 0; n2 < e2; ++n2) r2 += this.hammingWeight(this.words[n2] | t3.words[n2]);
  if (this.words.length < t3.words.length) {
    const e3 = t3.words.length;
    for (let n2 = this.words.length; n2 < e3; ++n2) r2 += this.hammingWeight(0 | t3.words[n2]);
  } else {
    const e3 = this.words.length;
    for (let n2 = t3.words.length; n2 < e3; ++n2) r2 += this.hammingWeight(0 | this.words[n2]);
  }
  return r2;
};
var In = Tn;
function Mn() {
  return Mn = Object.assign || function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) Object.prototype.hasOwnProperty.call(r2, n2) && (t3[n2] = r2[n2]);
    }
    return t3;
  }, Mn.apply(this, arguments);
}
function Nn(t3, e2) {
  var r2 = [];
  return t3.forEach(function(t4) {
    e2.forEach(function(e3) {
      r2.push(t4.concat(e3));
    });
  }), r2;
}
function $n(t3) {
  return !!~t3.search(/\(|\)/);
}
function Wn(t3, e2) {
  for (var r2 = e2.split(" " + t3 + " "), n2 = [], o2 = [], i2 = 0; i2 < r2.length; i2++) if ($n(r2[i2]) || o2.length > 0) {
    o2.push(r2[i2]);
    var s2 = "" + o2;
    (s2.match(/\(/g) || []).length === (s2.match(/\)/g) || []).length && (n2.push(o2.join(" " + t3 + " ")), o2 = []);
  } else n2.push(r2[i2]);
  return n2;
}
var Cn = function t2(e2) {
  return function(t3) {
    for (var e3 = t3[0], r3 = 1; r3 < t3.length; r3++) e3 = e3.concat(t3[r3]);
    return e3;
  }(Wn("OR", (r2 = e2 = function(t3) {
    if ("(" === t3.charAt(0)) {
      for (var e3 = 0, r3 = 0; r3 < t3.length; r3++) if ("(" === t3.charAt(r3) ? e3++ : ")" === t3.charAt(r3) && e3--, 0 === e3) return r3 !== t3.length - 1 ? t3 : t3.substring(1, t3.length - 1);
    }
    return t3;
  }(e2), e2 = r2.replace(/[\s]+/g, " "))).map(function(e3) {
    for (var r3 = Wn("AND", e3), n2 = [], o2 = [], i2 = 0; i2 < r3.length; i2++) $n(r3[i2]) ? n2.push(t2(r3[i2])) : o2.push(r3[i2]);
    return n2.push([o2]), function(t3) {
      for (var e4 = [[]], r4 = 0; r4 < t3.length; r4++) e4 = Nn(e4, t3[r4]);
      return e4;
    }(n2);
  }));
  var r2;
};
var Dn = function(t3) {
  try {
    return structuredClone(t3);
  } catch (e2) {
    try {
      return JSON.parse(JSON.stringify(t3));
    } catch (e3) {
      return t3;
    }
  }
};
var Vn = function(t3, e2) {
  let r2 = new In([]), n2 = 0;
  return jn(e2, function(e3, o2) {
    e3.forEach((e4) => {
      ++n2, r2 = r2.new_union(t3[o2][e4] || new In([]));
    });
  }), 0 === n2 ? null : r2;
};
var Rn = function(t3, e2, r2) {
  let n2 = 1;
  return jn(t3.bits_data_temp, (t4, o2) => {
    let i2, s2, a2, c2, u2, l2, h2;
    r2[o2] && (i2 = r2[o2].order, s2 = r2[o2].sort, a2 = r2[o2].size, c2 = r2[o2].title, u2 = r2[o2].show_facet_stats || false, l2 = false !== r2[o2].chosen_filters_on_top, h2 = r2[o2].hide_zero_doc_count || false);
    let f2, d2, p2, w2, g2 = Object.entries(t4).map((t5) => {
      let r3 = [];
      e2 && e2.filters && e2.filters[o2] && (r3 = e2.filters[o2]);
      const n3 = t5[1].array().length;
      if (!h2 || 0 !== n3 || -1 !== r3.indexOf(t5[0])) return { key: t5[0], doc_count: n3, selected: -1 !== r3.indexOf(t5[0]) };
    }).filter(Boolean);
    var y2, _2;
    return v(s2) ? (f2 = s2 || ["key"], d2 = i2 || ["asc"]) : ("term" === s2 || "key" === s2 ? (f2 = ["key"], d2 = [i2 || "asc"]) : (f2 = ["doc_count", "key"], d2 = [i2 || "desc", "asc"]), l2 && (f2.unshift("selected"), d2.unshift("desc"))), g2 = zn(g2, f2, d2), g2 = g2.slice(0, a2 || 10), u2 && (p2 = [], Object.entries(t4).forEach((t5) => {
      if (isNaN(t5[0])) throw new Error("You cant use chars to calculate the facet_stats.");
      t5[1].array().length > 0 && t5[1].forEach(() => {
        p2.push(parseInt(t5[0]));
      });
    }), w2 = { min: (y2 = p2, y2 && y2.length ? Sn(y2, ln(void 0), mn) : void 0), max: On(p2), avg: kn(p2), sum: Pn(p2) }), Mn({ name: o2, title: c2 || (_2 = o2, _2.replace(/^[\s_]+|[\s_]+$/g, "").replace(/[_\s]+/g, " ").replace(/^[a-z]/, function(t5) {
      return t5.toUpperCase();
    })), position: n2++, buckets: g2 }, u2 && { facet_stats: w2 });
  });
};
function Un(t3, e2, r2, n2, o2) {
  e2 = e2 || /* @__PURE__ */ Object.create(null);
  const i2 = parseInt(e2.per_page || 12), s2 = parseInt(e2.page || 1), a2 = e2.is_all_filtered_items || false;
  if (false === r2.native_search_enabled && (e2.query || e2.filter)) throw new Error('"query" and "filter" options are not working once native search is disabled');
  let c2 = 0;
  const u2 = (/* @__PURE__ */ new Date()).getTime();
  let l2, h2, f2, d2 = o2.bits_ids();
  if (e2._ids) l2 = new In(e2._ids), h2 = e2._ids;
  else if (e2.ids) h2 = o2.internal_ids_from_ids_map(e2.ids), l2 = new In(h2);
  else if (n2 && (e2.query || e2.filter)) {
    const t4 = (/* @__PURE__ */ new Date()).getTime();
    h2 = n2.search(e2.query, e2.filter), c2 = (/* @__PURE__ */ new Date()).getTime() - t4, l2 = new In(h2);
  }
  let p2 = (/* @__PURE__ */ new Date()).getTime();
  const w2 = o2.search(e2, { query_ids: l2 });
  p2 = (/* @__PURE__ */ new Date()).getTime() - p2, l2 && (d2 = l2), w2.ids && (d2 = d2.new_intersection(w2.ids)), w2.not_ids && (d2 = d2.new_difference(w2.not_ids));
  let g2 = d2.array(), v2 = g2.map((t4) => o2.get_item(t4)), y2 = false;
  const _2 = (/* @__PURE__ */ new Date()).getTime();
  let b2 = 0;
  e2.sort ? v2 = function(t4, e3, r3) {
    return r3 && r3[e3] && (e3 = r3[e3]), e3.field ? zn(t4, e3.field, e3.order || "asc") : t4;
  }(v2, e2.sort, r2.sortings) : h2 && (g2 = h2.filter((t4) => d2.has(t4)), v2 = g2.slice((s2 - 1) * i2, s2 * i2).map((t4) => o2.get_item(t4)), y2 = true), y2 || (f2 = a2 ? v2 : null, v2 = v2.slice((s2 - 1) * i2, s2 * i2)), b2 = (/* @__PURE__ */ new Date()).getTime() - _2;
  const m2 = (/* @__PURE__ */ new Date()).getTime() - u2;
  return { pagination: { per_page: i2, page: s2, total: g2.length }, timings: { total: m2, facets: p2, search: c2, sorting: b2 }, data: { items: v2, allFilteredItems: f2, aggregations: Rn(w2, e2, r2.aggregations) } };
}
var qn = function(t3) {
  var e2 = { exports: {} };
  return function(t4, e3) {
    !function() {
      var e4, r2, n2, o2, i2, s2, a2, c2, u2, l2, h2, f2, d2, p2, w2, g2, v2, y2, _2, b2, m2, j2, S2, O2, x2, k2, A2, E2, z2 = function(t5) {
        var e5 = new z2.Index();
        return e5.pipeline.add(z2.trimmer, z2.stopWordFilter, z2.stemmer), t5 && t5.call(e5, e5), e5;
      };
      z2.version = "1.0.0", z2.utils = {}, z2.utils.warn = /* @__PURE__ */ function(t5) {
        return function(e5) {
          t5.console && console.warn && console.warn(e5);
        };
      }(this), z2.utils.asString = function(t5) {
        return null == t5 ? "" : t5.toString();
      }, z2.EventEmitter = function() {
        this.events = {};
      }, z2.EventEmitter.prototype.addListener = function() {
        var t5 = Array.prototype.slice.call(arguments), e5 = t5.pop(), r3 = t5;
        if ("function" != typeof e5) throw new TypeError("last argument must be a function");
        r3.forEach(function(t6) {
          this.hasHandler(t6) || (this.events[t6] = []), this.events[t6].push(e5);
        }, this);
      }, z2.EventEmitter.prototype.removeListener = function(t5, e5) {
        if (this.hasHandler(t5)) {
          var r3 = this.events[t5].indexOf(e5);
          this.events[t5].splice(r3, 1), this.events[t5].length || delete this.events[t5];
        }
      }, z2.EventEmitter.prototype.emit = function(t5) {
        if (this.hasHandler(t5)) {
          var e5 = Array.prototype.slice.call(arguments, 1);
          this.events[t5].forEach(function(t6) {
            t6.apply(void 0, e5);
          });
        }
      }, z2.EventEmitter.prototype.hasHandler = function(t5) {
        return t5 in this.events;
      }, z2.tokenizer = function(t5) {
        return arguments.length && null != t5 && null != t5 ? Array.isArray(t5) ? t5.map(function(t6) {
          return z2.utils.asString(t6).toLowerCase();
        }) : t5.toString().trim().toLowerCase().split(z2.tokenizer.separator) : [];
      }, z2.tokenizer.separator = /[\s\-]+/, z2.tokenizer.load = function(t5) {
        var e5 = this.registeredFunctions[t5];
        if (!e5) throw new Error("Cannot load un-registered function: " + t5);
        return e5;
      }, z2.tokenizer.label = "default", z2.tokenizer.registeredFunctions = { default: z2.tokenizer }, z2.tokenizer.registerFunction = function(t5, e5) {
        e5 in this.registeredFunctions && z2.utils.warn("Overwriting existing tokenizer: " + e5), t5.label = e5, this.registeredFunctions[e5] = t5;
      }, z2.Pipeline = function() {
        this._stack = [];
      }, z2.Pipeline.registeredFunctions = {}, z2.Pipeline.registerFunction = function(t5, e5) {
        e5 in this.registeredFunctions && z2.utils.warn("Overwriting existing registered function: " + e5), t5.label = e5, z2.Pipeline.registeredFunctions[t5.label] = t5;
      }, z2.Pipeline.warnIfFunctionNotRegistered = function(t5) {
        t5.label && t5.label in this.registeredFunctions || z2.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", t5);
      }, z2.Pipeline.load = function(t5) {
        var e5 = new z2.Pipeline();
        return t5.forEach(function(t6) {
          var r3 = z2.Pipeline.registeredFunctions[t6];
          if (!r3) throw new Error("Cannot load un-registered function: " + t6);
          e5.add(r3);
        }), e5;
      }, z2.Pipeline.prototype.add = function() {
        Array.prototype.slice.call(arguments).forEach(function(t5) {
          z2.Pipeline.warnIfFunctionNotRegistered(t5), this._stack.push(t5);
        }, this);
      }, z2.Pipeline.prototype.after = function(t5, e5) {
        z2.Pipeline.warnIfFunctionNotRegistered(e5);
        var r3 = this._stack.indexOf(t5);
        if (-1 == r3) throw new Error("Cannot find existingFn");
        this._stack.splice(r3 += 1, 0, e5);
      }, z2.Pipeline.prototype.before = function(t5, e5) {
        z2.Pipeline.warnIfFunctionNotRegistered(e5);
        var r3 = this._stack.indexOf(t5);
        if (-1 == r3) throw new Error("Cannot find existingFn");
        this._stack.splice(r3, 0, e5);
      }, z2.Pipeline.prototype.remove = function(t5) {
        var e5 = this._stack.indexOf(t5);
        -1 != e5 && this._stack.splice(e5, 1);
      }, z2.Pipeline.prototype.run = function(t5) {
        for (var e5 = [], r3 = t5.length, n3 = this._stack.length, o3 = 0; o3 < r3; o3++) {
          for (var i3 = t5[o3], s3 = 0; s3 < n3 && void 0 !== (i3 = this._stack[s3](i3, o3, t5)) && "" !== i3; s3++) ;
          void 0 !== i3 && "" !== i3 && e5.push(i3);
        }
        return e5;
      }, z2.Pipeline.prototype.reset = function() {
        this._stack = [];
      }, z2.Pipeline.prototype.toJSON = function() {
        return this._stack.map(function(t5) {
          return z2.Pipeline.warnIfFunctionNotRegistered(t5), t5.label;
        });
      }, z2.Vector = function() {
        this._magnitude = null, this.list = void 0, this.length = 0;
      }, z2.Vector.Node = function(t5, e5, r3) {
        this.idx = t5, this.val = e5, this.next = r3;
      }, z2.Vector.prototype.insert = function(t5, e5) {
        this._magnitude = void 0;
        var r3 = this.list;
        if (!r3) return this.list = new z2.Vector.Node(t5, e5, r3), this.length++;
        if (t5 < r3.idx) return this.list = new z2.Vector.Node(t5, e5, r3), this.length++;
        for (var n3 = r3, o3 = r3.next; null != o3; ) {
          if (t5 < o3.idx) return n3.next = new z2.Vector.Node(t5, e5, o3), this.length++;
          n3 = o3, o3 = o3.next;
        }
        return n3.next = new z2.Vector.Node(t5, e5, o3), this.length++;
      }, z2.Vector.prototype.magnitude = function() {
        if (this._magnitude) return this._magnitude;
        for (var t5, e5 = this.list, r3 = 0; e5; ) r3 += (t5 = e5.val) * t5, e5 = e5.next;
        return this._magnitude = Math.sqrt(r3);
      }, z2.Vector.prototype.dot = function(t5) {
        for (var e5 = this.list, r3 = t5.list, n3 = 0; e5 && r3; ) e5.idx < r3.idx ? e5 = e5.next : (e5.idx > r3.idx || (n3 += e5.val * r3.val, e5 = e5.next), r3 = r3.next);
        return n3;
      }, z2.Vector.prototype.similarity = function(t5) {
        return this.dot(t5) / (this.magnitude() * t5.magnitude());
      }, z2.SortedSet = function() {
        this.length = 0, this.elements = [];
      }, z2.SortedSet.load = function(t5) {
        var e5 = new this();
        return e5.elements = t5, e5.length = t5.length, e5;
      }, z2.SortedSet.prototype.add = function() {
        var t5, e5;
        for (t5 = 0; t5 < arguments.length; t5++) ~this.indexOf(e5 = arguments[t5]) || this.elements.splice(this.locationFor(e5), 0, e5);
        this.length = this.elements.length;
      }, z2.SortedSet.prototype.toArray = function() {
        return this.elements.slice();
      }, z2.SortedSet.prototype.map = function(t5, e5) {
        return this.elements.map(t5, e5);
      }, z2.SortedSet.prototype.forEach = function(t5, e5) {
        return this.elements.forEach(t5, e5);
      }, z2.SortedSet.prototype.indexOf = function(t5) {
        for (var e5 = 0, r3 = this.elements.length, n3 = r3 - e5, o3 = e5 + Math.floor(n3 / 2), i3 = this.elements[o3]; n3 > 1; ) {
          if (i3 === t5) return o3;
          i3 < t5 && (e5 = o3), i3 > t5 && (r3 = o3), n3 = r3 - e5, o3 = e5 + Math.floor(n3 / 2), i3 = this.elements[o3];
        }
        return i3 === t5 ? o3 : -1;
      }, z2.SortedSet.prototype.locationFor = function(t5) {
        for (var e5 = 0, r3 = this.elements.length, n3 = r3 - e5, o3 = e5 + Math.floor(n3 / 2), i3 = this.elements[o3]; n3 > 1; ) i3 < t5 && (e5 = o3), i3 > t5 && (r3 = o3), n3 = r3 - e5, o3 = e5 + Math.floor(n3 / 2), i3 = this.elements[o3];
        return i3 > t5 ? o3 : i3 < t5 ? o3 + 1 : void 0;
      }, z2.SortedSet.prototype.intersect = function(t5) {
        for (var e5 = new z2.SortedSet(), r3 = 0, n3 = 0, o3 = this.length, i3 = t5.length, s3 = this.elements, a3 = t5.elements; !(r3 > o3 - 1 || n3 > i3 - 1); ) s3[r3] !== a3[n3] ? s3[r3] < a3[n3] ? r3++ : s3[r3] > a3[n3] && n3++ : (e5.add(s3[r3]), r3++, n3++);
        return e5;
      }, z2.SortedSet.prototype.clone = function() {
        var t5 = new z2.SortedSet();
        return t5.elements = this.toArray(), t5.length = t5.elements.length, t5;
      }, z2.SortedSet.prototype.union = function(t5) {
        var e5, r3, n3;
        this.length >= t5.length ? (e5 = this, r3 = t5) : (e5 = t5, r3 = this), n3 = e5.clone();
        for (var o3 = 0, i3 = r3.toArray(); o3 < i3.length; o3++) n3.add(i3[o3]);
        return n3;
      }, z2.SortedSet.prototype.toJSON = function() {
        return this.toArray();
      }, z2.Index = function() {
        this._fields = [], this._ref = "id", this.pipeline = new z2.Pipeline(), this.documentStore = new z2.Store(), this.tokenStore = new z2.TokenStore(), this.corpusTokens = new z2.SortedSet(), this.eventEmitter = new z2.EventEmitter(), this.tokenizerFn = z2.tokenizer, this._idfCache = {}, this.on("add", "remove", "update", (function() {
          this._idfCache = {};
        }).bind(this));
      }, z2.Index.prototype.on = function() {
        var t5 = Array.prototype.slice.call(arguments);
        return this.eventEmitter.addListener.apply(this.eventEmitter, t5);
      }, z2.Index.prototype.off = function(t5, e5) {
        return this.eventEmitter.removeListener(t5, e5);
      }, z2.Index.load = function(t5) {
        t5.version !== z2.version && z2.utils.warn("version mismatch: current " + z2.version + " importing " + t5.version);
        var e5 = new this();
        return e5._fields = t5.fields, e5._ref = t5.ref, e5.tokenizer(z2.tokenizer.load(t5.tokenizer)), e5.documentStore = z2.Store.load(t5.documentStore), e5.tokenStore = z2.TokenStore.load(t5.tokenStore), e5.corpusTokens = z2.SortedSet.load(t5.corpusTokens), e5.pipeline = z2.Pipeline.load(t5.pipeline), e5;
      }, z2.Index.prototype.field = function(t5, e5) {
        return this._fields.push({ name: t5, boost: (e5 = e5 || {}).boost || 1 }), this;
      }, z2.Index.prototype.ref = function(t5) {
        return this._ref = t5, this;
      }, z2.Index.prototype.tokenizer = function(t5) {
        return t5.label && t5.label in z2.tokenizer.registeredFunctions || z2.utils.warn("Function is not a registered tokenizer. This may cause problems when serialising the index"), this.tokenizerFn = t5, this;
      }, z2.Index.prototype.add = function(t5, e5) {
        var r3 = {}, n3 = new z2.SortedSet(), o3 = t5[this._ref];
        e5 = void 0 === e5 || e5, this._fields.forEach(function(e6) {
          var o4 = this.pipeline.run(this.tokenizerFn(t5[e6.name]));
          r3[e6.name] = o4;
          for (var i4 = 0; i4 < o4.length; i4++) {
            var s4 = o4[i4];
            n3.add(s4), this.corpusTokens.add(s4);
          }
        }, this), this.documentStore.set(o3, n3);
        for (var i3 = 0; i3 < n3.length; i3++) {
          for (var s3 = n3.elements[i3], a3 = 0, c3 = 0; c3 < this._fields.length; c3++) {
            var u3 = this._fields[c3], l3 = r3[u3.name], h3 = l3.length;
            if (h3) {
              for (var f3 = 0, d3 = 0; d3 < h3; d3++) l3[d3] === s3 && f3++;
              a3 += f3 / h3 * u3.boost;
            }
          }
          this.tokenStore.add(s3, { ref: o3, tf: a3 });
        }
        e5 && this.eventEmitter.emit("add", t5, this);
      }, z2.Index.prototype.remove = function(t5, e5) {
        var r3 = t5[this._ref];
        if (e5 = void 0 === e5 || e5, this.documentStore.has(r3)) {
          var n3 = this.documentStore.get(r3);
          this.documentStore.remove(r3), n3.forEach(function(t6) {
            this.tokenStore.remove(t6, r3);
          }, this), e5 && this.eventEmitter.emit("remove", t5, this);
        }
      }, z2.Index.prototype.update = function(t5, e5) {
        e5 = void 0 === e5 || e5, this.remove(t5, false), this.add(t5, false), e5 && this.eventEmitter.emit("update", t5, this);
      }, z2.Index.prototype.idf = function(t5) {
        var e5 = "@" + t5;
        if (Object.prototype.hasOwnProperty.call(this._idfCache, e5)) return this._idfCache[e5];
        var r3 = this.tokenStore.count(t5), n3 = 1;
        return r3 > 0 && (n3 = 1 + Math.log(this.documentStore.length / r3)), this._idfCache[e5] = n3;
      }, z2.Index.prototype.search = function(t5) {
        var e5 = this.pipeline.run(this.tokenizerFn(t5)), r3 = new z2.Vector(), n3 = [], o3 = this._fields.reduce(function(t6, e6) {
          return t6 + e6.boost;
        }, 0);
        return e5.some(function(t6) {
          return this.tokenStore.has(t6);
        }, this) ? (e5.forEach(function(t6, e6, i3) {
          var s3 = 1 / i3.length * this._fields.length * o3, a3 = this, c3 = this.tokenStore.expand(t6).reduce(function(e7, n4) {
            var o4 = a3.corpusTokens.indexOf(n4), i4 = a3.idf(n4), c4 = 1, u3 = new z2.SortedSet();
            if (n4 !== t6) {
              var l3 = Math.max(3, n4.length - t6.length);
              c4 = 1 / Math.log(l3);
            }
            o4 > -1 && r3.insert(o4, s3 * i4 * c4);
            for (var h3 = a3.tokenStore.get(n4), f3 = Object.keys(h3), d3 = f3.length, p3 = 0; p3 < d3; p3++) u3.add(h3[f3[p3]].ref);
            return e7.union(u3);
          }, new z2.SortedSet());
          n3.push(c3);
        }, this), n3.reduce(function(t6, e6) {
          return t6.intersect(e6);
        }).map(function(t6) {
          return { ref: t6, score: r3.similarity(this.documentVector(t6)) };
        }, this).sort(function(t6, e6) {
          return e6.score - t6.score;
        })) : [];
      }, z2.Index.prototype.documentVector = function(t5) {
        for (var e5 = this.documentStore.get(t5), r3 = e5.length, n3 = new z2.Vector(), o3 = 0; o3 < r3; o3++) {
          var i3 = e5.elements[o3], s3 = this.tokenStore.get(i3)[t5].tf, a3 = this.idf(i3);
          n3.insert(this.corpusTokens.indexOf(i3), s3 * a3);
        }
        return n3;
      }, z2.Index.prototype.toJSON = function() {
        return { version: z2.version, fields: this._fields, ref: this._ref, tokenizer: this.tokenizerFn.label, documentStore: this.documentStore.toJSON(), tokenStore: this.tokenStore.toJSON(), corpusTokens: this.corpusTokens.toJSON(), pipeline: this.pipeline.toJSON() };
      }, z2.Index.prototype.use = function(t5) {
        var e5 = Array.prototype.slice.call(arguments, 1);
        e5.unshift(this), t5.apply(this, e5);
      }, z2.Store = function() {
        this.store = {}, this.length = 0;
      }, z2.Store.load = function(t5) {
        var e5 = new this();
        return e5.length = t5.length, e5.store = Object.keys(t5.store).reduce(function(e6, r3) {
          return e6[r3] = z2.SortedSet.load(t5.store[r3]), e6;
        }, {}), e5;
      }, z2.Store.prototype.set = function(t5, e5) {
        this.has(t5) || this.length++, this.store[t5] = e5;
      }, z2.Store.prototype.get = function(t5) {
        return this.store[t5];
      }, z2.Store.prototype.has = function(t5) {
        return t5 in this.store;
      }, z2.Store.prototype.remove = function(t5) {
        this.has(t5) && (delete this.store[t5], this.length--);
      }, z2.Store.prototype.toJSON = function() {
        return { store: this.store, length: this.length };
      }, z2.stemmer = (e4 = { ational: "ate", tional: "tion", enci: "ence", anci: "ance", izer: "ize", bli: "ble", alli: "al", entli: "ent", eli: "e", ousli: "ous", ization: "ize", ation: "ate", ator: "ate", alism: "al", iveness: "ive", fulness: "ful", ousness: "ous", aliti: "al", iviti: "ive", biliti: "ble", logi: "log" }, r2 = { icate: "ic", ative: "", alize: "al", iciti: "ic", ical: "ic", ful: "", ness: "" }, s2 = "^(" + (o2 = "[^aeiou][^aeiouy]*") + ")?" + (i2 = (n2 = "[aeiouy]") + "[aeiou]*") + o2 + "(" + i2 + ")?$", a2 = "^(" + o2 + ")?" + i2 + o2 + i2 + o2, c2 = "^(" + o2 + ")?" + n2, u2 = new RegExp("^(" + o2 + ")?" + i2 + o2), l2 = new RegExp(a2), h2 = new RegExp(s2), f2 = new RegExp(c2), d2 = /^(.+?)(ss|i)es$/, p2 = /^(.+?)([^s])s$/, w2 = /^(.+?)eed$/, g2 = /^(.+?)(ed|ing)$/, v2 = /.$/, y2 = /(at|bl|iz)$/, _2 = new RegExp("([^aeiouylsz])\\1$"), b2 = new RegExp("^" + o2 + n2 + "[^aeiouwxy]$"), m2 = /^(.+?[^aeiou])y$/, j2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/, S2 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/, O2 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/, x2 = /^(.+?)(s|t)(ion)$/, k2 = /^(.+?)e$/, A2 = /ll$/, E2 = new RegExp("^" + o2 + n2 + "[^aeiouwxy]$"), function(t5) {
        var n3, o3, i3, s3, a3, c3, z3;
        if (t5.length < 3) return t5;
        if ("y" == (i3 = t5.substr(0, 1)) && (t5 = i3.toUpperCase() + t5.substr(1)), a3 = p2, (s3 = d2).test(t5) ? t5 = t5.replace(s3, "$1$2") : a3.test(t5) && (t5 = t5.replace(a3, "$1$2")), a3 = g2, (s3 = w2).test(t5)) {
          var F2 = s3.exec(t5);
          (s3 = u2).test(F2[1]) && (t5 = t5.replace(s3 = v2, ""));
        } else a3.test(t5) && (F2 = a3.exec(t5), (a3 = f2).test(n3 = F2[1]) && (c3 = _2, z3 = b2, (a3 = y2).test(t5 = n3) ? t5 += "e" : c3.test(t5) ? t5 = t5.replace(s3 = v2, "") : z3.test(t5) && (t5 += "e")));
        return (s3 = m2).test(t5) && (t5 = (n3 = (F2 = s3.exec(t5))[1]) + "i"), (s3 = j2).test(t5) && (o3 = (F2 = s3.exec(t5))[2], (s3 = u2).test(n3 = F2[1]) && (t5 = n3 + e4[o3])), (s3 = S2).test(t5) && (o3 = (F2 = s3.exec(t5))[2], (s3 = u2).test(n3 = F2[1]) && (t5 = n3 + r2[o3])), a3 = x2, (s3 = O2).test(t5) ? (F2 = s3.exec(t5), (s3 = l2).test(n3 = F2[1]) && (t5 = n3)) : a3.test(t5) && (F2 = a3.exec(t5), (a3 = l2).test(n3 = F2[1] + F2[2]) && (t5 = n3)), (s3 = k2).test(t5) && (F2 = s3.exec(t5), a3 = h2, c3 = E2, ((s3 = l2).test(n3 = F2[1]) || a3.test(n3) && !c3.test(n3)) && (t5 = n3)), a3 = l2, (s3 = A2).test(t5) && a3.test(t5) && (t5 = t5.replace(s3 = v2, "")), "y" == i3 && (t5 = i3.toLowerCase() + t5.substr(1)), t5;
      }), z2.Pipeline.registerFunction(z2.stemmer, "stemmer"), z2.generateStopWordFilter = function(t5) {
        var e5 = t5.reduce(function(t6, e6) {
          return t6[e6] = e6, t6;
        }, {});
        return function(t6) {
          if (t6 && e5[t6] !== t6) return t6;
        };
      }, z2.stopWordFilter = z2.generateStopWordFilter(["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your"]), z2.Pipeline.registerFunction(z2.stopWordFilter, "stopWordFilter"), z2.trimmer = function(t5) {
        return t5.replace(/^\W+/, "").replace(/\W+$/, "");
      }, z2.Pipeline.registerFunction(z2.trimmer, "trimmer"), z2.TokenStore = function() {
        this.root = { docs: {} }, this.length = 0;
      }, z2.TokenStore.load = function(t5) {
        var e5 = new this();
        return e5.root = t5.root, e5.length = t5.length, e5;
      }, z2.TokenStore.prototype.add = function(t5, e5, r3) {
        r3 = r3 || this.root;
        var n3 = t5.charAt(0), o3 = t5.slice(1);
        return n3 in r3 || (r3[n3] = { docs: {} }), 0 === o3.length ? (r3[n3].docs[e5.ref] = e5, void (this.length += 1)) : this.add(o3, e5, r3[n3]);
      }, z2.TokenStore.prototype.has = function(t5) {
        if (!t5) return false;
        for (var e5 = this.root, r3 = 0; r3 < t5.length; r3++) {
          if (!e5[t5.charAt(r3)]) return false;
          e5 = e5[t5.charAt(r3)];
        }
        return true;
      }, z2.TokenStore.prototype.getNode = function(t5) {
        if (!t5) return {};
        for (var e5 = this.root, r3 = 0; r3 < t5.length; r3++) {
          if (!e5[t5.charAt(r3)]) return {};
          e5 = e5[t5.charAt(r3)];
        }
        return e5;
      }, z2.TokenStore.prototype.get = function(t5, e5) {
        return this.getNode(t5, e5).docs || {};
      }, z2.TokenStore.prototype.count = function(t5, e5) {
        return Object.keys(this.get(t5, e5)).length;
      }, z2.TokenStore.prototype.remove = function(t5, e5) {
        if (t5) {
          for (var r3 = this.root, n3 = 0; n3 < t5.length; n3++) {
            if (!(t5.charAt(n3) in r3)) return;
            r3 = r3[t5.charAt(n3)];
          }
          delete r3.docs[e5];
        }
      }, z2.TokenStore.prototype.expand = function(t5, e5) {
        var r3 = this.getNode(t5);
        return e5 = e5 || [], Object.keys(r3.docs || {}).length && e5.push(t5), Object.keys(r3).forEach(function(r4) {
          "docs" !== r4 && e5.concat(this.expand(t5 + r4, e5));
        }, this), e5;
      }, z2.TokenStore.prototype.toJSON = function() {
        return { root: this.root, length: this.length };
      }, t4.exports = z2;
    }();
  }(e2), e2.exports;
}();
var Ln = class {
  constructor(t3, e2) {
    this.store = /* @__PURE__ */ new Map(), this.idx = qn(function() {
      this.field("name", { boost: 10 }), ((null == e2 ? void 0 : e2.searchableFields) || []).forEach((t4) => this.field(t4)), this.ref("_id"), null != e2 && e2.isExactSearch && (this.pipeline.remove(qn.stemmer), this.pipeline.remove(qn.stopWordFilter)), null != e2 && e2.removeStopWordFilter && this.pipeline.remove(qn.stopWordFilter);
    });
    let r2 = 1;
    (t3 || []).map((t4) => {
      t4._id = r2, ++r2, this.idx.add(t4), this.store.set(t4._id, t4);
    });
  }
  search_full(t3, e2) {
    return this.search(t3, e2).map((t4) => this.store.get(t4));
  }
  search(t3, e2) {
    return e2 instanceof Function ? (t3 ? this.idx.search(t3).map((t4) => this.store.get(t4.ref)) : [...this.store.values()]).filter(e2).map((t4) => t4._id) : t3 ? this.idx.search(t3).map((t4) => t4.ref) : [...this.store.keys()];
  }
};
var Bn = class {
  constructor(t3, e2) {
    (e2 = e2 || /* @__PURE__ */ Object.create(null)).aggregations = e2.aggregations || /* @__PURE__ */ Object.create(null), this._items = t3, this.config = e2.aggregations, this.facets = function(t4, e3) {
      e3 = e3 || [];
      const r3 = { data: /* @__PURE__ */ Object.create(null), bits_data: /* @__PURE__ */ Object.create(null), bits_data_temp: /* @__PURE__ */ Object.create(null) };
      let n3 = 1;
      return e3.forEach((t5) => {
        r3.data[t5] = /* @__PURE__ */ Object.create(null);
      }), t4 && t4.map((t5) => (t5._id || (t5._id = n3, ++n3), t5)), t4 && t4.map((t5) => (e3.forEach((e4) => {
        if (t5) {
          if (Array.isArray(t5[e4])) t5[e4].forEach((n4) => {
            t5[e4] && (r3.data[e4][n4] || (r3.data[e4][n4] = []), r3.data[e4][n4].push(parseInt(t5._id)));
          });
          else if (void 0 !== t5[e4]) {
            const n4 = t5[e4];
            r3.data[e4][n4] || (r3.data[e4][n4] = []), r3.data[e4][n4].push(parseInt(t5._id));
          }
        }
      }), t5)), r3.data = jn(r3.data, function(t5, e4) {
        return r3.bits_data[e4] || (r3.bits_data[e4] = /* @__PURE__ */ Object.create(null), r3.bits_data_temp[e4] = /* @__PURE__ */ Object.create(null)), jn(t5, function(t6, n4) {
          const o3 = Fn(t6);
          return r3.bits_data[e4][n4] = new In(o3), o3;
        });
      }), r3;
    }(t3, Mt(e2.aggregations)), this._items_map = /* @__PURE__ */ Object.create(null), this._ids = [];
    let r2 = 1;
    var n2, o2;
    o2 = (t4) => {
      this._ids.push(r2), this._items_map[r2] = t4, t4._id = r2, ++r2;
    }, (v(n2 = t3) ? g : wn)(n2, ln(o2)), this.ids_map = /* @__PURE__ */ Object.create(null), t3 && t3.forEach((t4) => {
      const r3 = e2.custom_id_field || "id";
      t4[r3] && t4._id && (this.ids_map[t4[r3]] = t4._id);
    }), this._bits_ids = new In(this._ids);
  }
  items() {
    return this._items;
  }
  bits_ids(t3) {
    return t3 ? new In(t3) : this._bits_ids;
  }
  internal_ids_from_ids_map(t3) {
    return t3.map((t4) => this.ids_map[t4]);
  }
  index() {
    return this.facets;
  }
  get_item(t3) {
    return this._items_map[t3];
  }
  search(t3, e2) {
    const r2 = this.config;
    e2 = e2 || /* @__PURE__ */ Object.create(null);
    const n2 = Or(this.facets);
    let o2;
    n2.not_ids = Vn(n2.bits_data, t3.not_filters);
    const i2 = function(t4, e3) {
      const r3 = [];
      return jn(t4.filters, function(t5, n3) {
        if (t5 && t5.length) if (false !== e3[n3].conjunction) jn(t5, function(t6) {
          r3.push([n3, t6]);
        });
        else {
          const e4 = [];
          jn(t5, function(t6) {
            e4.push([n3, t6]);
          }), r3.push(e4);
        }
      }), jn(t4.not_filters, function(t5, e4) {
        t5 && t5.length && jn(t5, function(t6) {
          r3.push([e4, "-", t6]);
        });
      }), r3;
    }(t3, r2);
    return o2 = function(t4, e3) {
      const r3 = Or(t4);
      let n3;
      e3 = e3 || [], jn(r3.bits_data, function(t5, e4) {
        jn(r3.bits_data[e4], function(t6, n4) {
          r3.bits_data_temp[e4][n4] = r3.bits_data[e4][n4];
        });
      }), r3.is_temp_copied = true;
      const o3 = function(t5, e4) {
        const r4 = /* @__PURE__ */ Object.create(null);
        return jn(e4, function(e5) {
          if (Array.isArray(e5[0])) {
            let n4 = new In([]);
            jn(e5, function(e6) {
              const o4 = e6[0];
              n4 = n4.new_union(t5.bits_data[o4][e6[1]] || new In([])), r4[o4] = n4;
            });
          }
        }), r4;
      }(t4, e3);
      return jn(e3, function(t5) {
        if (!Array.isArray(t5[0])) {
          const e4 = t5[0], o4 = t5[1];
          n3 = n3 && r3.bits_data_temp[e4][o4] ? r3.bits_data_temp[e4][o4].new_intersection(n3) : n3 && !r3.bits_data_temp[e4][o4] ? new In([]) : r3.bits_data_temp[e4][o4];
        }
      }), n3 && jn(r3.bits_data_temp, function(t5, e4) {
        jn(r3.bits_data_temp[e4], function(t6, o4) {
          r3.bits_data_temp[e4][o4] = r3.bits_data_temp[e4][o4].new_intersection(n3);
        });
      }), jn(e3, function(t5) {
        if (3 === t5.length && "-" === t5[1]) {
          const e4 = r3.bits_data_temp[t5[0]][t5[2]].clone();
          jn(r3.bits_data_temp, function(t6, n4) {
            jn(r3.bits_data_temp[n4], function(t7, o4) {
              r3.bits_data_temp[n4][o4] = r3.bits_data_temp[n4][o4].new_difference(e4);
            });
          });
        }
      }), jn(r3.bits_data_temp, function(t5, e4) {
        jn(r3.bits_data_temp[e4], function(t6, n4) {
          jn(o3, function(t7, o4) {
            o4 !== e4 && (r3.bits_data_temp[e4][n4] = r3.bits_data_temp[e4][n4].new_intersection(t7));
          });
        });
      }), r3;
    }(this.facets, i2), t3.filters_query && (o2 = function(t4, e3) {
      const r3 = Or(t4);
      r3.is_temp_copied || jn(r3.bits_data, function(t5, e4) {
        jn(r3.bits_data[e4], function(t6, n4) {
          r3.bits_data_temp[e4][n4] = r3.bits_data[e4][n4];
        });
      });
      let n3 = null;
      return jn(e3, function(t5) {
        let e4 = null;
        jn(t5, function(t6) {
          const n4 = t6[0], o3 = t6[1];
          if (!r3.bits_data_temp[n4]) throw new Error("Panic. The key does not exist in facets lists.");
          e4 = e4 && r3.bits_data_temp[n4][o3] ? r3.bits_data_temp[n4][o3].new_intersection(e4) : e4 && !r3.bits_data_temp[n4][o3] ? new In([]) : r3.bits_data_temp[n4][o3];
        }), n3 = (n3 || new In([])).new_union(e4 || new In([]));
      }), null !== n3 && jn(r3.bits_data_temp, function(t5, e4) {
        jn(r3.bits_data_temp[e4], function(t6, o3) {
          r3.bits_data_temp[e4][o3] = r3.bits_data_temp[e4][o3].new_intersection(n3);
        });
      }), r3;
    }(o2, Cn(t3.filters_query).map((t4) => Array.isArray(t4) ? t4.map((t5) => Array.isArray(t5) ? t5.map((t6) => t6) : t5.split(":")) : t4.split(":")))), n2.bits_data_temp = o2.bits_data_temp, jn(n2.bits_data_temp, function(t4, r3) {
      jn(n2.bits_data_temp[r3], function(t5, o3) {
        e2.query_ids && (n2.bits_data_temp[r3][o3] = e2.query_ids.new_intersection(n2.bits_data_temp[r3][o3])), e2.test && (n2.data[r3][o3] = n2.bits_data_temp[r3][o3].array());
      });
    }), n2.ids = t3.filters_query ? function(t4) {
      let e3 = new In([]);
      return jn(t4, function(r3, n3) {
        jn(t4[n3], function(r4, o3) {
          e3 = e3.new_union(t4[n3][o3]);
        });
      }), e3;
    }(n2.bits_data_temp) : Vn(n2.bits_data_temp, t3.filters), n2;
  }
};
function Jn(t3, e2) {
  let r2;
  false !== (e2 = e2 || /* @__PURE__ */ Object.create(null)).native_search_enabled && (r2 = new Ln(t3, e2));
  let n2 = new Bn(t3, e2);
  return { search: function(t4) {
    return (t4 = t4 || /* @__PURE__ */ Object.create(null)).aggregations = function(t5, e3) {
      return jn(Dn(t5), (t6, r3) => {
        t6.field || (t6.field = r3);
        let n3 = [];
        e3.filters && e3.filters[r3] && (n3 = e3.filters[r3]), t6.filters = n3;
        let o2 = [];
        return e3.not_filters && e3.not_filters[r3] && (o2 = e3.not_filters[r3]), e3.exclude_filters && e3.exclude_filters[r3] && (o2 = e3.exclude_filters[r3]), t6.not_filters = o2, t6;
      });
    }(e2.aggregations, t4), Un(0, t4, e2, r2, n2);
  }, similar: function(e3, r3) {
    return function(t4, e4, r4) {
      const n3 = r4.per_page || 10, o2 = r4.minimum || 0, i2 = r4.page || 1;
      let s2;
      for (let r5 = 0; r5 < t4.length; ++r5) if (t4[r5].id == e4) {
        s2 = t4[r5];
        break;
      }
      if (!r4.field) throw new Error("Please define field in options");
      const a2 = r4.field;
      let c2 = [];
      for (let r5 = 0; r5 < t4.length; ++r5) if (t4[r5].id !== e4) {
        const e5 = bn(s2[a2], t4[r5][a2]);
        e5.length >= o2 && (c2.push(t4[r5]), c2[c2.length - 1].intersection_length = e5.length);
      }
      return c2 = zn(c2, ["intersection_length"], ["desc"]), { pagination: { per_page: n3, page: i2, total: c2.length }, data: { items: c2.slice((i2 - 1) * n3, i2 * n3) } };
    }(t3, e3, r3);
  }, aggregation: function(t4) {
    return function(t5, e3, r3, n3, o2) {
      const i2 = e3.per_page || 10, s2 = e3.page || 1;
      if (e3.name && (!r3.aggregations || !r3.aggregations[e3.name])) throw new Error('Please define aggregation "'.concat(e3.name, '" in config'));
      const a2 = Dn(e3);
      if (a2.page = 1, a2.per_page = 0, !e3.name) throw new Error("field name is required");
      r3.aggregations[e3.name].size = 1e4;
      const c2 = Un(0, a2, r3, n3, o2).data.aggregations[e3.name].buckets;
      return { pagination: { per_page: i2, page: s2, total: c2.length }, data: { buckets: c2.slice((s2 - 1) * i2, s2 * i2) } };
    }(0, t4, e2, r2, n2);
  }, reindex: function(o2) {
    r2 = new Ln(t3 = o2, e2), n2 = new Bn(t3, e2);
  } };
}
export {
  Jn as default
};
//# sourceMappingURL=itemsjs.js.map
