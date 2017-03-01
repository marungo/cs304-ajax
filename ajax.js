/* 
Authors: MR Ngo and Jacki Hom
CS304: Hwk3
3/1/2017
*/

function loadPresentations() {
	$.post("https://cs.wellesley.edu/~cs304/homeworks/ruhlman-2014.php",
			showPresentations, "json");
}


// Templating function
var global_presentations;
function showPresentations(pres) {
	global_presentations = pres;
	var i, len = pres.length;
	var presentations = $('<div>').addClass('presentations');
	for (i = 0; i < len; i++) {
		// make a clone of the html template for each presentation
		var clone = $('#presentation-template > .presentation').clone();
		clone.find('.title').html(pres[i].title);
        //clone.find('.authors').html(pres[i].presenterNames);
		clone.find('.location').html(pres[i].location);
		clone.find('.time').html(pres[i].start_time);
		clone.find('.authors').html(getPresenters(pres[i].presenters)); // note: calls helper function
        		
		// make sure to add pid so that when div is clicked on,
		// modal is populated with that presentation's div
		clone.attr('pid', pres[i].pid);
		
		// add to big presentations class
		presentations.append(clone);
	}
	
	//finally, add to presentation container placed in ajax.html
	$('#pres-container').append(presentations);
}

// Helper method to help find which presentation we clicked on.
// This will be used to fill the modal with the correct description
function findPresentationWithPid(pid) {
	for (i=0; i<global_presentations.length;i++) {
		if ((global_presentations[i].pid) == (pid)) {
			return global_presentations[i];
		}
	}
	console.log("could not find presentation");
	return null;
}

// Helper method to collect presenter names
// This will be used to populate clone with neatly formatted presenter names
function getPresenters(presenters) {
    names ='';
    for (j = 0; j < presenters.length-1; j++) {
        names += presenters[j].display_name + ", "
    }
    names += presenters[presenters.length-1].display_name;
	return names;
}

// NOTE: Because of the css of the modal, it made more sense to keep the
// built in "exit strategy" - rather than clicking on the modal for it to disappear,
// this modal disappears when you click on anything BUT the modal.
$("#pres-container").click(function(event) {
	var pid = $(event.target).closest("div.presentation").attr('pid');
	var pres = findPresentationWithPid(pid);
	$('#dialog').find('.title').html(pres.title);
	$('#dialog').find('.descrip').html(pres.description);
	console.log($('#dialog'));
	$('#dialog').modal();
});


loadPresentations();



