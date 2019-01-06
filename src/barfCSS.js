barf.CSS = function (url) {
	const css = document.createElement("style");
	fetch(url).then(r => r.text())
		.then(data => css.textContent = data)
		.then(content => document.getElementsByTagName("head")[0].appendChild(css))
		.catch(e => console.log(e))
};
