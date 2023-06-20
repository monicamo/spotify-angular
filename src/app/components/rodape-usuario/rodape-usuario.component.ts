import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { faSignOut, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/pages/interfaces/iusuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit {
  
  sairIcone = faSignOutAlt;
  usuario: IUsuario = null;

  constructor(private spotifyService: SpotifyService) {}
  ngOnInit(): void {
    this.usuario = this.spotifyService.usuario;
  }
  
  logout() {
    this.spotifyService.logout();
  }

}
