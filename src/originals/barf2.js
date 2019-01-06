
    // Simple JavaScript Templating
    // John Resig - https://johnresig.com/ - MIT Licensed
    (function(){
      var cache = {};
      this.tmpl = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
          cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :
          // Generate a reusable function that will serve as a template
          // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
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
              .split("\r").join("\\'")
          + "');}return p.join('');");
        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
      };
    })();

//

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
        },
        refresh: function (listeners) {
          listeners.forEach(function (fn) { fn(); });
        }
      };
      // Defines a route:
      function route (path, templateId, controller) {
        if (typeof templateId === 'function') {
          controller = templateId;
          templateId = null;
        }
        var listeners = [];
        Object.defineProperty(controller.prototype, '$on', {value: ctx.on});
        Object.defineProperty(controller.prototype, '$refresh', {value: ctx.refresh.bind(undefined, listeners)});
        routes[path] = {templateId: templateId, controller: controller, onRefresh: listeners.push.bind(listeners)};
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
      function router () {
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

function HTMLImporter() {}

HTMLImporter.ita = function(url) {

  var script = document.currentScript || document.scripts[document.scripts.length - 1];

  var load = function(event) {

  //  var index, index1;

    var wrapper = document.createElement("div");
    wrapper.innerHTML = this.responseText;

    var scripts = wrapper.getElementsByTagName("SCRIPT");

    for (var index = scripts.length - 1; index > -1; -- index) {

      var old_script = scripts[index];

      var new_script = document.createElement("script");
      new_script.innerHTML = old_script.innerHTML;

      for (var index1 = old_script.attributes.length - 1; index1 > -1; -- index1) {

        attribute = old_script.attributes[index1];
        new_script.setAttribute(attribute.name, attribute.value);

      }

      old_script.parentNode.replaceChild(new_script, old_script);

    }

    while(wrapper.firstChild) {

      script.parentNode.insertBefore(wrapper.removeChild(wrapper.firstChild), script);

    }

    script.parentNode.removeChild(script);

    this.removeEventListener("error", error);
    this.removeEventListener("load", load);

  };

  var error = function(event) {

    this.removeEventListener("error", error);
    this.removeEventListener("load", load);

    alert("there was an error!");

  };

  var xhr = new XMLHttpRequest();
  xhr.addEventListener("error", error);
  xhr.addEventListener("load", load);
  xhr.open("GET", url, true);
  xhr.send();

};

function barf.HTML(url, id) {
var req = new XMLHttpRequest();
req.onload = function() {
    document.getElementById(id).innerHTML = this.responseText;
}
req.open("get", url, true);
req.send();
};
