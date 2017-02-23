function loadPresentations() {
	$.post("http://cs.wellesley.edu/~cs304/homeworks/ruhlman-2014.php",
			showPresentations, "json");
}

// var global_presentations;
function showPresentations(pres) {
	console.log(pres);
	// global_presentations = pres;
	var i, len = pres.length;
	var presentations = $('<div>').addClass('presentations');
	for (i=0; i< len; i++) {
		var presentation = pres[i];
		var clone = $('#presentation-template > .presentation').clone();
		clone.find('.title').text(presentation.title);
		clone.find('.authors').text(presentation.presenterNames);
		clone.find('.location').text(presentation.location);
		clone.find('.time').text(presentation.start_time);
		console.log(clone);
		presentations.append(clone);
	}
	$('#pres-container').append(presentations);
}

loadPresentations();