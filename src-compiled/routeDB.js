(function () {
	function k(c) {
		for (var a = 0, b = e.length; a < b; a++)
			for (var d = f.querySelectorAll(e[a][0]), h = 0, g = d.length; h < g; h++)
				d[h][c].apply(d[h], e[a].slice(1))
	}

	function l() {
		k("removeEventListener")
	}

	function m() {
		f = f || document.getElementById("app");
		l();
		e = [];
		var c = location.hash.slice(1) || "/",
			a = g[c] || g["*"];
		if (a && a.controller) {
			var b = new a.controller;
			f && a.templateId && (a.onRefresh(function () {
				l();
				f.innerHTML = tmpl(a.templateId, b);
				k("addEventListener")
			}), b.$refresh())
		}
	}
	var g = {},
		e = [],
		f = null,
		n = function (c, a, b) {
			e.push([c,
				a, b
			])
		},
		p = function (c) {
			c.forEach(function (a) {
				a()
			})
		};
	this.addEventListener("hashchange", m);
	this.addEventListener("load", m);
	this.route = function (c, a, b) {
		"function" === typeof a && (b = a, a = null);
		var d = [];
		Object.defineProperty(b.prototype, "$on", {
			value: n
		});
		Object.defineProperty(b.prototype, "$refresh", {
			value: p.bind(void 0, d)
		});
		g[c] = {
			templateId: a,
			controller: b,
			onRefresh: d.push.bind(d)
		}
	}
})();
