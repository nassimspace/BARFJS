// barf.JS("./js/jquery.min.js");
// Loads JS file, creates a script tag at end of BODY, and shoots the JS file content within the element

barf.JS = (url) => {
	const js = document.createElement("script");
	const resJS = fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "force-cache"
		})
		.then(r => r.text())
		.then(data => js.textContent = data)
		.then(content => document.getElementsByTagName("body")[0].appendChild(js))
		.catch(e => console.log(e));
	return resJS;
};
