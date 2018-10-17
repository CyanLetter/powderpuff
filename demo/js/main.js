var pp;

var ppController = function() {
	this.theme = "meteor";
	this.burst = function() {
		pp.puff('default', pp.themes[this.theme]);
	};
	this.mandela = function() {
		pp.puff('mandela', pp.themes[this.theme]);
	};
	this.flak = function() {
		pp.puff('flak', pp.themes[this.theme]);
	};
	this.ribbons = function() {
		pp.puff('ribbons', pp.themes[this.theme]);
	};
	this.radial = function() {
		pp.puff('radial', pp.themes[this.theme]);
	};
}

window.onload = function() {
	pp = new Powderpuff({
		// no options yet
		debug: false,
		canvasSize: 1024
	});

	var controller = new ppController();

	window.setTimeout(function() {
		// pp.puff('flak', pp.themes.bahamas);
		pp.puff('mandela', pp.themes.random);
	}, 1000);

	var gui = new dat.GUI();
		gui.add(controller, 'theme', [
			"meteor",
			"bahamas",
			"winter",
			"solar"
		]);
		gui.add(controller, 'mandela');
		gui.add(controller, 'burst');
		gui.add(controller, 'flak');
		gui.add(controller, 'ribbons');
		gui.add(controller, 'radial');
}