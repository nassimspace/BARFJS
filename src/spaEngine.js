// Single Page Apps for GitHub Pages
// https://github.com/rafrex/spa-github-pages
// Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
// MAKE SURE YOU INCLUDE <script>recieveRedirect()</script> RIGHT AFTER LOADING BARF.JS IN YOUR HTML

let redirect404 = () => {
  var segmentCount = 0;
  var location = window.location;
  location.replace(
    location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') +
    location.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
    location.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
    (location.search ? '&q=' + location.search.slice(1).replace(/&/g, '~and~') : '') +
    location.hash
  );
}

let recieveRedirect = () => {
  (function(location) {
    if (location.search) {
      var q = {};
      location.search.slice(1).split('&').forEach(function(v) {
        var a = v.split('=');
        q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
      });
      if (q.p !== undefined) {
        window.history.replaceState(null, null,
          location.pathname.slice(0, -1) + (q.p || '') +
          (q.q ? ('?' + q.q) : '') +
          location.hash
        );
      }
    }
  }(window.location));
}

// Associate Routes & Pages to URLs by Bryan Manuele > https://github.com/FermiDirak/fermidirak.github.io
// In order to navigate to different views/pages, you'll need an 'onclick' event handled by navRoute

// <nav class="navbar">
//  <ul class="navbar-list">
//    <li class="navbar-item"><a href="#" onclick="navRoute('/portfolio'); return false;">Portfolio</a></li>
//    <li class="navbar-item"><a href="#" onclick="navRoute('/work'); return false;">Work</a></li>
//    <li class="navbar-item"><a href="#" onclick="navRoute('/contact'); return false;">Contact</a></li>
//  </ul>
// </nav>

let appView = undefined;
let routes = undefined;

window.onpopstate = () => {
  appView.innerHTML = routes[window.location.pathname];
}

let navRoute = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  appView.innerHTML = routes[pathName];
}

appView.innerHTML = routes[window.location.pathname];
