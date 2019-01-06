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
