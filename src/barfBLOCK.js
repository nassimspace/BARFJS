function barf() {}
barf.BLOCK = function (url) {
	const script = document.currentScript || document.scripts[document.scripts
		.length - 1];
	const load = function (event) {
		// var index, index1;
		const wrapper = document.createElement(null);
		wrapper.innerHTML = this.responseText;
		const scripts = wrapper.getElementsByTagName("SCRIPT");
		for (let index = scripts.length - 1; index > -1; --index) {
			const old_script = scripts[index]
			const new_script = document.createElement("script")
			new_script.innerHTML = old_script.innerHTML;
			for (let index1 = old_script.attributes.length - 1; index1 >
				-1; --index1) {
				attribute = old_script.attributes[index1]
				new_script.setAttribute(attribute.name, attribute.value)
			}
			old_script.parentNode.replaceChild(new_script, old_script);
		}
		while (wrapper.firstChild) {
			script.parentNode.insertBefore(wrapper.removeChild(wrapper.firstChild)
				, script);
		}
		script.parentNode.removeChild(script)
		this.removeEventListener("error", error)
		this.removeEventListener("load", load)
	};
	const error = function (event) {
		this.removeEventListener("error", error)
		this.removeEventListener("load", load)
		alert("there was an error!");
	};
	const xhr = new XMLHttpRequest()
	xhr.addEventListener("error", error)
	xhr.addEventListener("load", load)
	xhr.open("GET", url, true)
	xhr.send();
};
