window.onload = function() {
	pp = new Powderpuff("assets/images/beetle.jpg");

	document.getElementById("revealButton").onclick = pp.reveal;
}