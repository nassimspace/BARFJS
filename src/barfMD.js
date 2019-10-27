// barf.MD(); Loads Markdown file & renders it within Element ID (preferably within article tag with an ID for SEO)
// EXAMPLE= barf.MD("https://raw.github.com/username/repo/my-awesome-post.md", "post");
// in HTML= <article id="post">MARKDOWN FILE WILL BE LOADED & RENDERED HERE</article>

barf.MD = (url, id) => {
	const resMD = fetch(url)
		.then(r => r.text())
		.then(data => bmp(data))
		.then(content => document.getElementById(id).innerHTML = content)
		.catch(e => console.log(e))
};
