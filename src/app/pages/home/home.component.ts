import { PlayerService } from './../../services/player.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusica } from '../interfaces/imusica';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMusica } from 'src/app/common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  musicas: IMusica[] = [];
  playIcone = faPlay;
  musicaAtual: IMusica = newMusica();

  subs: Subscription[] = [];

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) {
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
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
    this.playerService.definirMusicalAtual(musica);
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
      console.log('Musica atual ', musica);
    });

    this.subs.push(sub);
  }
}
