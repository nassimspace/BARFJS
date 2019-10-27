// Options for Passive Event Listeners by Hector Zarco: https://github.com/zzarcon/default-passive-events
const eventListenerOptionsSupported = () => {
	let supported = false;
	try {
		const opts = Object.defineProperty({}, "passive", {
			get() {
				supported = true;
			}
		});
		window.addEventListener("test", null, opts);
		window.removeEventListener("test", null, opts);
	} catch (e) {}
	return supported;
}
// Defaults the following to Passive Event Listeners by Hector Zarco: https://github.com/zzarcon/default-passive-events
const defaultOptions = {
	passive: true,
	capture: false
};
const supportedPassiveTypes = [
	"scroll", "wheel", "load"




	, "touchstart", "touchmove", "touchenter", "touchend", "touchleave", "touchcancel", "unload"




	, "mouseout", "mouseleave", "mouseup", "mousedown", "mousemove", "mouseenter", "mousewheel", "mouseover"




	, "animationstart", "animationend", "pause", "play", "playing", "keydown", "keypress"




	, "keyup", "transitionend", "click", "resize", "loadedmetadata", "loadeddata", "select"




	, "progress", "message", "hashchange", "fullscreen", "copy", "canplay", "canplaythough", "contextmenu"




	, "animationiteration", "toggle", "volumechange", "waiting"
];
const getDefaultPassiveOption = (passive, eventName) => {
	if (passive !== undefined) return passive;
	return supportedPassiveTypes.indexOf(eventName) === -1 ? false : defaultOptions.passive;
};
const getWritableOptions = (options) => {
	const passiveDescriptor = Object.getOwnPropertyDescriptor(options, "passive");
	return passiveDescriptor && passiveDescriptor.writable !== true && passiveDescriptor.set === undefined ? Object.assign({}, options) : options;
};
const overwriteAddEvent = (superMethod) => {
	EventTarget.prototype.addEventListener = function (type, listener, options) {
		const usesListenerOptions = typeof options === "object" && options !== null;
		const useCapture = usesListenerOptions ? options.capture : options;
		options = usesListenerOptions ? getWritableOptions(options) : {};
		options.passive = getDefaultPassiveOption(options.passive, type);
		options.capture = useCapture === undefined ? defaultOptions.capture : useCapture;
		superMethod.call(this, type, listener, options);
	};
	EventTarget.prototype.addEventListener._original = superMethod;
};
const supportsPassive = eventListenerOptionsSupported();
if (supportsPassive) {
	const addEvent = EventTarget.prototype.addEventListener;
	overwriteAddEvent(addEvent);
}
// Micro-Templating Engine by John Resig
(function () {
	var cache = {};
	this.tmpl = function tmpl(str, data) {
		var fn = !/\W/.test(str) ?
			cache[str] = cache[str] ||
			tmpl(document.getElementById(str)
				.innerHTML) :
			new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +
				"with(obj){p.push('" +
				str
				.replace(/[\r\t\n]/g, " ")
				.split("<%")
				.join("\t")
				.replace(/((^|%>)[^\t]*)'/g, "$1\r")
				.replace(/\t=(.*?)%>/g, "',$1,'")
				.split("\t")
				.join("');")
				.split("%>")
				.join("p.push('")
				.split("\r")
				.join("\\'") +
				"');}return p.join('');");
		return data ? fn(data) : fn;
	};
})();
// MDP Markdown Parser
(function () {
	const mdp = md => {
		return md
			.replace(
				/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4" target="_blank" rel="noopener">$1</a>'
			)
			.replace(/\*\*(.*?)\*\*/gi, "<strong>$1</strong>")
			.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>")
			.replace(
				/\!\[([^\]]+)\]\(([^\)]+)\)/g,
				'<img src="" data-src="$2" alt="$1" style="display: block;margin-left: auto;margin-right: auto;width: 75%" loading="lazy">'
			)
			.replace(/^(.+)\n\=+/gm, "<h1>$1</h1>")
			.replace(/^(.+)\n\-+/gm, "<h2>$1</h2>")
			.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">')
			.replace(/^\`\`\`\s*\n/gm, "</pre>\n\n")
			.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, "<b>$1</b>")
			.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, "<i>$1</i>")
			.replace(/[\~]{2}([^\~]+)[\~]{2}/g, "<del>$1</del>")
			.replace(/[\`]{1}([^\`]+)[\`]{1}/g, "<code>$1</code>")
			.replace(/[\#]{6}(.+)/g, "<h6>$1</h6>")
			.replace(/[\#]{5}(.+)/g, "<h5>$1</h5>")
			.replace(/[\#]{4}(.+)/g, "<h4>$1</h4>")
			.replace(/[\#]{3}(.+)/g, "<h3>$1</h3>")
			.replace(/[\#]{2}(.+)/g, "<h2>$1</h2>")
			.replace(/[\#]{1}(.+)/g, "<h1>$1</h1>");
	};
	if (typeof module !== "undefined" && typeof exports === "object") {
		module.exports = mdp;
	} else {
		window.mdp = mdp;
	}
})();
// Global Function to add functions or events to window.onload (run several events on window.onload)
const add2Onload = (func) => {
	const oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = () => {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
};
// Defer images: loads images by setting data-src to src on window.onload
let imgLoad = () => {
	const imgDefer = document.getElementsByTagName("img");
	for (let i = 0; i < imgDefer.length; i++) {
		if (imgDefer[i].getAttribute("data-src")) {
			imgDefer[i].setAttribute("src", imgDefer[i].getAttribute("data-src"));
		}
	}
	return imgDefer;
}
// Defer iframes: Loads iframes by setting data-src to src on window.onload
const iLoad = () => {
	const iDefer = document.getElementsByTagName("iframe");
	for (let i = 0; i < iDefer.length; i++) {
		if (iDefer[i].getAttribute("data-src")) {
			iDefer[i].setAttribute("src", iDefer[i].getAttribute("data-src"));
		}
	}
	return iDefer;
}
// Defer videos: Loads videos by setting data-src to src on window.onload
const vLoad = () => {
	const vDefer = document.getElementsByTagName("video");
	for (let i = 0; i < vDefer.length; i++) {
		if (vDefer[i].getAttribute("data-src")) {
			vDefer[i].setAttribute("src", vDefer[i].getAttribute("data-src"));
		}
	}
	return vDefer;
}
// Set barf Function
let barf = async () => await {}
// barf.URL(); get URL Query Parameters
barf = {
	URL: function (item) {
		let svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	}
};
// barf.MD(); Loads Markdown file & renders it (preferably within article tag with an ID)
barf.MD = (url, id) => {
	const resMD = fetch(url)
		.then(r => r.text())
		.then(data => mdp(data))
		.then(content => document.getElementById(id)
			.innerHTML = content)
		.catch(e => console
			.log(e))
};
// barf.CP("./components/myCardsGrid.html");
// Loads html, css, js (component) from separate file and insert it
// at the same location the function was called from (using XHR, not Fetch)
// NOTE: if you are loading CSS or JS that way, it"s best to inline them:
// barf.CP("./components/jsModal.html");
// in "jsModal.html", write it like so: <script>whatever code to make model window</script>
barf.CP = function (l) {
	const d = document.currentScript || document.scripts[document.scripts.length - 1],
		k = function (b) {
			b = document.createElement(null);
			b.innerHTML = this.responseText;
			for (let a = b.getElementsByTagName("SCRIPT"), e = a.length - 1; - 1 < e; --e) {
				const c = a[e],
					f = document.createElement("script");
				f.innerHTML = c.innerHTML;
				for (let g = c.attributes.length - 1; - 1 < g; --g) attribute = c.attributes[g], f.setAttribute(attribute.name, attribute.value);
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
// barf.HTML("./components/post.html", "article");
// Loads HTML file and shoots it in Element ID (example: <div id="article></div>") of your choice
barf.HTML = (url, id) => {
	const resHTML = fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "force-cache"
		})
		.then(r => r.text())
		.then(data => document.getElementById(id)
			.innerHTML = data)
		.catch(e => console.log(e));
	return resHTML;
};
// barf.CSS("./styles/urlOfCssFile.css");
// Loads CSS file, creates a style element in the HEAD, and shoot CSS file content within the style element
barf.CSS = (url) => {
	const css = document.createElement("style");
	const resCSS = fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "force-cache"
		})
		.then(r => r.text())
		.then(data => css.textContent = data)
		.then(content => document.getElementsByTagName("head")[0].appendChild(css))
		.catch(e =>
			console.log(e));
	return resCSS;
};
// barf.JS("./js/jquery.min.js");
// Loads JS file, creates a script tag at end of BODY, and shoots the JS file content within the element
barf.JS = (url) => {
	const js = document.createElement("script");
	const resJS = fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "force-cache"
		})
		.then(r => r.text())
		.then(data => js.textContent = data)
		.then(content => document.getElementsByTagName("body")[0].appendChild(js))
		.catch(e =>
			console.log(e));
	return resJS;
};
// Trigger the defered loads of images, iframes & videos on window.onload
add2Onload(imgLoad);
add2Onload(iLoad);
add2Onload(vLoad);
