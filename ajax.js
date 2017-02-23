function loadPresentations() {
	$.post("http://cs.wellesley.edu/~cs304/homeworks/ruhlman-2014.php",
			showPresentations, "json");
}

var global_presentations;
function showPresentations(pres) {
	console.log(pres);
	global_presentations = pres;
	var i, len = pres.length;
	var presentations = $('<div>').addClass('presentations');
	for (i=0; i< len; i++) {
		var presentation = pres[i];
		var clone = $('#presentation-template > .presentation').clone();
		clone.find('.title').text(presentation.title);
		clone.find('.authors').text(presentation.presenterNames);
		clone.find('.location').text(presentation.location);
		clone.find('.time').text(presentation.start_time);
		clone.attr('pid', presentation.pid);
		console.log(clone);
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
	return global_presentations[0];
}

$("#success").dialog({
  autoOpen: false
 });

$("#pres-container").click(function(event) {
	var pid = $(event.target).closest("div.presentation").attr('pid');
	var pres = findPresentationWithPid(pid);
	$('#success').find('.title').text(pres.title);
	$('#success').find('.description').text(pres.description);
	$("#success").dialog("open");
});

loadPresentations();



