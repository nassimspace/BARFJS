// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
(function () {
	var cache = {};
	this.tmpl = function tmpl(str, data) {
		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = !/\W/.test(str) ?
			cache[str] = cache[str] ||
			tmpl(document.getElementById(str).innerHTML) :
			// Generate a reusable function that will serve as a template
			// generator (and which will be cached).
			new Function("obj"
				, "var p=[],print=function(){p.push.apply(p,arguments);};" +
				// Introduce the data as local variables using with(){}
				"with(obj){p.push('" +
				// Convert the template into pure JavaScript
				str
				.replace(/[\r\t\n]/g, " ")
				.split("<%").join("\t")
				.replace(/((^|%>)[^\t]*)'/g, "$1\r")
				.replace(/\t=(.*?)%>/g, "',$1,'")
				.split("\t").join("');")
				.split("%>").join("p.push('")
				.split("\r").join("\\'") +
				"');}return p.join('');");
		// Provide some basic currying to the user
		return data ? fn(data) : fn;
	};
})();
(function () {
	// A hash to store our routes:
	var routes = {};
	// An array of the current route's events:
	var events = [];
	// The element where the routes are rendered:
	var el = null;
	// Context functions shared between all controllers:
	var ctx = {
		on: function (selector, evt, handler) {
			events.push([selector, evt, handler]);
		}
		, refresh: function (listeners) {
			listeners.forEach(function (fn) {
					fn();
				});
		}
	};
	// Defines a route:
	function route(path, templateId, controller) {
		if (typeof templateId === 'function') {
			controller = templateId;
			templateId = null;
		}
		var listeners = [];
		Object.defineProperty(controller.prototype, '$on', {
			value: ctx.on
		});
		Object.defineProperty(controller.prototype, '$refresh', {
			value: ctx.refresh.bind(undefined, listeners)
		});
		routes[path] = {
			templateId: templateId
			, controller: controller
			, onRefresh: listeners.push.bind(listeners)
		};
	}

	function forEachEventElement(fnName) {
		for (var i = 0, len = events.length; i < len; i++) {
			var els = el.querySelectorAll(events[i][0]);
			for (var j = 0, elsLen = els.length; j < elsLen; j++) {
				els[j][fnName].apply(els[j], events[i].slice(1));
			}
		}
	}

	function addEventListeners() {
		forEachEventElement('addEventListener');
	}

	function removeEventListeners() {
		forEachEventElement('removeEventListener');
	}
	function router() {
		// Lazy load view element:
		el = el || document.getElementById('view');
		// Remove current event listeners:
		removeEventListeners();
		// Clear events, to prepare for next render:
		events = [];
		// Current route url (getting rid of '#' in hash as well):
		var url = location.hash.slice(1) || '/';
		// Get route by url or fallback if it does not exist:
		var route = routes[url] || routes['*'];
		// Do we have a controller:
		if (route && route.controller) {
			var ctrl = new route.controller();
			if (!el || !route.templateId) {
				// If there's nothing to render, abort:
				return;
			}
			// Listen on route refreshes:
			route.onRefresh(function () {
					removeEventListeners();
					// Render route template with John Resig's template engine:
					el.innerHTML = tmpl(route.templateId, ctrl);
					addEventListeners();
				});
			// Trigger the first refresh:
			ctrl.$refresh();
		}
	}
	// Listen on hash change:
	this.addEventListener('hashchange', router);
	// Listen on page load:
	this.addEventListener('load', router);
	// Expose the route register function:
	this.route = route;
})();
//

// MarkyMark Markdown Parser
(function () {
	const markymark = function (md) {
		return md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4" target="_blank" rel="noopener">$1</a>')
			.replace(/\*\*(.*?)\*\*/ig, '<strong>$1</strong>')
			.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>')
			.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="" data-src="$2" alt="$1" style="display: block;margin-left: auto;margin-right: auto;width: 75%" lazyload>')
			.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>')
			.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>')
			.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">')
			.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n')
			.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>')
			.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>')
			.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>')
			.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>')
			.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>')
			.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>')
			.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>')
			.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>')
			.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>')
			.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');
	};
	if (typeof module !== 'undefined' && typeof exports === 'object') {
		module.exports = markymark;
	} else {
		window.markymark = markymark;
	}
})();

//

function barf() {}
barf.BLOCK = function (url) {
	const script = document.currentScript || document.scripts[document.scripts
		.length - 1];
	const load = function (event) {
		// var index, index1;
		const wrapper = document.createElement(null);
		wrapper.innerHTML = this.responseText;
		const scripts = wrapper.getElementsByTagName("SCRIPT");
		for (let index = scripts.length - 1; index > -1; --index) {
			const old_script = scripts[index]
			const new_script = document.createElement("script")
			new_script.innerHTML = old_script.innerHTML;
			for (let index1 = old_script.attributes.length - 1; index1 >
				-1; --index1) {
				attribute = old_script.attributes[index1]
				new_script.setAttribute(attribute.name, attribute.value)
			}
			old_script.parentNode.replaceChild(new_script, old_script);
		}
		while (wrapper.firstChild) {
			script.parentNode.insertBefore(wrapper.removeChild(wrapper.firstChild)
				, script);
		}
		script.parentNode.removeChild(script)
		this.removeEventListener("error", error)
		this.removeEventListener("load", load)
	};
	const error = function (event) {
		this.removeEventListener("error", error)
		this.removeEventListener("load", load)
		alert("there was an error!");
	};
	const xhr = new XMLHttpRequest()
	xhr.addEventListener("error", error)
	xhr.addEventListener("load", load)
	xhr.open("GET", url, true)
	xhr.send();
};

//

barf.MD = function (url, id) {
	fetch(url).then(r => r.text())
		.then(data => markymark(data))
		.then(content => document.getElementById(id).innerHTML = content)
		.catch(e => console.log(e))
};

barf.HTML = function (url, id) {
	fetch(url).then(r => r.text())
	  .then(data => document.getElementById(id).innerHTML = data)
	  .catch(e => console.log(e))
};

barf.CSS = function (url) {
	const css = document.createElement("style");
	fetch(url).then(r => r.text())
		.then(data => css.textContent = data)
		.then(content => document.getElementsByTagName("head")[0].appendChild(css))
		.catch(e => console.log(e))
};

barf.JS = function (url) {
	const js = document.createElement("script");
	js.setAttribute('defer', '');
	fetch(url).then(r => r.text())
		.then(data => js.textContent = data)
		.then(content => document.getElementsByTagName("body")[0].appendChild(js))
		.catch(e => console.log(e))
};

function swapSrcAttributes(source) {
	return function (element) {
		element.setAttribute('src', element.getAttribute(source));
	}
}
function forEach(collection, partial) {
	for (let i = 0; i < collection.length; i++) {
		partial(collection[i]);
	}
}
function initDeferImages() {
	let deferImages = document.querySelectorAll('img[data-src]');
	deferImages = document.querySelectorAll('[data-src]');
	forEach(deferImages, swapSrcAttributes('data-src'));
}
window.onload = function () {
	initDeferImages();
};
