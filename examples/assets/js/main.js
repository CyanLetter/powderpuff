var pp;

window.onload = function() {
	pp = new Powderpuff({
		// no options yet
		debug: false,
		canvasSize: 1024
	});

	window.setTimeout(function() {
		pp.puff('ribbons', pp.themes.winter);
	}, 1000);
}