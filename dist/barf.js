
let barf = async () => await {};

let add2Onload = func => {
  let oldonload = window.onload;

  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = () => {
      if (oldonload) {
        oldonload();
      }

      func();
    };
  }
};

add2Onload(() => {
  let lazyElems = [].slice.call(document.querySelectorAll("[data-lazy='1']"));

  if ("IntersectionObserver" in window) {
    let elemObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.src.length == 0) {
          entry.target.src = entry.target.dataset.src;
          elemObserver.unobserve(entry.target);
        }
      });
    });
    lazyElems.forEach(elem => {
      elemObserver.observe(elem);
    });
  } else {
    for (let i = 0; i < lazyElems.length; i++) {
      if (lazyElems[i].getAttribute('data-src')) {
        lazyElems[i].setAttribute('src', lazyElems[i].getAttribute('data-src'));
      }
    }
  }
});

barf = {
  URL: item => {
    let svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
    return svalue ? svalue[1] : svalue;
  }
};

barf.CP = l => {
  let d = document.currentScript || document.scripts[document.scripts.length - 1],
      k = function (b) {
    b = document.createElement(null);
    b.innerHTML = this.responseText;

    for (let a = b.getElementsByTagName("SCRIPT"), e = a.length - 1; -1 < e; --e) {
      const c = a[e],
            f = document.createElement("script");
      f.innerHTML = c.innerHTML;

      for (let g = c.attributes.length - 1; -1 < g; --g) attribute = c.attributes[g], f.setAttribute(attribute.name, attribute.value);

      c.parentNode.replaceChild(f, c);
    }

    for (; b.firstChild;) d.parentNode.insertBefore(b.removeChild(b.firstChild), d);

    d.parentNode.removeChild(d);
    this.removeEventListener("error", h);
    this.removeEventListener("load", k);
  },
      h = function (a) {
    this.removeEventListener("error", h);
    this.removeEventListener("load", k);
    alert("there was an error!");
  },
      a = new XMLHttpRequest();

  a.addEventListener("error", h);
  a.addEventListener("load", k);
  a.open("GET", l, true);
  a.send();
};



barf.HTML = (url, id) => {
  const resHTML = fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "force-cache"
  }).then(r => r.text()).then(data => document.getElementById(id).innerHTML = data).catch(e => console.log(e));
  return resHTML;
};

barf.CSS = url => {
  const css = document.createElement("style");
  const resCSS = fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "force-cache"
  }).then(r => r.text()).then(data => css.textContent = data).then(content => document.getElementsByTagName("head")[0].appendChild(css)).catch(e => console.log(e));
  return resCSS;
};

barf.JS = url => {
  const js = document.createElement("script");
  const resJS = fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "force-cache"
  }).then(r => r.text()).then(data => js.textContent = data).then(content => document.getElementsByTagName("body")[0].appendChild(js)).catch(e => console.log(e));
  return resJS;
};

barf.MD = (url, id) => {
  barf.js('https://raw.githubusercontent.com/markedjs/marked/master/lib/marked.js')
  const resMD = fetch(url)
  .then(r => r.text())
  .then(data => marked(data);)
  .then(content => document.getElementById(id).innerHTML = content)
  .catch(e => console.log(e));
};

barf.JSON = url => {
  const json = document.createElement("script");
  json.type = "application/json";
  const resJSON = fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "force-cache"
  }).then(r => r.json()).then(data => json.textContent = data).then(content => document.getElementsByTagName("body")[0].appendChild(js)).catch(e => console.log(e));
  return resJSON;
};
