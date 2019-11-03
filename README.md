![BARF.JS](https://www.svgrepo.com/show/271852/vomiting-emoji.svg)
# BARF.JS | 6kb VANILLA JS LIBRARY TO BUILD PERFORMANT SPA's & WEB APPS  

## THE WHY
I found myself re-using codes, functions & several js features on my personal learning projects and figured why not put them all together in a single script!

## FEATURES
This javascript library compiles some of the best open source contributions, js optimizations and snippets one may find useful:

 1. Functional / Declarative way to achieve complexe operations
 2. Using the Fetch API to load HTML, CSS, JS, JSON & Markdown
 3. Load iFrames & Images using IntersectionObserver
 4. Chain multiple events / inits on *window.onload*
 5. Get values from URL Parameters with a one-liner function
 6. Modern Vanilla Javascript | ES6 - ES5 - ClosureCompiled Versions


## SETUP
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

<style>
/* contents of main.css */

</style>

</head>
<body>

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
/* contains main.css */
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

### 6. Load JSON Files

Use **barf.JSON(URL);** to load json. The script will fetch the json file / endpoint, create  and insert its content into a ***script*** tag, with the proper mime-type, and inject at the end of the ***body*** tag:

```HTML
// index.html

<html>
<head>
..

<style>
/* contains main.css */
</style>
</head>
<body>
..
<div id="menu"></div>

<article id="post">

</article>

<script>barf.CSS("/css/main.css");</script>
<script>barf.HTML("/snippet/nav.html", "menu");</script>
<script>barf.HTML("/articles/post23.html", "post");</script>
<script>barf.JS("/js/main.js");</script>
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
### 7. Chaining Loads / Events / Inits on window.onload

Use **add2onload();** script to run several events on ***window.onload***:

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
  });

add2Onload(() => {

Promise.all([html, styles])
});

</script>

// all events handled by add2onload(); will run on window.onload  
```

### 8. Get values from URL Parameters

Use **barf.URL(param);** to get the values:
```
URL = https://example.com?item='album'&artist='favBand'

// barf.URL('item'); > will return the 'album' value
// barf.URL('artist'); > will return the 'favBand' value
```

### 9. Promises

Use [**Promise.all** or **Promise.allSettled()**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) :

```js
const loadEverything = [
   barf.CSS("/css/main.css"),
   barf.HTML("/snippet/nav.html", "menu"),
   barf.JS("/js/main.js"),
   barf.JSON("/data.json"),
   barf.URL('item'),
   barf.URL('artist')
 ];
Promise.allSettled(loadEverything);
```

## SPECIAL THANKS
 - [SVGREPO](https://www.svgrepo.com/) (Barf.JS Logo)
 - Open-Source
 - Community

## TO DO

- TEST, TEST, TEST
- Examples
- Export / Import functions as modules for leaner development
- Implement webpack / gulp / babel or any other builder - compiler
- Fix bugs

## NEXT LEVEL

 Using this library with a HTTP/2 Static Node Server & a Service Worker can provide you with a blazing fast web app and amazing user experience, without sacrificing the fun factor of development

## LICENSE

**MIT**
