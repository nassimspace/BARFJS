barf.CSS = function (c) {
	var b = document.createElement("style");
	fetch(c)
		.then(function (a) {
			return a.text()
		})
		.then(function (a) {
			return b.textContent = a
		})
		.then(function (a) {
			return document.getElementsByTagName("head")[0].appendChild(b)
		})["catch"](function (a) {
			return console.log(a)
		})
};
