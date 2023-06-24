import { Injectable } from "@angular/core";
import { SpotifyConfiguration } from "src/environments/environment";
import Spotify from "spotify-web-api-js";
import { IUsuario } from "../pages/interfaces/iusuario";
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from "../common/spotify-helper";
import { IPlaylist } from "../pages/interfaces/iplaylist";
import { Router } from "@angular/router";
import { IArtista } from "../pages/interfaces/iartista";
import { IMusica } from "../pages/interfaces/imusica";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  spotify: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotify = new Spotify();
  }

  async inicializarUsuario() {
    if (!!this.usuario) {
      return true;
    }

    const token = localStorage.getItem("token");

    if (!token) return false;

    try {

      this.definirAccessToken(token);
      await this.obterSpotifyUser();
      return !!this.usuario;
    
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private async obterSpotifyUser(): Promise<void> {
    const userInfo = await this.spotify.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
    console.log(userInfo)
  }

  public obterTokenUrlCallback(): string {
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

    // test
    // this.spotify
    //   ?.skipToNext()
    //   .then((x) => console.log(x))
    //   .catch((err) => console.log(err));
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this .spotify.getUserPlaylists( this.usuario.id, { offset, limit } );
    // return playlists.items.map(x => SpotifyPlaylistParaPlaylist(x));
    console.log(playlists)
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
    const artistas = await this.spotify.getMyTopArtists({ limit });
    console.log(artistas)
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusica(offset=0, limit=50): Promise<IMusica[]> {
    const musicas = await this.spotify.getMySavedTracks({ offset, limit });
    console.log(musicas);
    return musicas.items.map(x => SpotifyTrackParaMusica(x.track));
  }
    
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  // nao usado ainda
  getElvis() {
    const teste = this.spotify.getAccessToken();
    console.log(teste);
    //  .getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err: any, data: any) {
    //   if (err) console.error(err);
    //   else console.log('Artist albums', data);
    // });
  }
}
