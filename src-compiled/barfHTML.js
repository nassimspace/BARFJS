barf.HTML = function (b, c) {
	fetch(b)
		.then(function (a) {
			return a.text()
		})
		.then(function (a) {
			return document.getElementById(c).innerHTML = a
		})["catch"](function (a) {
			return console.log(a)
		})
};
