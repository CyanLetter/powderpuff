var pp;

window.onload = function() {
	pp = new Powderpuff({
		// no options yet
		debug: true
	});

	window.setTimeout(function() {
		pp.puff('test');
	}, 1000);
}