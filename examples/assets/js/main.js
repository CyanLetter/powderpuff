window.onload = function() {
	pp = new Powderpuff({
		images: [
			"assets/images/beetle.jpg",
			"assets/images/title.png"
		]
	});
	pp.images[1].y = 340;

	window.setTimeout(pp.reveal, 1000);
}