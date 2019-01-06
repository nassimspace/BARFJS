function swapSrcAttributes(source) {
	return function (element) {
		element.setAttribute('src', element.getAttribute(source));
	}
}
function forEach(collection, partial) {
	for (let i = 0; i < collection.length; i++) {
		partial(collection[i]);
	}
}
function initDeferImages() {
	let deferImages = document.querySelectorAll('img[data-src]');
	deferImages = document.querySelectorAll('[data-src]');
	forEach(deferImages, swapSrcAttributes('data-src'));
}
window.onload = function () {
	initDeferImages();
};
