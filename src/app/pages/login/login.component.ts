import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  private verificarTokenUrlCallback() {
    const token = this.spotifyService.obterTokenUrlCallback();

    if(!!token) {
      this.spotifyService.definirAccessToken(token);
      console.log('pegou token de acesso da spotify');
    } else {
      console.log('nao rolou');
    }
  }

  public abrirPaginaLogin() {
    window.location.href = this.spotifyService.obterUrlLogin();
  }
}
