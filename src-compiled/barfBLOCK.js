function barf() {}
barf.BLOCK = function (l) {
	var d = document.currentScript || document.scripts[document.scripts.length - 1],
		k = function (b) {
			b = document.createElement(null);
			b.innerHTML = this.responseText;
			for (var a = b.getElementsByTagName("SCRIPT"), e = a.length - 1; - 1 < e; --e) {
				var c = a[e],
					f = document.createElement("script");
				f.innerHTML = c.innerHTML;
				for (var g = c.attributes.length - 1; - 1 < g; --g) attribute = c.attributes[g], f.setAttribute(attribute.name, attribute.value);
				c.parentNode.replaceChild(f, c)
			}
			for (; b.firstChild;) d.parentNode.insertBefore(b.removeChild(b.firstChild), d);
			d.parentNode.removeChild(d);
			this.removeEventListener("error", h);
			this.removeEventListener("load", k)
		},
		h = function (a) {
			this.removeEventListener("error", h);
			this.removeEventListener("load", k);
			alert("there was an error!")
		},
		a = new XMLHttpRequest;
	a.addEventListener("error", h);
	a.addEventListener("load", k);
	a.open("GET", l, true);
	a.send()
};
