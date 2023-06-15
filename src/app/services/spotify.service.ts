import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotify: Spotify.SpotifyWebApiJs;

  constructor() { }

  obterTokenUrlCallback() {
    if (!window.location.hash) return '';

    const params = window.location.href.substring(1).split('&');
    const token = params[0].split('=')[1];
    return token;
  }

  verificarTokenUrlCallback() {
    const token = this.obterTokenUrlCallback();
    this.definirAccessToken(token);
    console.log(token);
  }

  obterUrlLogin() {
    const authEndPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  definirAccessToken(token: string) {
    this.spotify?.setAccessToken(token);
    localStorage.setItem('token', token);
    this.spotify?.skipToNext();
  }
}
