// barf.CSS("./styles/urlOfCssFile.css");
// Loads CSS file, creates a style element in the HEAD, and shoot CSS file content within the style element

barf.CSS = (url) => {
	const css = document.createElement("style");
	const resCSS = fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "force-cache"
		})
		.then(r => r.text())
		.then(data => css.textContent = data)
		.then(content => document.getElementsByTagName("head")[0].appendChild(css))
		.catch(e => console.log(e));
	return resCSS;
};
