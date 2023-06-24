import { Component, OnInit } from '@angular/core';
import { IMusica } from '../interfaces/imusica';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  musicas: IMusica[] = [];
  playIcone = faPlay;

  constructor(private spotifyService: SpotifyService) {
    this.obterMusicas();
   }

  ngOnInit(): void {
  }

  async obterMusicas() {
    this.musicas = await this.spotifyService.buscarMusica();
    console.log(this.musicas)
  }

  obterArtistas(musica: IMusica) {
    return musica.artistas.map(artista => artista.nome).join(', ');
  }

  executarMusica(musica: IMusica) {
    this.spotifyService.executarMusica(musica.id);
  }
}
