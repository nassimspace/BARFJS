var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
    var b = 0;
    return function() {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
};
$jscomp.makeIterator = function(a) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : $jscomp.arrayIterator(a)
};
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
};
$jscomp.polyfill = function(a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function(a) {
    function b() {
        this.batch_ = null
    }

    function c(a) {
        return a instanceof e ? a : new e(function(b, c) {
            b(a)
        })
    }
    if (a && !$jscomp.FORCE_POLYFILL_PROMISE) return a;
    b.prototype.asyncExecute = function(a) {
        if (null == this.batch_) {
            this.batch_ = [];
            var b = this;
            this.asyncExecuteFunction(function() {
                b.executeBatch_()
            })
        }
        this.batch_.push(a)
    };
    var d = $jscomp.global.setTimeout;
    b.prototype.asyncExecuteFunction = function(a) {
        d(a, 0)
    };
    b.prototype.executeBatch_ = function() {
        for (; this.batch_ && this.batch_.length;) {
            var a =
                this.batch_;
            this.batch_ = [];
            for (var b = 0; b < a.length; ++b) {
                var c = a[b];
                a[b] = null;
                try {
                    c()
                } catch (k) {
                    this.asyncThrow_(k)
                }
            }
        }
        this.batch_ = null
    };
    b.prototype.asyncThrow_ = function(a) {
        this.asyncExecuteFunction(function() {
            throw a;
        })
    };
    var e = function(a) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        var b = this.createResolveAndReject_();
        try {
            a(b.resolve, b.reject)
        } catch (g) {
            b.reject(g)
        }
    };
    e.prototype.createResolveAndReject_ = function() {
        function a(a) {
            return function(h) {
                c || (c = !0, a.call(b, h))
            }
        }
        var b = this,
            c = !1;
        return {
            resolve: a(this.resolveTo_),
            reject: a(this.reject_)
        }
    };
    e.prototype.resolveTo_ = function(a) {
        if (a === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));
        else if (a instanceof e) this.settleSameAsPromise_(a);
        else {
            a: switch (typeof a) {
                case "object":
                    var b = null != a;
                    break a;
                case "function":
                    b = !0;
                    break a;
                default:
                    b = !1
            }
            b ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a)
        }
    };
    e.prototype.resolveToNonPromiseObj_ = function(a) {
        var b = void 0;
        try {
            b = a.then
        } catch (g) {
            this.reject_(g);
            return
        }
        "function" == typeof b ?
            this.settleSameAsThenable_(b, a) : this.fulfill_(a)
    };
    e.prototype.reject_ = function(a) {
        this.settle_(2, a)
    };
    e.prototype.fulfill_ = function(a) {
        this.settle_(1, a)
    };
    e.prototype.settle_ = function(a, b) {
        if (0 != this.state_) throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.state_);
        this.state_ = a;
        this.result_ = b;
        this.executeOnSettledCallbacks_()
    };
    e.prototype.executeOnSettledCallbacks_ = function() {
        if (null != this.onSettledCallbacks_) {
            for (var a = 0; a < this.onSettledCallbacks_.length; ++a) f.asyncExecute(this.onSettledCallbacks_[a]);
            this.onSettledCallbacks_ = null
        }
    };
    var f = new b;
    e.prototype.settleSameAsPromise_ = function(a) {
        var b = this.createResolveAndReject_();
        a.callWhenSettled_(b.resolve, b.reject)
    };
    e.prototype.settleSameAsThenable_ = function(a, b) {
        var c = this.createResolveAndReject_();
        try {
            a.call(b, c.resolve, c.reject)
        } catch (k) {
            c.reject(k)
        }
    };
    e.prototype.then = function(a, b) {
        function c(a, b) {
            return "function" == typeof a ? function(b) {
                try {
                    d(a(b))
                } catch (m) {
                    f(m)
                }
            } : b
        }
        var d, f, h = new e(function(a, b) {
            d = a;
            f = b
        });
        this.callWhenSettled_(c(a, d), c(b, f));
        return h
    };
    e.prototype["catch"] = function(a) {
        return this.then(void 0, a)
    };
    e.prototype.callWhenSettled_ = function(a, b) {
        function c() {
            switch (d.state_) {
                case 1:
                    a(d.result_);
                    break;
                case 2:
                    b(d.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + d.state_);
            }
        }
        var d = this;
        null == this.onSettledCallbacks_ ? f.asyncExecute(c) : this.onSettledCallbacks_.push(c)
    };
    e.resolve = c;
    e.reject = function(a) {
        return new e(function(b, c) {
            c(a)
        })
    };
    e.race = function(a) {
        return new e(function(b, d) {
            for (var e = $jscomp.makeIterator(a), f = e.next(); !f.done; f =
                e.next()) c(f.value).callWhenSettled_(b, d)
        })
    };
    e.all = function(a) {
        var b = $jscomp.makeIterator(a),
            d = b.next();
        return d.done ? c([]) : new e(function(a, e) {
            function f(b) {
                return function(c) {
                    h[b] = c;
                    g--;
                    0 == g && a(h)
                }
            }
            var h = [],
                g = 0;
            do h.push(void 0), g++, c(d.value).callWhenSettled_(f(h.length - 1), e), d = b.next(); while (!d.done)
        })
    };
    return e
}, "es6", "es3");
$jscomp.polyfill("Promise.prototype.finally", function(a) {
    return a ? a : function(a) {
        return this.then(function(b) {
            return Promise.resolve(a()).then(function() {
                return b
            })
        }, function(b) {
            return Promise.resolve(a()).then(function() {
                throw b;
            })
        })
    }
}, "es9", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.SymbolClass = function(a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {
        configurable: !0,
        writable: !0,
        value: b
    })
};
$jscomp.SymbolClass.prototype.toString = function() {
    return this.$jscomp$symbol$id_
};
$jscomp.Symbol = function() {
    function a(c) {
        if (this instanceof a) throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (c || "") + "_" + b++, c)
    }
    var b = 0;
    return a
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    });
    $jscomp.initSymbolIterator = function() {}
};
$jscomp.initSymbolAsyncIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function() {}
};
$jscomp.iteratorPrototype = function(a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function() {
        return this
    };
    return a
};
$jscomp.underscoreProtoCanBeSet = function() {
    var a = {
            a: !0
        },
        b = {};
    try {
        return b.__proto__ = a, b.a
    } catch (c) {}
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
    return a
} : null;
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function(a) {
    if (!(a instanceof Object)) throw new TypeError("Iterator result " + a + " is not an object");
};
$jscomp.generator.Context = function() {
    this.isRunning_ = !1;
    this.yieldAllIterator_ = null;
    this.yieldResult = void 0;
    this.nextAddress = 1;
    this.finallyAddress_ = this.catchAddress_ = 0;
    this.finallyContexts_ = this.abruptCompletion_ = null
};
$jscomp.generator.Context.prototype.start_ = function() {
    if (this.isRunning_) throw new TypeError("Generator is already running");
    this.isRunning_ = !0
};
$jscomp.generator.Context.prototype.stop_ = function() {
    this.isRunning_ = !1
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function() {
    this.nextAddress = this.catchAddress_ || this.finallyAddress_
};
$jscomp.generator.Context.prototype.next_ = function(a) {
    this.yieldResult = a
};
$jscomp.generator.Context.prototype.throw_ = function(a) {
    this.abruptCompletion_ = {
        exception: a,
        isException: !0
    };
    this.jumpToErrorHandler_()
};
$jscomp.generator.Context.prototype["return"] = function(a) {
    this.abruptCompletion_ = {
        "return": a
    };
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function(a) {
    this.abruptCompletion_ = {
        jumpTo: a
    };
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.yield = function(a, b) {
    this.nextAddress = b;
    return {
        value: a
    }
};
$jscomp.generator.Context.prototype.yieldAll = function(a, b) {
    var c = $jscomp.makeIterator(a),
        d = c.next();
    $jscomp.generator.ensureIteratorResultIsObject_(d);
    if (d.done) this.yieldResult = d.value, this.nextAddress = b;
    else return this.yieldAllIterator_ = c, this.yield(d.value, b)
};
$jscomp.generator.Context.prototype.jumpTo = function(a) {
    this.nextAddress = a
};
$jscomp.generator.Context.prototype.jumpToEnd = function() {
    this.nextAddress = 0
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function(a, b) {
    this.catchAddress_ = a;
    void 0 != b && (this.finallyAddress_ = b)
};
$jscomp.generator.Context.prototype.setFinallyBlock = function(a) {
    this.catchAddress_ = 0;
    this.finallyAddress_ = a || 0
};
$jscomp.generator.Context.prototype.leaveTryBlock = function(a, b) {
    this.nextAddress = a;
    this.catchAddress_ = b || 0
};
$jscomp.generator.Context.prototype.enterCatchBlock = function(a) {
    this.catchAddress_ = a || 0;
    a = this.abruptCompletion_.exception;
    this.abruptCompletion_ = null;
    return a
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function(a, b, c) {
    c ? this.finallyContexts_[c] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
    this.catchAddress_ = a || 0;
    this.finallyAddress_ = b || 0
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function(a, b) {
    var c = this.finallyContexts_.splice(b || 0)[0];
    if (c = this.abruptCompletion_ = this.abruptCompletion_ || c) {
        if (c.isException) return this.jumpToErrorHandler_();
        void 0 != c.jumpTo && this.finallyAddress_ < c.jumpTo ? (this.nextAddress = c.jumpTo, this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_
    } else this.nextAddress = a
};
$jscomp.generator.Context.prototype.forIn = function(a) {
    return new $jscomp.generator.Context.PropertyIterator(a)
};
$jscomp.generator.Context.PropertyIterator = function(a) {
    this.object_ = a;
    this.properties_ = [];
    for (var b in a) this.properties_.push(b);
    this.properties_.reverse()
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function() {
    for (; 0 < this.properties_.length;) {
        var a = this.properties_.pop();
        if (a in this.object_) return a
    }
    return null
};
$jscomp.generator.Engine_ = function(a) {
    this.context_ = new $jscomp.generator.Context;
    this.program_ = a
};
$jscomp.generator.Engine_.prototype.next_ = function(a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
    this.context_.next_(a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.return_ = function(a) {
    this.context_.start_();
    var b = this.context_.yieldAllIterator_;
    if (b) return this.yieldAllStep_("return" in b ? b["return"] : function(a) {
        return {
            value: a,
            done: !0
        }
    }, a, this.context_["return"]);
    this.context_["return"](a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.throw_ = function(a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"], a, this.context_.next_);
    this.context_.throw_(a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(a, b, c) {
    try {
        var d = a.call(this.context_.yieldAllIterator_, b);
        $jscomp.generator.ensureIteratorResultIsObject_(d);
        if (!d.done) return this.context_.stop_(), d;
        var e = d.value
    } catch (f) {
        return this.context_.yieldAllIterator_ = null, this.context_.throw_(f), this.nextStep_()
    }
    this.context_.yieldAllIterator_ = null;
    c.call(this.context_, e);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.nextStep_ = function() {
    for (; this.context_.nextAddress;) try {
        var a = this.program_(this.context_);
        if (a) return this.context_.stop_(), {
            value: a.value,
            done: !1
        }
    } catch (b) {
        this.context_.yieldResult = void 0, this.context_.throw_(b)
    }
    this.context_.stop_();
    if (this.context_.abruptCompletion_) {
        a = this.context_.abruptCompletion_;
        this.context_.abruptCompletion_ = null;
        if (a.isException) throw a.exception;
        return {
            value: a["return"],
            done: !0
        }
    }
    return {
        value: void 0,
        done: !0
    }
};
$jscomp.generator.Generator_ = function(a) {
    this.next = function(b) {
        return a.next_(b)
    };
    this["throw"] = function(b) {
        return a.throw_(b)
    };
    this["return"] = function(b) {
        return a.return_(b)
    };
    $jscomp.initSymbolIterator();
    this[Symbol.iterator] = function() {
        return this
    }
};
$jscomp.generator.createGenerator = function(a, b) {
    var c = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));
    $jscomp.setPrototypeOf && $jscomp.setPrototypeOf(c, a.prototype);
    return c
};
$jscomp.asyncExecutePromiseGenerator = function(a) {
    function b(b) {
        return a.next(b)
    }

    function c(b) {
        return a["throw"](b)
    }
    return new Promise(function(d, e) {
        function f(a) {
            a.done ? d(a.value) : Promise.resolve(a.value).then(b, c).then(f, e)
        }
        f(a.next())
    })
};
$jscomp.asyncExecutePromiseGeneratorFunction = function(a) {
    return $jscomp.asyncExecutePromiseGenerator(a())
};
$jscomp.asyncExecutePromiseGeneratorProgram = function(a) {
    return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))
};
var barf = function() {
        return $jscomp.asyncExecutePromiseGeneratorProgram(function(a) {
            return 1 == a.nextAddress ? a.yield({}, 2) : a["return"](a.yieldResult)
        })
    },
    redirect404 = function() {
        var a = window.location;
        a.replace(a.protocol + "//" + a.hostname + (a.port ? ":" + a.port : "") + a.pathname.split("/").slice(0, 1).join("/") + "/?p=/" + a.pathname.slice(1).split("/").slice(0).join("/").replace(/&/g, "~and~") + (a.search ? "&q=" + a.search.slice(1).replace(/&/g, "~and~") : "") + a.hash)
    },
    recieveRedirect = function() {
        (function(a) {
            if (a.search) {
                var b = {};
                a.search.slice(1).split("&").forEach(function(a) {
                    a = a.split("=");
                    b[a[0]] = a.slice(1).join("=").replace(/~and~/g, "&")
                });
                void 0 !== b.p && window.history.replaceState(null, null, a.pathname.slice(0, -1) + (b.p || "") + (b.q ? "?" + b.q : "") + a.hash)
            }
        })(window.location)
    },
    appView = void 0,
    routes = void 0;
window.onpopstate = function() {
    appView.innerHTML = routes[window.location.pathname]
};
var navRoute = function(a) {
    window.history.pushState({}, a, window.location.origin + a);
    appView.innerHTML = routes[a]
};
appView.innerHTML = routes[window.location.pathname];
var eventListenerOptionsSupported = function() {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
            window.addEventListener("test", null, b);
            window.removeEventListener("test", null, b)
        } catch (c) {}
        return a
    },
    defaultOptions = {
        passive: !0,
        capture: !1
    },
    supportedPassiveTypes = "scroll wheel animationstart animationend transitionend click resize loadedmetadata loadeddata select touchstart touchmove touchenter touchend touchleave mouseout mouseleave mouseup mousedown mousemove mouseenter mousewheel mouseover".split(" "),
    getDefaultPassiveOption = function(a, b) {
        return void 0 !== a ? a : -1 === supportedPassiveTypes.indexOf(b) ? !1 : defaultOptions.passive
    },
    getWritableOptions = function(a) {
        var b = Object.getOwnPropertyDescriptor(a, "passive");
        return b && !0 !== b.writable && void 0 === b.set ? Object.assign({}, a) : a
    },
    overwriteAddEvent = function(a) {
        EventTarget.prototype.addEventListener = function(b, c, d) {
            var e = "object" === typeof d && null !== d,
                f = e ? d.capture : d;
            d = e ? getWritableOptions(d) : {};
            d.passive = getDefaultPassiveOption(d.passive, b);
            d.capture = void 0 ===
                f ? defaultOptions.capture : f;
            a.call(this, b, c, d)
        };
        EventTarget.prototype.addEventListener._original = a
    },
    supportsPassive = eventListenerOptionsSupported();
if (supportsPassive) {
    var addEvent = EventTarget.prototype.addEventListener;
    overwriteAddEvent(addEvent)
}
var add2Onload = function(a) {
    var b = window.onload;
    window.onload = "function" != typeof window.onload ? a : function() {
        b && b();
        a()
    }
};
add2Onload(function() {
    var a = [].slice.call(document.querySelectorAll("[data-lazy='1']"));
    if ("IntersectionObserver" in window) {
        var b = new IntersectionObserver(function(a, c) {
            a.forEach(function(a) {
                a.isIntersecting && 0 == a.target.src.length && (a.target.src = a.target.dataset.src, b.unobserve(a.target))
            })
        });
        a.forEach(function(a) {
            b.observe(a)
        })
    } else
        for (var c = 0; c < a.length; c++) a[c].getAttribute("data-src") && a[c].setAttribute("src", a[c].getAttribute("data-src"))
});
(function() {
    var a = function(a) {
        return a.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)"]+)("(.+)")?[\)]{1}/g, '<a href="$2" title="$4" target="_blank" rel="noopener">$1</a>').replace(/\*\*(.*?)\*\*/gi, "<strong>$1</strong>").replace(/^>(.+)/gm, "<blockquote>$1</blockquote>").replace(/!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="" data-src="$2" alt="$1" style="display: block;margin-left: auto;margin-right: auto;width: 75%" data-lazy="1">').replace(/^(.+)\n=+/gm, "<h1>$1</h1>").replace(/^(.+)\n\-+/gm, "<h2>$1</h2>").replace(/^\s*\n```(([^\s]+))?/gm,
            '<pre class="$2">').replace(/^```\s*\n/gm, "</pre>\n\n").replace(/[\*_]{2}([^\*_]+)[\*_]{2}/g, "<b>$1</b>").replace(/[\*_]{1}([^\*_]+)[\*_]{1}/g, "<i>$1</i>").replace(/[~]{2}([^~]+)[~]{2}/g, "<del>$1</del>").replace(/[`]{1}([^`]+)[`]{1}/g, "<code>$1</code>").replace(/[#]{6}(.+)/g, "<h6>$1</h6>").replace(/[#]{5}(.+)/g, "<h5>$1</h5>").replace(/[#]{4}(.+)/g, "<h4>$1</h4>").replace(/[#]{3}(.+)/g, "<h3>$1</h3>").replace(/[#]{2}(.+)/g, "<h2>$1</h2>").replace(/[#]{1}(.+)/g, "<h1>$1</h1>")
    };
    "undefined" !== typeof module &&
        "object" === typeof exports ? module.exports = a : window.bmp = a
})();
barf = {
    URL: function(a) {
        return (a = location.search.match(new RegExp("[?&]" + a + "=([^&]*)(&?)", "i"))) ? a[1] : a
    },
    CP: function(a) {
        var b = document.currentScript || document.scripts[document.scripts.length - 1],
            c = function(a) {
                a = document.createElement(null);
                a.innerHTML = this.responseText;
                for (var e = a.getElementsByTagName("SCRIPT"), f = e.length - 1; - 1 < f; --f) {
                    var g = e[f],
                        k = document.createElement("script");
                    k.innerHTML = g.innerHTML;
                    for (var l = g.attributes.length - 1; - 1 < l; --l) attribute = g.attributes[l], k.setAttribute(attribute.name, attribute.value);
                    g.parentNode.replaceChild(k, g)
                }
                for (; a.firstChild;) b.parentNode.insertBefore(a.removeChild(a.firstChild), b);
                b.parentNode.removeChild(b);
                this.removeEventListener("error", d);
                this.removeEventListener("load", c)
            },
            d = function(a) {
                this.removeEventListener("error", d);
                this.removeEventListener("load", c);
                alert("there was an error!")
            },
            e = new XMLHttpRequest;
        e.addEventListener("error", d);
        e.addEventListener("load", c);
        e.open("GET", a, !0);
        e.send()
    },
    MD: function(a, b) {
        fetch(a).then(function(a) {
            return a.text()
        }).then(function(a) {
            return bmp(a)
        }).then(function(a) {
            return document.getElementById(b).innerHTML =
                a
        })["catch"](function(a) {
            return console.log(a)
        })
    },
    HTML: function(a, b) {
        return fetch(a, {
            method: "GET",
            mode: "cors",
            cache: "force-cache"
        }).then(function(a) {
            return a.text()
        }).then(function(a) {
            return document.getElementById(b).innerHTML = a
        })["catch"](function(a) {
            return console.log(a)
        })
    },
    CSS: function(a) {
        var b = document.createElement("style");
        return fetch(a, {
            method: "GET",
            mode: "cors",
            cache: "force-cache"
        }).then(function(a) {
            return a.text()
        }).then(function(a) {
            return b.textContent = a
        }).then(function(a) {
            return document.getElementsByTagName("head")[0].appendChild(b)
        })["catch"](function(a) {
            return console.log(a)
        })
    },
    JS: function(a) {
        var b = document.createElement("script");
        return fetch(a, {
            method: "GET",
            mode: "cors",
            cache: "force-cache"
        }).then(function(a) {
            return a.text()
        }).then(function(a) {
            return b.textContent = a
        }).then(function(a) {
            return document.getElementsByTagName("body")[0].appendChild(b)
        })["catch"](function(a) {
            return console.log(a)
        })
    },
    JSON: function(a) {
        var b = document.createElement("script");
        b.type = "application/json";
        return fetch(a, {
            method: "GET",
            mode: "cors",
            cache: "force-cache"
        }).then(function(a) {
            return a.json()
        }).then(function(a) {
            return b.textContent =
                a
        }).then(function(a) {
            return document.getElementsByTagName("body")[0].appendChild(js)
        })["catch"](function(a) {
            return console.log(a)
        })
    }
};
