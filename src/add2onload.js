// Global Function to add functions or events to window.onload (run several async events on window.onload)


let add2Onload = (func) => {
	let oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = () => {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
};
