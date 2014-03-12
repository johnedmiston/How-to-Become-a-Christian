function check() {
	window.plugin.email.isServiceAvailable(
		function (isAvailable) {
			alert(isAvailable ? 'Service is available' : 'Service NOT available');
		}
	);
}