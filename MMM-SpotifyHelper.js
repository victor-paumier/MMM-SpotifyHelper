//
// Module : MMM-SpotifyHelper
//

Module.register("MMM-SpotifyHelper", {
	defaults: {
	    urls: [],
		volume: 50,
		volumeStep: 10,
		showNotif: true
	},

	currentUrlId: null,

    notificationReceived: function(notification, payload) {
		switch (notification) {
			case "SPOTIFY_HELPER_VOLUME":
				this.updateVolume(payload);
				break;

			case "SPOTIFY_HELPER_SOURCE":
				this.updateSource(payload);
				break;
		}
	},

	updateVolume: function(value) {
		if (value === 'UP') {
			this.config.volume = this.config.volume + this.config.volumeStep;

			if (this.config.volume > 100) {
				this.config.volume = 100;
			}
		} else if (value === 'DOWN') {
			this.config.volume = this.config.volume - this.config.volumeStep;

			if (this.config.volume < 0) {
				this.config.volume = 0;
			}
		}

		this.sendNotification("SPOTIFY_VOLUME", this.config.volume);

		this.showNotif('Volume set : '+this.config.volume);
	},

	updateSource: function (value) {
		if (this.currentUrlId === null) {
			this.currentUrlId = 0;
		} else {
			if (value === 'NEXT') {
				this.currentUrlId++;
				if (this.currentUrlId > this.config.urls.length -1) {
					this.currentUrlId = 0;
				}
			} else if (value === 'PREVIOUS') {
				this.currentUrlId--;
				if (this.currentUrlId < 0) {
					this.currentUrlId = this.config.urls.length -1;
				}
			}
		}

		var currentUrl = this.config.urls[this.currentUrlId];
		if (currentUrl !== 'undefined') {
			var type = currentUrl.uri.match(/(?<=^spotify:)(\w+)(?:)/g)[0];

			var payload = (type === 'track')
				? {"uris": [currentUrl.uri]}
				: {"context_uri": currentUrl.uri}
			;

			this.sendNotification("SPOTIFY_PLAY", payload);

			var message = 'title' in currentUrl
				? type + ' ' + currentUrl.title
				: currentUrl.uri
			;
			this.showNotif(message+ ' Started');
		}
	},

	showNotif: function (message) {
		if (this.config.showNotif) {
			this.sendNotification("SHOW_ALERT",
				{
					type: "notification",
					title: 'MMM-SpotifyHelper',
					message: message
				}
			);
		}
	}
});
