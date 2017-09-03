window.onload = function() {
	pp = new Powderpuff({
		images: [
			"assets/images/beetle.jpg",
			"assets/images/title.png"
		]
	});
	pp.images[1].y = 340;

	document.getElementById("revealButton").onclick = pp.reveal;
}