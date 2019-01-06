barf.JS = function (url) {
	const js = document.createElement("script");
	js.setAttribute('defer', '');
	fetch(url).then(r => r.text())
		.then(data => js.textContent = data)
		.then(content => document.getElementsByTagName("body")[0].appendChild(js))
		.catch(e => console.log(e))
};
