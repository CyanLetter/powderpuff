var pp;

window.onload = function() {
	pp = new Powderpuff({
		// no options yet
		debug: false,
		canvasSize: 1024
	});

	window.setTimeout(function() {
		pp.puff('wispTest');
	}, 1000);
}