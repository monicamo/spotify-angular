import { Injectable } from "@angular/core";
import { SpotifyConfiguration } from "src/environments/environment";
import Spotify from "spotify-web-api-js";
import { IUsuario } from "../pages/interfaces/iusuario";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  spotify: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor() {
    this.spotify = new Spotify();
  }

  async inicializarServico() {
    if (!!this.usuario) {
      return true;
    }

    const token = localStorage.getItem("token");

    if (!!token) return false;

    try {
      this.definirAccessToken(token);
      await this.obterSpotifyUser();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async obterSpotifyUser() {
    const userInfo = await this.spotify.getMe();
    console.log(userInfo)
  }

  public obterTokenUrlCallback() {
    if (!window.location.hash) return "";

    const params = window.location.href.substring(1).split("&");
    const token = params[0].split("=")[1];
    return token;
  }

  private verificarTokenUrlCallback() {
    const token = this.obterTokenUrlCallback();
    if (!!token) {
      this.definirAccessToken(token);
    }
  }

  public obterUrlLogin() {
    const authEndPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join("%20")}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  public definirAccessToken(token: string) {
    this.spotify?.setAccessToken(token);
    localStorage.setItem("token", token);
    console.log(token);
    this.spotify
      ?.skipToNext()
      .then((x) => console.log(x))
      .catch((err) => console.log(err));
    this.getElvis();
  }

  getElvis() {
    const teste = this.spotify.getAccessToken();
    console.log(teste);
    //  .getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err: any, data: any) {
    //   if (err) console.error(err);
    //   else console.log('Artist albums', data);
    // });
  }
}
