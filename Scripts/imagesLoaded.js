﻿/*!
 * imagesLoaded PACKAGED v3.0.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function () { "use strict"; function e() { } function t(e, t) { for (var n = e.length; n--;) if (e[n].listener === t) return n; return -1 } function n(e) { return function () { return this[e].apply(this, arguments) } } var i = e.prototype; i.getListeners = function (e) { var t, n, i = this._getEvents(); if ("object" == typeof e) { t = {}; for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]) } else t = i[e] || (i[e] = []); return t }, i.flattenListeners = function (e) { var t, n = []; for (t = 0; e.length > t; t += 1) n.push(e[t].listener); return n }, i.getListenersAsObject = function (e) { var t, n = this.getListeners(e); return n instanceof Array && (t = {}, t[e] = n), t || n }, i.addListener = function (e, n) { var i, r = this.getListenersAsObject(e), o = "object" == typeof n; for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : { listener: n, once: !1 }); return this }, i.on = n("addListener"), i.addOnceListener = function (e, t) { return this.addListener(e, { listener: t, once: !0 }) }, i.once = n("addOnceListener"), i.defineEvent = function (e) { return this.getListeners(e), this }, i.defineEvents = function (e) { for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]); return this }, i.removeListener = function (e, n) { var i, r, o = this.getListenersAsObject(e); for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1)); return this }, i.off = n("removeListener"), i.addListeners = function (e, t) { return this.manipulateListeners(!1, e, t) }, i.removeListeners = function (e, t) { return this.manipulateListeners(!0, e, t) }, i.manipulateListeners = function (e, t, n) { var i, r, o = e ? this.removeListener : this.addListener, s = e ? this.removeListeners : this.addListeners; if ("object" != typeof t || t instanceof RegExp) for (i = n.length; i--;) o.call(this, t, n[i]); else for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r)); return this }, i.removeEvent = function (e) { var t, n = typeof e, i = this._getEvents(); if ("string" === n) delete i[e]; else if ("object" === n) for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t]; else delete this._events; return this }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) { var n, i, r, o, s = this.getListenersAsObject(e); for (r in s) if (s.hasOwnProperty(r)) for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener); return this }, i.trigger = n("emitEvent"), i.emit = function (e) { var t = Array.prototype.slice.call(arguments, 1); return this.emitEvent(e, t) }, i.setOnceReturnValue = function (e) { return this._onceReturnValue = e, this }, i._getOnceReturnValue = function () { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, i._getEvents = function () { return this._events || (this._events = {}) }, "function" == typeof define && define.amd ? define(function () { return e }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e }).call(this), function (e) { "use strict"; var t = document.documentElement, n = function () { }; t.addEventListener ? n = function (e, t, n) { e.addEventListener(t, n, !1) } : t.attachEvent && (n = function (t, n, i) { t[n + i] = i.handleEvent ? function () { var t = e.event; t.target = t.target || t.srcElement, i.handleEvent.call(i, t) } : function () { var n = e.event; n.target = n.target || n.srcElement, i.call(t, n) }, t.attachEvent("on" + n, t[n + i]) }); var i = function () { }; t.removeEventListener ? i = function (e, t, n) { e.removeEventListener(t, n, !1) } : t.detachEvent && (i = function (e, t, n) { e.detachEvent("on" + t, e[t + n]); try { delete e[t + n] } catch (i) { e[t + n] = void 0 } }); var r = { bind: n, unbind: i }; "function" == typeof define && define.amd ? define(r) : e.eventie = r }(this), function (e) { "use strict"; function t(e, t) { for (var n in t) e[n] = t[n]; return e } function n(e) { return "[object Array]" === c.call(e) } function i(e) { var t = []; if (n(e)) t = e; else if ("number" == typeof e.length) for (var i = 0, r = e.length; r > i; i++) t.push(e[i]); else t.push(e); return t } function r(e, n) { function r(e, n, s) { if (!(this instanceof r)) return new r(e, n); "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = i(e), this.options = t({}, this.options), "function" == typeof n ? s = n : t(this.options, n), s && this.on("always", s), this.getImages(), o && (this.jqDeferred = new o.Deferred); var a = this; setTimeout(function () { a.check() }) } function c(e) { this.img = e } r.prototype = new e, r.prototype.options = {}, r.prototype.getImages = function () { this.images = []; for (var e = 0, t = this.elements.length; t > e; e++) { var n = this.elements[e]; "IMG" === n.nodeName && this.addImage(n); for (var i = n.querySelectorAll("img"), r = 0, o = i.length; o > r; r++) { var s = i[r]; this.addImage(s) } } }, r.prototype.addImage = function (e) { var t = new c(e); this.images.push(t) }, r.prototype.check = function () { function e(e, r) { return t.options.debug && a && s.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0 } var t = this, n = 0, i = this.images.length; if (this.hasAnyBroken = !1, !i) return this.complete(), void 0; for (var r = 0; i > r; r++) { var o = this.images[r]; o.on("confirm", e), o.check() } }, r.prototype.progress = function (e) { this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded; var t = this; setTimeout(function () { t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify(t, e) }) }, r.prototype.complete = function () { var e = this.hasAnyBroken ? "fail" : "done"; this.isComplete = !0; var t = this; setTimeout(function () { if (t.emit(e, t), t.emit("always", t), t.jqDeferred) { var n = t.hasAnyBroken ? "reject" : "resolve"; t.jqDeferred[n](t) } }) }, o && (o.fn.imagesLoaded = function (e, t) { var n = new r(this, e, t); return n.jqDeferred.promise(o(this)) }); var f = {}; return c.prototype = new e, c.prototype.check = function () { var e = f[this.img.src]; if (e) return this.useCached(e), void 0; if (f[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0; var t = this.proxyImage = new Image; n.bind(t, "load", this), n.bind(t, "error", this), t.src = this.img.src }, c.prototype.useCached = function (e) { if (e.isConfirmed) this.confirm(e.isLoaded, "cached was confirmed"); else { var t = this; e.on("confirm", function (e) { return t.confirm(e.isLoaded, "cache emitted confirmed"), !0 }) } }, c.prototype.confirm = function (e, t) { this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t) }, c.prototype.handleEvent = function (e) { var t = "on" + e.type; this[t] && this[t](e) }, c.prototype.onload = function () { this.confirm(!0, "onload"), this.unbindProxyEvents() }, c.prototype.onerror = function () { this.confirm(!1, "onerror"), this.unbindProxyEvents() }, c.prototype.unbindProxyEvents = function () { n.unbind(this.proxyImage, "load", this), n.unbind(this.proxyImage, "error", this) }, r } var o = e.jQuery, s = e.console, a = s !== void 0, c = Object.prototype.toString; "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], r) : e.imagesLoaded = r(e.EventEmitter, e.eventie) }(window);