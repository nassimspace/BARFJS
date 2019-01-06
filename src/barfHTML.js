barf.HTML = function (url, id) {
	fetch(url).then(r => r.text())
	  .then(data => document.getElementById(id).innerHTML = data)
	  .catch(e => console.log(e))
};
