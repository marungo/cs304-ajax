/*
Authors: MR Ngo and Jacki Hom
 */

function loadPresentations() {
	$.post("http://cs.wellesley.edu/~cs304/homeworks/ruhlman-2014.php",
			showPresentations, "json");
}

var global_presentations;
function showPresentations(pres) {
	// console.log(pres);
	global_presentations = pres;
	var i, len = pres.length;
	var presentations = $('<div>').addClass('presentations');
	for (i=0; i< len; i++) {
		var presentation = pres[i];
		var clone = $('#presentation-template > .presentation').clone();
		clone.find('.title').html(presentation.title);
		clone.find('.authors').html(presentation.presenterNames);
		clone.find('.location').html(presentation.location);
		clone.find('.time').html(presentation.start_time);
		clone.attr('pid', presentation.pid);
		presentations.append(clone);
	}
	$('#pres-container').append(presentations);
}

function findPresentationWithPid(pid) {
	for (i=0; i<global_presentations.length;i++) {
		if ((global_presentations[i].pid) == (pid)) {
			return global_presentations[i];
		}
	}
	console.log("could not find presentation");
	return null;
}

$("#pres-container").click(function(event) {
	var pid = $(event.target).closest("div.presentation").attr('pid');
	var pres = findPresentationWithPid(pid);
	$('#dialog').find('.title').html(pres.title);
	$('#dialog').find('.descrip').html(pres.description);
	$('#dialog').find('.time').html(pres.start_time);
	console.log($('#dialog'));
	$('#dialog').modal();
});


loadPresentations();



