![BARF.JS](https://www.svgrepo.com/show/271852/vomiting-emoji.svg)
# BARF.JS | 6kb VANILLA JS LIBRARY TO BUILD PERFORMANT SPA's & WEB APPS  

## THE WHY
I found myself re-using codes, functions & several js features on my personal learning projects and figured why not put them all together in a single script!

## FEATURES
This javascript library compiles some of the best open source contributions, js optimizations and snippets one may find useful: 

 1. Functional / Declarative way to achieve complexe operations
 2. Using the Fetch API to load HTML, CSS, JS, JSON & Markdown
 3. Micro / Limited / Basic Markdown Parsing
 4. Load iFrames & Images using IntersectionObserver
 5. The SPA Engine: Combined [Rafael Pedicini's # Single Page Apps for GitHub Pages](https://github.com/rafrex/spa-github-pages) & [Bryan Manuele's](https://github.com/FermiDirak/fermidirak.github.io) [stunning way to structure your app routes & views](https://medium.com/@bryanmanuele/how-i-implemented-my-own-spa-routing-system-in-vanilla-js-49942e3c4573)
 6. Make EventListenerOptions {passive: true} by default from [Hector Zarco](https://github.com/zzarcon/default-passive-events)
 7. Chain multiple events / inits on *window.onload* 
 8. Get values from URL Parameters with a one-liner function
 9. Modern Vanilla Javascript | ES6 - ES5 - ClosureCompiled Versions
 

## SETUP FOR MULTI PAGE APPS
 1. Load **barf.js** library in the head of your root html document before any other css or js

```HTML
// index.html

<!DOCTYPE html5>
<html lang="en">
<head>
..
<script src="./js/barf.js"></script>
..
</head>
```
 
 2. You're done!

 ## SETUP FOR SINGLE PAGE APPS
 
 1. Load barf.js library in the head of your root html document & include another ```receiveRedirect()``` script right after it 

```HTML
// index.html

<!DOCTYPE html5>
<html lang="en">
<head>
..
<script src="./js/barf.js"></script>
<script>recieveRedirect()</script>
..
</head>
```
*In order to take fully advantage of **barf.js**'s features, you'd need to load those 2 scripts before any other css or js*
 
 2. Assign your content (view) area to the ***appView*** variable:
 
 ```HTML
// index.html

<!DOCTYPE html5>
<html lang="en">
<head>
..
<script src="./js/barf.js"></script>
<script>recieveRedirect()</script>
<script>
let appView = document.getElementById('view');
</script>
..
</head>
<body>
<header>
<nav>
..
</nav>
</header>

<main id="view"></main>

<footer>
..
</footer>
</body>
</html>
```
 3. Assign your routes & templates to the ***routes*** variable: 
 ```HTML
// index.html

<!DOCTYPE html5>
<html lang="en">
<head>
..
<script src="./js/barf.js"></script>
<script>recieveRedirect()</script>
<script>
let appView = document.getElementById('view');
let routes = {
  '/': homepage,
  '/index.html': homepage,
  '/portfolio': portfolio,
  '/work': work,
  '/contact': contact,
};
</script>
..
</head>
<body>
<header>
<nav>
..
</nav>
</header>
<main id="view"></main>
<footer>
..
</footer>
</body>
</html>
``` 
4. Build you templates in js files (each route's corresponding template page): 
```javascript
// ./templates/contact.js

let contact = `
  <section class="contact">
    There are risks and costs to action.
    But they are far less than the long
    range risks of comfortable inaction.

    <br/>

    <i>-John F. Kennedy</i>

    <br/>
    <br/>

    Let's get in touch

    <br/>
    <br/>

    <div class="button-holder">
      <button class="content-button"><a href="./resume.pdf">Résumé</a></button>
      <button class="content-button"><a href="mailto:wateverEmail@email.com">Email</a></button>
      <button class="content-button"><a href="https://www.linkedin.com/in/wateverProfile">Linkedin</a></button>
    </div>

  </section>

`;
``` 
5. Load your templates in your html: 

 ```HTML
// index.html

<!DOCTYPE html5>
<html lang="en">
<head>
..
<script src="./js/barf.js"></script>
<script>recieveRedirect()</script>
<script>
let appView = document.getElementById('view');
let routes = {
  '/': homepage,
  '/index.html': homepage,
  '/portfolio': portfolio,
  '/work': work,
  '/contact': contact,
};
</script>
..
</head>
<body>
<header>
<nav>
..
</nav>
</header>

<main id="view"></main>

<footer>
..
</footer>
<script>
    const templates = [
        barf.js("./templates/homepage.js"),
        barf.js("./templates/contact.js")
      ];
      Promise.all([templates])
</script>
</body>
</html>
```
 6. Setup dynamic routing with the ***navRoute*** *onclick* function on your navigation items: 
  ```HTML
// index.html

<!DOCTYPE html5>
<html lang="en">
<head>
..
<script src="./js/barf.js"></script>
<script>recieveRedirect()</script>
<script>
let appView = document.getElementById('view');
let routes = {
  '/': homepage,
  '/index.html': homepage,
  '/portfolio': portfolio,
  '/work': work,
  '/contact': contact,
};
</script>
..
</head>
<body>
<header>

<nav>  
<ul class="navbar-list">
<li class="navbar-item"><a href="[#]" onclick="navRoute('/'); return false;">Home</a></li>
<li class="navbar-item"><a href="[#]" onclick="navRoute('/contact'); return false;">Contact</a></li>
</ul>
</nav>

</header>

<main id="view"></main>

<footer>
..
</footer>
<script>
    const templates = [
        barf.js("./templates/homepage.js"),
        barf.js("./templates/contact.js")
      ];
      Promise.all([templates])
</script>
</body>
</html>
```
7. You're done!

**Please note that this method is indeed very opinionated, but also very declarative / easy to use at the same time. It doesn't require complexe javascript *savvyness* to achieve performance driven development and thus, making it beginner friendly** 


## HOW TO USE

### 1. Lazyload Images & iFrames

Lazy Load Elements using ***data-lazy='1'*** custom attribute and set the link to ***data-src***, leaving ***src*** empty: 

```HTML
// index.html

<img src="" data-src="url_to_image.png" data-lazy='1'>
<iframe src="" data-src="https://www.youtube.com/watch?v=efs3QRr8LWw" data-lazy='1'></iframe>
```
### 2. Load HTML in specific element

Use **barf.HTML(URL, ID);** to load html snippet within a specific element: 
```HTML
// index.html

<div id="content"></div>

<script>barf.HTML("/post/article1.html", "content");</script>
```
You can use **Promise.all** to load several html snippets in their respective  elements: 
```HTML
// index.html

<div id="nav"></div>
<div id="header"></div>
<div id="main"></div>
<div id="footer"></div>

<script>
const snippets = [
barf.HTML("/templates/nav.html", "nav"),
barf.HTML("/templates/footer.html", "footer"),
barf.HTML("/page/header.html", "header"),
barf.HTML("/post/article1.html", "main")
]
Promise.all([snippets]);
</script>
```
### 3. Load HTML within current script location

Use **barf.CP(URL);** to load html snippet / component in the same location as the script tag. Note that this function uses XHR insted of Fetch. Also, if you are loading CSS or JS that way, it"s best to inline them within style / script tags and save your file as html: 
```html
<script>barf.CP("./components/jsModal.html");</script>

// in jsModal.html 

<script>whatever code that generates a modal window</script>
``` 

OR
```HTML
// index.html

<div id="menu">

<script>barf.CP("/components/navigation.html");</script>
// '/components/navigation.html' file content will be inserted here and replace the barf.CP script tag

</div>

<div id="content"></div>

<script>barf.HTML("/post/article1.html", "content");</script>
```

### 4. Load CSS 

Use **barf.CSS(URL);** to load css files. The script will fetch the css file, create  and insert its content into a ***style*** tag injected at the end of the ***head*** tag: 

```HTML
// index.html

<html>
<head>
..


<style>
// contains main.css
</style>
</head>
<body>
..
<script>barf.CSS("/css/main.css");</script>
<script>barf.HTML("/post/article1.html", "content");</script>
</body>
</html>
```

### 5. Load JS 

Use **barf.JS(URL);** to load js files. The script will fetch the js file, create  and insert its content into a ***script*** tag injected at the end of the ***body*** tag: 


```HTML
// index.html

<html>
<head>
..

<style>
// contains main.css
</style>
</head>
<body>
..
<div id="menu"></div>


<script>barf.CSS("/css/main.css");</script>
<script>barf.HTML("/snippet/nav.html", "menu");</script>
<script>barf.JS("/js/main.js");</script>

<script>
// will contain main.js 
</script>
</body>
</html>
```
### 6. Load Markdown Files 

Use **barf.MD(URL, ID);** to load js files. The script will fetch the md file, create  and insert its rendered content into the stated ***ID*** : 

```HTML
// index.html

<html>
<head>
..

<style>
// contains main.css
</style>
</head>
<body>
..
<div id="menu"></div>

<article id="post">
// will contain rendered content from ./posts/awesomeStuff.md
</article>

<script>barf.CSS("/css/main.css");</script>
<script>barf.HTML("/snippet/nav.html", "menu");</script>
<script>barf.JS("/js/main.js");</script>
<script>barf.MD("/posts/awesomeStuff.md", "post");</script>
<script>
// will contain main.js 
</script>
</body>
</html>
```

### 7. Load JSON Files 

Use **barf.JSON(URL);** to load json. The script will fetch the json file / endpoint, create  and insert its content into a ***script*** tag, with the proper mime-type, and inject at the end of the ***body*** tag: 

```HTML
// index.html

<html>
<head>
..

<style>
// contains main.css
</style>
</head>
<body>
..
<div id="menu"></div>

<article id="post">
// will contain rendered content from ./posts/awesomeStuff.md
</article>

<script>barf.CSS("/css/main.css");</script>
<script>barf.HTML("/snippet/nav.html", "menu");</script>
<script>barf.JS("/js/main.js");</script>
<script>barf.MD("/posts/awesomeStuff.md", "post");</script>
<script>barf.JSON("/data.json");</script>

<script>
// will contain main.js 
</script>
<script type="application/json">
// will contain data.json content 
</script>
</body>
</html>
```
### 8. Chaining Loads / Events / Inits on window.onload

Use **add2onload();** script to run several events on *window.onload*:

```html
<script>
    const html = [
        barf.HTML("./nav.html", "nav"),
        barf.HTML("./footer.html", "footer")
      ];
      const styles = [
        barf.CSS("/css/main.css")
      ];
add2Onload(() => {
    document.getElementById('player').style.visibility = 'visible');
add2Onload(Promise.all([html]));
add2Onload(Promise.all([styles]));
// all events handled by add2onload(); will run on window.onload  
</script>
``` 

### 9. Get values from URL Parameters

Use **barf.URL(param);** to get the values:
```
URL = https://example.com?item='album'&artist='favBand'

// barf.URL('item'); > will return the 'album' value
// barf.URL('artist'); > will return the 'favBand' value
```

### 10. Promises

Use [**Promise.all** or **Promise.allSettled()**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) : 

```js
const loadEverything = [
   barf.CSS("/css/main.css"),
   barf.HTML("/snippet/nav.html", "menu"),
   barf.JS("/js/main.js"),
   barf.MD("/posts/awesomeStuff.md", "post"),
   barf.JSON("/data.json"),
   barf.URL('item'),
   barf.URL('artist')
 ];
Promise.allSettled(loadEverything);
```

## SPECIAL THANKS
 - [Rafael Pedicini](https://github.com/rafrex) 
 - [Bryan Manuele's](https://github.com/FermiDirak)
 - [Hector Zarco](https://github.com/zzarcon)
 - [SVGREPO](https://www.svgrepo.com/) (Barf.JS Logo)
 - Open-Source 
 - Community

## TO DO

- Export / Import functions as modules for leaner development
- Implement webpack / gulp / babel or any other builder - compiler
- Fix bugs

## NEXT LEVEL

 Using this library with a HTTP/2 Static Node Server & a Service Worker can provide you with a blazing fast web app and amazing user experience, without sacrificing the fun factor of development

## LICENSE

**MIT**
