var pp;

window.onload = function() {
	pp = new Powderpuff({
		// no options yet
		debug: false,
		canvasSize: 1024
	});

	window.setTimeout(function() {
		// pp.puff('flak', pp.themes.bahamas);
		pp.puff('mandela', pp.themes.winter);
	}, 1000);
}