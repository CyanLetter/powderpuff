window.onload = function() {
	pp = new Powderpuff({
		images: [
			"assets/images/beetle.jpg",
			"assets/images/title.png"
		]
	});
	pp.images[0].scaleMode = "cover";
	pp.images[1].scaleMode = "contain";
	pp.images[1].anchor.y = 1;

	window.setTimeout(pp.reveal, 1000);
}