let ToggleSidebar = (event) => {
	let elem = event.target;
	let children = [].slice.call(elem.children);
	children.forEach(function (value) {
		value.classList.toggle("toggle");
	});
	document.getElementById("sidebar").classList.toggle("toggle-sidebar");
	document.getElementById("main-container").classList.toggle("toggle-main-container");
	
};

export {ToggleSidebar};