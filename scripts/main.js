import {GregorianToHijri, FormatHijriDate} from './date.js';
import {TraceNodes} from './localize.js';
import {ToggleSidebar} from './sidebar.js';

function getDate () {
	var date = new Date();
	var hDate = GregorianToHijri(date);
	var result = FormatHijriDate(hDate);
	document.getElementById('time').innerHTML = result;
}

function localizeNumbers() {
	TraceNodes(document);
}

function events() {
	document.getElementById('sidebar-toggle').addEventListener("click", ToggleSidebar);
}
 

(function(){
	getDate();
	localizeNumbers();
	events();
}())
