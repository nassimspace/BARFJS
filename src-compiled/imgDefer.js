function swapSrcAttributes(a) {
	return function (b) {
		b.setAttribute("src", b.getAttribute(a))
	}
}
function forEach(a, b) {
	for (var c = 0; c < a.length; c++) b(a[c])
}
function initDeferImages() {
	document.querySelectorAll("img[data-src]");
	var a = document.querySelectorAll("[data-src]");
	forEach(a, swapSrcAttributes("data-src"))
}
window.onload = function () {
	initDeferImages()
};
