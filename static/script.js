(function (d, w, c) {
	var statusFilename = d.getElementById('status-filename'),
		statusFilenameSpan = statusFilename.querySelector('span'),
		statusReload = d.getElementById('status-reload'),
		buttons = d.querySelectorAll('button[data-cmd]');
	
	statusReload.onclick = function () {
		var http = new XMLHttpRequest();
		
		http.open('GET', '/info.html', true);
		http.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				var dataArray = this.response.match(/&laquo; (.*?) &raquo;/);
				
				if (dataArray && dataArray[1]) {
					dataArray = dataArray[1].split(' &bull; ');
					
					statusFilenameSpan.classList.remove('marquee');
					
					if (dataArray[1] == '') {
						statusFilenameSpan.innerHTML = 'No file opened';
					}
					else {
						statusFilenameSpan.innerHTML = dataArray[1];
						
						if (statusFilenameSpan.offsetWidth > statusFilename.offsetWidth) {
							statusFilenameSpan.classList.add('marquee');
						}
					}
				}
			}
		};
		http.onerror = function () {
			statusFilenameSpan.innerHTML = 'MPC not running';
			statusFilenameSpan.classList.remove('marquee');
		};
		http.send();
	};
	statusReload.click();
	
	Array.prototype.forEach.call(buttons, function (item, index) {
		item.onclick = function () {
			var http = new XMLHttpRequest(),
				cmd = item.getAttribute('data-cmd');
			
			http.open('POST', c.action, true);
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			http.onload = function () {
				if (this.status >= 200 && this.status < 400) {
					if (item.classList.contains('reload')) {
						statusReload.click();
					}
				}
			};
			http.send('null=0&wm_command=' + cmd);
		};
	});
})(document, window, config);
