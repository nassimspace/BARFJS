let contentDiv = document.getElementById('app');

let routes = {
  '/': home,
  '/index.html': home,
  '/setup': setup,
  '/lazyload': lazyload,
  '/discuss': discuss,
};

window.onpopstate = () => {
  contentDiv.innerHTML = routes[window.location.pathname];
}

let onNavItemClick = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  contentDiv.innerHTML = routes[pathName];
}

contentDiv.innerHTML = routes[window.location.pathname];
