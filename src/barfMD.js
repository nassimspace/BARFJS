barf.MD = function (url, id) {
	fetch(url).then(r => r.text())
		.then(data => markymark(data))
		.then(content => document.getElementById(id).innerHTML = content)
		.catch(e => console.log(e))
};
