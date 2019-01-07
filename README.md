# BARF.JS | Barebones Async Resource Fetcher JS Library

> *God, I gotta work on that acronym..*
>**Tony Stark - Captain America Civil War**

---

## What This Library Does

1. #### Load HTML Snippets Async

Snippets are inserted in specified ```element``` using the Fetch API & a one line script tag.

**example**:

```html
<script>barf.HTML('path/to/your/html/file.html', 'elementID');</script>
```
2. #### Load JS files Async

Loaded JS files have a ```defer``` attribute assigned and are inserted at the end of  ```body``` using the Fetch API & a one line script tag.

**example**:

```html
<script>barf.JS('path/to/your/html/jsFile.js');</script>
```

3. #### Load CSS files Async

Loaded CSS files (within ```style``` tags) are inserted at the end of ```head``` using the Fetch API & a one line script tag.

**example**:

```html
<script>barf.CSS('path/to/your/html/cssFile.css');</script>
```

4. #### Load HTML Components Async

Loaded HTML files are inserted at the same place the script tag is, making it useful for Shell Architecture and / or HTML Snippets where ```style``` and ```script``` tags are inlined. Furthermore, this is also useful in case of a multi-page web app. It uses XHR & a one line script tag.

**example**:

```html
<script>barf.BLOCK('path/to/your/html/htmlComponent.html');</script>
```

##### Example of index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src=./barf.js></script>
</head>
<body>
<nav id="navigation">

</nav>
  <script>barf.HTML('./menu.html', 'navigation')</script>
  <script>barf.BLOCK('./header.html')</script>
  <script>barf.BLOCK('./article.html')</script>
  <script>barf.BLOCK('./share-comment-component.html')</script>
  <script>barf.BLOCK('./footer.html')</script>
  <script>barf.JS('./JQuery.js')</script>
  <script>barf.CSS('./myCSSLibrary.css')</script>
</body>
</html>
```

5. #### [John Resig Micro Templating Engine](https://johnresig.com/blog/javascript-micro-templating/) Included

You will be able to build Single Page applications and/or declare html templates within the ```head``` tag to render data in them

**example**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src=src-compiled/barf.js></script>

<script type="text/html" id="home">

<h1>Home With Article</h1>
<br/>
<article style="display: auto;margin-left: auto;margin-right: auto;width: 95%" id="post"></article>
<br/>

<%= article %>

</script>


<script type="text/html" id="template1">

<h1>Page 2: <%= greeting %> </h1>
<div id="view"></div>
<div id="resources"></div>

<%= html %>
<%= jsLib %>
<%= fontLib %>
<%= cssLib %>

</script>


<script type="text/html" id="template2">

<h1>Page 3: <%= heading %></h1>
<br/>
<article style="display: auto;margin-left: auto;margin-right: auto;width: 95%" id="post"></article>
<br/>

<%= article %>

</script>


<script type="text/html" id="template3">

<h1>Page 4: <%= heading %></h1>

<div id="layout"></div>
<div id="layout2"></div>
<%= layout %>
<%= layout2 %>

</script>

</head>

<body>
  <ul>
  <li><a href="#">Home</a></li>
  <li><a href="#/page2">Page 2</a></li>
  <li><a href="#/page3">Page 3</a></li>
  <li><a href="#/page4">Page 4</a></li>
</ul>

<div id="app"></div>

<script>
  route('/', 'home', function () {
    this.article = barf.HTML("https://example.com/article1.html", "post");
  });
  route('/page2', 'template1', function () {
    this.greeting = 'This is Page 2 Where we will load some BLOCKS & SCRIPTS';
    this.jsLib = barf.JS('./mdl.js', 'resources');
    this.fontLib = barf.CSS('https://fonts.googleapis.com/icon?family=Material+Icons', 'resources');
    this.cssLib = barf.CSS('./mdl.css', 'resources');
    this.html = barf.HTML('./mdl.html', 'view');
  });
  route('/page3', 'template2', function () {
    this.heading = 'I\'m page 3!';
    this.article = barf.MD('https://example.com/article2.html', 'post')

  });
  route('/page4', 'template3', function () {
    this.heading = 'I\'m page #4!';
    this.layout = barf.HTML('./layout.html', 'layout');
    this.layout2 = barf.HTML('./mdl.html', 'layout2');
  });
</script>

</body>
</html>
```

6. #### [Joakim Carlstein's Micro Router Included](https://gist.github.com/joakimbeng/7918297/278619bd5ba9b4768eecb0020b09a43f2e8eacea)
A Javascript Router for dynamic pages, useful if you want to build a Single Page App.

7. ### Defer Image Loading
By inserting a ```data-src``` attribute to your image tags, images will load from the ```data-src``` link and swap them with the ```src``` attribute on ```window.onload```.

**example**:

```html
<img src="" data-src="https://example.com/image.jpg" alt="the image in data-src will be injested into src once the document finishes loading" lazyload>
```

8. #### 1.28 Kb (minified & gzipped)
---
### **To Consider**

1. An element with an ```app```  ID for the views:

**example**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src=./barf.js></script>
  <script type="text/html" id="home">

<h1>Home With Markdown Article Loaded From Github</h1>
<br/>
<article style="display: auto;margin-left: auto;margin-right: auto;width: 95%" id="post"></article>
<br/>

<%= article %>

</script>


<script type="text/html" id="template1">

<h1>Page 2: <%= greeting %> </h1>
<div id="view"></div>
<div id="resources"></div>

<%= html %>
<%= jsLib %>
<%= fontLib %>
<%= cssLib %>

</script>

</head>
<body>
<nav>
<script>barf.BLOCK('menu.html');</script>
</nav>

<div id="app">
// All the Router / Templates / Dynamic Pages will be loaded here
</div>

<script>barf.BLOCK('footer.html');</script>
<script>
  route('/', 'home', function () {
    this.article = barf.HTML("https://example.com/article1.html", "post");
  });
  route('/page2', 'template1', function () {
    this.greeting = 'This is Page 2 Where we will load some BLOCKS & SCRIPTS';
    this.jsLib = barf.JS('./mdl.js', 'resources');
    this.fontLib = barf.CSS('https://fonts.googleapis.com/icon?family=Material+Icons', 'resources');
    this.cssLib = barf.CSS('./mdl.css', 'resources');
    this.html = barf.HTML('./mdl.html', 'view');
  });
</script>
</body>
</html>
```

2. You can use all the functions if you are building a multi-page web app, ```barf.BLOCK``` & ```img``` deferring **WILL NOT*** work under SPA (Templates in ```head``` rendered in ```app``` ID).

---
#### Built this library to learn and have fun. Also to allow a very easy and  declarative way to build fast web apps.
---
### Licensed under **MIT**
---

>*Go break some eggs!*
>**Tony Stark - Captain America Civil War**
