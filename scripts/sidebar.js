let ToggleSidebar = (event) => {
	let elem = document.getElementById('sidebar-toggle');
	let children = [].slice.call(elem.children);
	children.forEach(function (value) {
		value.classList.toggle("toggle");
	});
	document.getElementById("sidebar").classList.toggle("toggle-sidebar");
	document.getElementById("header-logo").classList.toggle("toggle-togglebar");
	document.getElementById("main-container").classList.toggle("toggle-main-container");
	
};

export {ToggleSidebar};