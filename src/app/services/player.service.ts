import { Injectable } from '@angular/core';
import { IMusica } from '../pages/interfaces/imusica';
import { BehaviorSubject, Subject } from 'rxjs';
import { newMusica } from '../common/factories';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual = new BehaviorSubject<IMusica>(newMusica());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) { 
    this.obterMusicaAtual();
  }

  async obterMusicaAtual() {
    clearTimeout(this.timerId);

    // obter a musica
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicalAtual(musica);

    // causo o loop
    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 3000);
  }

  definirMusicalAtual(musica: IMusica) {
    this.musicaAtual.next(musica);
  }

  voltarMusica() {
    this.spotifyService.voltarMusica();  
  }

  proximaMusica() {
    this.spotifyService.proximaMusica();
  }
}
