(function () {
	var b = {};
	this.tmpl = function d(a, e) {
		var f = /\W/.test(a) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ")
			.split("<%")
			.join("\t")
			.replace(/((^|%>)[^\t]*)'/g, "$1\r")
			.replace(/\t=(.*?)%>/g, "',$1,'")
			.split("\t")
			.join("');")
			.split("%>")
			.join("p.push('")
			.split("\r")
			.join("\\'") + "');}return p.join('');") : b[a] = b[a] || d(document.getElementById(a)
			.innerHTML);
		return e ? f(e) : f
	}
})();
(function () {
	function b(a) {
		for (var b = 0, c = d.length; b < c; b++)
			for (var h = f.querySelectorAll(d[b][0]), e = 0, l = h.length; e < l; e++) h[e][a].apply(h[e], d[b].slice(1))
}
	function c() {
		b("removeEventListener")
}
	function a() {
		f = f || document.getElementById("app");
		c();
		d = [];
		var a = location.hash.slice(1) || "/",
			g = e[a] || e["*"];
		if (g && g.controller) {
			var k = new g.controller;
			f && g.templateId && (g.onRefresh(function () {
				c();
				f.innerHTML = tmpl(g.templateId, k);
				b("addEventListener")
			}), k.$refresh())
		}
	}
	var e = {},
		d = [],
		f = null,
		m = function (a, b, c) {
			d.push([a,
b, c])
		},
		l = function (a) {
			a.forEach(function (a) {
				a()
			})
		};
	this.addEventListener("hashchange", a);
	this.addEventListener("load", a);
	this.route = function (a, b, c) {
		"function" === typeof b && (c = b, b = null);
		var f = [];
		Object.defineProperty(c.prototype, "$on", {
			value: m
		});
		Object.defineProperty(c.prototype, "$refresh", {
			value: l.bind(void 0, f)
		});
		e[a] = {
			templateId: b,
			controller: c,
			onRefresh: f.push.bind(f)
		}
	}
})();
(function () {
	var b = function (b) {
		return b.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)"]+)("(.+)")?[\)]{1}/g, '<a href="$2" title="$4" target="_blank" rel="noopener">$1</a>')
			.replace(/\*\*(.*?)\*\*/ig, "<strong>$1</strong>")
			.replace(/^>(.+)/gm, "<blockquote>$1</blockquote>")
			.replace(/!\[([^\]]+)\]\(([^\)]+)\)/g,'<img src="" data-src="$2" alt="$1" style="display: block;margin-left: auto;margin-right: auto;width: 75%" lazyload>')
			.replace(/^(.+)\n=+/gm, "<h1>$1</h1>")
			.replace(/^(.+)\n\-+/gm, "<h2>$1</h2>")
			.replace(/^\s*\n```(([^\s]+))?/gm,'<pre class="$2">')
			.replace(/^```\s*\n/gm, "</pre>\n\n")
			.replace(/[\*_]{2}([^\*_]+)[\*_]{2}/g, "<b>$1</b>")
			.replace(/[\*_]{1}([^\*_]+)[\*_]{1}/g, "<i>$1</i>")
			.replace(/[~]{2}([^~]+)[~]{2}/g, "<del>$1</del>")
			.replace(/[`]{1}([^`]+)[`]{1}/g, "<code>$1</code>")
			.replace(/[#]{6}(.+)/g, "<h6>$1</h6>")
			.replace(/[#]{5}(.+)/g, "<h5>$1</h5>")
			.replace(/[#]{4}(.+)/g, "<h4>$1</h4>")
			.replace(/[#]{3}(.+)/g, "<h3>$1</h3>")
			.replace(/[#]{2}(.+)/g, "<h2>$1</h2>")
			.replace(/[#]{1}(.+)/g, "<h1>$1</h1>")
	};
	"undefined" !== typeof module &&
		"object" === typeof exports ? module.exports = b : window.markymark = b
})();
function barf() {}
barf.BLOCK = function (b) {
	var c = document.currentScript || document.scripts[document.scripts.length - 1],
		a = function (b) {
			b = document.createElement(null);
			b.innerHTML = this.responseText;
			for (var f = b.getElementsByTagName("SCRIPT"), d = f.length - 1; - 1 < d; --d) {
				var h = f[d],
					g = document.createElement("script");
				g.innerHTML = h.innerHTML;
				for (var k = h.attributes.length - 1; - 1 < k; --k) attribute = h.attributes[k], g.setAttribute(attribute.name, attribute.value);
				h.parentNode.replaceChild(g, h)
			}
			for (; b.firstChild;) c.parentNode.insertBefore(b.removeChild(b.firstChild),
				c);
			c.parentNode.removeChild(c);
			this.removeEventListener("error", e);
			this.removeEventListener("load", a)
		},
		e = function (b) {
			this.removeEventListener("error", e);
			this.removeEventListener("load", a);
			alert("there was an error!")
		},
		d = new XMLHttpRequest;
	d.addEventListener("error", e);
	d.addEventListener("load", a);
	d.open("GET", b, !0);
	d.send()
};
barf.MD = function (b, c) {
	fetch(b)
		.then(function (a) {
			return a.text()
		})
		.then(function (a) {
			return markymark(a)
		})
		.then(function (a) {
			return document.getElementById(c)
				.innerHTML = a
		})["catch"](function (a) {
			return console.log(a)
		})
};
barf.HTML = function (b, c) {
	fetch(b)
		.then(function (a) {
			return a.text()
		})
		.then(function (a) {
			return document.getElementById(c)
				.innerHTML = a
		})["catch"](function (a) {
			return console.log(a)
		})
};
barf.JS = function (b) {
	var c = document.createElement("script");
	c.setAttribute("defer", "");
	fetch(b)
		.then(function (a) {
			return a.text()
		})
		.then(function (a) {
			return c.textContent = a
		})
		.then(function (a) {
			return document.getElementsByTagName("body")[0].appendChild(c)
		})["catch"](function (a) {
			return console.log(a)
		})
};
barf.CSS = function (b) {
	var c = document.createElement("style");
	fetch(b)
		.then(function (a) {
			return a.text()
		})
		.then(function (a) {
			return c.textContent = a
		})
		.then(function (a) {
			return document.getElementsByTagName("head")[0].appendChild(c)
		})["catch"](function (a) {
			return console.log(a)
		})
};
function swapSrcAttributes(b) {
	return function (c) {
		c.setAttribute("src", c.getAttribute(b))
	}
}
function forEach(b, c) {
	for (var a = 0; a < b.length; a++) c(b[a])
}
function initDeferImages() {
	document.querySelectorAll("img[data-src]");
	var b = document.querySelectorAll("[data-src]");
	forEach(b, swapSrcAttributes("data-src"))
}
window.onload = function () {
	initDeferImages()
};
