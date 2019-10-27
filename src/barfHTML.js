// barf.HTML("./components/post.html", "article");
// Loads HTML file and shoots it in Element ID (example: <div id="article></div>") of your choice

barf.HTML = (url, id) => {
	const resHTML = fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "force-cache"
		})
		.then(r => r.text())
		.then(data => document.getElementById(id).innerHTML = data)
		.catch(e => console.log(e));
	return resHTML;
};
