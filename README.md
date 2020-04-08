# MMM-SpotifyHelper
SpotifyHelper for [MMM-Spotify](https://github.com/eouia/MMM-Spotify).

## Features
- Expose an event to increase/decrease volume
- Expose an event to play previous/next Spotify URI based on a list 

## Install
```sh
cd modules
git clone https://github.com/victor-paumier/MMM-SpotifyHelper
```

## Using the module
Edit your `config/config.js` file and add a new object to the `modules`:
```js
{
  module: "MMM-SpotifyHelper",
  config: {
    showNotif: true,
    volume: 50,
    volumeStep: 10,
    urls: []
  }
}
```

### Configuration options:

| Option                       | Description
| ---------------------------- | -----------
| `showNotif`                  | Show a notification on event sent. <br> <br> **Default value:** `true`
| `volume`                     | The volume level on MagicMirror start. <br> <br> **Possible values:** `0` - `100` <br><br> **Default value:** `50`
| `volumeStep`                 | The volume step level to increase or decrease on event fired. <br> <br> **Default value:** `10`
| `urls`                       | Array of urls to play. <br>(see Urls options) <br> <br> **Default value:** `[]`

### Urls options:
| Option                | Description
| --------------------- | -----------
| `title`               | The title of the URI. Used in the notification.
| `type`                | The type of URI. <br> <br> **Possible values:** `album`, `artist`, `playlist` or `track`
| `uri`                 | The URI of the album, artist, playlist or track  <br> <br> **Required**

## Control with notification
- `SPOTIFY_HELPER_VOLUME` : setting volume of current playback. Use `UP` to increase or `DOWN` to decrease 
```
  this.sendNotification("SPOTIFY_VOLUME", 'UP')
```
- `SPOTIFY_HELPER_SOURCE` : Change the Spotify URI. Use `NEXT` to load the next URI or `PREVIOUS` to load the previous one
```
  this.sendNotification("SPOTIFY_HELPER_SOURCE", "NEXT")
```
